import { FaMapMarkerAlt, FaStar, FaUsers, FaClock } from "react-icons/fa";
import { MdSignalCellularAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext"; // Import Theme Context

const TourCard = ({ tour }) => {
  const navigate = useNavigate();
  const { theme } = useTheme(); // Get theme state

  return (
    <div
      className={`border rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-103 cursor-pointer ${
        theme === "dark"
          ? "bg-[#1f2937] text-[#e5e7eb]"
          : "bg-white text-gray-900"
      }`}
      onClick={() => navigate(`/tour/${tour._id}`)}
    >
      <img
        src={tour.imageCover}
        alt={`Tour image for ${tour.name}`}
        className="w-full h-45 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{tour.name}</h2>

        <div className="flex flex-wrap">
          <div className="w-1/2">
            <div className="flex items-center gap-2 text-sm mb-2">
              <MdSignalCellularAlt className="text-gray-500" />
              <span
                className={`capitalize ${
                  tour.difficulty === "hard" ? "text-red-500" : "text-gray-600"
                }`}
              >
                {tour.difficulty}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm mb-2">
              <FaMapMarkerAlt className="text-red-500" />
              <span>{tour?.locations}</span>
            </div>

            <div className="flex items-center gap-2 text-sm mb-2">
              <FaClock className="text-blue-500" />
              <span>{tour.duration} days</span>
            </div>
          </div>

          <div className="w-1/2">
            <div className="flex items-center gap-2 text-sm mb-2">
              <FaUsers className="text-green-500" />
              <span>Group: {tour.maxGroupSize} people</span>
            </div>

            <div className="flex items-center gap-2 text-sm mb-2">
              <FaStar className="text-yellow-500" />
              <span>
                {tour.averageRating} ({tour.ratingQuantity} reviews)
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-green-600">
            ${tour.price}
          </span>
          <button
            className={`px-4 py-2 rounded-lg text-sm transition cursor-pointer ${
              theme === "dark"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            aria-label={`View details for ${tour.name}`}
            onClick={() => navigate(`/tour/${tour._id}`)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
