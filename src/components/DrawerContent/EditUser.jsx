import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button,Snackbar } from "@mui/material";

const EditUser = ({ open, onClose, user, onUpdate }) => {
    const [name, setName] = useState(user.name);
    const [role, setRole] = useState(user.role);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [newPassword, setNewPassword] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');


    useEffect(() => {
        setName(user.name)
        setRole(user.role);
        setEmail(user.email);
        setPassword(user.password)

    }, [user]);
    const handlePasswordChange = (e) => {
        if (e.target.name === 'newPassword') {
            setNewPassword(e.target.value);
        }
    };

    const handleSubmit = async () => {
        try {
            await axios.patch(`http://localhost:3000/users/${user._id}`, { name,role,email,newPassword:newPassword });
            onUpdate({ ...user, name,role,email});
            setSnackbarMessage("Updated successfully!");
            setSnackbarOpen(true); // Open Snackbar
            // onClose();
        } catch (error) {
            setSnackbarMessage("Error updating user.");
            setSnackbarOpen(true);
            console.error("Error updating user:", error);
        }
    };
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    return (
        <Dialog sx={{
            '& .MuiDialog-container': {
                backdropFilter: 'blur(1px)', // Optional: adds a blur effect to the background
            },
            '& .MuiDialog-paper': {
                backgroundColor: '#424242', // Dark background color
                color: '#fff', // Text color
            },
        }} open={open} onClose={onClose} >
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
            <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    InputProps={{
                        style: { color: '#fff' }, // Text color for input
                    }}
                    InputLabelProps={{
                        style: { color: '#fff' }, // Label color
                    }}
                />
                <TextField
                    margin="dense"
                    label="Role"
                    type="text"
                    fullWidth
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    InputProps={{
                        style: { color: '#fff' }, // Text color for input
                    }}
                    InputLabelProps={{
                        style: { color: '#fff' }, // Label color
                    }}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                        style: { color: '#fff' }, // Text color for input
                    }}
                    InputLabelProps={{
                        style: { color: '#fff' }, // Label color
                    }}
                /><TextField
                    autoFocus
                    margin="dense"
                    label="Password"
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    fullWidth
                    onChange={handlePasswordChange}
                    InputProps={{
                        style: { color: '#fff' }, // Text color for input
                    }}
                    InputLabelProps={{
                        style: { color: '#fff' }, // Label color
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Exit</Button>
                <Button onClick={handleSubmit}>Update</Button>
            </DialogActions>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Position of the Snackbar
            />
        </Dialog>
    );
};

export default EditUser;