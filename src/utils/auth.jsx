import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import axiosInstance from "../axiosConfig";
export const handleLogin = async (credentials) => {
    try {
        const response = await axiosInstance.post("/users/login", credentials);
        const { token } = response.data;
        localStorage.setItem('authToken', token);
        return response.data; 
    } catch (error) {
        throw error; 
    }
};

export const handleForgotPassword = async (email) => {
    try {
        const response = await axiosInstance.post(`/forgot-password`, { email });
        return response.data; 
    } catch (error) {
        throw error; 
    }
};

export const validateToken = () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        return false; 
    }

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; 
        return decodedToken.exp > currentTime; 
    } catch (error) {
        console.error('Token decoding failed:', error);
        return false; 
    }
};

export const logout = () => {
    localStorage.removeItem('authToken'); 
};
