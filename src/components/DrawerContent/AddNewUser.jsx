import React, { useState } from "react";
import { Box, TextField, Button, Alert, Typography } from "@mui/material";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { inputStyles as acinput } from "../../theme";

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

const AddNewUser = () => {
    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm({ mode: "onChange" });
    const [message, setmessage] = useState("")
    const [err, seterr] = useState("")
    const [filename, setfilename] = useState(null)
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setfilename(file.name);
            clearErrors("image");
        }
    };


    const Register = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('role', data.role);

        formData.append('email', data.email);
        formData.append('password', data.password);
        if (data.image[0]) {
            formData.append('image', data.image[0]);
        }

        try {
            console.log(data)
            const res = await axios.post("http://localhost:3000/users/register", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            setmessage("Added Successfully")
        } catch (err) {
            seterr("Failed to register, check fields and try again ")
        }

    }

    return <>
        {acinput}
        {message && <Alert severity="success" sx={{ width: '100%', mt: 2 }}>{message}</Alert>}
        {err && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{err}</Alert>}
        <Box component="form" onSubmit={handleSubmit(Register)} sx={{ padding: "16px", margin: "30px" }}>
            <TextField name="name" label="Name" variant="outlined" fullWidth multiline margin="normal"
                {...register('name', { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
            />
            <TextField name="role" label=" User Role" variant="outlined" fullWidth margin="normal"
                {...register('role', {
                    required: "role is required",
                    validate: (value) => {
                        if (value !== "admin" && value !== "student" && value !== "professor") {
                            return "Role must be admin or student or professor"
                        }
                    }
                })}
                error={!!errors.role}
                helperText={errors.role ? errors.role.message : ''} />
            <TextField name="email" label="Email Address" variant="outlined" fullWidth margin="normal"
                {...register('email',
                    {
                        required: "Email is required",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Enter a valid email address',
                        }
                    })} error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''} />
            <TextField name="password" autoComplete="current-password" label="Password" type="password" variant="outlined" fullWidth margin="normal"
                {...register("password", {
                    required: "password is required", minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                    }
                })}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""} />
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

                    {filename && (
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
                            {filename}
                        </Typography>
                    )}
                </Box>
            </Box>

            {errors.image && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    {errors.image.message}
                </Typography>
            )}

            <Button type="submit" variant="contained" size="30px" sx={{ marginTop: "16px" }}>Add User</Button>
        </Box>
    </>
};

export default AddNewUser;