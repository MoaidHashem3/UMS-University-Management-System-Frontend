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
    const [selectedCourse, setSelectedCourse] = useState("");  // State to store the selected course
    const [students, setStudents] = useState([]);  // State to store the student details
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [courseDetails, setCourseDetails] = useState([]);  // State to store the course details

    const token = localStorage.getItem("authToken");
    const courses = useSelector((state) => state.auth.user.createdCourses); // Fetch courses from Redux

    // Fetch course details based on the course IDs
    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                if (courses.length > 0) {
                    const courseDetailsPromises = courses.map((id) =>
                        axios.get(`http://localhost:3000/courses/${id}`)
                    );
                    const responses = await Promise.all(courseDetailsPromises);
                    const fetchedCourses = responses.map((res) => res.data);
                    setCourseDetails(fetchedCourses);  // Save the fetched course details
                }
            } catch (err) {
                setError("Failed to fetch course details.");
            }
        };

        fetchCourseDetails();
    }, [courses]);

    // Handle course selection and set students based on the selected course
    const handleCourseChange = (event) => {
        const courseId = event.target.value;
        setSelectedCourse(courseId);
        setLoading(true);
        setError("");
        setMessage("");

        // Find the selected course details from the courseDetails array
        const selectedCourseDetails = courseDetails.find(course => course._id === courseId);
        if (selectedCourseDetails) {
            setStudents(selectedCourseDetails.students);  // Assuming students are part of the course details
        } else {
            setError("No students found for this course.");
        }
        setLoading(false);
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
                {courseDetails.length > 0 ? (
                    courseDetails.map((course) => (
                        <MenuItem key={course._id} value={course._id}>
                            {course.title}  {/* Display the course title */}
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
                <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Student Name</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow key={student._id}>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.email}</TableCell>
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
