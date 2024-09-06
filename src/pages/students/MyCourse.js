import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
  CircularProgress 
} from '@mui/material';

const MyCourse = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser?.id;

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await axios.get(`https://elearning-server-side.onrender.com/user/students/${userId}/enrolledCourses`);
        console.log('API Response:', response.data);
        setEnrolledCourses(response.data.enrolledCourses);
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      } finally {
        setLoading(false);
      }
    };
  
    if (userId) {
      fetchEnrolledCourses();
    }
  }, [userId]);

  const handleSeeLessons = (courseId) => {
    navigate(`/student-dashboard/lessons/${courseId}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2, mt: 10, borderRadius: 3, boxShadow: 4 }}>
      <Typography variant="h6" gutterBottom>
        My Enrolled Courses
      </Typography>

      <Box sx={{ maxHeight: 600, overflowX: 'auto' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Course Code</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Credit Hours</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Action</TableCell> 
              </TableRow>
            </TableHead>
            {enrolledCourses.length>0?  <TableBody>
              {enrolledCourses?.map((course) => (
                <TableRow key={course._id}>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.courseCode}</TableCell>
                  <TableCell>{course.description}</TableCell>
                  <TableCell>{course.creditHour}</TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      onClick={() => handleSeeLessons(course._id)}
                      sx={{backgroundColor:"#0077b6",widht:"180px"}}
                    >
                       Lessons
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>:<Typography sx={{textAlign:"center",mt:2}}>You have not Enrolled </Typography>}
           
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default MyCourse;
