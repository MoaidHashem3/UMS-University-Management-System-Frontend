import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#008A90",
    },
    secondary: {
      main: "#222831",
      light: "#393E46",
    },
    success: {
      main: "#14D97D",
    },
    warning: {
      main: "#FC0005",
    },
  },
  typography: {
    h1: {
      fontFamily: "Playfair Display, sans-serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "Playfair Display, sans-serif",
      fontWeight: 700,
    },
    h3: {
      fontFamily: "Playfair Display, sans-serif",
      fontWeight: 700,
    },
    h4: {
      fontFamily: "Playfair Display, sans-serif",
      fontWeight: 700,
    },
    h5: {
      fontFamily: "Playfair Display, sans-serif",
      fontWeight: 700,
    },
    h6: {
      fontFamily: "Playfair Display, sans-serif",
      fontWeight: 700,
    },

    body1: {
      fontFamily: "Lato, sans-serif",
    },
    body2: {
      fontFamily: "Lato, sans-serif",
    },
  },
  components: {
  MuiButton: {
    styleOverrides: {
      root: {
        boxShadow: "none",
        borderRadius: "10px",
        fontFamily: 'Lato, sans-serif',
        fontSize: '16px', 
        textTransform: 'none',
      },
    },
  },},
});

export default theme;
