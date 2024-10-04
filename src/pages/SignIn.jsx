import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import bg from '../assets/images/SignIn-BG.png'

const backgroundImageStyle = {
    position: 'absolute', 
    backgroundImage: `url(${bg})`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat', 
    height: '150vh', 
    width: '100vw',
    zIndex: -1, 

  };

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  };

  return (
    <Box sx={backgroundImageStyle} >
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: '30vh',
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
          Sign In
        </Typography>
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
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
           
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: 'primary' }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
    </Box>
  );
};

export default SignIn;
