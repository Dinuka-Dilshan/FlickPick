import { QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContextProvider";
import AppRoutes from "./routes/AppRoutes";
import queryClient from "./services/query/QueryClient";
import AppThemeProvider from "./theme/AppThemeProvider";

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <AppThemeProvider>
            <AppRoutes />
            <SnackbarProvider />
          </AppThemeProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
