import React from "react";
import { useSelector } from "react-redux";
import { Box, TextField, Button,Typography } from "@mui/material";

const ProfileTab = () => {
  const user = useSelector((state) => state.auth.user);
  let userRole;
  let userName;
  if (user) {
    userRole = user.role;
    userName = user.name;
    console.log(user,userRole, userName)
  } else {
    userRole = "";
    userName = "";

  }
  return (
    <Box sx={{ padding: "16px"}}>
      <Typography  variant="h5"> Name : {userName}</Typography>
      <Typography  variant="h5">Role : {userRole}</Typography>
      {/* <TextField label="Name" variant="outlined" fullWidth  margin="normal" />
      <TextField label="User Role" variant="outlined" fullWidth  margin="normal" />
      <TextField label="Email" variant="outlined" fullWidth margin="normal" />
      <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" /> */}
    </Box>
  );
};

export default ProfileTab;
