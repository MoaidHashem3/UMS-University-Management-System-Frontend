import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, LinearProgress, Container } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import axios from 'axios'; // Assuming you're using axios to post data to the backend

const Quiz = ({ quizName, duration, questions, postScoreUrl }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert minutes to seconds
    const [quizFinished, setQuizFinished] = useState(false); // Track if the quiz is finished
    const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null)); // Track selected answers

    const timerRef = useRef(null);

    useEffect(() => {
        if (!quizFinished) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 0) {
                        clearInterval(timerRef.current);
                        finishQuiz(); // Calculate score and stop timer when time is up
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        // Cleanup the timer on component unmount or when the quiz finishes
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [quizFinished]);

    const finishQuiz = async () => {
        if (!quizFinished) {
            calculateScore();
            setQuizFinished(true);
            await postScoreToBackend();
        }
        clearInterval(timerRef.current); // Clear timer after any call to finishQuiz
    };
    
    const calculateScore = () => {
        const finalScore = selectedAnswers.reduce((acc, answer, index) => {
            if (answer !== null && answer === questions[index].correctAnswer) {
                return acc + 1; // Increment score for each correct answer
            }
            return acc;
        }, 0);
        setScore(finalScore);
    };

    const postScoreToBackend = async () => {
        try {
            const payload = { quizName, score, selectedAnswers };
            await axios.post(postScoreUrl, payload); // Post the score to the backend
            console.log("Score successfully posted:", payload);
        } catch (error) {
            console.error("Error posting score:", error);
        }
    };

    const handleAnswerClick = (index) => {
        if (!quizFinished) {
            const newSelectedAnswers = [...selectedAnswers];
            newSelectedAnswers[currentQuestionIndex] = index; // Save selected answer
            setSelectedAnswers(newSelectedAnswers); // Update selected answers
        }
    };

    const handleGoBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleGoForward = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleSubmit = () => {
        finishQuiz(); // Trigger quiz finish on submission
    };

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <Container maxWidth="sm" sx={{ mt: 4, p: 3, bgcolor: '#2C3E50', borderRadius: 2 }}>
            {!quizFinished ? (
                <>
                    <Typography variant="h4" color="#ECF0F1" gutterBottom>
                        {quizName} #{currentQuestionIndex + 1}
                    </Typography>
                    <LinearProgress variant="determinate" value={progress} sx={{ mb: 2 }} />
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="body1" color="#ECF0F1">
                            Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
                        </Typography>
                        <AccessTimeIcon style={{ color: '#ECF0F1' }} />
                    </Box>
                    <Typography variant="h6" color="#ECF0F1" gutterBottom>
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </Typography>
                    <Typography variant="body1" color="#ECF0F1" gutterBottom>
                        {currentQuestion.question}
                    </Typography>
                    <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                        {currentQuestion.answers.map((answer, index) => (
                            <Box key={index} width="48%" mb={1}>
                                <Button
                                    variant="contained"
                                    onClick={() => handleAnswerClick(index)}
                                    sx={{
                                        width: '100%',
                                        backgroundColor: selectedAnswers[currentQuestionIndex] === index ? '#E74C3C' : '#1ABC9C',
                                        color: '#fff',
                                        '&:hover': {
                                            backgroundColor: selectedAnswers[currentQuestionIndex] === index ? '#C0392B' : '#16A085',
                                        },
                                    }}
                                    disabled={quizFinished} // Disable buttons after time runs out or on quiz finish
                                >
                                    {answer}
                                </Button>
                            </Box>
                        ))}
                    </Box>

                    {/* Navigation Buttons */}
                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Button 
                            variant="outlined" 
                            onClick={handleGoBack} 
                            disabled={currentQuestionIndex === 0}
                            sx={{
                                borderColor: '#1ABC9C',
                                color: '#1ABC9C',
                                '&:hover': {
                                    backgroundColor: '#1ABC9C',
                                    color: '#fff',
                                },
                            }}
                        >
                            Go Back
                        </Button>
                        <Button 
                            variant="outlined" 
                            onClick={handleGoForward} 
                            disabled={currentQuestionIndex === questions.length - 1}
                            sx={{
                                borderColor: '#1ABC9C',
                                color: '#1ABC9C',
                                '&:hover': {
                                    backgroundColor: '#1ABC9C',
                                    color: '#fff',
                                },
                            }}
                        >
                            Next
                        </Button>
                        {currentQuestionIndex === questions.length - 1 && (
                            <Button 
                                variant="contained" 
                                onClick={handleSubmit}
                                sx={{
                                    backgroundColor: '#1ABC9C',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#16A085',
                                    },
                                }}
                            >
                                Submit
                            </Button>
                        )}
                    </Box>
                </>
            ) : (
                <Box mt={4} textAlign="center">
                    <Typography variant="h5" color="#ECF0F1" gutterBottom>
                        Your Final Score
                    </Typography>
                    <Typography variant="h4" color="#ECF0F1">
                        {score} / {questions.length}
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default Quiz;
