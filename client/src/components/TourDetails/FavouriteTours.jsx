import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { FaPlus, FaMinus } from "react-icons/fa"; // Import icons

function FavouriteTours() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [setPopupData] = useState(null);
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const [showFavourites, setShowFavourites] = useState(false); // Toggle state

  async function handleRemoveFromFavourite(tourId) {
    if (!user) {
      setPopupData({
        type: "error",
        message: "Kindly login to remove this tour from Favourites!",
      });
      return;
    }

    try {
      await axios.delete(
        `http://localhost:8000/api/tour/removeFromFavorites/${tourId}`,
        {
          withCredentials: true,
        }
      );

      setPopupData({
        type: "success",
        message: "Tour removed from favourites!",
      });

      // ✅ Update the user state to remove the tour from the favorites list
      setUser((prevUser) => ({
        ...prevUser,
        favouriteTours: prevUser.favouriteTours.filter(
          (tour) => tour._id !== tourId
        ),
      }));
    } catch (error) {
      console.error("Error:", error);
      setPopupData({
        type: "error",
        message: "Failed to remove tour from favourites!",
      });
    }
  }

  return (
    <div
      className={`max-w-6xl mx-auto p-4 rounded-lg shadow-lg transition ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Toggle Button */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setShowFavourites(!showFavourites)}
      >
        <h1 className="text-3xl font-bold mb-5">Your Favourite Tours</h1>
        {showFavourites ? (
          <FaMinus className="text-2xl" />
        ) : (
          <FaPlus className="text-2xl" />
        )}
      </div>

      {showFavourites && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.favouriteTours.length > 0 ? (
            user.favouriteTours.map((tour) => (
              <div
                key={tour._id}
                className={`rounded-lg shadow-md p-4 ${
                  isDarkTheme
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <img
                  src={tour.imageCover}
                  alt={tour.name}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h2 className="text-xl font-semibold mt-2">{tour.name}</h2>
                <p className="text-lg font-bold text-red-400">${tour.price}</p>

                <button
                  onClick={() => navigate(`/tour/${tour._id}`)}
                  className={`mt-3 py-2 px-4 rounded-md transition ${
                    isDarkTheme
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  Visit Now
                </button>

                <button
                  onClick={() => handleRemoveFromFavourite(tour._id)}
                  className={`mt-3 mx-10 py-2 px-4 rounded-md transition ${
                    isDarkTheme
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-red-400 hover:bg-red-700"
                  } text-white`}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className={isDarkTheme ? "text-gray-400" : "text-gray-600"}>
              You have no favorite tours yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default FavouriteTours;
