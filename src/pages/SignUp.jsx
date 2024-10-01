import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import bg from "../assets/images/SignUp-BG.png";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const backgroundImageStyle = {
  position: "absolute",
  backgroundImage: `url(${bg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "100vh",
  width: "100vw",
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      clearErrors('image');
    }
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
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
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
              error={!!errors.username}
              helperText={errors.username ? errors.username.message : ""}
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
              type="password"
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
            />
                 <Box sx={{ display: 'flex', justifyContent: 'space-between',  alignItems: 'center', mt: 2 }}>
      
        <Typography
          variant="body1"
          color="white" 
        >
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
                {...register("image", { required: "Image is required" })}
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
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUp;