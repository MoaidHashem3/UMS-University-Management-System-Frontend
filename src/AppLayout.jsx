import React from "react";
import { Outlet } from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Box } from "@mui/material";

export default function AppLayout() {
    return <>
        <Navbar></Navbar>
        <Box sx={{ minHeight: '150vh', display: 'flex' ,flexDirection:"column",zIndex: 1,flexGrow:1,position:"relative"}}>
            <Outlet ></Outlet>
        </Box>
        <Footer></Footer>
    </>
}