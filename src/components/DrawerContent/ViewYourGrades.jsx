import { useEffect, useState } from "react";
import {
  Box,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

const ViewYourGrades = () => {
  const userQuizzes = useSelector((state) => state.auth.user.quizzes);
  const [quizDetails, setQuizDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchQuizDetails = async () => {
      if (userQuizzes.length > 0) {
        try {
          const quizRequests = userQuizzes.map((quiz) =>
            axios.get(`http://localhost:3000/quiz/${quiz.quizId}`)
          );

          const responses = await Promise.all(quizRequests);
          const quizzesData = responses.map((res) => res.data.data);
          const detailedQuizzes = await Promise.all(
            quizzesData.map(async (quiz) => {
              const userQuiz = userQuizzes.find((q) => q.quizId === quiz._id);

              try {
                const response = await axios.get(
                  `http://localhost:3000/courses/${quiz.course}`
                );
                const courseData = response.data;
                return {
                  quizTitle: quiz.title,
                  courseTitle: courseData.title,
                  totalScore: userQuiz.totalScore,
                  questions: quiz.questions,
                };
              } catch (error) {
                console.error(error);
              }
            })
          );

          setQuizDetails(detailedQuizzes);
        } catch {
          setErr("Failed to fetch quiz details. Please try again.");
        }
      } else {
        setMessage("No quizzes found.");
      }
      setLoading(false);
    };

    fetchQuizDetails();
  }, [userQuizzes]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ padding: "20px" }}>
      {message && (
        <Alert severity="info" sx={{ width: "100%", mt: 2 }}>
          {message}
        </Alert>
      )}
      {err && (
        <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
          {err}
        </Alert>
      )}
      {quizDetails.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{
            width: { xs: "100%", sm: "fit-content", md: "900px" },
            marginTop: "20px",
          }}
        >
          <Table sx={{ backgroundColor: "secondary.light" }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.main" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Quiz Name
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Course
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Grade
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quizDetails.map((quiz, index) => {
                const maxScore = quiz.questions.reduce(
                  (acc, question) => acc + question.score,
                  0
                );
                return (
                  <TableRow key={index}>
                    <TableCell sx={{ color: "white" }}>
                      {quiz.quizTitle}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {quiz.courseTitle}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {quiz.totalScore}/{maxScore}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Alert severity="info">No quizzes available</Alert>
      )}
    </Box>
  );
};

export default ViewYourGrades;
