import { Box, Button, Container, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import CourseCard from "../../components/CourseCard/CourseCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CourseContent from '../../components/CourseContent/CourseContent'; 
import CourseDetails from "../../components/courseDetails/CourseDetails"; 
import axiosInstance from "../../axiosConfig";

const containerStyle = {
  backgroundColor: "secondary.main",
  color: "white",
  minHeight: "100vh",  // Ensure the background covers the full height
  width: "100%",
  display: 'flex',
  flexDirection: 'column',
};

const contentWrapperStyle = {
  flex: 1,  // This ensures the content takes up the available space
  display: 'flex',
  flexDirection: 'column',
};

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedCourses, setDisplayedCourses] = useState(6);
  const [selectedCourseId, setSelectedCourseId] = useState(null); // State for selected course

  const user = useSelector((state) => state.auth.user);
  const enrolledCourses = user?.enrolledCourses || []; 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get("/courses/");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleShowMore = () => {
    setDisplayedCourses(prevCount => prevCount + 6);
  };

  const handleCardClick = (courseId) => {
    setSelectedCourseId(courseId);
  };

  const handleBackClick = () => {
    setSelectedCourseId(null); 
  };

  if (loading) return (
    <Box sx={{ display: 'flex', margin: 'auto', marginTop: '100px' }}>
      <CircularProgress />
    </Box>
  );

  const selectedCourse = courses.find(course => course._id === selectedCourseId);

  return (
    <Box sx={containerStyle}>
      <Container>
        {selectedCourseId ? (
          <Box>
            <Button variant="outlined" onClick={handleBackClick} sx={{ mb: 3, mt: 2 }}>
              Back to Courses
            </Button>
            {selectedCourse && (
              <>
                {user && enrolledCourses.includes(selectedCourse._id) ? (
                  <CourseContent courseId={selectedCourse._id} />
                ) : (
                  <CourseDetails course={{ selectedCourse }} />
                )}
              </>
            )}
          </Box>
        ) : (
          <Box sx={contentWrapperStyle}>
            <Typography
              component={"h2"}
              variant="h3"
              sx={{
                fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
                textAlign: "left",
                mb: 2,
                mt: 2,
              }}
            >
              Your Academic Journey
            </Typography>
            <Typography component={"p"} sx={{ my: 2, textAlign: "left" }} variant="body1">
              Find the right course for your future.
            </Typography>

            {courses.length > 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'left',
                  gap: '20px', 
                }}
              >
                {courses.slice(0, displayedCourses).map((course) => {
                  const normalizedImgPath = course.image
                    ? course.image.replace(/\\/g,'/')
                    : 'default/path/to/image.jpg';
                  return (
                    <Box 
                      key={course._id} 
                      onClick={() => handleCardClick(course._id)} 
                      sx={{ 
                        width: { xs: '100%', sm: '300px', md: '350px' }, // Card width
                        cursor: 'pointer',
                        borderRadius: '8px',
                        transition: 'transform 0.3s', // Add a hover effect
                        '&:hover': {
                          transform: 'scale(1.05)', // Scale up on hover
                        },
                      }}
                    >
                      <CourseCard
                        courseTitle={course.title}
                        courseDescription={course.description}
                        courseImg={`${import.meta.env.VITE_API_URL}/${normalizedImgPath}`}
                      />
                    </Box>
                  );
                })}
              </Box>
            ) : (
              <Typography
                variant="h6"
                sx={{ textAlign: 'center', mt: 5 }}
              >
                No courses available at the moment.
              </Typography>
            )}

            {!selectedCourseId && courses.length > 0 && ( // Show "Show more" button only if no course is selected and there are courses
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 5,
                }}
              >
                <Button
                  sx={{
                    borderRadius: "45px",
                    padding: "15px 30px",
                  }}
                  variant="contained"
                  onClick={handleShowMore}
                  disabled={displayedCourses >= courses.length}
                >
                  Show more
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
}
