import React, { useState } from 'react';
import { TextField, Button, MenuItem, Grid, Typography, Box, Snackbar, Alert, CircularProgress } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import Elearning from '../assets/El.jpg';
import axios from 'axios';
import { useTheme } from '@emotion/react';

const Register = () => {
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phoneNumber: '',
        role: ''
    });
    const [loading, setLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState({ open: false, severity: '', message: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("https://elearning-server-side.onrender.com/user/auth/register", registerData);
            setRegisterData({
                username: '',
                password: '',
                confirmPassword: '',
                email: '',
                phoneNumber: '',
                role: ''
            });
            setOpenAlert({ open: true, severity: "success", message: "Registration is Successful" });
            navigate('/login');
        } catch (error) {
            if (error.response) {
                setOpenAlert({ open: true, severity: 'error', message: `Registration failed: ${error.response.data.message || 'Unknown error'}` });
            } else if (error.request) {
                setOpenAlert({ open: true, severity: 'error', message: 'No response from server. Please try again later.' });
            } else {
                setOpenAlert({ open: true, severity: 'error', message: `Error: ${error.message}` });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleClose = (e, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenAlert({ ...openAlert, open: false });
    };

    const theme = useTheme();

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
                        <Typography variant='p' sx={{ fontSize: "1.5rem", color: theme.palette.primary.main, textAlign: "center" }}>Sign Up</Typography>
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
                    <form onSubmit={handleRegister}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            name='email'
                            fullWidth
                            margin="normal"
                            value={registerData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField
                            label="Username"
                            variant="outlined"
                            name='username'
                            fullWidth
                            margin="normal"
                            value={registerData.username}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField
                            label="Phone Number"
                            name='phoneNumber'
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={registerData.phoneNumber}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField
                            label="Password"
                            name='password'
                            variant="outlined"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={registerData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField
                            label="Confirm Password"
                            name='confirmPassword'
                            variant="outlined"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={registerData.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField
                            select
                            label="Role"
                            name='role'
                            value={registerData.role}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            required
                        >
                            <MenuItem value="student">Student</MenuItem>
                            <MenuItem value="instructor">Instructor</MenuItem>
                        </TextField>
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
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
                        </Button>
                        <Typography>Already have an account <Link to="/login"><span style={{ textDecoration: "underline", color: "#0077b6" }}>Login</span></Link></Typography>
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

export default Register;
