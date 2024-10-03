import { Box, Button, Container, Grid, Typography } from "@mui/material";
import CourseCard from "../../components/CourseCard/CourseCard";
import courseImg from "../../assets/images/courseimg.jpeg";

const containerStyle = {
  backgroundColor: "secondary.main",
  color: "white",
  padding: "100px 0",
};

export default function Courses() {
    const courses = [
        { title: "Introduction to Computer Science", description: "Learn the fundamentals of computer science.",img: courseImg, },
        { title: "Data Structures", description: "Explore common data structures and their uses.",img: courseImg, },
        { title: "Web Development", description: "Learn to build modern web applications.",img: courseImg, },
        { title: "Machine Learning", description: "Get introduced to machine learning algorithms.",img: courseImg, },
        { title: "Cyber Security", description: "Understand security fundamentals in the digital age.",img: courseImg, },
        { title: "Cloud Computing", description: "Learn the basics of cloud services and infrastructure.",img: courseImg, },
        { title: "Mobile App Development", description: "Build mobile applications for Android and iOS.", img: courseImg, },
        { title: "Artificial Intelligence", description: "Dive into AI techniques and applications.", img: courseImg, }
      ]; // fake data from backend

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
          {courses.map((course) => {
            return (
              <CourseCard
                key={course.courseId}
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
            href="#showMore"
          >
            Show more
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
