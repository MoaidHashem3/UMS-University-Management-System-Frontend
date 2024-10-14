import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Button, Alert, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useForm } from 'react-hook-form';
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";

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

const AddNewCourse = () => {
    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm({ mode: "onChange" });
    const [message, setMessage] = useState("");
    const [err, setErr] = useState("");
    const [filename, setFilename] = useState(null);
    const [professors, setProfessors] = useState([]); 
    const [selectedProfessor, setSelectedProfessor] = useState(""); 

    // Fetch professors from backend
    useEffect(() => {
        const fetchProfessors = async () => {
            try {
                const res = await axios.get("http://localhost:3000/users/professor"); 
                setProfessors(res.data.data); 
            } catch (error) {
                console.error("Error fetching professors", error);
            }
        };
        fetchProfessors();
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFilename(file.name);
            clearErrors("image");
        }
    };

    const Register = async (data) => {
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('major', data.major);
            formData.append('description', data.description);
            formData.append('duration', data.duration);
            formData.append('professor', selectedProfessor); 
            if (data.image[0]) {
                formData.append('image', data.image[0]);
            }
            const res = await axios.post("http://localhost:3000/courses", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
              });
            console.log(res.data);
            setMessage("Added Successfully");
        } catch (err) {
            setErr("Failed to be added, check fields and try again");
        }
    };

    return (
        <>
            {message && <Alert severity="success" sx={{ width: '100%', mt: 2 }}>{message}</Alert>}
            {err && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{err}</Alert>}
            <Box component="form" onSubmit={handleSubmit(Register)} sx={{ padding: "16px", margin: "30px" }}>
                <TextField name="title" label="Course Title" variant="outlined" fullWidth multiline margin="normal"
                    {...register('title', { required: "Title is required" })}
                    error={!!errors.title}
                    helperText={errors.title ? errors.title.message : ''}
                />
                <TextField name="major" label=" Major" variant="outlined" fullWidth margin="normal"
                    {...register('major', {
                        required: "major is required",
                    })}
                    error={!!errors.major}
                    helperText={errors.major ? errors.major.message : ''} />
                <TextField name="description" label=" Description" variant="outlined" fullWidth margin="normal"
                    {...register('description', {
                        required: "description is required",minLength: {
                            value: 20,
                            message: 'description must be at least 20 characters',
                        }
                    })}
                    error={!!errors.description}
                    helperText={errors.description ? errors.description.message : ''} />
                <TextField type="number" name="duration" label="Duration" variant="outlined" fullWidth margin="normal"
                    {...register('duration', {
                        required: "duration is required",max:{
                            value:30,
                            message:"maximum duration is 30 hours for each course"
                        }
                    })} error={!!errors.duration}
                    helperText={errors.duration ? errors.duration.message : ''} />

                {/* Dropdown for selecting professor */}
                <FormControl fullWidth margin="normal">
                    <InputLabel>Professor</InputLabel>
                    <Select
                        value={selectedProfessor}
                        onChange={(e) => setSelectedProfessor(e.target.value)} 
                        error={!!errors.professor}
                    >
                        {professors.map((prof) => (
                            <MenuItem key={prof._id} value={prof._id}>
                                {prof.name}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.professor && <Typography variant="body2" color="error">{errors.professor.message}</Typography>}
                </FormControl>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="body1" color="white">
                        Course Image
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

                <Button type="submit" variant="contained" size="30px" sx={{ marginTop: "16px" }}>
                    Add Course
                </Button>
            </Box>
        </>
    );
};

export default AddNewCourse;
