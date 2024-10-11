import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../redux/authSlice'; 
import { useNavigate } from 'react-router-dom'; 

export default function ButtonAppBar() {
    const navigate = useNavigate(); 
  const btnStyles = {
    fontSize: "30px",
    width: "200px",
    height: "70px",
    fontWeight: 350,
    borderRadius: "0",
    margin: 0,
    padding: 0,
    "&:hover": {
      backgroundColor: "secondary.main",
      color: "white",
    },
  };

  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const toggleDrawer = (open) => () => {
    setOpenDrawer(open);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate('/home')
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["Courses", "Dashboard"].map((text) => (
          <ListItem button key={text} component={Link} to={text.toLowerCase()}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        {!isLoggedIn && (
          <ListItem button component={Link} to="/login">
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          position: "static",
          backgroundColor: "white",
          zIndex: "10 !important",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "secondary.main",
            paddingRight: 0,
          }}
        >
          <Typography
            variant="h6"
            component={Link}
            to="/home"
            sx={{
              fontSize: "40px",
              textDecoration: "none",
              color: "darkgrey",
              "&:hover": {
                color: "secondary.main",
              },
            }}
          >
            UMS
          </Typography>

          {/* Hamburger Menu for Mobile */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0 }}>
            <Button
              component={Link}
              to="/courses"
              color="secondary.main"
              sx={btnStyles}
            >
              Courses
            </Button>

            <Button
              component={Link}
              to="/dashboard"
              color="secondary.main"
              sx={btnStyles}
            >
              Dashboard
            </Button>

            {!isLoggedIn ? (
              <>
                <Button
                  component={Link}
                  to="/signup"
                  color="secondary.main"
                  sx={btnStyles}
                >
                  Signup
                </Button>
                <Button
                  component={Link}
                  to="/login"
                  color="secondary.main"
                  sx={btnStyles}
                >
                  Login
                </Button>
              </>
            ) : (
              <Button
                onClick={handleLogout}
                color="secondary.main"
                sx={{
                  fontSize: "30px",
                  width: "200px",
                  height: "70px",
                  fontWeight: 350,
                  borderRadius: "0",
                  margin: 0,
                  padding: 0,
                  "&:hover": {
                    backgroundColor: "warning.main",
                    color: "white",
                  },
                }}
              >
                Sign Out
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </Box>
  );
}
