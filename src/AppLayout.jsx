import React from "react";
import { Outlet } from 'react-router-dom'

export default function AppLayout(){
    return<>
    <p>Navbar</p>
    <Outlet></Outlet>
    </>
}