import { React, useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Provider, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import ProtectedRoute from './utils/ProtectedRoute';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import AppLayout from './AppLayout';
import { RouterProvider } from 'react-router-dom';
import Courses from './pages/Courses/Courses';
import { useDispatch } from 'react-redux';
import { login, logout } from './redux/authSlice';
import { validateToken } from './utils/auth';
import { jwtDecode } from "jwt-decode";
import CourseContent from './components/CourseContent/CourseContent';
import NotFound from './pages/NotFound/NotFound';
import ForgotPassword from './pages/ForgetPassword/ForgetPassword';
import ResetPassword from './pages/RestPassword/RestPassword';
import AboutUs from './pages/AboutUs/AboutUs';
const App = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const tokenIsValid = validateToken();
        if (tokenIsValid) {
            const token = localStorage.getItem('authToken');
            const decodedToken = jwtDecode(token);
            dispatch(login(decodedToken));
        } else {
            dispatch(logout());
            localStorage.removeItem('authToken');
        }
        setLoading(false);
    }, [dispatch]);

    if (loading) {
        return <CircularProgress/>
    }

    const routes = createBrowserRouter([
        {
            path: "/",
            element: <AppLayout />,
            children: [
                { index: true, element: <Home /> },
                { path: "signup", element: <SignUp /> },
                { path: "login", element: <SignIn /> },
                { path: "home", element: <Home /> },
                { path: "courses", element: <Courses /> },
                { path: "aboutUs", element: <AboutUs /> },
                { path: "courses/:courseId/content", element: <CourseContent /> },
                { path: "/forgot-password", element: <ForgotPassword /> },
                { path: "/reset-password/:token", element: <ResetPassword /> },
                {
                    path: "dashboard",
                    element: (
                        <ProtectedRoute>
                            <Dashboard
                            />
                        </ProtectedRoute>
                    ),

                },
                { path: "*", element: <NotFound /> },

            ],
        }, ,
    ]);

    if (isLoggedIn)
        console.log('User Data:', user.role);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={routes} />
        </ThemeProvider>
    );
};

export default App;
{/*  */ }