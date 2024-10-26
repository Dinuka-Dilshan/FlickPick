import AppRoutes from "./routes/AppRoutes";
import AppThemeProvider from "./theme/AppThemeProvider";

function App() {
  return (
    <AppThemeProvider>
      <AppRoutes />
    </AppThemeProvider>
  );
}

export default App;
