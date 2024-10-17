import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Button, MenuItem, Alert } from "@mui/material";
import { useForm } from 'react-hook-form';
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useSelector } from "react-redux";
import { inputStyles as acinput } from "../../theme";
import axiosInstance from "../../axiosConfig";


const AddCourseContent = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    // Fetch the courses created by the logged-in professor from the Redux store
    const courses = useSelector((state) => state.auth.user.createdCourses);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const onSubmit = async (data) => {
        if (!selectedFile) {
            setError("Please select a file to upload.");
            return;
        }

        console.log(data)

        try {
            const formData = new FormData();
            formData.append('title', data.name);
            formData.append('file', selectedFile);
            console.log(formData);
            const res = await axiosInstance.post(`/courses/uploadCourseContent/${data.course}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage("Content added successfully");
            setError("");
            reset();  // Reset the form fields
        } catch (err) {
            setError("Failed to add content. Please try again.");
        }
    };

    return (
        <>
        {acinput}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ padding: "16px", margin: "30px" }}>
            <Typography variant="h4" color="#fff" mb={2}>
                New Content
            </Typography>
            {message && <Alert severity="success" sx={{ width: '100%', mt: 2 }}>{message}</Alert>}
            {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}

            {/* Course Dropdown */}
            <TextField
                select
                label="Select Course"
                fullWidth
                margin="normal"
                {...register("course", { required: "Course is required" })}
                error={!!errors.course}
                helperText={errors.course ? errors.course.message : ''}
            >
                {courses? (
                    courses.map((course) => (
                        <MenuItem key={course._id} value={course._id}>
                            {course.title}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>No courses available</MenuItem>
                )}
            </TextField>

            {/* Content Name */}
            <TextField
                label="Content Name"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register('name', { required: "Content name is required" })}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
            />

            {/* File Upload */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Typography variant="body1">Upload PDF File</Typography>
                <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                >
                    Upload File
                    <input
                        type="file"
                        accept="application/pdf"
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>
            </Box>

            {errors.pdfFile && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    {errors.pdfFile.message}
                </Typography>
            )}

            <Button type="submit" variant="contained" sx={{ marginTop: "16px" }}>
                Add Content
            </Button>
        </Box>
        </>
    );
};

export default AddCourseContent;