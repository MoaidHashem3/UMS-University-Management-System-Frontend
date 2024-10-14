import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Alert, Container, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Import Material-UI icons
import bg from '../../assets/images/SignIn-BG.png'; // Import your background image

const ResetPassword = () => {
    const { token } = useParams();
    const [showPassword, setShowPassword] = React.useState(false); // State for password visibility
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false); // State for confirm password visibility
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
            const response = await axios.post(`http://localhost:3000/users/reset-password/${token}`, {
                password: data.newPassword, // Ensure the password is sent correctly
            });
            setSuccess(response.data.message);
            setError(''); // Clear any previous error messages
        } catch (err) {
            setError('Failed to reset password. Please try again.');
            console.error(err);
        }
    };

    return (
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
                            type={showPassword ? 'text' : 'password'} // Toggle password visibility
                            {...register('newPassword', { 
                                required: 'Please enter a password.' 
                            })} // Register input with validation
                            fullWidth
                            sx={{ mb: 2 }}
                            error={!!errors.newPassword} // Show error state
                            helperText={errors.newPassword?.message} // Show error message
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                                            edge="end"
                                            sx={{ color: 'white' }} // Change icon color to white
                                        >
                                            {showPassword ? <VisibilityOff sx={{ color: 'white' }} /> : <Visibility sx={{ color: 'white' }} />} {/* Show/hide icon */}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="Confirm Password"
                            type={showConfirmPassword ? 'text' : 'password'} // Toggle confirm password visibility
                            {...register('confirmPassword', { 
                                required: 'Please confirm your password.',
                                validate: (value) => value === watch('newPassword') || 'Passwords do not match.' // Validate against newPassword
                            })} // Register confirm password input with validation
                            fullWidth
                            sx={{ mb: 2 }}
                            error={!!errors.confirmPassword} // Show error state
                            helperText={errors.confirmPassword?.message} // Show error message
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle showConfirmPassword state
                                            edge="end"
                                            sx={{ color: 'white' }} // Change icon color to white
                                        >
                                            {showConfirmPassword ? <VisibilityOff sx={{ color: 'white' }} /> : <Visibility sx={{ color: 'white' }} />} {/* Show/hide icon */}
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
    );
};

export default ResetPassword;
