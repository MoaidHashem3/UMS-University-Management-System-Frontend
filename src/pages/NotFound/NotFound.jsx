import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ErrorIcon from '@mui/icons-material/Error';

const NotFound = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.main,
      }}
    >
      <ErrorIcon sx={{color:"warning.main", fontSize:100}}/>
      <Typography variant="h1" component="h1" sx={{color:'white'}} >
        404
      </Typography>
      <Typography variant="h4" component="h2" sx={{ mb: 2, color:'white'}}>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color:'white'}}>
        Oops! The page you are looking for doesn’t exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoBack}
      >
        Go to Homepage
      </Button>
    </Box>
  );
};

export default NotFound;
