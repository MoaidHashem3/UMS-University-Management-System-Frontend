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
            const res = await axios.delete(`http://localhost:3000/users/${id}`)
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

    console.log(users)
    return <>
        {message && <Alert severity="success" sx={{ width: '100%', mt: 2,marginBottom:"10px" }}>{message}</Alert>}
        {err && <Alert severity="error" sx={{ width: '100%', mt: 2,marginBottom:"10px" }}>{err}</Alert>}
        <ThemeProvider theme={darkTheme}>
            <TableContainer sx={{marginTop:"40px"}} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'primary.main' }}>
                            <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Index</TableCell>
                            <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Role</TableCell>
                            <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Edit</TableCell>
                            <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(paginatedUsers) && paginatedUsers.map((user, index) => (
                            <TableRow key={user._id}>
                                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>{user.name}</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>{user.email}</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>{user.role}</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}><IconButton
                                    aria-label="edit"
                                    style={{ color: green[500] }}
                                    onClick={() => handleEdit(user)}
                                >
                                    <EditIcon />
                                </IconButton></TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}><IconButton
                                    aria-label="delete"
                                    style={{ color: red[500] }}
                                    onClick={() => handleDelete(user._id)}
                                >
                                    <DeleteIcon />
                                </IconButton></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={users.length}  // Total number of users
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]} // Rows per page options
                />
            </TableContainer>
        </ThemeProvider>
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