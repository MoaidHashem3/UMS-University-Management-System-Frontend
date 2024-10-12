import { useEffect, useState } from "react";
import {
  Box,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewYourCoursesInStudent = () => {
  const userCourses = useSelector((state) => state.auth.user.enrolledCourses);
  const navigate = useNavigate(); 
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchCourseDetails = () => {
      if (userCourses && userCourses.length > 0) {
        const courseRequests = userCourses.map((id) =>
          axios.get(`http://localhost:3000/courses/${id}`)
        );

        Promise.all(courseRequests)
          .then((responses) => {
            const coursesData = responses.map((res) => res.data);
            setCourses(coursesData);
            setLoading(false);
          })
          .catch((er) => {
            console.log("Error details:", er);
            setErr(er.message+"Failed to fetch course details. Please try again.");
          })
      } else {
        setLoading(false);
        setMessage("No enrolled courses found.");
      }
    };

    fetchCourseDetails();
  }, [userCourses]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px", 
        }}>
     
        {message && (
          <Alert severity="info" sx={{ width: "100%", mt: 2 }}>
            {message}
          </Alert>
        )}
        {err && (
          <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
            {err}
          </Alert>
        )}

        {courses.length > 0 ? (
          <TableContainer component={Paper} sx={{  width: { xs: "100%", sm: "fit-content", md:"900px" }, marginTop: "20px", backgroundColor: "secondary.light" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "primary.main" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Course Name
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Show Course
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course._id}>
                    <TableCell sx={{  color:"white" }}>
                      {course.title}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(`/courses`)}
                      >
                        Show Course
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Alert severity="info">No courses available</Alert>
        )}
      </Box>
    </>
  );
};

export default ViewYourCoursesInStudent;
