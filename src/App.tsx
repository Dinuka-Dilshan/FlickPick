import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

import { SnackbarProvider } from "notistack";
import AuthContextProvider from "./contexts/AuthContextProvider";
import AppRoutes from "./routes/AppRoutes";
import queryClient from "./services/query/QueryClient";
import AppThemeProvider from "./theme/AppThemeProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <AppThemeProvider>
            <AppRoutes />
            <SnackbarProvider />
          </AppThemeProvider>
        </QueryClientProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
