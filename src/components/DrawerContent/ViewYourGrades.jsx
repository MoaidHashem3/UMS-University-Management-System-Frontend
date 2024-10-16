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
import axiosInstance from "../../axiosConfig";

const ViewYourGrades = () => {
  const user = useSelector((state) => state.auth.user);
  const [quizDetails, setQuizDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await axiosInstance.get(`/users/quizzes/${user.id}`);
        
        const quizzesData = response.data.quizzes; 
        const detailedQuizzes = quizzesData.map((quiz) => ({
          quizTitle: quiz.quizTitle,        
          courseTitle: quiz.courseTitle,
          totalScore: quiz.score,         
          questionCount: quiz.total 
        }));
        setQuizDetails(detailedQuizzes);
      } catch (error) {
        setErr("Failed to fetch quiz details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchQuizDetails();
  }, [user.id]);
  

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
                return (
                  <TableRow key={index}>
                    <TableCell sx={{ color: "white" }}>
                      {quiz.quizTitle}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {quiz.courseTitle}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {quiz.totalScore}/{quiz.questionCount}
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
