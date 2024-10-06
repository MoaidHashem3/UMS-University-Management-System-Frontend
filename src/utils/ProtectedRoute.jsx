import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    console.log('ProtectedRoute isLoggedIn:', isLoggedIn); // Log the login state

    if (isLoggedIn === null) {
        return null; // Optionally show a loading spinner if fetching auth state
    }

    return isLoggedIn ? children : <Navigate to="/login" />;
};


export default ProtectedRoute;
