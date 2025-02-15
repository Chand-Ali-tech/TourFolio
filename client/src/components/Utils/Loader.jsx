import { InfinitySpin } from "react-loader-spinner";
import { useTheme } from "./../../contexts/ThemeContext";

// eslint-disable-next-line react/prop-types
function Loader({ type = "large" }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex items-center justify-center">
      {type === "small" ? (
        <InfinitySpin
          visible={true}
          width="100"
          color={isDark ? "#ffffff" : "#000000"}
          ariaLabel="infinity-spin-loading"
        />
      ) : (
        <div className="flex justify-center items-center h-screen w-full bg-opacity-50 transition-all duration-300">
          <InfinitySpin
            visible={true}
            width="300"
            color={isDark ? "#ffffff" : "#000000"}
            ariaLabel="infinity-spin-loading"
          />
        </div>
      )}
    </div>
  );
}

export default Loader;
