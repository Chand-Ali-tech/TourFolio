import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useTours } from "../../contexts/TourContext";
import { Actions } from "../../contexts/TourContextActions";
import Loader from "../Utils/Loader";
import { FaHeart } from "react-icons/fa";
import ReviewForm from "./../Reviews/ReviewForm";
import Reviews from "../Reviews/Reviews";
import { useAuth } from "../../contexts/AuthContext";
import { usePopUpData } from "../../contexts/PopUpDataContext";
import TourGallery from "./TourGallery";
import TourSummary from "./TourSummary";
import TourMap from "./TourMap";
import { useTheme } from "../../contexts/ThemeContext"; // Import Theme Context

function Tour() {
  const { theme } = useTheme(); // Get theme state
  const { tours, dispatch } = useTours();
  const [loading, setLoading] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth();
  const { setPopupData } = usePopUpData();
  const navigate = useNavigate();

  function handleAddReview(newReview) {
    setReviews((prevReviews) => [...prevReviews, newReview]);
    fetchReviews();
  }

  function handleBookTour() {
    if (!user) {
      setPopupData({
        type: "error",
        message: "Kindly login to book this tour!",
      });
      return;
    }
    navigate("/book-tour", { state: { tour } });
  }

  async function handleAddToFavourite() {
    if (!user) {
      setPopupData({
        type: "error",
        message: "Kindly login to add this tour to Favourites!",
      });
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/tour/addToFavorites`,
        {
          tourId: tour._id,
        },
        {
          withCredentials: true,
        }
      );
      setPopupData({
        type: "success",
        message: "Tour added to favourite!",
      });
      setIsFavorite(true);
    } catch (error) {
      if (error.response.status === 409) {
        setPopupData({
          type: "error",
          message: "Tour already in favourites!",
        });
      }
    }
  }

  useEffect(() => {
    async function getTourInfo() {
      const existingTour = tours.find((tour) => tour.id === id);
      if (existingTour) {
        setTour(existingTour);
        return;
      }
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/tour/${id}`,
          { withCredentials: true }
        );
        dispatch({ type: Actions.addTour, payload: res.data });
        setTour(res.data.data);
      } catch (error) {
        // console.error(error);
        if (error.response && error.response.status === 404) {
          setPopupData({
            type: "error",
            message: "Tour not found!",
          });
        }
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    getTourInfo();
  }, [id, tours, dispatch, setLoading]);

  async function fetchReviews() {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/tour/${id}/review`
      );
      setReviews(res.data.data);
    } catch (error) {
      // console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReviews();
  }, [id]);

  if (loading || !tour) return <Loader />;

  return (
    <div
      className={`max-w-6xl mx-auto p-4 ${
        theme === "dark"
          ? "bg-[#111827] text-[#e5e7eb]"
          : "bg-[#f8f8f8] text-[#1f2937]"
      }`}
    >
      <div className="relative">
        <img
          src={tour.imageCover}
          alt={tour.name}
          className="w-full h-116 object-cover rounded-2xl shadow-lg"
        />
        <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-xl shadow-md">
          {tour.promoCode}
        </div>
      </div>

      {user && user.favouriteTours ? (
        user.favouriteTours.some(
          (favTour) => favTour._id.toString() === tour._id.toString()
        ) ? (
          <div className="flex justify-between items-center mt-4">
            <h1 className="text-4xl font-bold">{tour.name}</h1>
            <button
              onClick={handleAddToFavourite}
              className="flex items-center gap-1"
            >
              <FaHeart size={24} className="text-red-500" />
              <p className="text-xl">(Favourite tour)</p>
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center mt-4">
            <h1 className="text-4xl font-bold">{tour.name}</h1>
            <button
              onClick={handleAddToFavourite}
              className="flex items-center gap-1"
            >
              <FaHeart
                size={24}
                className={`${
                  isFavorite ? "text-red-600" : "text-gray-600"
                } cursor-pointer`}
              />
              <p className="text-xl">
                ({isFavorite ? "Favourite tour" : "Add to favourite tours"})
              </p>
            </button>
          </div>
        )
      ) : (
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-4xl font-bold">{tour.name}</h1>
        </div>
      )}

      <TourSummary tour={tour} />

      <div className="mt-6 flex justify-center">
        <button
          className={`w-50 py-3 rounded-xl text-xl font-semibold transition duration-300 ${
            theme === "dark"
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          } cursor-pointer`}
          onClick={handleBookTour}
        >
          Book Now
        </button>
      </div>

      <TourGallery tour={tour} />
      <Reviews reviews={reviews} />
      <ReviewForm handleAddReview={handleAddReview} />
      <TourMap tour={tour} />
    </div>
  );
}

export default Tour;
