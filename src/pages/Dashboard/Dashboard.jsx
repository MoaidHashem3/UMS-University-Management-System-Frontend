import React, { useState } from "react";
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
        return <AddNewUser/>
      case "view all users":
        return <ViewAllUsers/>    
      case "add new course":
        return <AddNewCourse/>  
      case "add new quiz":
        return <AddQuiz/>
      default:
        return<ProfileTab/>
    }
  };

  return (
    <Box sx={{ display: "flex", height: "150vh", backgroundColor: "secondary.main", color: "white"}}>
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
            height:"150vh",
            position:"static"
          }
        }}
      >
        <DynamicDrawer activeTab={activeTab} setActiveTab={setActiveTab}/>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, pl: isMobile ? 2 : `${ 16}px`, marginTop: isMobile ? '56px' : '0px' }}>
        <Typography variant="h4" gutterBottom>
          {activeTab === "profile" ? "Your Profile" : ""}
          {activeTab === "add new user" ? "Add New User" : ""}
          {activeTab === "view all users" ? "View All Users" : ""}
          {activeTab === "add new course" ? "Add New Course" : ""}

        </Typography>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default Dashboard;