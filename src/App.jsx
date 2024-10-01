import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; 
import theme from './theme'; 
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp'
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <SignUp/> */}
    
    </ThemeProvider>
  );
};

export default App;