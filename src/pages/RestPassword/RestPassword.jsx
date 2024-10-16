import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Alert, Container, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; 
import bg from '../../assets/images/SignIn-BG.png'; 
import { inputStyles as acinput } from '../../theme';
import axiosInstance from '../../axiosConfig';

const ResetPassword = () => {
    const { token } = useParams();
    const [showPassword, setShowPassword] = React.useState(false); 
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false); 
    const [success, setSuccess] = React.useState('');
    const [error, setError] = React.useState('');

    // Initialize React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axiosInstance.post(`/users/reset-password/${token}`, {
                password: data.newPassword, 
            });
            setSuccess(response.data.message);
            setError(''); 
        } catch (err) {
            setError('Failed to reset password. Please try again.');
            console.error(err);
        }
    };

    return (
        <>
    {acinput}
        <Box
            sx={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: 3,
                        color: 'white',
                        backgroundColor: 'secondary.main',
                    }}
                >
                    <Typography component="h1" variant="h5" align="center" sx={{ mb: 3 }}>
                        Reset Password
                    </Typography>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="New Password"
                            type={showPassword ? 'text' : 'password'}
                            {...register('newPassword', { 
                                required: 'Please enter a password.' 
                            })} 
                            fullWidth
                            sx={{ mb: 2 }}
                            error={!!errors.newPassword} 
                            helperText={errors.newPassword?.message} 
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)} 
                                            edge="end"
                                            sx={{ color: 'white' }} 
                                        >
                                            {showPassword ? <VisibilityOff sx={{ color: 'white' }} /> : <Visibility sx={{ color: 'white' }} />} {/* Show/hide icon */}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="Confirm Password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            {...register('confirmPassword', { 
                                required: 'Please confirm your password.',
                                validate: (value) => value === watch('newPassword') || 'Passwords do not match.'
                            })} 
                            fullWidth
                            sx={{ mb: 2 }}
                            error={!!errors.confirmPassword} 
                            helperText={errors.confirmPassword?.message} 
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                                            edge="end"
                                            sx={{ color: 'white' }} 
                                        >
                                            {showConfirmPassword ? <VisibilityOff sx={{ color: 'white' }} /> : <Visibility sx={{ color: 'white' }} />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.dark' }}}
                        >
                            Reset Password
                        </Button>
                    </form>
                </Box>
            </Container>
        </Box>
        </>
    );
};

export default ResetPassword;
