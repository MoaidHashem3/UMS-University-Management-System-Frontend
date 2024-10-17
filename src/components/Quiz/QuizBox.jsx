import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, LinearProgress, Container, CircularProgress } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import axios from 'axios'; 
import { useSelector } from 'react-redux'; 
import axiosInstance from '../../axiosConfig';

const Quiz = ({ quizId }) => {
    const [quizData, setQuizData] = useState(null); 
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(null); 
    const [timeLeft, setTimeLeft] = useState(0); 
    const [quizFinished, setQuizFinished] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [attemptMessage, setAttemptMessage] = useState(''); 
    const [loading, setLoading] = useState(true); // Loading state

    const user = useSelector(state => state.auth.user); 
    const timerRef = useRef(null);
    const localStorageKey = `quizzes_${user.id}`;

    useEffect(() => {
        const fetchQuizData = async () => {
            setLoading(true); 
            try {
                const quizRes = await axiosInstance.get(`/quiz/${quizId}`);
                const localStorageQuizzes = JSON.parse(localStorage.getItem(localStorageKey)) || [];
                const hasTakenQuiz = localStorageQuizzes.some(q => q.quizId === quizId) || user.quizzes.some(q => q.quizId === quizId);

                if (hasTakenQuiz) {
                    setAttemptMessage("You have already attempted this quiz.");
                    setQuizFinished(true);
                } else {
                    setQuizData(quizRes.data.data);
                    setTimeLeft(quizRes.data.data.timeLimit * 60);
                    setSelectedAnswers(Array(quizRes.data.data.questions.length).fill(null));
                }
            } catch (error) {
                console.error("Error fetching quiz data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizData();
    }, [quizId, user.id]);

    useEffect(() => {
        if (!quizFinished && quizData) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 0) {
                        clearInterval(timerRef.current);
                        finishQuiz(); 
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            clearInterval(timerRef.current);
        };
    }, [quizFinished, quizData]);

    const finishQuiz = async () => {
        if (!quizFinished) {
            const finalScore = calculateScore();
            setQuizFinished(true);
            await postScoreToBackend(finalScore);
        }
        clearInterval(timerRef.current);
    };

    const calculateScore = () => {
        const finalScore = selectedAnswers.reduce((acc, answer, index) => {
            if (answer !== null && answer === quizData.questions[index].correctAnswer) {
                return acc + 1;
            }
            return acc;
        }, 0);
        if (score === null) {
            setScore(finalScore);
        }
        return finalScore;
    };

    const postScoreToBackend = async (finalScore) => {
        try {
            const payload = { answers: selectedAnswers };
            const response = await axiosInstance.post(`/quiz/submitQuiz/${user.id}/${quizId}`, payload);
            if (response.status === 200) {
                updateLocalStorage(quizId, finalScore);
                setAttemptMessage("Quiz submitted successfully. Here's your score:");
            }
        } catch (error) {
            console.error("Error posting score:", error);
        }
    };

    const updateLocalStorage = (quizId, finalScore) => {
        const localStorageQuizzes = JSON.parse(localStorage.getItem(localStorageKey)) || [];
        const updatedQuizzes = [...localStorageQuizzes, { quizId, score: finalScore }];
        localStorage.setItem(localStorageKey, JSON.stringify(updatedQuizzes));
    };

    const handleAnswerClick = (index) => {
        if (!quizFinished) {
            const newSelectedAnswers = [...selectedAnswers];
            newSelectedAnswers[currentQuestionIndex] = index;
            setSelectedAnswers(newSelectedAnswers);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizData.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            finishQuiz(); 
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    // Loader while fetching quiz data
    if (loading) {
        return (
            <Container maxWidth="sm" sx={{ mt: 4, p: 3, bgcolor: '#2C3E50', borderRadius: 2, textAlign: 'center' }}>
                <CircularProgress />
                <Typography variant="h6" color="#ECF0F1">Loading quiz data...</Typography>
            </Container>
        );
    }

    if (quizFinished) {
        return (
            <Container maxWidth="sm" sx={{ mt: 4, p: 3, bgcolor: '#2C3E50', borderRadius: 2 }}>
                <Typography variant="h5" color="#ECF0F1">
                    {attemptMessage}
                </Typography>
                {score !== null && (
                    <Typography variant="h4" color="#ECF0F1">
                        {score} / {quizData?.questions?.length}
                    </Typography>
                )}
            </Container>
        );
    }

    if (!quizData || !quizData.questions) {
        return (
            <Container maxWidth="sm" sx={{ mt: 4, p: 3, bgcolor: '#2C3E50', borderRadius: 2 }}>
                <Typography variant="h5" color="#ECF0F1">
                    No quiz data available.
                </Typography>
            </Container>
        );
    }

    const currentQuestion = quizData.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quizData.questions.length) * 100;

    return (
        <Container maxWidth="sm" sx={{ mt: 18, p: 3, bgcolor: 'secondary.light', borderRadius: 10 }}>
            <Typography variant="h4" color="white" gutterBottom>
                {quizData.title} #{currentQuestionIndex + 1}
            </Typography>
            <LinearProgress color="success" variant="determinate" value={progress} sx={{ mb: 2, backgroundColor: "primary.main" }} />
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="body1" color="#ECF0F1">
                    Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
                </Typography>
                <AccessTimeIcon style={{ color: '#ECF0F1' }} />
            </Box>
            <Typography variant="h6" color="#ECF0F1" gutterBottom>
                Question {currentQuestionIndex + 1} of {quizData.questions.length}
            </Typography>
            <Typography variant="body1" color="#ECF0F1" gutterBottom>
                {currentQuestion?.questionText || 'Loading question...'}
            </Typography>
            <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                {currentQuestion?.options?.map((answer, index) => (
                    <Box key={index} width="48%" mb={1}>
                        <Button
                            variant="contained"
                            onClick={() => handleAnswerClick(index)}
                            sx={{
                                width: '100%',
                                borderRadius: 50,
                                backgroundColor: selectedAnswers[currentQuestionIndex] === index ? 'warning.main' : 'primary.main',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: selectedAnswers[currentQuestionIndex] === index ? '#C0392B' : '#16A085',
                                },
                            }}
                        >
                            {answer}
                        </Button>
                    </Box>
                ))}
            </Box>
            <Box display="flex" justifyContent="space-between" mt={2}>
                <Button
                    variant="contained"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    sx={{ backgroundColor: 'secondary.main' }}
                >
                    Previous
                </Button>
                <Button
                    variant="contained"
                    onClick={handleNextQuestion}
                    disabled={currentQuestionIndex === quizData.questions.length - 1}
                    sx={{ backgroundColor: 'secondary.main' }}
                >
                    Next
                </Button>
            </Box>
        </Container>
    );
};

export default Quiz;