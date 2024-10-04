import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
// import Dashboard from './pages/Dashboard/Dashboard'
// import Quiz from './components/Quiz/QuizBox';
import { createBrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import AppLayout from './AppLayout';
import { RouterProvider } from 'react-router-dom';
import Courses from './pages/Courses/Courses';


const App = () => {
    const routes = createBrowserRouter([
        {
          path: "/", 
          element: <AppLayout />, 
          children: [
            { index: true, element: <Home />  },
            { path: 'signup', element: <SignUp /> },
            { path: 'login', element: <SignIn /> },
            { path: 'courses', element: <Courses /> },
          ]
        }
      ]);
    
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={routes} />
        </ThemeProvider>
      );
};

export default App;