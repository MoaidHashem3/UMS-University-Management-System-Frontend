import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Alert, ListItem } from "@mui/material";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';
import EditUser from "../../components/DrawerContent/EditUser";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { green, red } from '@mui/material/colors';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, IconButton, CircularProgress } from '@mui/material';
import axiosInstance from "../../axiosConfig";
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
    const [selectedUser, setSelectedUser] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [message, setmessage] = useState("")
    const [err, seterr] = useState("")
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate()


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleEdit = (user) => {
        setSelectedUser(user);
        setDialogOpen(true);
    };
    const handleUpdate = (updatedUser) => {
        setUsers(users.map(user => (user._id === updatedUser._id ? updatedUser : user)));
    };
    const handleDelete = async (id) => {
        try {
            const res = await axiosInstance.delete(`/users/${id}`)
            setUsers(users.filter(user => user._id !== id))
            setmessage("Deleted Successfully")
        } catch (err) {
            seterr("Can not be deleted, try again")

        }
    }
    const paginatedUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);//get from 1 to 5 and from 5 to 10
    const user = useSelector((state) => state.auth.user);
    let userRole;
    let userName;
    if (user) {
        userRole = user.role;
        userName = user.name;
    } else {
        userRole = "";
        userName = "";

    }
    const token = localStorage.getItem("authToken")
    useEffect(() => {
        const call = async () => {
            try {
                if (token) {
                    const res = await axiosInstance.get("/users", {
                        headers: {
                            Authorization: token
                        }
                    })
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

    return <>
        {message && <Alert severity="success" sx={{ width: '100%', mt: 2,marginBottom:"10px" }}>{message}</Alert>}
        {err && <Alert severity="error" sx={{ width: '100%', mt: 2,marginBottom:"10px" }}>{err}</Alert>}
            <TableContainer sx={{marginTop:"40px", backgroundColor:"secondary.light"}} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'primary.main' }}>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Index</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Role</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Edit</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(paginatedUsers) && paginatedUsers.map((user, index) => (
                            <TableRow key={user._id}>
                                <TableCell sx={{ fontWeight: "bold", color: 'white' }}>{page * rowsPerPage + index + 1}</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: 'white' }}>{user.name}</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: 'white' }}>{user.email}</TableCell>
                                <TableCell sx={{ fontWeight: "bold" , color: 'white'}}>{user.role}</TableCell>
                                <TableCell sx={{ fontWeight: "bold" , color: 'white'}}><IconButton
                                    aria-label="edit"
                                    sx={{ color: "success.main" }}
                                    onClick={() => handleEdit(user)}
                                >
                                    <EditIcon />
                                </IconButton></TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}><IconButton
                                    aria-label="delete"
                                    sx={{ color: "warning.main" }}
                                    onClick={() => handleDelete(user._id)}
                                >
                                    <DeleteIcon />
                                </IconButton></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                sx={{ fontWeight: "bold" , color: 'white'}}
                    component="div"
                    count={users.length}  
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]} 
                />
            </TableContainer>
        {selectedUser && (
                <EditUser
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    user={selectedUser}
                    onUpdate={handleUpdate}
                />
            )}

    </>





}

export default ViewAllUsers;