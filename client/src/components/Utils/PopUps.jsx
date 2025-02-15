import { useEffect } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import PropTypes from "prop-types";
import { usePopUpData } from "./../../contexts/PopUpDataContext";
import { useTheme } from "../../contexts/ThemeContext";
import "react-toastify/dist/ReactToastify.css"; // Import default styles

function PopUps() {
  const { popupData, setPopupData } = usePopUpData();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    if (popupData) {
      const { type, message } = popupData;

      const toastOptions = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: isDark ? "dark" : "light",
        transition: Slide, // Smooth sliding animation
      };

      if (type === "success") {
        toast.success(` ${message}`, toastOptions);
      } else if (type === "warning") {
        toast.warn(`${message}`, toastOptions);
      } else if (type === "error") {
        toast.error(`${message}`, toastOptions);
      }

      const timer = setTimeout(() => {
        setPopupData(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [popupData, setPopupData, isDark]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={isDark ? "dark" : "light"}
      transition={Slide}
    />
  );
}

PopUps.propTypes = {
  popupData: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string,
  }),
};

export default PopUps;