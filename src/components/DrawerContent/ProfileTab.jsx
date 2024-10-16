import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from '../../redux/authSlice';
import { Box, TextField, Button, Typography, IconButton, InputAdornment } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { inputStyles as acinput } from "../../theme";
import axiosInstance from "../../axiosConfig";

const ProfileTab = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      oldPassword: "",
      newPassword: "",
    }
  });

  const [selectedImage, setSelectedImage] = useState(null); // Track the selected image
  const [updateSuccess, setUpdateSuccess] = useState(false); // State to manage success message
  const [passwordError, setPasswordError] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false); // State to toggle old password visibility
  const [showNewPassword, setShowNewPassword] = useState(false); // State to toggle new password visibility

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("image", file); // Update form data
      setSelectedImage(file); // Store the selected image
    }
  };

  // Toggle password visibility
  const handleToggleOldPasswordVisibility = () => setShowOldPassword(!showOldPassword);
  const handleToggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);

  // Submit form data to the backend
  const onSubmit = async (data) => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", data.name);
    formDataToSend.append("email", data.email);

    // Check if the user is trying to change the password
    if (data.newPassword) {
      try {
        const response = await axiosInstance.post(`/users/verify/${user.id}`, {
          password: data.oldPassword
        });
        if (response.data) {
          formDataToSend.append("newPassword", data.newPassword);
          setPasswordError(""); // Clear password error if password is correct
        } else {
          setPasswordError("Incorrect password. Please try again.");
          return;
        }
      } catch (error) {
        console.error("Error verifying password:", error);
        setPasswordError("Incorrect password. Please try again.");
        return;
      }
    }

    // Only append image if a new one is selected
    if (selectedImage) {
      formDataToSend.append("image", selectedImage);
    }

    try {
      const response = await axiosInstance.patch(`/users/${user.id}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      console.log("Profile updated:", response.data);
      
      const imagePath = response.data.data.image || user.image;
      const fullImageUrl = imagePath.startsWith('/')
        ? `${import.meta.env.VITE_API_URL}${imagePath}`
        : `${import.meta.env.VITE_API_URL}/${imagePath}`;

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

        {/* Old Password field */}
        <TextField
          label="Old Password"
          type={showOldPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("oldPassword", {
            minLength: { value: 6, message: "Password must be at least 6 characters" }
          })}
          error={!!errors.oldPassword || !!passwordError}
          helperText={passwordError || errors.oldPassword?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleToggleOldPasswordVisibility}>
                  {showOldPassword ? <VisibilityOff sx={{ color: "white" }} /> : <Visibility sx={{ color: "white" }} />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        {/* New Password field */}
        <TextField
          label="New Password"
          type={showNewPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("newPassword", {
            minLength: { value: 6, message: "Password must be at least 6 characters" }
          })}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleToggleNewPasswordVisibility}>
                  {showNewPassword ? <VisibilityOff sx={{ color: "white" }} /> : <Visibility sx={{ color: "white" }} />}
                </IconButton>
              </InputAdornment>
            )
          }}
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
