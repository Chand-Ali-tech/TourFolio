import { useEffect, useState } from "react";
import { useTours } from "../contexts/TourContext";
import TourCard from "./../components/TourDetails/TourCard";
import axios from "axios";
import { Actions } from "../contexts/TourContextActions";
import Loader from "./../components/Utils/Loader";
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";
import { useTheme } from "../contexts/ThemeContext"; // Import Theme Context

function TourList() {
  const { tours, dispatch } = useTours();
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState(false); // False = ascending, true = descending
  const [difficulty, setDifficulty] = useState("");
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  const { theme } = useTheme(); // Get theme state

  useEffect(() => {
    document.title = "Tour-Folio | tours";
  }, []);

  useEffect(() => {
    fetchTourData();
  }, [sortBy, order, difficulty, rating, price, page, limit]); // Add `page` and `limit` to dependencies

  async function fetchTourData() {
    setLoading(true);
    try {
      let query = "";
      if (difficulty) query += `&difficulty=${difficulty}`;
      if (rating) query += `&averageRating[gte]=${rating}`;
      if (price) query += `&price[gte]=${price}`;
      if (sortBy) {
        if (order) {
          query += `&sort=-${sortBy}`;
        } else {
          query += `&sort=${sortBy}`;
        }
      }
      if (page) query += `&page=${page}`;
      if (limit) query += `&limit=${limit}`;

      const res = await axios.get(`http://localhost:8000/api/tour?${query}`);
      console.log("Response:-", res.data.data);

      dispatch({ type: Actions.setTourData, payload: res.data.data.tours });
      setTotalPages(Math.ceil(res.data.data.Totaltours / limit));
    } catch (error) {
      console.error("Error fetching tours:", error);
    } finally {
      setLoading(false);

      
    }
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage); // Update the page state
    }
  };

  return (
    <div
      className={`flex ${
        theme === "dark"
          ? "bg-gray-900 text-gray-200"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Sidebar - Fixed & Non-Scrolling */}
      <div
        className={`w-1/5 p-4 shadow-2xl h-screen fixed ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2
          className={`text-lg font-semibold mb-4 ${
            theme === "dark" ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Filters
        </h2>

        {/* Difficulty */}
        <div className="flex items-center justify-between mb-3">
          <label
            className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Difficulty:
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className={`w-32 p-1 border rounded-md text-sm ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="">All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="difficult">Difficult</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="flex items-center justify-between mb-3">
          <label
            className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Sort By:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`w-32 p-1 border rounded-md text-sm ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="">None</option>
            <option value="price">Price</option>
            <option value="averageRating">Rating</option>
            <option value="duration">Duration</option>
            <option value="maxGroupSize">Group Size</option>
          </select>
        </div>

        {/* Order */}
        <div className="flex items-center justify-between mb-3">
          <label
            className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Order:
          </label>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className={`w-32 p-1 border rounded-md text-sm ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="">None</option>
            <option value={false}>Ascending</option>
            <option value={true}>Descending</option>
          </select>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between mb-3">
          <label
            className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Rating:
          </label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className={`w-32 p-1 border rounded-md text-sm ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value={1}>More than 1</option>
            <option value={2}>More than 2</option>
            <option value={3}>More than 3</option>
            <option value={4}>More than 4</option>
            <option value={4.5}>More than 4.5</option>
          </select>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <label
            className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Price ($):
          </label>
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={`w-32 p-1 border rounded-md text-sm ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value={1000}>More than 1000</option>
            <option value={2000}>More than 2000</option>
            <option value={2500}>More than 2500</option>
            <option value={3000}>More than 3000</option>
            <option value={3500}>More than 3500</option>
          </select>
        </div>

        {/* Tours Limit */}
        <div className="flex items-center justify-between mb-3">
          <label
            className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Tours limit per page:
          </label>
          <select
            value={limit}
            onChange={(e) => {
              setPage(1);
              return setLimit(e.target.value);
            }}
            className={`w-32 p-1 border rounded-md text-sm ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value={9}>9</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>

        {/* Reset Button */}
        <div>
          <button
            onClick={() => {
              setDifficulty("");
              setRating(0);
              setPrice(0);
              setSortBy("");
              setOrder(false);
              setLimit(10);
            }}
            className={`w-full h-10 px-6 rounded-md ${
              theme === "dark"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            } transition-colors`}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Tour List - Scrollable */}
      <div
        className={`w-4/5 ml-[20%] p-6 overflow-y-auto h-screen scrollbar-hide ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours.length > 0 ? (
                tours.map((tour) => <TourCard key={tour._id} tour={tour} />)
              ) : (
                <p
                  className={`text-center ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  No tours found.
                </p>
              )}
            </div>

            {/* Pagination UI */}
            <div className="flex justify-center mt-8 space-x-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className={`w-10 h-10 flex items-center justify-center rounded-full ${
                  theme === "dark"
                    ? "bg-gray-700 text-gray-200 hover:bg-blue-600 hover:text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
                } transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <GrLinkPrevious />
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full ${
                    page === index + 1
                      ? "bg-blue-500 text-white"
                      : theme === "dark"
                      ? "bg-gray-700 text-gray-200 hover:bg-blue-600 hover:text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
                  } transition-colors`}
                >
                  {index + 1}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className={`w-10 h-10 flex items-center justify-center rounded-full ${
                  theme === "dark"
                    ? "bg-gray-700 text-gray-200 hover:bg-blue-600 hover:text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
                } transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <GrLinkNext />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TourList;
