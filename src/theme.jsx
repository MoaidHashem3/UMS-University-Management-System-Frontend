import { createTheme } from "@mui/material/styles";
import { GlobalStyles } from '@mui/material';
export const inputStyles = (
  <GlobalStyles
    styles={{
      'input:-webkit-autofill': {
        boxShadow: '0 0 0 1000px #222831 inset !important',  // background to match your theme color
        '-webkit-box-shadow': '0 0 0 1000px #222831 inset !important',
        '-webkit-text-fill-color': '#fff !important', // change to your desired text color
        transition: 'background-color 5000s ease-in-out 0s',
      },
      'input:-webkit-autofill:focus': {
        boxShadow: '0 0 0 1000px #222831 inset !important',
        '-webkit-box-shadow': '0 0 0 1000px #222831 inset !important',
        '-webkit-text-fill-color': '#fff !important',
        transition: 'background-color 5000s ease-in-out 0s',
      },
      'input:-webkit-autofill:hover': {
        boxShadow: '0 0 0 1000px #222831 inset !important',
        '-webkit-box-shadow': '0 0 0 1000px #222831 inset !important',
        '-webkit-text-fill-color': '#fff !important',
        transition: 'background-color 5000s ease-in-out 0s',
      },
    }}
  ></GlobalStyles>
);
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
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': { color: 'white' },
          '& .MuiInputBase-input': { color: 'white' },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white', // Set the border color to white
            color: 'white'
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main', // Keep border white on hover
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'white', // Set the label color to white
          '&.Mui-focused': {
            color: 'white', // Keep label white when focused
          },
        },
      },
    },
  },
});

export default theme;
