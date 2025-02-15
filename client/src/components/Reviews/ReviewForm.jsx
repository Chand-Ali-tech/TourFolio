import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import PropTypes from "prop-types";
import Loader from "./../Utils/Loader";
import PopUps from "./../Utils/PopUps";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { usePopUpData } from "../../contexts/PopUpDataContext";
import { useLoading } from "../../contexts/LoadingContext";
import { useTheme } from "../../contexts/ThemeContext"; // Import Theme Context

function ReviewForm({ handleAddReview }) {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isAnonymous, setIsAnonymous] = useState(false); // New state for anonymous review

  const { popupData, setPopupData } = usePopUpData();
  const { id } = useParams();
  const { isLoggedIn } = useAuth();
  const { loading, setLoading } = useLoading();
  const navigate = useNavigate();
  const { theme } = useTheme(); // Get theme state

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText || rating === 0) return;

    if (!isLoggedIn) {
      setPopupData({
        type: "error",
        message: "Kindly Login to post a Review!",
      });
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:8000/api/tour/${id}/review`,
        { review: reviewText, rating: rating, anonymous: isAnonymous }, // Added anonymous flag
        { withCredentials: true }
      );

      if (res.data.status === "success") {
        handleAddReview(res.data.review);
        navigate(0);
      } else {
        throw new Error("Unexpected response structure");
      }
    } catch (error) {
      console.error("Error posting review:", error);
      setPopupData({
        type: "error",
        message:
          error.response?.status === 400
            ? "You have already posted a review!"
            : "Something went wrong. Try again!",
      });
    } finally {
      setReviewText("");
      setRating(0);
      setLoading(false);
    }
  };

  return (
    <div
      className={`max-w-lg mx-auto p-6 rounded-2xl shadow-lg mt-15 ${
        theme === "dark"
          ? "bg-gray-800 text-gray-200"
          : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>

      {/* Anonymous Review Checkbox */}
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="anonymous"
          className="mr-2"
          checked={isAnonymous}
          onChange={() => setIsAnonymous(!isAnonymous)}
        />
        <label htmlFor="anonymous">Post as Anonymous</label>
      </div>

      {/* Review Input */}
      <textarea
        className={`w-full p-3 border rounded-lg ${
          theme === "dark"
            ? "bg-gray-700 border-gray-600 text-gray-200"
            : "bg-white border-gray-300 text-gray-900"
        }`}
        rows="3"
        placeholder="Write your review here..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      ></textarea>

      {/* Star Rating */}
      <div className="flex items-center space-x-1 my-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`cursor-pointer text-4xl ${
              (hover || rating) >= star ? "text-yellow-400" : "text-gray-300"
            }`}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className={`w-full font-semibold py-2 rounded-lg transition ${
          theme === "dark"
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        } disabled:bg-gray-300 disabled:text-gray-500`}
        disabled={!reviewText || rating === 0}
      >
        {loading ? <Loader type="small" /> : "Submit"}
      </button>

      {popupData && (
        <PopUps type={popupData.type} message={popupData.message} />
      )}
    </div>
  );
}

ReviewForm.propTypes = {
  handleAddReview: PropTypes.func.isRequired,
};

export default ReviewForm;
