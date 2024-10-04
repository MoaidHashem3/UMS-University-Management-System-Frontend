import React from "react";
import { Box, TextField, Button } from "@mui/material";

const ProfileTab = () => {
  return (
    <Box sx={{ padding: "16px"}}>
      <TextField label="Name" variant="outlined" fullWidth margin="normal" />
      <TextField label="Email" variant="outlined" fullWidth margin="normal" />
      <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" />
      <Button variant="contained" sx={{ marginTop: "16px" }}>Update</Button>
    </Box>
  );
};

export default ProfileTab;
