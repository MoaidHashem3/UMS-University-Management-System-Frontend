import { Box, Grid, Paper, Typography } from "@mui/material";

export default function CourseCard({
  courseTitle,
  courseDescription,
  courseImg,
  courseId,
}) {
  return (
    <Grid item xs={4} sm={4} md={3} key={courseId}>
      <Paper
        sx={{
          backgroundColor: "secondary.light",
          borderRadius: "30px",
          color: "white",
          cursor: "pointer",
          "&:hover img": {
            transform: "rotate(3deg) scale(1.1)",
          },
        }}
      >
        <Box sx={{ overflow: "hidden", height: "250px", width: "100%" }}>
          <img
            src={courseImg}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // Ensures the image fills the box while maintaining aspect ratio
              transition: "transform 0.3s ease",
            }}
          />
        </Box>

        <Box padding={2}>
          <Typography component={"h2"} variant="body1">
            {courseTitle}
          </Typography>
          <Typography
            component={"p"}
            sx={{ mt: 1, color: "#ffffffa3" }}
            variant="body2"
          >
            {courseDescription}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
}
