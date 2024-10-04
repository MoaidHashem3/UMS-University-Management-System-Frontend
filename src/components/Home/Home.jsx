import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import theme from "../../theme";
import bg from '../../assets/images/HomePage-BG.png'
import Footer from "../Footer/Footer";
const text1style = {
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    fontSize: "70px",
    fontWeight: 800,
}
const text2style = {
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    fontFamily: theme.typography.body1.fontFamily,
    fontWeight: 500,
    marginTop: "30px",
    fontSize: "12px",
    wordSpacing: "3px"

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
const boxstyle = {
    justifyContent: "ceneter",
    textAlign: "center",
    alignItems: "center",

}
const btnstyle = {
    borderRadius: 20,
}


export default function Home() {
    return <>
        <Box sx={bgstyle}>
            <Container >
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
                <Box sx={boxstyle} >
                    <Button sx={btnstyle} variant="contained" >Get Started</Button>
                </Box>

            </Container>

        </Box>
        {/* <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        </Box> */}
    </>
}