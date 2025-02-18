import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTours } from "../../contexts/TourContext";
import { Actions } from "../../contexts/TourContextActions";
import axios from "axios";
import { useTheme } from "../../contexts/ThemeContext";
import { FaPlus, FaMinus } from "react-icons/fa";

function AllTours() {
  const { tours, dispatch } = useTours();
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const navigate = useNavigate();
  const [isListVisible, setIsListVisible] = useState(false);
  useEffect(() => {
    if (tours.length === 0) {
      const fetchTours = async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/tour`
          );
          dispatch({ type: Actions.setTourData, payload: res.data.data.tours });
        } catch (error) {
          // console.error("Error fetching tours:", error);
        }
      };
      fetchTours();
    }
  }, [dispatch, tours.length]);

  async function handleDeleteTour(id) {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/tour/${id}`, {
        withCredentials: true,
      });

      alert("Tour deleted successfully");
      dispatch({ type: Actions.deleteTour, payload: id });
    } catch (error) {
      // console.error(error);
    }
  }

  // console.log("Tours :- ", tours);

  return (
    <div
      className={`max-w-6xl mx-auto p-4 rounded-lg shadow-lg transition ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Toggle Button */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsListVisible(!isListVisible)}
      >
        <h1 className="text-3xl font-bold mb-5">All Tours</h1>
        {isListVisible ? (
          <FaMinus className="text-2xl" />
        ) : (
          <FaPlus className="text-2xl" />
        )}
      </div>

      {/* Tour List */}
      {isListVisible &&
        (tours.length ? (
          <div className="mt-6">
            {tours.map((tour) => (
              <div
                key={tour._id}
                className={`rounded-lg shadow-md p-6 flex flex-col my-3.5 ${
                  isDarkTheme
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <h2
                  className={`text-xl font-semibold ${
                    isDarkTheme ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {tour.name}
                </h2>
                <p
                  className={`text-lg font-medium ${
                    isDarkTheme ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Price: ${tour.price}
                </p>

                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => navigate(`/tour/${tour._id}`)}
                    className={`px-4 py-2 rounded-lg transition ${
                      isDarkTheme
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-blue-600 hover:bg-blue-700"
                    } text-white`}
                  >
                    Visit
                  </button>
                  <button
                    onClick={() => handleDeleteTour(tour._id)}
                    className={`px-4 py-2 rounded-lg transition ${
                      isDarkTheme
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-red-600 hover:bg-red-700"
                    } text-white`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg">No tours found</p>
        ))}
    </div>
  );
}

export default AllTours;
