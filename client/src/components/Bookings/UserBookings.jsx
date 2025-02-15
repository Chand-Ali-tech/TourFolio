import axios from "axios";
import { useEffect, useState } from "react";
import { formatDate } from "../Utils/DateFormatter";
import { useTours } from "../../contexts/TourContext";
import { Actions } from "../../contexts/TourContextActions";
import { useTheme } from "../../contexts/ThemeContext";
import { FaPlus, FaMinus } from "react-icons/fa"; // Import icons

function UserBookings() {
  const { dispatch, bookings } = useTours();
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const [isExpanded, setIsExpanded] = useState(false); // Initially collapsed

  useEffect(() => {
    const controller = new AbortController();

    async function getUserBookings() {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/booking/userBookings",
          {
            withCredentials: true,
            signal: controller.signal,
          }
        );
        dispatch({ type: Actions.setBookings, payload: res.data.data });
      } catch (error) {
        // alert("Error fetching bookings")
      }
    }

    getUserBookings();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div
      className={`max-w-6xl mx-auto p-4 rounded-lg shadow-lg transition ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Toggle Button */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h1 className="text-3xl font-bold mb-5">Your Tour Bookings History</h1>
        {isExpanded ? (
          <FaMinus className="text-2xl" />
        ) : (
          <FaPlus className="text-2xl" />
        )}
      </div>

      {isExpanded &&
        ((bookings ?? []).length === 0 ? (
          <p className="text-center">No bookings found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className={`rounded-lg shadow-lg p-4 transition-colors ${
                  isDarkTheme ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <img
                  src={booking.tour?.imageCover || "/default-tour.jpg"}
                  alt={booking.tour?.name || "Tour Image"}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h2 className="text-xl font-semibold mt-3">
                  {booking.tour?.name || "No Tour Name"}
                </h2>
                <p>
                  Price:{" "}
                  <span className="font-bold">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(booking.price)}
                  </span>
                </p>
                <p>{formatDate(booking.createdAt)}</p>
                <p
                  className={`mt-2 text-sm px-2 py-1 rounded-lg text-white inline-block ${
                    booking.paymentStatus === "paid"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {booking.paymentStatus}
                </p>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}

export default UserBookings;
