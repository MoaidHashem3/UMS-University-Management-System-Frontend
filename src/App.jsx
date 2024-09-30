import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
<<<<<<< HEAD
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { createBrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import AppLayout from './AppLayout';
import { RouterProvider } from 'react-router-dom';
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
=======
import CssBaseline from '@mui/material/CssBaseline'; 
import theme from './theme'; 
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
>>>>>>> 3ff153da38d7ca2593bd6e1e7c5aa2ddacb03ca6
    </ThemeProvider>
  );
};

export default App;