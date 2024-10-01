import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
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
    </ThemeProvider>
  );
};

export default App;