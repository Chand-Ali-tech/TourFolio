import { FaMapMarkedAlt, FaCalendarAlt, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./../../contexts/ThemeContext"; // Import Theme Context

const Dashboard = () => {
  const navigate = useNavigate();
  const { theme } = useTheme(); // Get theme state

  const handleViewTours = () => {
    navigate("/tours");
  };

  return (
    <div
      className={`min-h-screen p-8 ${
        theme === "dark"
          ? "bg-[#111827] text-[#e5e7eb]"
          : "bg-[#f8f8f8] text-[#1f2937]"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Welcome to TOURFOLIO</h1>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Card 1: Upcoming Tours */}
          <div
            className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow ${
              theme === "dark"
                ? "bg-[#1f2937] text-[#e5e7eb]"
                : "bg-white text-gray-800"
            }`}
          >
            <div className="flex items-center mb-4">
              <FaMapMarkedAlt className="text-blue-500 text-2xl mr-3" />
              <h2 className="text-xl font-semibold">Upcoming Tours</h2>
            </div>
            <p className="mb-4">
              Explore the latest tours and plan your next adventure with us.
            </p>
          </div>

          {/* Card 2: Bookings */}
          <div
            className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow ${
              theme === "dark"
                ? "bg-[#1f2937] text-[#e5e7eb]"
                : "bg-white text-gray-800"
            }`}
          >
            <div className="flex items-center mb-4">
              <FaCalendarAlt className="text-green-500 text-2xl mr-3" />
              <h2 className="text-xl font-semibold">Your Bookings</h2>
            </div>
            <p className="mb-4">
              Manage your current bookings and check your travel schedule.
            </p>
          </div>

          {/* Card 3: Travel Community */}
          <div
            className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow ${
              theme === "dark"
                ? "bg-[#1f2937] text-[#e5e7eb]"
                : "bg-white text-gray-800"
            }`}
          >
            <div className="flex items-center mb-4">
              <FaUsers className="text-purple-500 text-2xl mr-3" />
              <h2 className="text-xl font-semibold">
                Travel Community{" "}
                <span className="font-semibold">(coming soon)</span>
              </h2>
            </div>
            <p className="mb-4">
              Connect with fellow travelers and share your experiences.
            </p>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div
          className={`p-8 rounded-lg shadow-md text-center ${
            theme === "dark"
              ? "bg-[#1f2937] text-[#e5e7eb]"
              : "bg-white text-gray-900"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">
            Ready for Your Next Adventure?
          </h2>
          <p className="mb-6">
            Discover amazing tours and create unforgettable memories. Click
            below to explore all available tours.
          </p>
          <button
            onClick={handleViewTours}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center mx-auto"
          >
            <FaMapMarkedAlt className="mr-2" /> Explore All Tours
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
