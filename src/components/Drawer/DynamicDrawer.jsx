import React from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Toolbar } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School'; //Icon for courses
import AddRoundedIcon from '@mui/icons-material/AddRounded';  //Icon for Add
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'; //Icon for Delete
import EditRoundedIcon from '@mui/icons-material/EditRounded'; //Icon for edit
import TuneSharpIcon from '@mui/icons-material/TuneSharp';
import { useSelector } from 'react-redux';

import { useTheme } from "@mui/material/styles";
import { ViewTimeline } from "@mui/icons-material";

const Drawer = ({ activeTab, setActiveTab }) => {
  const user = useSelector((state) => state.auth.user);
  let userRole;
  let userName;
  if (user) {
    userRole = user.role;
    userName = user.name;
    console.log(user, userRole, userName)
  } else {
    userRole = "";
    userName = "";

  }
  const theme = useTheme();
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  return (
    <>
      <Toolbar />
      <Box sx={{ padding: "0", textAlign: "center" }}>
        <img src="https://via.placeholder.com/140" alt="Profile" style={{
          borderRadius: "50%",
          width: "300px",
          height: "300px",
          border: `15px solid ${theme.palette.secondary.main}`,
          marginTop: "0",
          marginBottom: "0",
        }} />
        <Typography variant="h6">Welcome, {capitalizeFirstLetter(userName)}</Typography>
        <Typography variant="body2">{capitalizeFirstLetter(userRole)}</Typography>
      </Box>
      <List>
        {/* Global Profile Tab */}
        <ListItem button onClick={() => setActiveTab("profile")} sx={{ backgroundColor: activeTab === "profile" ? "secondary.main" : "inherit" }}>
          <ListItemIcon>
            <PersonIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Your Profile" />
        </ListItem>

        {/* Admin and Professor Settings Tab */}
        {(userRole === "student" || userRole === "professor") && (
          <ListItem button onClick={() => setActiveTab("settings")} sx={{ backgroundColor: activeTab === "settings" ? "secondary.main" : "inherit" }}>
            <ListItemIcon>
              <TuneSharpIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        )}

        {/* Additional Admin-only Tab Example */}
        {userRole === "admin" && (
          <ListItem button onClick={() => setActiveTab("add new user")} sx={{ backgroundColor: activeTab === "add new user" ? "secondary.main" : "inherit" }}>
            <ListItemIcon>
              <AddRoundedIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Add new user" />
          </ListItem>
        )}
        {userRole === "admin" && (
          <ListItem button onClick={() => setActiveTab("view all users")} sx={{ backgroundColor: activeTab === "view all users" ? "secondary.main" : "inherit" }}>
            <ListItemIcon>
              <PersonIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="View all users" />
          </ListItem>
        )}
        {userRole === "admin" && (
          <ListItem button onClick={() => setActiveTab("add new course")} sx={{ backgroundColor: activeTab === "add new course" ? "secondary.main" : "inherit" }}>
            <ListItemIcon>
              <SchoolIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Add new course" />
          </ListItem>
        )}
        {(userRole === "admin" || userRole === "professor") && (
          <ListItem button onClick={() => setActiveTab("add new quiz")} sx={{ backgroundColor: activeTab === "add new quiz" ? "secondary.main" : "inherit" }}>
            <ListItemIcon>
              <PersonIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Add new Quiz" />
          </ListItem>
        )}
        {( userRole === "professor") && (
          <ListItem button onClick={() => setActiveTab("add new Content")} sx={{ backgroundColor: activeTab === "add new Content" ? "secondary.main" : "inherit" }}>
            <ListItemIcon>
              <SchoolIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Add New Content" />
          </ListItem>
        )}
        {( userRole === "professor") && (
          <ListItem button onClick={() => setActiveTab("view all Courses")} sx={{ backgroundColor: activeTab === "view all Courses" ? "secondary.main" : "inherit" }}>
            <ListItemIcon>
              <ViewTimeline sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="View All Courses" />
          </ListItem>
        )}
        {( userRole === "professor") && (
          <ListItem button onClick={() => setActiveTab("view students")} sx={{ backgroundColor: activeTab === "view students" ? "secondary.main" : "inherit" }}>
            <ListItemIcon>
              <ViewTimeline sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="View Students" />
          </ListItem>
        )}

        {( userRole === "admin") && (
          <ListItem button onClick={() => setActiveTab("View All Courses In Admin")} sx={{ backgroundColor: activeTab === "View All Courses" ? "secondary.main" : "inherit" }}>
            <ListItemIcon>
              <ViewTimeline sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="View All Courses" />
          </ListItem>
        )}
        {( userRole === "student") && (
          <ListItem button onClick={() => setActiveTab("View your Courses In Student")} sx={{ backgroundColor: activeTab === "View your Courses In Student" ? "secondary.main" : "inherit" }}>
            <ListItemIcon>
              <ViewTimeline sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="View your courses" />
          </ListItem>
        )}
        {( userRole === "student") && (
          <ListItem button onClick={() => setActiveTab("View your Grades")} sx={{ backgroundColor: activeTab === "View your Grades" ? "secondary.main" : "inherit" }}>
            <ListItemIcon>
              <PersonIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary=" Your Grades" />
          </ListItem>
        )}
      </List>
    </>
  );
};

export default Drawer;

