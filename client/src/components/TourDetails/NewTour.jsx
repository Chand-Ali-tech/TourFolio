import { useState } from "react";
import axios from "axios";
import { useTheme } from "../../contexts/ThemeContext";
import Loader from "./../Utils/Loader";
import { FaPlus, FaMinus } from "react-icons/fa"; // Icons for toggling

function NewTour() {
  const [tour, setTour] = useState({
    name: "",
    duration: "",
    maxGroupSize: "",
    difficulty: "easy",
    price: "",
    averageRating: 4,
    ratingQuantity: 0,
    summary: "",
    priceDiscount: "",
    promoCode: "",
    startDates: [],
    guides: [],
    locations: "",
  });

  const [imageCover, setImageCover] = useState(null);
  const [images, setImages] = useState([]);
  const [newStartDate, setNewStartDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  function handleChange(e) {
    const { name, value } = e.target;
    setTour((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e) {
    if (e.target.name === "imageCover") {
      setImageCover(e.target.files[0]);
    } else if (e.target.name === "images") {
      setImages(Array.from(e.target.files));
    }
  }

  function handleAddStartDate(e) {
    e.preventDefault();
    if (newStartDate) {
      setTour((prev) => ({
        ...prev,
        startDates: [...prev.startDates, newStartDate],
      }));
      setNewStartDate("");
    }
  }

  async function handleAddTour(e) {
    e.preventDefault();

    if (!imageCover) {
      alert("Please upload a cover image.");
      return;
    }

    if (images.length === 0) {
      alert("Please upload at least one additional image.");
      return;
    }

    const formData = new FormData();
    Object.entries(tour).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => formData.append(`${key}[]`, val));
      } else {
        formData.append(key, value);
      }
    });

    formData.append("imageCover", imageCover);
    images.forEach((img) => formData.append("images", img));

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/tour`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.status === "success") {
        alert("Tour added successfully!");
      } else {
        alert("Error adding tour");
      }
    } catch (error) {
      console.error(error);
      alert("Error adding tour");
    } finally {
      setLoading(false);
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
        onClick={() => setIsFormVisible(!isFormVisible)}
      >
        <h1 className="text-3xl font-bold mb-5">Add New Tour!</h1>
        {isFormVisible ? (
          <FaMinus className="text-2xl" />
        ) : (
          <FaPlus className="text-2xl" />
        )}
      </div>

      {isFormVisible && (
        <form
          className="space-y-4 mt-4"
          onSubmit={handleAddTour}
          encType="multipart/form-data"
        >
          <input
            type="text"
            name="name"
            placeholder="Tour Name"
            value={tour.name}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded-lg ${
              isDarkTheme ? "bg-gray-800 border-gray-600" : "bg-gray-100"
            }`}
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="duration"
              placeholder="Duration (Days)"
              value={tour.duration}
              onChange={handleChange}
              required
              className={`p-2 border rounded-lg ${
                isDarkTheme ? "bg-gray-800 border-gray-600" : "bg-gray-100"
              }`}
            />
            <input
              type="number"
              name="maxGroupSize"
              placeholder="Max Group Size"
              value={tour.maxGroupSize}
              onChange={handleChange}
              required
              className={`p-2 border rounded-lg ${
                isDarkTheme ? "bg-gray-800 border-gray-600" : "bg-gray-100"
              }`}
            />
          </div>

          <select
            name="difficulty"
            value={tour.difficulty}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded-lg ${
              isDarkTheme ? "bg-gray-800 border-gray-600" : "bg-gray-100"
            }`}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="difficult">Difficult</option>
          </select>

          <input
            type="number"
            name="price"
            placeholder="Price ($)"
            value={tour.price}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded-lg ${
              isDarkTheme ? "bg-gray-800 border-gray-600" : "bg-gray-100"
            }`}
          />

          <input
            type="text"
            name="summary"
            placeholder="Tour Summary"
            value={tour.summary}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded-lg ${
              isDarkTheme ? "bg-gray-800 border-gray-600" : "bg-gray-100"
            }`}
          />

          <input
            type="number"
            name="priceDiscount"
            placeholder="Discount Price ($)"
            value={tour.priceDiscount}
            onChange={handleChange}
            className={`w-full p-2 border rounded-lg ${
              isDarkTheme ? "bg-gray-800 border-gray-600" : "bg-gray-100"
            }`}
          />

          <input
            type="text"
            name="promoCode"
            placeholder="Promo Code"
            value={tour.promoCode}
            onChange={handleChange}
            className={`w-full p-2 border rounded-lg ${
              isDarkTheme ? "bg-gray-800 border-gray-600" : "bg-gray-100"
            }`}
          />

          <input
            type="text"
            name="locations"
            placeholder="Locations"
            value={tour.locations}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded-lg ${
              isDarkTheme ? "bg-gray-800 border-gray-600" : "bg-gray-100"
            }`}
          />

          <label className="block font-semibold">Start Dates</label>
          <div className="flex gap-2">
            <input
              type="date"
              value={newStartDate}
              onChange={(e) => setNewStartDate(e.target.value)}
              className={`p-2 border rounded-lg ${
                isDarkTheme ? "bg-gray-800 border-gray-600" : "bg-gray-100"
              }`}
            />
            <button
              onClick={handleAddStartDate}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              +
            </button>
          </div>

          <label className="block font-semibold">Cover Image</label>
          <input
            type="file"
            name="imageCover"
            accept="image/*"
            onChange={handleFileChange}
            required
            className={`w-full p-2 border rounded-lg ${
              isDarkTheme ? "bg-gray-800 border-gray-600" : "bg-gray-100"
            }`}
          />

          <label className="block font-semibold">
            Additional Images(Max of 3)
          </label>
          <input
            type="file"
            name="images"
            accept="image/*"
            onChange={handleFileChange}
            multiple
            required
            className={`w-full p-2 border rounded-lg ${
              isDarkTheme ? "bg-gray-800 border-gray-600" : "bg-gray-100"
            }`}
          />

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            disabled={loading}
          >
            {loading ? <Loader type="small" /> : "Add Tour"}
          </button>
        </form>
      )}
    </div>
  );
}

export default NewTour;
