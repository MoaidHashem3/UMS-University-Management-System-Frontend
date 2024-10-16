import { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Collapse,
  Alert,
  MenuItem,
} from "@mui/material";
import axiosInstance from "../../axiosConfig";

const EditCourse = ({ course, onUpdate, open, setOpen }) => {
  const [title, setTitle] = useState("");
  const [major, setMajor] = useState("");
  const [professor, setProfessor] = useState(""); // Store selected professor ID
  const [duration, setDuration] = useState("");
  const [message, setMessage] = useState("");
  const [professors, setProfessors] = useState([]); // State to hold list of professors

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const oldProfessorId = course.professor?._id;

    try {
      await axiosInstance.patch(`/courses/${course._id}`, {
        title,
        major,
        professor,
        duration,
      });

      // If professor has changed, update the createdCourses field for both professors
      if (oldProfessorId !== professor) {
        // Remove course from old professor's createdCourses
        await axiosInstance.patch(`/users/${oldProfessorId}`, {
          $pull: { createdCourses: course._id },
        });

        // Add course to new professor's createdCourses
        await axiosInstance.patch(`/users/${professor}`, {
          $addToSet: { createdCourses: course._id }, 
        });
      }

      onUpdate({ ...course, title, major, professor, duration });
      setMessage("Course updated successfully");
      handleClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const response = await axiosInstance.get(
          "/users/professor"
        );
        setProfessors(response.data.data);
      } catch (error) {
        console.error("Error fetching professors:", error);
      }
    };

    fetchProfessors();
  }, []);

  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setMajor(course.major);
      setProfessor(course.professor?._id || ""); // Set professor ID instead of name
      setDuration(course.duration);
    }
  }, [course]);

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

      <Dialog
        sx={{
          "& .MuiDialog-container": {
            backdropFilter: "blur(1px)",
          },
          "& .MuiDialog-paper": {
            backgroundColor: "#424242",
            color: "#fff",
          },
        }}
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Edit Course</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="courseTitle"
            name="courseTitle"
            label="Course Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="major"
            name="major"
            label="Major"
            type="text"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            fullWidth
          />
          {/* Dropdown for selecting professors */}
          <TextField
            select
            margin="dense"
            id="professor"
            name="professor"
            label="Professor"
            value={professor} // Use professor ID as value
            onChange={(e) => setProfessor(e.target.value)}
            fullWidth
          >
            {professors.map((prof) => (
              <MenuItem key={prof._id} value={prof._id}>
                {prof.name} {/* Display professor name */}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            id="duration"
            name="duration"
            label="Duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Edit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditCourse;
