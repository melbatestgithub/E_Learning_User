import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, Box, Button, FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import axios from 'axios';

const StudentLessons = () => {
  const { courseId } = useParams(); 
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser || !storedUser.id) {
          setError('User not found in localStorage.');
          return;
        }
        const userId = storedUser.id;
        const response = await axios.get(`https://elearning-server-side.onrender.com/lesson/lessons-quiz/${courseId}/${userId}`);
        setLessons(response.data);
      } catch (error) {
        console.error('Error fetching lessons:', error);
        setError('Failed to fetch lessons.');
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [courseId]);

  const handleCheckboxChange = (questionIndex, optionIndex) => {
    setSelectedAnswers(prev => {
      const updated = { ...prev };
      if (!updated[questionIndex]) {
        updated[questionIndex] = [];
      }
      const optionId = `${questionIndex}-${optionIndex}`;
      if (updated[questionIndex].includes(optionId)) {
        updated[questionIndex] = updated[questionIndex].filter(id => id !== optionId);
      } else {
        updated[questionIndex].push(optionId);
      }
      return updated;
    });
  };

  const handleSubmit = () => {
   
    console.log('Submitted answers:', selectedAnswers);
  };

  const toggleShowAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ padding: 2, mt: 10, borderRadius: 3, boxShadow: 4 }}>
        <Typography variant="h4" gutterBottom>
          Lessons and Quizzes
        </Typography>

        {error && <Typography color="error">{error}</Typography>}

        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          lessons.length > 0 ? (
            <Box>
              {lessons.map((lesson) => (
                <Card variant="outlined" sx={{ mb: 3 }} key={lesson._id}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {lesson.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {lesson.description}
                    </Typography>

                    {lesson.quiz && lesson.quiz.length > 0 ? (
                      <Box>
                        <Typography variant="subtitle1" gutterBottom>
                          Quiz: {lesson.quiz[0].title}
                        </Typography>
                        <FormControl component="fieldset">
                          <FormGroup>
                            {lesson.quiz[0].questions.map((q, index) => (
                              <Box key={index} sx={{ mb: 3 }}>
                                <Typography variant="body2" fontWeight="bold">
                                  {index + 1}. {q.question}
                                </Typography>
                                {q.options.map((option, optIndex) => (
                                  <FormControlLabel
                                    key={optIndex}
                                    control={
                                      <Checkbox
                                        checked={selectedAnswers[index]?.includes(`${index}-${optIndex}`) || false}
                                        onChange={() => handleCheckboxChange(index, optIndex)}
                                      />
                                    }
                                    label={option}
                                  />
                                ))}
                              </Box>
                            ))}
                          </FormGroup>
                        </FormControl>
                        <Box sx={{ mt: 2 }}>
                          <Button variant="contained" onClick={handleSubmit} sx={{backgroundColor:"#0077b6"}}>
                            check Answers
                          </Button>
                          <Button variant="outlined" sx={{ ml: 2 }} >
                            {showAnswers ? 'Hide Answers' : 'Show Answers'}
                          </Button>
                          {showAnswers && (
                            <Box sx={{ mt: 2 }}>
                              <Typography variant="h6">Answers:</Typography>
                              {lesson.quiz[0].questions.map((q, index) => (
                                <Box key={index} sx={{ mb: 2 }}>
                                  <Typography variant="body2" fontWeight="bold">
                                    {index + 1}. {q.question}
                                  </Typography>
                                  <Typography variant="body2">
                                    Correct Answer(s): {q.correctAnswers.join(', ')}
                                  </Typography>
                                </Box>
                              ))}
                            </Box>
                          )}
                        </Box>
                      </Box>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No quiz available for this lesson.
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <Typography>No lessons available for this course.</Typography>
          )
        )}
      </Box>
    </Container>
  );
};

export default StudentLessons;
