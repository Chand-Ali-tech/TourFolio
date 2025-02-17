import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { FaChartLine, FaStar, FaMoneyBillWave, FaUsers } from "react-icons/fa";
import { useTheme } from "./../../contexts/ThemeContext"; // Import Theme Context

const COLORS = ["#4CAF50", "#FFC107", "#FF5722"];

function ToursStats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme(); // Get current theme

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/tour/tour-stats`
        );
        setStats(response.data.data);
      } catch (error) {
        alert("Error fetching tour stats");
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div
      className={`max-w-6xl mx-auto my-10 p-8 shadow-xl rounded-xl ${
        theme === "dark"
          ? "bg-[#1f2937] text-[#e5e7eb]"
          : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-4xl font-bold text-center mb-8">
        📊 Tour Statistics Overview
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading statistics...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Donut Chart */}
          <div
            className={`flex flex-col items-center p-6 shadow-lg rounded-lg ${
              theme === "dark" ? "bg-[#374151]" : "bg-gray-50"
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">
              Tours Distribution by Difficulty
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats}
                  dataKey="numTours"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {stats.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat._id}
                className={`p-6 rounded-lg text-center shadow-md transition-transform transform hover:scale-105
                                ${
                                  index === 0
                                    ? "border-l-4 border-green-600"
                                    : index === 1
                                    ? "border-l-4 border-yellow-600"
                                    : "border-l-4 border-red-600"
                                } ${
                  theme === "dark"
                    ? "bg-[#4b5563] text-[#e5e7eb]"
                    : `bg-${
                        index === 0 ? "green" : index === 1 ? "yellow" : "red"
                      }-100`
                }`}
              >
                {/* Difficulty Title */}
                <h3
                  className={`text-2xl font-bold capitalize ${
                    index === 0
                      ? "text-green-600"
                      : index === 1
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {stat._id} Level
                </h3>

                {/* Stats List */}
                <div className="mt-3 flex flex-col gap-3">
                  {" "}
                  {/* Use flex-col and gap-3 for vertical spacing */}
                  <div className="flex items-center justify-center gap-2">
                    {" "}
                    {/* Use flex for horizontal alignment */}
                    <FaChartLine className="text-blue-500" />
                    <span className="font-semibold">
                      Tours: {stat.numTours}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <FaStar className="text-yellow-500" />
                    <span className="font-semibold">
                      Avg Rating: {stat.avgRating.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <FaMoneyBillWave className="text-green-500" />
                    <span className="font-semibold">
                      Avg Price: ${stat.avgPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <FaUsers className="text-purple-500" />
                    <span className="font-semibold">
                      Total Ratings: {stat.numRating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ToursStats;
