import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp'
import { createBrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import AppLayout from './AppLayout';
import { RouterProvider } from 'react-router-dom';
// import Courses from './pages/Courses/Courses';

const App = () => {
  const routes = createBrowserRouter([{
    path: "/", element: <AppLayout></AppLayout>, children: [
      { index: true, element: <Home /> }
    ]
  }])
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={routes}></RouterProvider>
      <CssBaseline />
      {/* <SignUp/> */}
      {/* <Courses/> */}
    </ThemeProvider>
  );
};

export default App;