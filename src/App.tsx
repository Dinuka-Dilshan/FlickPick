import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./Query/QueryClient";
import AppRoutes from "./routes/AppRoutes";
import AppThemeProvider from "./theme/AppThemeProvider";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <AppRoutes />
      </AppThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
