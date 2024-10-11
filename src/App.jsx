import { React, useEffect,useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Provider, useSelector } from 'react-redux';
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
import CourseDetails from './components/courseDetails/CourseDetails';
import { useDispatch } from 'react-redux';
import { login, logout } from './redux/authSlice';
import { validateToken } from './utils/auth';
import { jwtDecode } from "jwt-decode";
import CourseContent from './components/CourseContent/CourseContent';
import NotFound from './pages/NotFound/NotFound';
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
        return <div>Loading...</div>;
    }

    const routes = createBrowserRouter([
        {
            path: "/",
            element: <AppLayout />,
            children: [
                { index: true, element: <CourseContent courseId= "6708b5c7b4cd2b6602e59104" /> },
                { path: "signup", element: <SignUp /> },
                { path: "login", element: <SignIn /> },
                { path: "home", element: <Home /> },
                { path: "courses", element: <Courses /> },
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
        },,
    ]);

    if(isLoggedIn)
        console.log('User Data:', user.role );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={routes} />
        </ThemeProvider>
    );
};

export default App;
{/*  */}