import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  TableSortLabel,
  CircularProgress,
  Snackbar,      
  Alert,         
  useTheme,
} from '@mui/material';

const CoursesManagement = () => {
  const theme = useTheme();
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);   
  const [snackbarMessage, setSnackbarMessage] = useState(''); 
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesRes = await axios.get('https://elearning-server-side.onrender.com/course/getCourse');
        setCourses(coursesRes.data);

        const enrolledRes = await axios.get(`https://elearning-server-side.onrender.com/user/students/${userId}/enrolledCourses`);
        setEnrolledCourses(enrolledRes.data.enrolledCourses.map(course => course._id));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const handleEnroll = async (courseId) => {
    try {
      const response = await axios.post('https://elearning-server-side.onrender.com/user/students/enroll', {
        userId,
        courseId,
      });
      setSnackbarMessage(response.data.message);
      setSnackbarSeverity('success'); 
      setSnackbarOpen(true);          
      setEnrolledCourses(prev => [...prev, courseId]);
    } catch (error) {
      console.error('Error enrolling in course:', error);
      setSnackbarMessage('Failed to enroll in course.');
      setSnackbarSeverity('error');  
      setSnackbarOpen(true);        
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm) ||
    course.courseCode.toLowerCase().includes(searchTerm) ||
    course.description.toLowerCase().includes(searchTerm) ||
    course.category.toLowerCase().includes(searchTerm)
  );

  return (
    <Box sx={{ padding: 2, mt: 10, borderRadius: 3, boxShadow: 4 }}>
      <Typography variant="h6" gutterBottom>
        All Available Course List
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField
          label="Search Courses ..."
          variant="outlined"
          onChange={handleSearch}
          sx={{
            flex: 0.5,
            mb: 1,
            borderRadius: 3,
            background: 'whitesmoke',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none',
              },
            },
          }}
        />
      </Box>

      <Box sx={{ maxHeight: 600, overflow: 'auto' }}>
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel>Title</TableSortLabel>
                </TableCell>
                <TableCell>Course Code</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Credit Hours</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course._id}>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.courseCode}</TableCell>
                  <TableCell>{course.description}</TableCell>
                  <TableCell>{course.creditHour}</TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{
                        backgroundColor: theme.palette.primary.button,
                        color: 'white',
                        textTransform: 'capitalize',
                      }}
                      onClick={() => handleEnroll(course._id)}
                      disabled={enrolledCourses.includes(course._id)}
                    >
                      {enrolledCourses.includes(course._id) ? 'Enrolled' : 'Enroll'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CoursesManagement;
