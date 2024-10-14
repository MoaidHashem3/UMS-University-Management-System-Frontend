import React, { useState } from "react";
import { inputStyles as acinput } from "../../theme";

import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Alert,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

const AddQuiz = () => {
  const [quizDetails, setQuizDetails] = useState({
    course: "",
    title: "", 
    description: "",
    timeLimit: "",
    questions: [],
  });
  const [currentQuestion, setCurrentQuestion] = useState({
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: "", 
  });
  const [error, setError] = useState({}); 
  const [successMessage, setSuccessMessage] = useState("");
  
  const courses = useSelector((state) => state.auth.user.createdCourses);
console.log(courses);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizDetails({ ...quizDetails, [name]: value });
    setError({ ...error, [name]: undefined });
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    if (name === "questionText") {
      setCurrentQuestion({ ...currentQuestion, questionText: value });
    } else {
      const updatedOptions = [...currentQuestion.options];
      updatedOptions[name] = value;
      setCurrentQuestion({ ...currentQuestion, options: updatedOptions });
    }
    setError({ ...error, [name]: undefined });
  };

  const handleCorrectAnswerChange = (e) => {
    setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value });
    setError({ ...error, correctAnswer: undefined });
  };

  const addQuestion = () => {
    if (
      !currentQuestion.questionText ||
      currentQuestion.correctAnswer === "" ||
      currentQuestion.options.some((option) => option.trim() === "")
    ) {
      setError({
        questionText: !currentQuestion.questionText
          ? "Question is required."
          : undefined,
        correctAnswer:
          currentQuestion.correctAnswer === ""
            ? "Correct answer is required."
            : undefined,
        options: currentQuestion.options.map((option, index) =>
          option.trim() === "" ? `Option ${index + 1} is required.` : undefined
        ),
      });
      return;
    }

    setQuizDetails({
      ...quizDetails,
      questions: [...quizDetails.questions, currentQuestion],
    });
    setCurrentQuestion({
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    });
  };

  const submitQuiz = async () => {
    if (
      !quizDetails.title ||
      !quizDetails.description ||
      !quizDetails.course ||
      !quizDetails.timeLimit ||
      quizDetails.questions.length === 0
    ) {
      setError({
        title: !quizDetails.title ? "Quiz title is required." : undefined, 
        description: !quizDetails.description
          ? "Description is required."
          : undefined,
        course: !quizDetails.course ? "Course is required." : undefined,
        timeLimit: !quizDetails.timeLimit
          ? "Time limit is required."
          : undefined,
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/quiz/",
        quizDetails
      );
      console.log("Quiz submitted successfully:", response.data);
      await axios.patch(`http://localhost:3000/courses/${quizDetails.course}`, {
        quizId: response.data.quiz._id
      });
      setSuccessMessage("Quiz submitted successfully!"); 
      setQuizDetails({
        course: "",
        title: "", 
        description: "",
        timeLimit: "",
        questions: [],
      });
      setCurrentQuestion({
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      });
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  return (
    <>
    {acinput}
    <Box sx={{ padding: "16px", borderRadius: "8px" }}>
      <Typography variant="h4" color="#fff" mb={2}>
        New Quiz
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <Box display="flex" flexDirection="row" flexWrap="wrap" mb={2}>
        <Box width="50%" pr={1}>
          <FormControl fullWidth sx={{ my: 1 }}>
            <InputLabel sx={{ color: "#fff" }}>Course Name</InputLabel>
            <Select
              name="course"
              label="Course Name"
              value={quizDetails.course}
              onChange={handleInputChange}
              sx={{ color: "black" }}
              error={!!error.course}
            >
              <MenuItem value="">
                <em>Select Course</em>
              </MenuItem>
              {courses &&
                courses.map((course) => (
                  <MenuItem key={course._id} value={course._id}>
                    {course.title}
                  </MenuItem>
                ))}
            </Select>
            {error.course && (
              <Typography variant="caption" color="error">
                {error.course}
              </Typography>
            )}
          </FormControl>
        </Box>

        <Box width="50%" pr={1}>
          <TextField
            name="title" 
            label="Quiz Title"
            value={quizDetails.title}
            onChange={handleInputChange}
            fullWidth
            sx={{ my: 1 }}
            error={!!error.title}
            helperText={error.title}
          />
        </Box>

        <Box width="50%" pr={1}>
          <TextField
            name="description"
            label="Description"
            value={quizDetails.description}
            onChange={handleInputChange}
            fullWidth
            sx={{ my: 1 }}
            error={!!error.description}
            helperText={error.description}
          />
        </Box>

        <Box width="50%" pr={1}>
          <TextField
            name="timeLimit"
            label="Time Limit (in minutes)"
            value={quizDetails.timeLimit}
            onChange={(e) => {
              if (e.target.value >= 0) {
                handleInputChange(e);
              }
            }}
            type="number"
            fullWidth
            sx={{ my: 1 }}
            error={!!error.timeLimit}
            helperText={error.timeLimit}
          />
        </Box>
      </Box>

      <Typography variant="h5" color="#fff" mb={2}>
        Questions
      </Typography>

      <Box mb={2}>
        <TextField
          name="questionText"
          label="Question"
          value={currentQuestion.questionText}
          onChange={handleQuestionChange}
          fullWidth
          sx={{ my: 1 }}
          error={!!error.questionText}
          helperText={error.questionText}
        />
      </Box>

      <Typography variant="subtitle1" color="#fff" mb={1}>
        Options
      </Typography>
      <Box display="flex" flexWrap="wrap" mb={2}>
        {currentQuestion.options.map((option, index) => (
          <Box display="flex" width="50%" pr={1} key={index}>
            <TextField
              name={index}
              label={`Option ${index + 1}`}
              value={option}
              onChange={handleQuestionChange}
              fullWidth
              sx={{ my: 1 }}
              error={!!(error.options && error.options[index])}
              helperText={error.options && error.options[index]}
            />
          </Box>
        ))}
      </Box>

      <Box mb={2}>
        <FormControl fullWidth sx={{ my: 1 }}>
          <InputLabel sx={{ color: "#fff" }}>Correct Answer</InputLabel>
          <Select
            value={currentQuestion.correctAnswer}
            label="Correct Answer"
            onChange={handleCorrectAnswerChange}
            fullWidth
            sx={{ color: "black" }}
            error={!!error.correctAnswer}
          >
            <MenuItem value="">
              <em>Select Correct Answer</em>
            </MenuItem>
            {currentQuestion.options.map((option, index) => (
              <MenuItem key={index} value={index}>{`Option ${
                index + 1
              }`}</MenuItem> 
            ))}
          </Select>
          {error.correctAnswer && (
            <Typography variant="caption" color="error">
              {error.correctAnswer}
            </Typography>
          )}
        </FormControl>
      </Box>

      <Button
        variant="contained"
        onClick={addQuestion}
        sx={{ backgroundColor: "primary.main", marginRight: 1 }}
      >
        Add Question
      </Button>

      <Button
        variant="contained"
        onClick={submitQuiz}
        sx={{ backgroundColor: "success.main" }}
      >
        Submit
      </Button>

      <Box mt={3}>
        {quizDetails.questions.length > 0 && (
          <Box mb={2}>
            <Typography variant="h6" color="#fff">{`Last Added Question: ${
              quizDetails.questions[quizDetails.questions.length - 1]
                .questionText
            }`}</Typography>
            {quizDetails.questions[
              quizDetails.questions.length - 1
            ].options.map((opt, i) => (
              <Typography
                key={i}
                variant="body2"
                color="#fff"
              >{`Option ${i + 1}: ${opt}`}</Typography>
            ))}
            <Typography
              variant="body2"
              color="success.main"
            >{`Correct Answer: Option ${
              parseInt(
                quizDetails.questions[quizDetails.questions.length - 1]
                  .correctAnswer
              ) + 1
            }`}</Typography>
          </Box>
        )}
      </Box>
    </Box>
    </>
  );
};

export default AddQuiz;
