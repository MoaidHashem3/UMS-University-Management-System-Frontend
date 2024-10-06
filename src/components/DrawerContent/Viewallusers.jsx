import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Alert } from "@mui/material";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            paper: '#121212',
        },
        text: {
            primary: '#ffffff',

        },
    },
});



const ViewAllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.auth.user);
    let userRole;
    let userName;
    if (user) {
        userRole = user.role;
        userName = user.name;
        console.log(user, userRole, userName)
    } else {
        userRole = "";
        userName = "";

    }
    const token = localStorage.getItem("authToken")
    useEffect(() => {
        const call = async () => {
            try {
                if (token) {
                    const res = await axios.get("http://localhost:3000/users", {
                        headers: {
                            Authorization: token
                        }
                    })
                    console.log(res.data.data)
                    setUsers(res.data.data);
                    setLoading(false);
                }
            } catch (err) {
                setLoading(false);
            }

        }
        call();

    }, [token])
    if (loading) {
        return <CircularProgress />;
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'primary.main' }}>
                            <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Index</TableCell>
                            <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Role</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(users) && users.map((user, index) => (
                            <TableRow key={user._id}>
                                <TableCell sx={{ fontWeight: "bold" }}>{index}</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>{user.name}</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>{user.email}</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>{user.role}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>

    );





}

export default ViewAllUsers;