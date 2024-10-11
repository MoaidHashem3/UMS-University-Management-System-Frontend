import React, { useState, useEffect } from "react";
import {
    Box,
    TextField,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    MenuItem
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

const ViewStudent = () => {
    const [selectedCourse, setSelectedCourse] = useState(""); // State to store the selected course
    const [students, setStudents] = useState([]); // State to store the student details
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [courseDetails, setCourseDetails] = useState([]); // State to store the course details

    const token = localStorage.getItem("authToken");
    const courses = useSelector((state) => state.auth.user.createdCourses); // Fetch courses from Redux

    // Fetch course details based on the course IDs
    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                if (courses.length > 0) {
                    const courseDetailsPromises = courses.map((course) =>
                        axios.get(`http://localhost:3000/courses/${course._id}`, {
                            headers: { Authorization: token },
                        })
                    );
                    const responses = await Promise.all(courseDetailsPromises);
                    const fetchedCourses = responses.map((res) => res.data);
                    setCourseDetails(fetchedCourses); // Save the fetched course details
                }
            } catch (err) {
                setError("Failed to fetch course details.");
            }
        };

        fetchCourseDetails();
    }, [courses, token]);

    // Handle course selection and fetch student data from API
    const handleCourseChange = async (event) => {
        const courseId = event.target.value;
        setSelectedCourse(courseId);
        setLoading(true);
        setError("");
        setMessage("");

        try {
            // Fetch student details from the API using the course ID
            const response = await axios.get(`http://localhost:3000/courses/${courseId}/students`, {
                headers: { Authorization: token },
            });

            const { data } = response;
            if (data && data.data) {
                setStudents(data.data); // Assuming response includes the students' data
                setMessage("Students data retrieved successfully");
            } else {
                setStudents([]);
                setMessage("No students enrolled in this course.");
            }
        } catch (error) {
            setError("Failed to fetch student details. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ padding: "16px", margin: "30px" }}>
            {message && <Alert severity={students.length > 0 ? "success" : "info"} sx={{ width: '100%', mt: 2 }}>{message}</Alert>}
            {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}

            {/* Course Dropdown */}
            <TextField
                select
                label="Select Course"
                fullWidth
                margin="normal"
                value={selectedCourse}
                onChange={handleCourseChange}
            >
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <MenuItem key={course._id} value={course._id}>
                            {course.title}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>No courses available</MenuItem>
                )}
            </TextField>

            {/* Display Students Table or Alert if no students */}
            {loading ? (
                <CircularProgress />
            ) : students.length > 0 ? (
                <TableContainer component={Paper} sx={{ marginTop: "20px", backgroundColor: "secondary.light"}}>
                    <Table>
                        <TableHead sx={{backgroundColor: "primary.main"}}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold", color:"white" }}>Student Name</TableCell>
                                <TableCell sx={{ fontWeight: "bold",color:"white" }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color:"white" }}>Total Quizzes Score</TableCell> {/* New column for total score */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow key={student.email}>
                                    <TableCell sx={{ color:"white" }}>{student.name}</TableCell>
                                    <TableCell sx={{ color:"white" }}>{student.email}</TableCell>
                                    <TableCell sx={{ color:"white" }}>{student.totalScore}</TableCell> {/* Display total quiz score */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : selectedCourse && (
                <Alert severity="info" sx={{ marginTop: "20px" }}>No students enrolled in this course.</Alert>
            )}
        </Box>
    );
};

export default ViewStudent;
