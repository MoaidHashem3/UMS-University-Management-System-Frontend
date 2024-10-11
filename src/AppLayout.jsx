import React from "react";
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Box } from "@mui/material";

export default function AppLayout() {
    const location = useLocation(); // Get the current location

    const isSpecialPage = location.pathname === "/signup"; 

    return (
        <>
            <Navbar />
            <Box
                sx={{
                    minHeight: isSpecialPage ? '110vh' : '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <Outlet />
            </Box>
            <Footer />
        </>
    );
}
