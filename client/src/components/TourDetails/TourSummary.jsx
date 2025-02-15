import {
  FaMapMarkerAlt,
  FaStar,
  FaUsers,
  FaClock,
  FaDollarSign,
} from "react-icons/fa";
import { MdSignalCellularAlt } from "react-icons/md";
import { useTheme } from "../../contexts/ThemeContext"; // Import Theme Context

function TourSummary({ tour }) {
  const { theme } = useTheme(); // Get theme state

  return (
    <div>
      <p
        className={`text-lg mt-2 ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {tour.summary}
      </p>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {/* Duration */}
        <div
          className={`p-4 rounded-xl shadow-md flex items-center gap-2 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <FaClock className="text-blue-500" size="20px" />
          <div>
            <p
              className={`text-xl font-semibold ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Duration:
            </p>
            <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
              {tour.duration} days
            </p>
          </div>
        </div>

        {/* Difficulty */}
        <div
          className={`p-4 rounded-xl shadow-md flex items-center gap-2 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <MdSignalCellularAlt
            className={`${
              tour.difficulty === "hard" ? "text-red-500" : "text-gray-800"
            }`}
            size="20px"
          />
          <div>
            <p
              className={`text-xl font-semibold ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Difficulty:
            </p>
            <p
              className={`capitalize ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {tour.difficulty}
            </p>
          </div>
        </div>

        {/* Location */}
        <div
          className={`p-4 rounded-xl shadow-md flex items-center gap-2 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <FaMapMarkerAlt className="text-red-500" size="20px" />
          <div>
            <p
              className={`text-xl font-semibold ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Location:
            </p>
            <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
              {tour.locations.length > 0
                ? `${tour.locations}`
                : "Location Unavailable"
              }
            </p>
          </div>
        </div>

        {/* Group Size */}
        <div
          className={`p-4 rounded-xl shadow-md flex items-center gap-2 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <FaUsers className="text-green-500" size="20px" />
          <div>
            <p
              className={`text-xl font-semibold ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Group Size:
            </p>
            <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
              {tour.maxGroupSize} people
            </p>
          </div>
        </div>

        {/* Rating */}
        <div
          className={`p-4 rounded-xl shadow-md flex items-center gap-2 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <FaStar className="text-yellow-500" size="20px" />
          <div>
            <p
              className={`text-xl font-semibold ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Rating:
            </p>
            <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
              {tour.averageRating} ({tour.ratingQuantity} reviews)
            </p>
          </div>
        </div>

        {/* Price */}
        <div
          className={`p-5 flex items-center gap-3 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          } rounded-xl shadow-md`}
        >
          <FaDollarSign className="text-red-600" size="28px" />
          <div>
            <p className="text-2xl font-bold text-red-500">{tour.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourSummary;
