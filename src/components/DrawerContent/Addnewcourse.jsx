import React, { useState } from "react";
import { Box, TextField, Typography,Button, Alert } from "@mui/material";
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
        try {
            const formData = new FormData();
            formData.append('title', data.title); 
            formData.append('major', data.major);
            formData.append('description', data.description);
            formData.append('duration', data.duration);
            formData.append('professor', data.professor);
            if (data.image[0]) {
              formData.append('image', data.image[0]); 
            }
            const res = await axios.post("http://localhost:3000/courses", formData,{
                headers: {
                  'Content-Type': 'multipart/form-data', 
                },
              })
            console.log(res.data)
            setmessage("Added Successfully")
        } catch (err) {
            seterr("Failed to be added, check fields and try again ")
        }

    }

    return <>
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
                    required: "description is required",

                })}
                error={!!errors.description}
                helperText={errors.description ? errors.description.message : ''} />
            <TextField type="number" name="duration" label="Duration" variant="outlined" fullWidth margin="normal"
                {...register('duration',
                    {
                        required: "duration is required",

                    })} error={!!errors.duration}
                helperText={errors.duration ? errors.duration.message : ''} />
            <TextField name="professor" label="Professor" variant="outlined" fullWidth margin="normal"
                {...register("professor", {
                    required: "professor is required",
                })}
                error={!!errors.professor}
                helperText={errors.professor ? errors.professor.message : ""} />
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
            <Button type="submit" variant="contained" size="30px" sx={{ marginTop: "16px" }}>Add Course</Button>
        </Box>
    </>
};

export default AddNewCourse;