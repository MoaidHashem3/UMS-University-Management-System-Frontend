import React from "react";
import { Box, Typography, Link, Divider, IconButton, Grid } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter'; // X (Twitter)

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: "secondary.main",
                color: "white",
                padding: "20px 0",
                width: "100%",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {/* Footer Content */}
            <Box sx={{ width: '100%', px: 2 }}>
                <Grid container alignItems="center" justifyContent="space-between">

                    {/* Left: UMS Text */}

                    <Grid item xs={12} sm={4} display="flex" justifyContent="flex-start">
                        <Typography variant="h6" sx={{ fontSize: { xs: '16px', sm: '20px' } }}>
                            UMS
                        </Typography>
                    </Grid>

                    {/* Center: Navigation Links */}

                    <Grid item xs={12} sm={4} display="flex" justifyContent="center">
                        <Typography component="div" variant="body1">
                            <Link href="#" color="inherit" sx={{ mx: 1, textDecoration: "none" }}>
                                About
                            </Link>
                            <Link href="#" color="inherit" sx={{ mx: 1, textDecoration: "none" }}>
                                Courses
                            </Link>
                            <Link href="#" color="inherit" sx={{ mx: 1, textDecoration: "none" }}>
                                Contact
                            </Link>
                        </Typography>
                    </Grid>

                    {/* Right: Social Media Icons */}


                    <Grid item xs={12} sm={4} display="flex" justifyContent="flex-end">
                        <IconButton href="https://www.facebook.com" target="_blank" color="inherit">
                            <FacebookIcon />
                        </IconButton>
                        <IconButton href="https://www.instagram.com" target="_blank" color="inherit">
                            <InstagramIcon />
                        </IconButton>
                        <IconButton href="https://www.linkedin.com" target="_blank" color="inherit">
                            <LinkedInIcon />
                        </IconButton>
                        <IconButton href="https://www.youtube.com" target="_blank" color="inherit">
                            <YouTubeIcon />
                        </IconButton>
                        <IconButton href="https://www.twitter.com" target="_blank" color="inherit">
                            <TwitterIcon /> 
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>

            {/* Divider Line */}

            <Divider sx={{ width: "80%", my: 2, backgroundColor: "white" }} />

            {/* Footer Bottom Text */}

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ mb: { xs: 1, sm: 0 }, mr: { sm: '50px' } }}>
                    © {new Date().getFullYear()} UMS. All rights reserved
                </Typography>
                <Typography variant="body1">
                    <Link href="#" color="inherit" sx={{ mx: 1, textDecoration: "none" }}>
                        Privacy Policy
                    </Link>
                    <Link href="#" color="inherit" sx={{ mx: 1, textDecoration: "none" }}>
                        Terms of Service
                    </Link>
                    <Link href="#" color="inherit" sx={{ mx: 1, textDecoration: "none" }}>
                        Cookies Settings
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;
