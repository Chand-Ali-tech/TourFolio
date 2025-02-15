import { FaStar } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext"; 

function Reviews({ reviews = [] }) {
  const { theme } = useTheme(); 

  const isDarkTheme = theme === "dark";

  return (
    <div
      className={`mt-6 p-6 rounded-2xl shadow-lg ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-bold">Reviews</h2>

      {reviews.length === 0 ? (
        <p
          className={`mt-4 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}
        >
          No reviews yet.
        </p>
      ) : (
        <div className="mt-4 space-y-4">
          {reviews.map((review, index) => {
            const isAnonymous = review.anonymous;
            const userName = isAnonymous
              ? "Anonymous"
              : review.user?.name || "Unknown User";
            const userPhoto = isAnonymous
              ? "/default.jpg"
              : review.user?.photo || "/default.jpg";

            return (
              <div
                key={index}
                className={`p-4 rounded-xl shadow-md border ${
                  isDarkTheme
                    ? "bg-gray-800 border-gray-700"
                    : "bg-gray-100 border-gray-300"
                }`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={userPhoto}
                    alt={userName}
                    className={`w-12 h-12 rounded-full object-cover border-2 ${
                      isDarkTheme ? "border-gray-600" : "border-gray-400"
                    }`}
                  />
                  <div>
                    <p className="text-lg font-semibold">{userName}</p>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <FaStar
                          key={i}
                          aria-label={`Star rating: ${review.rating || 0}`}
                          className={`text-lg ${
                            i < (review.rating || 0)
                              ? "text-yellow-400"
                              : isDarkTheme
                              ? "text-gray-600"
                              : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p
                  className={`mt-2 ml-16 ${
                    isDarkTheme ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {review.review || "No review text provided."}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


export default Reviews;
