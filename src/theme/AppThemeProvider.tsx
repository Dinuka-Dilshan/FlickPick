import { createTheme, GlobalStyles, ThemeProvider } from "@mui/material";
import type { PropsWithChildren } from "react";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          borderColor: "#757575",
          color: "#FFF",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px",
            borderColor: "#757575",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#757575",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#757575",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#757575", // Default label color
          "&.Mui-focused": {
            color: "#757575", // Focused label color
          },
          "&.MuiInputLabel-shrink": {
            color: "#757575", // Shrinked label color (when field is focused or has a value)
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          p: "0.75rem",
          borderRadius: "12px",
          border: "1px solid #5B6065",
          color: "#FFF",
          ":hover": { bgcolor: "#2A2C31" },
          ":disabled": {
            color: "#FFF",
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: "12px",
          padding: "1rem 0.5rem",
          width: "250px",
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: "#ff4081", // Change the icon color to secondary color (or any color you like)
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#9333ea",
    },
  },
});

const AppThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <GlobalStyles styles={{ body: { backgroundColor: "#1F1F1F" } }} />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};

export default AppThemeProvider;
