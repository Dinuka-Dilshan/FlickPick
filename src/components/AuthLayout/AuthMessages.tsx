import { Alert, Box, LinearProgress } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

const AuthMessages = () => {
  const { errorMessage, infoMessage, isLoading, clearErrorMessage, clearInfo } =
    useAuth();
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
      {infoMessage && (
        <Alert sx={{ p: "0.1rem 1rem" }} severity="info" onClose={clearInfo}>
          {infoMessage}
        </Alert>
      )}
      {isLoading && <LinearProgress />}
    </Box>
  );
};

export default AuthMessages;
