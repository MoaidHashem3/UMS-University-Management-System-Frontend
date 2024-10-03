import React from "react";
import { Outlet } from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Box } from "@mui/material";

export default function AppLayout() {
    return <>
        {/* <p>Navbar</p> */}
        <Navbar />
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}><Outlet>
        </Outlet></Box>
        <Footer></Footer>
    </>
}