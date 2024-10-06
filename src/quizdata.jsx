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