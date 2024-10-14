import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Container, Alert } from '@mui/material';
import bg from '../../assets/images/SignIn-BG.png';
import { handleForgotPassword } from '../../utils/auth'; // Assume this method is implemented
import { useNavigate } from 'react-router-dom';

const backgroundImageStyle = {
  position: 'absolute',
  backgroundImage: `url(${bg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  height: '100vh',
  width: "100%",
  zIndex: -1,
};

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setMessage('');
      setError('');
      await handleForgotPassword(data.email); // Your API call to send the reset email
      setMessage('Password reset email sent! Check your inbox.');
    } catch (error) {
      setError('An error occurred. Please try again later.');
      console.error('Error sending reset email:', error);
    }
  };

  return (
    <Box sx={backgroundImageStyle}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: '10vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'secondary.main',
            padding: 4,
            paddingTop: 7,
            borderRadius: 7,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            color: 'white',
            justifyContent: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>

          {message && <Alert severity="success" sx={{ width: '100%', mt: 2 }}>{message}</Alert>}
          {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Enter a valid email address',
                },
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: 'primary' }}
            >
              Send Reset Link
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate('/login')}
              sx={{ mb: 2 }}
            >
              Back to Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ForgotPassword;