import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'; // For linking to different routes
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from "@mui/material";


export default function ButtonAppBar() {
    const btnStyles = {
        fontSize: '30px',
        width: '200px',
        height: '70px',
        fontWeight: 350,
        borderRadius: '0',
        margin: 0, 
        padding: 0,
        '&:hover': {
            backgroundColor: 'secondary.main',
            color: 'white'
        }
    };

    const [openDrawer, setOpenDrawer] = useState(false);
    const theme = useTheme();

    const toggleDrawer = (open) => () => {
        setOpenDrawer(open);
    };

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {['Courses', 'Dashboard', 'Login'].map((text) => (
                    <ListItem button key={text} component={Link} to={text.toLowerCase()}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar  sx={{ position:"static", backgroundColor: 'white', zIndex: "10 !important",
}}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', color: 'secondary.main', paddingRight:0,}}>
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/home" 
                        sx={{
                            fontSize: '40px',
                            textDecoration: 'none',
                            color: 'darkgrey',
                            '&:hover': {
                                color: 'secondary.main', 
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
                        sx={{ display: { xs: 'block', md: 'none' } }} 
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0 }}>
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
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="right"
                open={openDrawer}
                onClose={toggleDrawer(false)}
            >
                {list()}
            </Drawer>
        </Box>
    );
}
