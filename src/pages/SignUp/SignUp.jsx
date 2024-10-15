import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import { TextField, Button, Box, Typography, Container, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import bg from "../../assets/images/SignUp-BG.png";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from 'axios'; 
import { inputStyles as acinput } from "../../theme";

const backgroundImageStyle = {
    position: "absolute",
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "110vh",
    width: "100%",
    zIndex: -1,
};

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm();
    const [fileName, setFileName] = useState(null);
    const [message, setMessage] = useState("");  
    const [messageType, setMessageType] = useState(""); 
    const [showPassword, setShowPassword] = useState(false); // State for password visibility

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            clearErrors("image");
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('name', data.name); 
            formData.append('email', data.email);
            formData.append('password', data.password);
            if (data.image[0]) {
                formData.append('image', data.image[0]); 
            }

            const response = await axios.post('http://localhost:3000/users/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
            });

            // Set success message
            setMessage("Registration successful!");
            setMessageType("success");
            console.log("Response:", response.data); 
        } catch (error) {
            console.error("Error submitting the form:", error.response ? error.response.data : error.message);
            
            if (error.response && error.response.status === 409) {
                setMessage("Email is already taken.");
                setMessageType("error");
            } else {
                setMessage("An error occurred. Please try again.");
                setMessageType("error");
            }
        }
    };

    return (
        <>
        {acinput}
        <Box sx={backgroundImageStyle}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: "10vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundColor: "secondary.main",
                        padding: 4,
                        paddingTop: 7,
                        borderRadius: 7,
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        color: "white",
                        justifyContent: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="name"
                            label="Username"
                            name="name"
                            autoComplete="username"
                            autoFocus
                            {...register("name", {
                                required: "Username is required",
                                minLength: {
                                    value: 3,
                                    message: "Username must be at least 3 characters",
                                },
                            })}
                            error={!!errors.name}
                            helperText={errors.name ? errors.name.message : ""}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Enter a valid email address",
                                },
                            })}
                            error={!!errors.email}
                            helperText={errors.email ? errors.email.message : ""}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? "text" : "password"} // Toggle between text and password
                            id="password"
                            autoComplete="current-password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                            error={!!errors.password}
                            helperText={errors.password ? errors.password.message : ""}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                            sx={{ color: 'white' }} // Set icon color to white
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                            <Typography variant="body1" color="white">
                                Profile Picture
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload image
                                    <VisuallyHiddenInput
                                        type="file"
                                        accept="image/*"
                                        {...register("image")}
                                        onChange={handleFileChange}
                                    />
                                </Button>

                                {fileName && (
                                    <Typography
                                        variant="body2"
                                        color="white"
                                        sx={{
                                            maxWidth: "150px",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            mt: 1,
                                        }}
                                    >
                                        {fileName}
                                    </Typography>
                                )}
                            </Box>
                        </Box>

                        {errors.image && (
                            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                {errors.image.message}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: "primary.main" }}
                        >
                            Create a new account
                        </Button>

                        {message && (
                            <Typography variant="body2" color={messageType === "success" ? "success.main" : "error.main"} sx={{ mt: 2 }}>
                                {message}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Container>
        </Box>
        </>
    );
};

export default SignUp;
