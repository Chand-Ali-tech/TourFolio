import AllTours from "../TourDetails/AllTours";
import Profile from "../User/Profile";
import NewTour from "../TourDetails/NewTour";
import AllUsers from "../User/AllUsers";
import { useTheme } from "./../../contexts/ThemeContext"; // Import ThemeContext

function AdminPanel({ tours }) {
  const { theme } = useTheme(); // Get the current theme (dark or light)
  const isDarkTheme = theme === "dark";
  // console.log("Tours from admin panel:-", tours);

  return (
    <div
      className={`min-h-screen p-6 ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1
        className={`text-3xl font-bold text-center my-6 ${
          isDarkTheme ? "text-gray-200" : "text-gray-800"
        }`}
      >
        Welcome,👑 Admin of{" "}
        <span className={isDarkTheme ? "text-yellow-400" : "text-black"}>
          TourFolio!
        </span>
      </h1>
      <div className="space-y-6">
        <Profile />
        <AllTours tours={tours} />
        <NewTour />
        <AllUsers />
      </div>
    </div>
  );
}

export default AdminPanel;
