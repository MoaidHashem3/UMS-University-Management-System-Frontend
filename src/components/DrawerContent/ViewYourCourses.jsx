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
    const [message, setMessage] = useState("");
    const [err, setErr] = useState("");

    const token = localStorage.getItem("authToken");
    const courseIds = useSelector((state) => state.auth.user.createdCourses); //  this is an array of IDs

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                if (token && courseIds.length > 0) {
                    // Fetch details for each course based on the courseIds array
                    const courseDetailsPromises = courseIds.map((id) =>
                        axios.get(`http://localhost:3000/courses/${id}`, {
                            headers: {
                                Authorization: token,
                            },
                        })
                    );

                    const responses = await Promise.all(courseDetailsPromises);
                    const coursesData = responses.map((res) => res.data);

                    setCourses(coursesData); // Save the fetched courses details
                    setLoading(false);
                } else {
                    setCourses([]); // Handle case where no course IDs are available
                    setLoading(false);
                }
            } catch (error) {
                setErr("Failed to fetch course details. Please try again.");
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
            {message && (
                <Alert severity="success" sx={{ width: "100%", mt: 2 }}>
                    {message}
                </Alert>
            )}
            {err && (
                <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
                    {err}
                </Alert>
            )}

            {courses.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "primary.main" }}>
                                <TableCell sx={{ color: "black", fontWeight: "bold" }}>
                                    Course Name
                                </TableCell>
                                <TableCell sx={{ color: "black", fontWeight: "bold" }}>
                                    Number of Students
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {courses.map((course) => (
                                <TableRow key={course._id}>
                                    <TableCell sx={{ fontWeight: "bold" }}>
                                        {course.title}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>
                                        {course.students.length} {/* Display the number of students */}
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
