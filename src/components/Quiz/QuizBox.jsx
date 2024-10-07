import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, LinearProgress, Container } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import axios from 'axios'; 
import { useSelector } from 'react-redux'; 

const Quiz = ({ quizId }) => {
    const [quizData, setQuizData] = useState(null); 
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0); 
    const [quizFinished, setQuizFinished] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [attemptMessage, setAttemptMessage] = useState(''); 
    
    const user = useSelector(state => state.auth.user); 
    const timerRef = useRef(null);

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const quizRes = await axios.get(`http://localhost:3000/quiz/${quizId}`); 
                const userRes = (user.quizzes)? user.quizzes: []; 
                const hasTakenQuiz = userRes.some(q => q.quizId === quizId);
                if (hasTakenQuiz) {
                    setAttemptMessage("You have already attempted this quiz."); 
                    setQuizFinished(true); 
                    setQuizData(quizRes.data.data); 
                    setTimeLeft(quizRes.data.data.timeLimit * 60);
                    setSelectedAnswers(Array(quizRes.data.data.questions.length).fill(null)); 
                }
            } catch (error) {
                console.error("Error fetching quiz or user data:", error);
            }
        };

        fetchQuizData();
    }, [quizId, user.quizzes]);

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
            calculateScore();
            setQuizFinished(true);
            await postScoreToBackend();
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
        setScore(finalScore);
    };

    const postScoreToBackend = async () => {
        try {
            const payload = { answers: selectedAnswers }; 
            await axios.post(`http://localhost:3000/quiz/submitQuiz/${user.id}/${quizId}`, payload);
            console.log(user)
        } catch (error) {
            console.error("Error posting score:", error);
        }
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

    if (!quizData && !attemptMessage) {
        return <Typography>Loading...</Typography>;
    }

    if (attemptMessage) {
        return (
            <Container maxWidth="sm" sx={{ mt: 4, p: 3, bgcolor: '#2C3E50', borderRadius: 2 }}>
                <Typography variant="h5" color="#ECF0F1">
                    {attemptMessage}
                </Typography>
            </Container>
        );
    }

    const currentQuestion = quizData.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quizData.questions.length) * 100;

    return (
        <Container maxWidth="sm" sx={{ mt: 4, p: 3, bgcolor: '#2C3E50', borderRadius: 2 }}>
            {!quizFinished ? (
                <>
                    <Typography variant="h4" color="#ECF0F1" gutterBottom>
                        {quizData.title} #{currentQuestionIndex + 1}
                    </Typography>
                    <LinearProgress variant="determinate" value={progress} sx={{ mb: 2 }} />
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
                        {currentQuestion.questionText}
                    </Typography>
                    <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                        {currentQuestion.options.map((answer, index) => (
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
                                    disabled={quizFinished} 
                                >
                                    {answer}
                                </Button>
                            </Box>
                        ))}
                    </Box>
                    <Box display="flex" justifyContent="space-between" mt={3}>
                        <Button 
                            variant="outlined" 
                            onClick={handlePreviousQuestion} 
                            disabled={currentQuestionIndex === 0 || quizFinished}
                        >
                            Back
                        </Button>
                        <Button 
                            variant="contained" 
                            onClick={handleNextQuestion} 
                            disabled={quizFinished}
                        >
                            {currentQuestionIndex === quizData.questions.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </>
            ) : (
                <Box mt={4} textAlign="center">
                    <Typography variant="h5" color="#ECF0F1" gutterBottom>
                        Your Final Score
                    </Typography>
                    <Typography variant="h4" color="#ECF0F1">
                        {score} / {quizData.questions.length}
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default Quiz;
