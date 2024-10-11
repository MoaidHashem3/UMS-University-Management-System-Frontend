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
} from "@mui/material";

const EditCourse = ({ course, onUpdate, open, setOpen }) => {
  const [title, setTitle] = useState("");
  const [major, setMajor] = useState("");
  const [professor, setProfessor] = useState("");
  const [duration, setDuration] = useState("");
  const [message, setMessage] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3000/courses/${course._id}`, {
        title,
        major,
        professor,
        duration,
      })
      .then(() => {
        onUpdate({ ...course, title, major, professor, duration });
        setMessage("Course updated successfully");
        handleClose();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setMajor(course.major);
      setProfessor(course.professor.name);
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
          <TextField
            margin="dense"
            id="professor"
            name="professor"
            label="Professor"
            type="text"
            value={professor}
            onChange={(e) => setProfessor(e.target.value)}
            fullWidth
          />
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
