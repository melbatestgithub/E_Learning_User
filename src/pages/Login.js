import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Button, Checkbox, FormControlLabel, Snackbar, CircularProgress, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Elearning from '../assets/El.jpg';
import axios from 'axios';
import { useTheme } from '@emotion/react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openAlert, setOpenAlert] = useState({ open: false, severity: '', message: '' });
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const response = await axios.post("https://elearning-server-side.onrender.com/user/auth/login", { email, password });
      const { token, user } = response.data;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      console.log('User:', user);

      if (user.role === 'student') {
        setOpenAlert({ open: true, severity: 'success', message: 'Login Successful!' });
        navigate('/student-dashboard/courses');
      } else if (user.role === 'instructor') {
        setOpenAlert({ open: true, severity: 'success', message: 'Login Successful!' });
        navigate('/instructor-dashboard/assignedCourse');
      }

    } catch (error) {
      setOpenAlert({ open: true, severity: 'error', message: 'Error occurred!' });
      console.error('Login error:', error);
    } finally {
      setLoading(false); 
    }
  };

  const handleClose = (e, r) => {
    if (r === "clickaway") {
      return;
    }
    setOpenAlert({ ...openAlert, open: false });
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item xs={12} md={6} sx={{
        backgroundImage: `url(${Elearning})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />
      <Grid item xs={12} md={6} sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 4,
      }}>
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <Typography gutterBottom sx={{ marginTop: "1rem" }}>
            <Typography variant='p' sx={{ fontSize: "1.5rem", color: theme.palette.primary.main, textAlign: "center" }}>Sign In </Typography>
            <Box
              component="span"
              sx={{
                display: 'block',
                width: '100%',
                height: '2px',
                backgroundColor: 'gray',
                marginTop: '4px'
              }}
            />
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email address"
              name="email"
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              margin="normal"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Box sx={{ display: "flex", mb: 2, alignItems: "center", gap: 8 }}>
              <FormControlLabel
                control={<Checkbox name="rememberMe" color="primary" />}
                label="Remember me"
              />
              <Typography>Forgot Password</Typography>
            </Box>
            <Button
              fullWidth
              sx={{
                mb: 1,
                background: theme.palette.primary.button,
                color: 'white',
                borderRadius: "20px",
                '&:hover': {
                  background: theme.palette.primary.hover
                }
              }}
              type="submit"
              disabled={loading} 
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'} 
            </Button>
            <Typography>Don't have an account <Link to="/"><span style={{ textDecoration: "underline", color: "#0077b6" }}>sign up</span></Link></Typography>
          </form>
          <Snackbar
            open={openAlert.open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={handleClose} severity={openAlert.severity} sx={{ width: '100%' }}>
              {openAlert.message}
            </Alert>
          </Snackbar>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
