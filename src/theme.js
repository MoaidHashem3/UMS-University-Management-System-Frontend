import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  zIndex: {
    appBar: 1251,
    modal: 1250,
  },
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
        borderRadius: "5px",
        fontFamily: 'Lato, sans-serif',
        fontSize: '16px', 
        textTransform: 'none',
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiInputLabel-root': { color: 'white' },
              '& .MuiInputBase-input': { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
},
              },
            },
        },
    },
},});

export default theme;
