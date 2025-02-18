import {useState } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { usePopUpData } from "../../contexts/PopUpDataContext";
import Loader from "../Utils/Loader";
import { useTheme } from "../../contexts/ThemeContext";

const stripePromise = loadStripe(
  "pk_test_51Qq8p1SGSsaBD7BXHqXW5Z2FlG8CTHR1Ms35NLVrLh8ahY78gzG8x1Qf0cCnuNVNpl7ryXUeLpnpebaiKU834vH700ighfmiOx"
);

function BookingTour() {
  const location = useLocation();
  const tour = location.state?.tour || {};
  const [price, setPrice] = useState(tour.price);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const { setPopupData } = usePopUpData();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const applyPromoCode = () => {
    if (promoCode === tour.promoCode) {
      const discountValue = tour.priceDiscount || 0;
      setDiscount(discountValue);
      setPrice(tour.price - discountValue);
      setPopupData({ type: "success", message: "Promo code applied!" });
    } else {
      setPopupData({ type: "error", message: "Invalid promo code!" });
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <div
        className={`max-w-3xl mx-auto mt-8 p-6 rounded-lg shadow-md transition-all duration-300 ${
          isDark ? "bg-gray-900 text-white" : "bg-white text-gray-800"
        }`}
      >
        <h1 className="text-3xl font-bold mb-4">{tour.name} Booking</h1>

        <img
          src={tour.imageCover}
          alt={tour.name}
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />

        <p className="mt-4">{tour.description}</p>

        <div className="mt-6">
          {discount > 0 ? (
            <p className="text-2xl font-semibold">
              Price:{" "}
              <span className="line-through text-red-500 text-xl">
                ${tour.price}
              </span>{" "}
              <span className="text-blue-600">${price}</span>
            </p>
          ) : (
            <p className="text-2xl font-semibold">
              Price: <span className="text-blue-600">${price}</span>
            </p>
          )}
        </div>

        {!discount && (
          <div className="mt-4 flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter Promo Code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className={`border rounded-lg px-4 py-2 flex-1 ${
                isDark
                  ? "bg-gray-800 border-gray-600 text-white"
                  : "border-gray-300"
              }`}
            />
            <button
              onClick={applyPromoCode}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Apply
            </button>
          </div>
        )}

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Payment Details</h2>
          <CheckoutForm price={price} tourId={tour.id} />
        </div>
      </div>
    </Elements>
  );
}

function CheckoutForm({ price, tourId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { setPopupData } = usePopUpData();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (error) {
      // console.error(error);
      setPopupData({
        type: "error",
        message: "Booking failed. Please try again.",
      });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8000/api/booking/tour/${tourId}`,
        { amount: price, paymentMethodId: paymentMethod.id },
        { withCredentials: true }
      );
      if (res.data.status === "success") {
        setPopupData({ type: "success", message: "Tour booked successfully!" });
      } else {
        setPopupData({
          type: "error",
          message: "Booking failed. Please try again.",
        });
      }
    } catch (error) {
      // console.error(error);
      setPopupData({
        type: "error",
        message: "Booking failed due to a server error.",
      });
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handlePayment}
      className={`p-4 rounded-lg shadow transition-all duration-300 ${
        isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <CardElement
        className={`p-3 border rounded-lg ${
          isDark
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300"
        }`}
      />
      {loading ? (
        <div className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
          <Loader type="small" />
        </div>
      ) : (
        <button
          type="submit"
          disabled={!stripe || loading}
          className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Pay Now
        </button>
      )}
    </form>
  );
}

export default BookingTour;
