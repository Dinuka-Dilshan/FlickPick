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
          p: "0.75rem",
          borderRadius: "12px",
          borderColor: "#5B6065",
          color: "#BFBFBF",
          ":hover": { bgcolor: "#2A2C31" },
          ":disabled": { color: "#BFBFBF", borderColor: "#5B6065" },
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
      <GlobalStyles styles={{ body: { backgroundColor: "#1F1F1F" } }} />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};

export default AppThemeProvider;
