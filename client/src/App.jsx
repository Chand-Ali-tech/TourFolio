import { useLocation } from "react-router-dom"; // Import useLocation
import Header from "./components/Header/Header";
import AppRoutes from "./routes/AppRoutes";
import PopUps from "./components/Utils/PopUps";
import { usePopUpData } from "./contexts/PopUpDataContext";
import Loader from "./components/Utils/Loader";
import { useLoading } from "./contexts/LoadingContext";
import Footer from "./components/Footer/Footer";
import { useTheme } from "./contexts/ThemeContext";

function App() {
  const { popupData } = usePopUpData();
  const { loading } = useLoading();
  const location = useLocation();
  const { theme } = useTheme();

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-[#111827] text-[#e5e7eb]"
          : "bg-[#f8f8f8] text-[#1f2937]"
      } min-h-screen`}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <AppRoutes />
          {/* Hide Footer only on '/tours' route */}
          {location.pathname !== "/tours" && <Footer />}
          {popupData && (
            <PopUps type={popupData.type} message={popupData.message} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
