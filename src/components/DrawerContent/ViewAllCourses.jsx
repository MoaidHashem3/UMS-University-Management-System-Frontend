import { Box, Collapse, IconButton, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import {
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditCourse from "./EditCourse";

const ViewAllCoursesInAdmin = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false); 

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");
  const token = localStorage.getItem("authToken");

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setDialogOpen(true); 
  };

  const handleUpdate = (updatedCourse) => {
    setCourses(courses.map(course => (course._id === updatedCourse._id ? updatedCourse : course)));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/courses/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        setMessage("Deleted Successfully");
        fetchCourses();
      })
      .catch((error) => {
        setErr(error.message);
      });
  };

  const fetchCourses = () => {
    setLoading(true);
    axios
      .get("http://localhost:3000/courses", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setErr(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (token) {
      fetchCourses();
    }
  }, [token]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <>
      <Collapse in={!!message}>
        <Alert
          severity="success"
          sx={{ width: "100%", mt: 2, marginBottom: "10px" }}
        >
          {message}
        </Alert>
      </Collapse>
      <Collapse in={!!err}>
        <Alert
          severity="error"
          sx={{ width: "100%", mt: 2, marginBottom: "10px" }}
        >
          {err}
        </Alert>
      </Collapse>
      <Box sx={{ marginTop: "40px" }}>
        <Typography variant="h4" color="#fff" mb={2}>
          All Courses
        </Typography>

        {courses.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "primary.main" }}>
                  <TableCell sx={{ color: "black", fontWeight: "bold" }}>
                    Course Name
                  </TableCell>
                  <TableCell sx={{ color: "black", fontWeight: "bold" }}>
                    Major
                  </TableCell>
                  <TableCell sx={{ color: "black", fontWeight: "bold" }}>
                    Professor
                  </TableCell>
                  <TableCell sx={{ color: "black", fontWeight: "bold" }}>
                    Duration
                  </TableCell>
                  <TableCell sx={{ color: "black", fontWeight: "bold" }}>
                    Number of Students
                  </TableCell>
                  <TableCell sx={{ color: "black", fontWeight: "bold" }}>
                    Edit
                  </TableCell>
                  <TableCell sx={{ color: "black", fontWeight: "bold" }}>
                    Delete
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
                      {course.major}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      {course.professor.name}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                      {course.duration}h
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", paddingLeft:"70px" }}>
                      {course.students.length}{" "}
                    </TableCell>

                    <TableCell sx={{ fontWeight: "bold" }}>
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEdit(course)} 
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(course._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
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

      <EditCourse 
        course={selectedCourse} 
        onUpdate={handleUpdate} 
        open={dialogOpen} 
        setOpen={setDialogOpen} 
      />
    </>
  );
};

export default ViewAllCoursesInAdmin;
