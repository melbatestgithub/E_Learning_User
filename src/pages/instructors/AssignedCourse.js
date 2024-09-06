import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Grid, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AssignedCourse = () => {
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser?.id;

  useEffect(() => {
    if (!userId) {
      setError('User not found.');
      setLoading(false);
      return;
    }

    const fetchAssignedCourses = async () => {
      try {
        const response = await axios.get(`https://elearning-server-side.onrender.com/user/instructor/courses/${userId}`);
        setAssignedCourses(response.data);
      } catch (err) {
        console.error('Error fetching assigned courses:', err);
        setError('Failed to fetch courses.');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedCourses();
  }, [userId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ padding: 2, mt: 10, borderRadius: 3, boxShadow: 4 }}>
        <Typography variant="h4" gutterBottom>
          Assigned Courses
        </Typography>
        <Grid container spacing={3}>
          {assignedCourses.length > 0 ? (
            assignedCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="p" gutterBottom>
                      Course Title: {course.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      Course Code: {course.courseCode}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Description: {course.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Credit Hour: {course.creditHour}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography sx={{ mt: 4, mx: 5, color: "red" }}>No assigned courses found.</Typography>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default AssignedCourse;
