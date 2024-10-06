import React from "react";
import { Box, Typography, Button, Icon, Stack } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ScienceIcon from "@mui/icons-material/Science";
import style from "./CourseDetails.module.css"; // Import your CSS module

const CourseDetails = ({ course }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        color: "#fff",
        padding: 0,
        margin: 0,
        height: "100vh", // Ensure full page height
        width: "100vw", // Ensure full page width
        overflow: "hidden", // Hide any overflow
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative", // Enable absolute positioning for the circles
          padding: 2,
          backgroundColor: "#222831",
        }}
      >
        {/* Container for the image and the background circles */}
        <div className={style.courseImgContainer}>
          <img
            className={style.courseImg}
            src={course.image}
            alt={course.title}
            style={{
              borderRadius: "50%",
              width: "200px",
              height: "200px",
              position: "relative", // Ensures proper positioning relative to the circles
            }}
          />
        </div>
        
        <Typography variant="h4" sx={{ mt: 2, textAlign: "center" }}>
          {course.title}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, textAlign: "center" }}>
          {course.description}
        </Typography>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 2,
          backgroundColor: "#393e46",
        }}
      >
        {/* Stacking Icons with Two per Row */}
        <Stack spacing={3}>
          {/* First Row */}
          <Stack direction="row" justifyContent="space-around">
            <Stack direction="row" spacing={2} alignItems="center">
              <Icon component={SchoolIcon} sx={{ fontSize: 50 }} />
              <Box>
                <Typography variant="body1">Taught by:</Typography>
                <Typography variant="h6">{course.professor}</Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <Icon component={PeopleIcon} sx={{ fontSize: 50 }} />
              <Box>
                <Typography variant="body1">Number of students</Typography>
                <Typography variant="h6">{course.students?.length || 0}</Typography>
              </Box>
            </Stack>
          </Stack>

          {/* Second Row */}
          <Stack direction="row" justifyContent="space-around">
            <Stack direction="row" spacing={2} alignItems="center">
              <Icon component={AccessTimeIcon} sx={{ fontSize: 50 }} />
              <Box>
                <Typography variant="body1">Duration</Typography>
                <Typography variant="h6">{course.duration}</Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <Icon component={ScienceIcon} sx={{ fontSize: 50 }} />
              <Box>
                <Typography variant="body1">Major</Typography>
                <Typography variant="h6">{course.major}</Typography>
              </Box>
            </Stack>
          </Stack>
        </Stack>

        <Button
          variant="contained"
          color="primary"
          sx={{
            marginTop: 4,
            padding: 2,
            fontSize: "1rem",
            width: { xs: "100%", sm: "50%", md: "30%" },
            alignSelf: "center",
          }}
        >
          Enroll Now!
        </Button>
      </Box>
    </Box>
  );
};

export default CourseDetails;
