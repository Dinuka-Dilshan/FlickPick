import { Alert, Box, LinearProgress } from "@mui/material";
import useAuth from "../../../hooks/useAuth";

const AuthMessages = () => {
  const { isLoading, errorMessage, clearErrorMessage } = useAuth();

  return (
    <Box>
      {errorMessage && (
        <Alert
          sx={{ p: "0.1rem 1rem" }}
          severity="error"
          onClose={clearErrorMessage}
        >
          {errorMessage}
        </Alert>
      )}
      {isLoading && <LinearProgress color="primary"/>}
    </Box>
  );
};

export default AuthMessages;
