import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Loader from "./../Utils/Loader";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { usePopUpData } from "../../contexts/PopUpDataContext";
import { useAuth } from "../../contexts/AuthContext";
import { useLoading } from "../../contexts/LoadingContext";
import { useTheme } from "../../contexts/ThemeContext"; // Import Theme Context

const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, setLoading } = useLoading();
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const { setPopupData } = usePopUpData();
  const { setIsLoggedIn, setUser } = useAuth();
  const { theme } = useTheme(); // Get theme state

  const navigate = useNavigate();

  function onChange(value) {
    setRecaptchaToken(value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!recaptchaToken) {
      setPopupData({
        type: "error",
        message: "Please complete the reCAPTCHA.",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
<<<<<<< HEAD
        `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
        { email, password, recaptchaToken },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
=======
  `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
  { email, password, recaptchaToken },
  { withCredentials: true }
);

>>>>>>> 11243284e78e6acefad3ebae5651aeac24809f2b

      console.log("Response is:- ", res);
      
      if (res.status === 200) {
        setPopupData({ type: "success", message: "Login successful!" });
        setIsLoggedIn(true);
        setUser(res.data.user);
        navigate("/");
      }
    } catch (error) {

      console.log("Error from CA :- , ", error);
      



      if (error.response?.status === 401) {
        setPopupData({
          type: "error",
          message: "Incorrect email or password.",
        });
      } else if (error.response?.status === 429) {
        setPopupData({
          type: "warning",
          message: "Try again after 15 minutes!",
        });
      } else {
        console.log("Error: " + error);
        setPopupData({
          type: "error",
          message: "Login failed. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`flex items-center justify-center min-h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`p-8 rounded-lg shadow-lg w-96 h-auto ${
          theme === "dark"
            ? "bg-gray-800 text-gray-200"
            : "bg-white text-gray-900"
        }`}
      >
        <h1 className="text-4xl font-semibold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <MdOutlineEmail
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500"
                  : "border-gray-300 focus:ring-black"
              }`}
            />
          </div>

          <div className="relative">
            <RiLockPasswordFill
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500"
                  : "border-gray-300 focus:ring-black"
              }`}
            />
          </div>

          <ReCAPTCHA sitekey={siteKey} onChange={onChange} />

          {!loading ? (
            <button
              type="submit"
              className={`w-full py-2 font-semibold rounded-lg transition ${
                theme === "dark"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-black hover:bg-gray-900 text-white"
              }`}
              disabled={loading}
              onClick={handleSubmit}
            >
              Login
            </button>
          ) : (
            <div className="bg-gray-700 rounded-lg">
              <Loader type="small" />
            </div>
          )}
        </form>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className={`font-semibold hover:underline ${
              theme === "dark" ? "text-blue-400" : "text-black"
            }`}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

Login.propTypes = {
  popupData: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string,
  }),
};

export default Login;
