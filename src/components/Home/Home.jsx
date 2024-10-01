import React from "react";

import { Container, Typography, Button,Box } from "@mui/material";
import theme from "../../theme";
import bg from '../../assets/images/HomePage-BG.png'
const text1style = {
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    fontWeight: theme.typography.h2.fontWeight,
    fontFamily: theme.typography.h2.fontFamily
}
const text2style = {
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    fontFamily: theme.typography.body1.fontFamily,
    fontWeight: theme.typography.h6.fontWeight,
    marginTop: "30px",
    fontSize: "12px",
    wordSpacing:"3px"

}
const bgstyle = {
    position: 'absolute',
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "100vw",
    zIndex: -1,
}
const btnstyle = {
    justifyContent:"ceneter",
    textAlign: "center",
    alignItems: "center",
  
}

export default function Home() {
    return <>
        <Container sx={bgstyle}>
            <div style={{ marginTop: "70px" }}>
                <Typography sx={text1style} variant="h2">
                    Explore
                    <br />
                    <span>Courses</span>
                </Typography>

                <Typography sx={text2style} variant="h6">
                    Discover and Enroll in a wide range of courses offered by our university
                </Typography>

            </div>
            <Box sx ={btnstyle} >
                <Button  variant="contained">Get Started</Button>
            </Box>

        </Container>







    </>
}