import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import Dashboard from './pages/Dashboard/Dashboard'
import Quiz from './components/Quiz/QuizBox';
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import AppLayout from './AppLayout';
import { RouterProvider } from 'react-router-dom';
const quizName = "MERN Stack Quiz"; // Can be dynamically set
const duration = 0.2; // Duration in minutes
const quizData = [
  {
      question: "What does HTML stand for?",
      answers: [
          "Hyper Text Markup Language",
          "High Text Markup Language",
          "Hyper Tabular Markup Language",
          "None of these"
      ],
      correctAnswer: 0 // index of the correct answer
  },
  {
      question: "Which language is used for styling web pages?",
      answers: [
          "HTML",
          "CSS",
          "JavaScript",
          "XML"
      ],
      correctAnswer: 1
  },
  {
      question: "Which HTML element is used to define the title of a document?",
      answers: [
          "<title>",
          "<head>",
          "<meta>",
          "<h1>"
      ],
      correctAnswer: 0
  },
  {
      question: "What does CSS stand for?",
      answers: [
          "Creative Style Sheets",
          "Cascading Style Sheets",
          "Computer Style Sheets",
          "Colorful Style Sheets"
      ],
      correctAnswer: 1
  },
  {
      question: "Which company developed JavaScript?",
      answers: [
          "Netscape",
          "Bell Labs",
          "Sun Microsystems",
          "IBM"
      ],
      correctAnswer: 0
  },
  {
      question: "What is the correct syntax for referring to an external script called 'script.js'?",
      answers: [
          "<script src='script.js'>",
          "<script href='script.js'>",
          "<script name='script.js'>",
          "<script file='script.js'>"
      ],
      correctAnswer: 0
  },
  {
      question: "Which symbol is used to define comments in JavaScript?",
      answers: [
          "// comment",
          "# comment",
          "<!-- comment -->",
          "/* comment */"
      ],
      correctAnswer: 0
  },
  {
      question: "What is the output of 2 + '2' in JavaScript?",
      answers: [
          "22",
          "4",
          "undefined",
          "Error"
      ],
      correctAnswer: 0
  },
  {
      question: "Which of the following is not a JavaScript data type?",
      answers: [
          "Undefined",
          "Boolean",
          "Number",
          "Float"
      ],
      correctAnswer: 3
  },
  {
      question: "Which of the following is used to create a function in JavaScript?",
      answers: [
          "function myFunction()",
          "function = myFunction()",
          "function:myFunction()",
          "myFunction() = function"
      ],
      correctAnswer: 0
  },
];

const App = () => {
  const routes = createBrowserRouter([{
    path: "/", element: <AppLayout></AppLayout>, children: [
      // { index: true, element: <Dashboard userRole={"Admin"} /> }
    ]

  }])
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={routes}></RouterProvider>
      <CssBaseline />
      {/* <Quiz quizName={quizName} duration={duration} questions={quizData} /> */}
      <Home/>
    </ThemeProvider>
  );
};

export default App;