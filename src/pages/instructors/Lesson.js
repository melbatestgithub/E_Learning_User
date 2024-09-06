import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, MenuItem, Select, InputLabel, FormControl, Alert } from '@mui/material';
import axios from 'axios';

const CreateLesson = () => {
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDescription, setLessonDescription] = useState('');
  const [lessonContent, setLessonContent] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchAssignedCourses = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const userId = storedUser?.id;
        const response = await axios.get(`https://elearning-server-side.onrender.com/user/instructor/courses/${userId}`);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching assigned courses:', error);
        setError('Failed to fetch assigned courses.');
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchAssignedCourses();
  }, []);

  const handleLessonSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const userId = storedUser?.id;
  
      const lessonData = {
        title: lessonTitle,
        description: lessonDescription,
        content: lessonContent,
        courseId,
        createdBy:userId
      };
  
      const lessonResponse = await axios.post('https://elearning-server-side.onrender.com/lesson/createLesson', lessonData);
  
      if (lessonResponse.status === 201) {
        setSuccess(true);  
        setLessonTitle('');
        setLessonDescription('');
        setLessonContent('');
        setCourseId('');
      }
    } catch (error) {
      console.error('Error creating lesson:', error);
      setError('Failed to create lesson. Please try again.');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ padding: 2, mt: 10, borderRadius: 3, boxShadow: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create Lesson
        </Typography>
        {success && <Alert severity="success">Lesson created successfully!</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleLessonSubmit}>
          <TextField
            label="Lesson Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lessonTitle}
            onChange={(e) => setLessonTitle(e.target.value)}
            required
          />
          <TextField
            label="Lesson Description"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={lessonDescription}
            onChange={(e) => setLessonDescription(e.target.value)}
            required
          />
          <TextField
            label="Lesson Content"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={lessonContent}
            onChange={(e) => setLessonContent(e.target.value)}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Course</InputLabel>
            <Select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
            >
              {courses.map((course) => (
                <MenuItem key={course._id} value={course._id}>
                  {course.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit"  sx={{backgroundColor:"#0077b6",color:"white",my:4}}>
            Create Lesson
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateLesson;
