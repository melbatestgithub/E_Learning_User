import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, MenuItem, Select, InputLabel, FormControl, Card, CardContent, Alert, Snackbar } from '@mui/material';
import axios from 'axios';

const Quiz = () => {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState('');
  const [quizTitle, setQuizTitle] = useState('');
  const [quizQuestions, setQuizQuestions] = useState([{ question: '', options: ['', '', '', ''], answer: '' }]);
  const [loadingLessons, setLoadingLessons] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState('success'); 

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser || !storedUser.id) {
          setError('User not found in localStorage.');
          return;
        }

        const userId = storedUser.id;
        const response = await axios.get(`https://elearning-server-side.onrender.com/lesson/user/${userId}`);
        setLessons(response.data);
      } catch (error) {
        console.error('Error fetching lessons:', error);
        setError('Before creating Quiz first create lesson,then you can create Quiz for that lesson');
      } finally {
        setLoadingLessons(false);
      }
    };

    fetchLessons();
  }, []);

  const handleAddQuizQuestion = () => {
    setQuizQuestions([...quizQuestions, { question: '', options: ['', '', '', ''], answer: '' }]);
  };

  const handleQuizSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://elearning-server-side.onrender.com/quiz/createQuiz', {
        title: quizTitle,
        lessonId: selectedLesson,
        questions: quizQuestions
      });

      console.log('Quiz Created:', response.data);
      setSuccessMessage('Quiz created successfully!');
      setSnackbarType('success');
      setOpenSnackbar(true);
      
      setQuizTitle('');
      setSelectedLesson('');
      setQuizQuestions([{ question: '', options: ['', '', '', ''], answer: '' }]);
    } catch (error) {
      console.error('Error creating quiz:', error);
      setSuccessMessage('Error creating quiz. Please try again.');
      setSnackbarType('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ padding: 2, mt: 10, borderRadius: 3, boxShadow: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create Quiz
        </Typography>

        {loadingLessons && <Typography>Loading lessons...</Typography>}
        {error && <Typography color="error">{error}</Typography>}

        {lessons.length > 0 && (
          <FormControl fullWidth margin="normal">
            <InputLabel>Lesson</InputLabel>
            <Select
              value={selectedLesson}
              onChange={(e) => setSelectedLesson(e.target.value)}
              required
            >
              {lessons.map((lesson) => (
                <MenuItem key={lesson._id} value={lesson._id}>
                  {lesson.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <Box sx={{ my: 4 }}>
          <Typography variant="h6" gutterBottom>
            Create a Quiz
          </Typography>
          <form onSubmit={handleQuizSubmit}>
            <TextField
              label="Quiz Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              required
            />
            {quizQuestions.map((q, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="subtitle1">Question {index + 1}</Typography>
                  <TextField
                    label="Question"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={q.question}
                    onChange={(e) => {
                      const newQuestions = [...quizQuestions];
                      newQuestions[index].question = e.target.value;
                      setQuizQuestions(newQuestions);
                    }}
                    required
                  />
                  {q.options.map((option, optIndex) => (
                    <TextField
                      key={optIndex}
                      label={`Option ${optIndex + 1}`}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={option}
                      onChange={(e) => {
                        const newQuestions = [...quizQuestions];
                        newQuestions[index].options[optIndex] = e.target.value;
                        setQuizQuestions(newQuestions);
                      }}
                      required
                    />
                  ))}
                  <TextField
                    label="Correct Answer"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={q.answer}
                    onChange={(e) => {
                      const newQuestions = [...quizQuestions];
                      newQuestions[index].answer = e.target.value;
                      setQuizQuestions(newQuestions);
                    }}
                    required
                  />
                </CardContent>
              </Card>
            ))}
            <Button type="button" onClick={handleAddQuizQuestion} sx={{backgroundColor:"#0077b6",color:'white'}}>
              Add Another Question
            </Button>
            <Button type="submit" variant="contained" color="primary" sx={{ ml: 2 }}>
              Create Quiz
            </Button>
          </form>
        </Box>

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}  anchorOrigin={{vertical:'top',horizontal:'center'}}>
          <Alert onClose={handleCloseSnackbar} severity={snackbarType} sx={{ width: '100%' }}>
            {successMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Quiz;
