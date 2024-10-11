import { Box, Button, Container, Grid, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import CourseCard from "../../components/CourseCard/CourseCard";
import { useEffect, useState } from "react";
import axios from "axios";

const containerStyle = {
  backgroundColor: "secondary.main",
  color: "white",
  padding: "100px 0",
};

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedCourses, setDisplayedCourses] = useState(6);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/courses/");
        setCourses(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleShowMore = () => {
    setDisplayedCourses(prevCount => prevCount + 6);
  };

  if (loading) return (
    <Box sx={{ display: 'flex', margin: 'auto', marginTop: '100px' }}>
      <CircularProgress />
    </Box>
  );
  if (error) return <Typography>Error: {error.message}</Typography>;

  return (
    <Box sx={containerStyle}>
      <Container>
        <Typography
          component={"h2"}
          variant="h3"
          sx={{
            fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
          }}
        >
          Your Academic Journey
        </Typography>
        <Typography component={"p"} sx={{ my: 2 }} variant="body1">
          Find the right course for your future.
        </Typography>

        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          columnSpacing={2}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {courses.slice(0, displayedCourses).map((course) => {
            return (
              <CourseCard
                key={course._id}
                courseTitle={course.title}
                courseDescription={course.description}
                courseImg={course.img}
              />
            );
          })}
        </Grid>

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
      </Container>
    </Box>
  );
}
