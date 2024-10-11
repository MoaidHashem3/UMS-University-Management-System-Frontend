import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

const ViewAllCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    const token = localStorage.getItem("authToken");
    const courseIds = useSelector((state) => state.auth.user.createdCourses); // Array of { _id, title }

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                if (token && courseIds.length > 0) {
                    // Fetch course details for each course based on the courseIds array
                    const courseDetailsPromises = courseIds.map((course) =>
                        axios.get(`http://localhost:3000/courses/${course._id}`, {
                            headers: {
                                Authorization: token,
                            },
                        })
                    );

                    const responses = await Promise.all(courseDetailsPromises);
                    const coursesData = responses.map((res, index) => ({
                        ...res.data, // Data from API
                        title: courseIds[index].title, // Preserve the title from Redux state
                    }));

                    setCourses(coursesData); // Save fetched course details
                } else {
                    setCourses([]); // Handle case where no course IDs are available
                }
            } catch (error) {
                setErr("Failed to fetch course details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [token, courseIds]);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box sx={{ marginTop: "40px" }}>
            <Typography variant="h4" color="#fff" mb={2}>
                Your Courses
            </Typography>

            {err && (
                <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
                    {err}
                </Alert>
            )}

            {courses.length > 0 ? (
                <TableContainer  sx={{marginTop:"40px", backgroundColor:"secondary.light"}} component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "primary.main"}}>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                                    Course Name
                                </TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                                    Number of Students
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {courses.map((course) => (
                                <TableRow key={course._id}>
                                    <TableCell sx={{ color:"white" }}>
                                        {course.title} {/* Display course title */}
                                    </TableCell>
                                    <TableCell sx={{  color:"white" }}>
                                        {course.students.length} {/* Display number of students */}
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
    );
};

export default ViewAllCourses;
