import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from '../../redux/authSlice';
import { Box, TextField, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { inputStyles as acinput } from "../../theme";

const ProfileTab = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: "",
    }
  });

  const [selectedImage, setSelectedImage] = useState(null); // Track the selected image
  const [updateSuccess, setUpdateSuccess] = useState(false); // State to manage success message

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("image", file); // Update form data
      setSelectedImage(file); // Store the selected image
    }
  };

  // Submit form data to the backend
  const onSubmit = async (data) => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", data.name);
    formDataToSend.append("email", data.email);

    // Only append password if it's updated
    if (data.password) {
      formDataToSend.append("password", data.password);
    }

    // Only append image if a new one is selected
    if (selectedImage) {
      formDataToSend.append("image", selectedImage);
    }

    try {
      const response = await axios.patch(`http://localhost:3000/users/${user.id}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      console.log("Profile updated:", response.data);

      const imagePath = response.data.data.image || user.image;
      const fullImageUrl = imagePath.startsWith('/')
        ? `http://localhost:3000${imagePath}`
        : `http://localhost:3000/${imagePath}`;

      // Update Redux store with new user data
      dispatch(updateUser({ ...response.data.data, image: fullImageUrl }));

      // Reset selectedImage state after a successful upload
      setSelectedImage(null);
      setUpdateSuccess(true); // Set success state to true
    } catch (error) {
      console.error("Error updating profile:", error);
      setUpdateSuccess(false); // In case of error, reset success state
    }
  };

  // Update user data in the form if user object changes
  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
    }
  }, [user, setValue]);

  return (
    <>
      {acinput}
      <Box sx={{ padding: "16px" }}>
        <Typography variant="h4">Edit Profile</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name field */}
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          {/* Email field */}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address"
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          {/* Password field */}
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("password", {
              minLength: { value: 6, message: "Password must be at least 6 characters" }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          {/* Image upload */}
          <Box sx={{ marginTop: 2, marginBottom: 2 }}>
            <Typography>Profile Picture</Typography>
            <Button variant="contained" component="label">
              Upload Image
              <input type="file" hidden {...register("image")} onChange={handleImageChange} />
            </Button>
          </Box>

          {/* Submit button */}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save Changes
          </Button>
        </form>

        {/* Success message */}
        {updateSuccess && (
          <Typography variant="body1" color="success.main" sx={{ marginTop: 2 }}>
            Profile updated successfully!
          </Typography>
        )}
      </Box>
    </>
  );
};

export default ProfileTab;
