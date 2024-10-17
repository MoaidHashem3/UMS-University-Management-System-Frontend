import React, { useState } from "react";
import { Outlet } from 'react-router-dom';
import { Box, Drawer, AppBar, Toolbar, IconButton, useMediaQuery, useTheme, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DynamicDrawer from '../../components/Drawer/DynamicDrawer';
import ProfileTab from '../../components/DrawerContent/ProfileTab';
import SettingsTab from '../../components/DrawerContent/SettingsTab';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import AddNewUser from "../../components/DrawerContent/AddNewUser";
import ViewAllUsers from "../../components/DrawerContent/Viewallusers";
import AddNewCourse from "../../components/DrawerContent/Addnewcourse";
import AddQuiz from "../../components/DrawerContent/AddQuiz";
import EditUser from "../../components/DrawerContent/EditUser";
import AddCourseContent from "../../components/DrawerContent/AddNewContent";
import ViewAllCourses from "../../components/DrawerContent/ViewYourCourses";
import ViewStudents from "../../components/DrawerContent/ViewStudent";
import ViewAllCoursesInAdmin from "../../components/DrawerContent/ViewAllCourses";
import ViewYourCoursesInStudent from "../../components/DrawerContent/ViewYourCoursesInStudent";
import ViewYourGrades from "../../components/DrawerContent/ViewYourGrades";


const drawerWidth = 300;

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "settings":
        return <SettingsTab />;
      case "add new user":
        return <AddNewUser />
      case "view all users":
        return <ViewAllUsers />
      case "add new course":
        return <AddNewCourse />
      case "add new quiz":
        return <AddQuiz />
      case "edit user":
        return <EditUser />
      case "add new Content":
        return <AddCourseContent />
      case "view all Courses":
        return <ViewAllCourses />
      case "view students":
        return <ViewStudents/>

      case "View All Courses In Admin":
        return <ViewAllCoursesInAdmin/>
      case "View your Courses In Student":
        return <ViewYourCoursesInStudent/>
      case "View your Grades":
        return <ViewYourGrades/>

      default:
        return <ProfileTab />
    }
  };

  return (
    <Box sx={{ display: "flex", height: "140vh", backgroundColor: "secondary.main", color: "white" }}>
      {isMobile && (
        <Toolbar>
          <DashboardCustomizeIcon color="inherit" edge="start" onClick={handleDrawerToggle}>
            <MenuIcon />
          </DashboardCustomizeIcon>
        </Toolbar>

      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={isMobile ? handleDrawerToggle : undefined}
        ModalProps={{ keepMounted: isMobile }}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "primary.main",
            color: "white",
            boxShadow: "none",
            border: "none",
            height: "140vh",
            position: "static"

          }
        }}
      >
        <DynamicDrawer activeTab={activeTab} setActiveTab={setActiveTab} />
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, pl: isMobile ? 2 : `${16}px`, marginTop: isMobile ? '56px' : '0px' }}>
        <Typography variant="h4" gutterBottom>
          {activeTab === "profile" ? "Edit Your Profile" : ""}
          {activeTab === "add new user" ? "Add New User" : ""}
          {activeTab === "view all users" ? "View All Users" : ""}
          {activeTab === "add new course" ? "Add New Course" : ""}
          {activeTab === "edit user" ? "Edit User" : ""}
          {activeTab ==="View your Courses In Student"? "Your Courses":""}
          {activeTab ==="View your Grades"? "Your Grades":""}
          {activeTab ==="view students"?"Your Students":""}
          {activeTab==="View All Courses In Admin"?"All Courses":""}
        </Typography>
        {renderContent()}
      </Box>
    </Box>


  );
};

export default Dashboard;
