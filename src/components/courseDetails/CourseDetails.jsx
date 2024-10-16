import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Icon, Stack } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ScienceIcon from "@mui/icons-material/Science";
import style from "./CourseDetails.module.css"; // Import your CSS module
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { enrollCourse } from "../../redux/authSlice";
import axios from "axios"; // Import axios
import axiosInstance from "../../axiosConfig";

const CourseDetails = ({ course }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const normalizedImgPath = course.selectedCourse.image.replace(/\\/g, '/');
  const [enrollmentStatus, setEnrollmentStatus] = useState(false); // Track enrollment state
  const [errorMessage, setErrorMessage] = useState(''); // Track error messages

  const handleEnrollClick = async () => {
    if (!user) {
      // If the user is not logged in, redirect to the login page
      navigate("/login");
      return;
    }

    if (user.role !== "student") {
      // If the user is not a student, set an error message and return
      setErrorMessage("Only students can enroll in courses. Professors and admins cannot enroll.");
      return;
    }

    try {
      // API call to enroll user in the course
      const response = await axiosInstance.post(`/courses/enroll/${course.selectedCourse._id}/${user.id}`);

      if (response.status === 200) {
        // Successfully enrolled, update Redux state
        dispatch(enrollCourse(course.selectedCourse._id));
        setEnrollmentStatus(true); // Update the status to show enrollment success
      }
    } catch (error) {
      console.error("Error enrolling in the course:", error);
      setErrorMessage("Failed to enroll in the course. Please try again later.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        color: "#fff",
        padding: 0,
        marginTop: 0,
        height: "100vh", 
        width: "100%", 
        overflow: "hidden", 
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
            src={`${import.meta.env.VITE_API_URL}/${normalizedImgPath}`} // Ensure image URL is correctly passed
            alt={course.selectedCourse.title}
            style={{
              borderRadius: "50%",
              width: "200px",
              height: "200px",
              position: "relative", // Ensures proper positioning relative to the circles
            }}
          />
        </div>

        <Typography variant="h4" sx={{ mt: 2, textAlign: "center" }}>
          {course.selectedCourse.title}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, textAlign: "center" }}>
          {course.selectedCourse.description}
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
          backgroundColor: "secondary.light",
        }}
      >
        {/* Stacking Icons with Two per Row */}
        <Stack spacing={4}>
  {/* First Row */}
  <Stack direction="row" justifyContent="space-between" alignItems="center">
    <Stack direction="row" spacing={2} alignItems="center" sx={{ width: "48%" }}>
      <Icon component={SchoolIcon} sx={{ fontSize: 50 }} />
      <Box>
        <Typography variant="body1">Taught by:</Typography>
        <Typography variant="h6">
          {course.selectedCourse.professor.name|| "Unknown"}
        </Typography>
      </Box>
    </Stack>

    <Stack direction="row" spacing={2} alignItems="center" sx={{ width: "48%" }}>
      <Icon component={PeopleIcon} sx={{ fontSize: 50 }} />
      <Box>
        <Typography variant="body1">Number of students</Typography>
        <Typography variant="h6">
          {course.selectedCourse.students?.length || 0}
        </Typography>
      </Box>
    </Stack>
  </Stack>

  {/* Second Row */}
  <Stack direction="row" justifyContent="space-between" alignItems="center">
    <Stack direction="row" spacing={2} alignItems="center" sx={{ width: "48%" }}>
      <Icon component={AccessTimeIcon} sx={{ fontSize: 50 }} />
      <Box>
        <Typography variant="body1">Duration</Typography>
        <Typography variant="h6">
          {`${course.selectedCourse.duration} Hours` || "Not specified"}
        </Typography>
      </Box>
    </Stack>

    <Stack direction="row" spacing={2} alignItems="center" sx={{ width: "48%" }}>
      <Icon component={ScienceIcon} sx={{ fontSize: 50 }} />
      <Box>
        <Typography variant="body1">Major</Typography>
        <Typography variant="h6">
          {course.selectedCourse.major || "General"}
        </Typography>
      </Box>
    </Stack>
  </Stack>
</Stack>


        {enrollmentStatus ? (
          <Typography sx={{ mt: 4, textAlign: "center", color: "green" }}>
            You have successfully enrolled in this course!
          </Typography>
        ) : (
          <>
            {errorMessage && (
              <Typography sx={{ mt: 4, textAlign: "center", color: "red" }}>
                {errorMessage}
              </Typography>
            )}
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
              onClick={handleEnrollClick} // Attach the handler
            >
              Enroll Now!
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default CourseDetails;
