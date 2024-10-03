import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
// import Dashboard from './pages/Dashboard/Dashboard'
// import Quiz from './components/Quiz/QuizBox';
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import AppLayout from './AppLayout';
import { RouterProvider } from 'react-router-dom';
// import Courses from './pages/Courses/Courses';

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
      {/* <Courses/> */}
      <Home/>
    </ThemeProvider>
  );
};

export default App;