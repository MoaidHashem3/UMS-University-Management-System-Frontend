import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, Icon, Stack } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ScienceIcon from "@mui/icons-material/Science";
import style from "./CourseDetails.module.css";
import axios from "axios";
const CourseDetails = () => {
  const [course, setCourse] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/courses/66fee7a9b0f4ae73cbe7f166")
      .then((res) => {
        console.log(res.data);
        setCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        color: "#fff",
        padding: 2,
        borderRadius: 2,
        height: "100vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          backgroundColor: "#222831",
        }}
      >
        <div className={style.courseImgContainer}>
          <img
            className={style.courseImg}
            src={course.image}
            alt="Machine Learning"
            style={{ borderRadius: "50%", width: "200px", height: "200px" }}
          />
        </div>

        <Typography variant="h4" sx={{ mt: 2 }}>
          {course.title}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {course.description}
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 4,
          backgroundColor: "#393e46",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Icon component={SchoolIcon} sx={{ fontSize: 100 }} />
              <Stack>
                <Typography variant="body1">Taught by:</Typography>
                <Typography variant="h6">{course.professor}</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Icon component={PeopleIcon} sx={{ fontSize: 100 }} />
              <Stack>
                <Typography variant="body1">Number of students</Typography>
                <Typography variant="h6">
                  {/* لما بكتب الكود بيشتغل ولما اعمل رفرش بيطبع ايرور */}
                  {/*
                 {course.students.length}
                 */}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Icon component={AccessTimeIcon} sx={{ fontSize: 100 }} />
              <Stack>
                <Typography variant="body1">Duration</Typography>
                <Typography variant="h6">{course.duration}</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Icon component={ScienceIcon} sx={{ fontSize: 100 }} />
              <Stack>
                <Typography variant="body1">Major</Typography>
                <Typography variant="h6">{course.major}</Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginTop: 4,
            padding: 2,
            fontSize: "1rem",
            width: "25%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Enroll Now!
        </Button>
      </Box>
    </Box>
  );
};

export default CourseDetails;
