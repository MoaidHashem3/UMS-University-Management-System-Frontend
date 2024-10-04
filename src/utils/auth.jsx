import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const API_URL = 'http://localhost:3000/users'; // Replace with your actual API URL

export const handleLogin = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        const { token } = response.data;
        localStorage.setItem('authToken', token);
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
