import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import ToursProvider from "./contexts/TourContext.jsx";
import AuthProvider from "./contexts/AuthContext.jsx";
import PopUpDataProvider from "./contexts/PopUpDataContext";
import LoadingProvider from "./contexts/LoadingContext.jsx";
import ThemeProvider from "./contexts/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadingProvider>
      <ThemeProvider>
        <PopUpDataProvider>
          <AuthProvider>
            <ToursProvider>
              <Router>
                <App />
              </Router>
            </ToursProvider>
          </AuthProvider>
        </PopUpDataProvider>
      </ThemeProvider>
    </LoadingProvider>
  </StrictMode>
);