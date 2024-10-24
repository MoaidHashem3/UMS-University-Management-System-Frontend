import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Container, Alert, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bg from '../../assets/images/SignIn-BG.png';
import { handleLogin } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import { inputStyles as acinput } from '../../theme';

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

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [loading, setLoading] = useState(false); // Loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true); // Start loading
    try {
      setLoginError('');
      const response = await handleLogin(data);
      const { token, user } = response; 
      dispatch(login({ token, user }));
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setLoginError('Wrong credentials. Please try again.');
      } else {
        setLoginError('An error occurred. Please try again later.');
      }
      console.error('Login failed:', error.response ? error.response.data : error.message);
    }
    setLoading(false); // Stop loading
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {acinput}
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
              Sign In
            </Typography>

            {loginError && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{loginError}</Alert>}

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
                type={showPassword ? 'text' : 'password'} 
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                        sx={{ color: 'white' }} 
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: 'primary' }}
                disabled={loading} // Disable the button while loading
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate('/forgot-password')}
                sx={{ mb: 2 }}
              >
                Forgot Password?
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SignIn;