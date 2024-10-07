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
import courseImg from "./assets/images/courseimg.jpeg";
import { useDispatch } from 'react-redux';
import { login, logout } from './redux/authSlice';
import { validateToken } from './utils/auth';
import { jwtDecode } from "jwt-decode";
import Quiz from './components/Quiz/QuizBox';
import EditUser from './components/DrawerContent/EditUser';

const App = () => {
    const courseData = {
        image: courseImg,
        title: "Introduction to Machine Learning",
        description: "Learn the basics of machine learning and its applications.",
        professor: "Dr. John Doe",
        students: [1, 2, 3, 4],
        duration: "10 weeks",
        major: "Computer Science",
    };

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
                { index: true, element: <Home /> },
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
{/* <Quiz quizId="670427d07fcda231463086a3" /> */}