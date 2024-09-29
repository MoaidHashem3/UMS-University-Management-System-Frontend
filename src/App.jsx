import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; 
import theme from './theme'; 
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
    </ThemeProvider>
  );
};

export default App;