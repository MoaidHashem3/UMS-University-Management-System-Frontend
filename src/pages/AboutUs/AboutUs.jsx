import React from "react";
import { Box, Typography, Avatar, Grid, Card, CardContent, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const teamMembers = [
    { name: "Hossam Salah", image: "/src/assets/images/hos.jpg", github: "https://github.com/HossamSalah1", linkedin: "https://linkedin.com/in/hossam-salah-hassan" },
    { name: "Moaid Hashem", image: "/src/assets/images/mou.jpg", github: "https://github.com/MoaidHashem3", linkedin: "https://www.linkedin.com/in/moaidhashem/" },
    { name: "Ezz Eldeen Amer", image:"/src/assets/images/ezz.jpg", github: "#", linkedin: "#" },
    { name: "Ahmed Ashraf", image: "/src/assets/images/ahm.jpg", github: "https://github.com/ahmedashrafdiv", linkedin: "https://www.linkedin.com/in/ahmed-ashraf-5078a22a4/" },
    { name: "Ahmed Mustafa", image: "", github: "#", linkedin: "#" },
];

const AboutUs = () => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "secondary.main", // Soft peach gradient background
                padding: "50px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {/* Header Section */}
            <Box sx={{ marginBottom: "40px", textAlign: "center" }}>
                <Typography variant="h3" sx={{ fontWeight: "bold", color: "#fff" }}>
                    Meet Our Team
                </Typography>
                
            </Box>

            {/* Team Section */}
            <Grid container spacing={4} justifyContent="center">
                {teamMembers.map((member) => (
                    <Grid item key={member.name} xs={12} sm={6} md={4} lg={3}>
                        <Card
                            sx={{
                                textAlign: "center",
                                backgroundColor: "secondary.light",
                                padding: "20px",
                                borderRadius: "20px",
                                boxShadow: 4,
                                transition: "transform 0.3s",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                },
                            }}
                        >
                            <Avatar
                                alt={member.name}
                                src={member.image}
                                sx={{
                                    width: 180,  // Increased width
                                    height: 180, // Increased height
                                    margin: "0 auto",
                                    marginBottom: "20px",
                                    border: "5px solid #fff", // Border color matches the gradient
                                    borderRadius: "50%",
                                }}
                            />
                            <CardContent>
                                <Typography variant="h5" sx={{ color: "#fff" }}>
                                    {member.name}
                                </Typography>
                                <Typography variant="body2" color="#fff" sx={{ marginBottom: "20px" }}>
                                    MERN Stack Developer
                                </Typography>
                            </CardContent>

                            {/* Social Icons */}
                            <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                                <IconButton
                                    aria-label="GitHub"
                                    onClick={() => window.open(member.github, "_blank")}
                                    sx={{
                                        backgroundColor: "#2d3436",
                                        color: "#fff",
                                        "&:hover": { backgroundColor: "#636e72" },
                                        borderRadius: "50%",
                                        padding: "10px",
                                    }}
                                >
                                    <GitHubIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="LinkedIn"
                                    onClick={() => window.open(member.linkedin, "_blank")}
                                    sx={{
                                        backgroundColor: "#0984e3",
                                        color: "#fff",
                                        "&:hover": { backgroundColor: "#74b9ff" },
                                        borderRadius: "50%",
                                        padding: "10px",
                                    }}
                                >
                                    <LinkedInIcon />
                                </IconButton>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AboutUs;
