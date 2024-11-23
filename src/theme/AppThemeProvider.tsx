import { createTheme, GlobalStyles, ThemeProvider } from "@mui/material";
import type { PropsWithChildren } from "react";

const theme = createTheme({
  components: {
    
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          borderColor: "primary.main",
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
          borderRadius: "12px",
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: { borderRadius: "12px", padding: "1rem 0.5rem", width: "250px" },
      },
    },
  },
  
});

const AppThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <GlobalStyles styles={{ body: { backgroundColor: "#2D2D2D" } }} />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};

export default AppThemeProvider;
