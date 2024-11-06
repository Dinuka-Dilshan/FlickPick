import { createTheme, GlobalStyles, ThemeProvider } from "@mui/material";
import type { PropsWithChildren } from "react";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#E50914", // Netflix red
    },
    background: {
      default: "#f5f5f5", // Light, neutral background for the site
      paper: "#ffffff", // Bright white for card components
    },
    text: {
      primary: "#333333", // Dark text for readability
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    allVariants: {
      color: "#0E0D0E",
    },
    // h1: {
    //   fontSize: "3rem",
    //   fontWeight: 700,
    //   color: "#333333",
    // },
    // h2: {
    //   fontSize: "2rem",
    //   fontWeight: 600,
    //   color: "#333333",
    // },
    // h3: {
    //   fontSize: "1.75rem",
    //   fontWeight: 600,
    //   color: "#333333",
    // },
    // h4: {
    //   fontSize: "1.5rem",
    //   fontWeight: 500,
    //   color: "#333333",
    // },
    // h5: {
    //   fontSize: "1.25rem",
    //   fontWeight: 500,
    //   color: "#333333",
    // },
    // h6: {
    //   fontSize: "1rem",
    //   fontWeight: 500,
    //   color: "#333333",
    // },
    // subtitle1: {
    //   fontSize: "1rem",
    //   fontWeight: 400,
    //   color: "#585C5F",
    // },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      color: "#585C5F",
    },
    // body1: {
    //   fontSize: "1rem",
    //   color: "#666666",
    // },
    // body2: {
    //   fontSize: "0.875rem",
    //   color: "#888888",
    // },
    // caption: {
    //   fontSize: "0.75rem",
    //   color: "#888888",
    //   textAlign: "center",
    // },
    // overline: {
    //   fontSize: "0.625rem",
    //   color: "#888888",
    //   textTransform: "uppercase",
    // },
    // button: {
    //   fontSize: "0.875rem",
    //   fontWeight: 500,
    //   textTransform: "uppercase",
    //   color: "#333333",
    // },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: { borderRadius: "8px", padding: "1rem 0.5rem", width: "250px" },
      },
    },
  },
});

const AppThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <GlobalStyles styles={{ body: { backgroundColor: "" } }} />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};

export default AppThemeProvider;
