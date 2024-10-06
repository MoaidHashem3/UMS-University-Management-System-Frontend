import React from "react";
import { Outlet } from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Box } from "@mui/material";

export default function AppLayout() {
    return <>
        <Navbar  />
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1}}><Outlet>
        </Outlet></Box>
        <Footer></Footer>
    </>
}