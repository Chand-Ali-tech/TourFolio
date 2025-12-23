import { useEffect, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import axios from "axios";
import { FaPlus, FaMinus } from "react-icons/fa";

function UserReviews() {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const [userReviews, setUserReviews] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUserReviews() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/reviews`,
          {
            withCredentials: true,
            signal: controller.signal,
          }
        );
        setUserReviews(res.data.data);
      } catch (error) {
        // alert("Error getting user reviews.")
      }
    }

    fetchUserReviews();
    return () => {
      controller.abort();
    };
  }, []);

  const handleDelete = async (reviewId, tourId) => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/tour/${tourId}/review/${reviewId}`,
        { withCredentials: true }
      );

      setUserReviews((prevReviews) =>
        prevReviews.filter((r) => r._id !== reviewId)
      );
    } catch (error) {
      // console.error("Error deleting review:", error);
    }
  };

  return (
    <div
      className={`max-w-6xl mx-auto p-4 rounded-lg shadow-lg transition ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Toggle Header */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h1 className="text-3xl font-bold mb-5">Your Reviews</h1>
        {isExpanded ? (
          <FaMinus className="text-2xl" />
        ) : (
          <FaPlus className="text-2xl" />
        )}
      </div>

      {isExpanded &&
        ((userReviews ?? []).length === 0 ? (
          <p className="text-center text-gray-400">
            You have not posted any reviews yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {userReviews.map((review) => (
              <div
                key={review._id}
                className={`rounded-xl shadow-md p-6 border transition ${
                  isDarkTheme
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                {/* Tour Name */}
                <h3 className="text-lg font-bold text-blue-500 mb-2">
                  {review.tour?.name || "Tour Name Unavailable"}
                </h3>

                {/* Review Text */}
                <p className={isDarkTheme ? "text-gray-300" : "text-gray-700"}>
                  {review.review || "No review text available."}
                </p>

                {/* Rating */}
                <p className="text-yellow-500 font-semibold mt-2">
                  ⭐ {review.rating ? `${review.rating}/5` : "No Rating"}
                </p>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(review._id, review.tour?._id)}
                  className={`mt-4 px-4 py-2 rounded-lg transition-all w-40 ${
                    isDarkTheme
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                >
                  Delete Review
                </button>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}

export default UserReviews;
