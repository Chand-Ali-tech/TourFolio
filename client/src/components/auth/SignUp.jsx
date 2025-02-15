import { useState } from "react";
import axios from "axios";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import Loader from "./../Utils/Loader";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { usePopUpData } from "./../../contexts/PopUpDataContext";
import { useTheme } from "./../../contexts/ThemeContext"; // Import Theme Context

const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState(""); // For verification code
  const [loading, setLoading] = useState(false);
  const [verify, setVerify] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const { setPopupData } = usePopUpData();
  const navigate = useNavigate();
  const { theme } = useTheme(); // Get theme state

  function onChange(value) {
    setRecaptchaToken(value);
  }

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(password)) {
      setPopupData({
        type: "error",
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long.",
      });
      return false;
    }
    return true;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validatePassword(password)) {
      return;
    }
    
    if (!recaptchaToken) {
      setPopupData({
        type: "error",
        message: "Please complete the reCAPTCHA.",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("https://tour-folio-backend.vercel.app/api/user/signup", {
        name,
        email,
        password,
        recaptchaToken,
      });

      if (res.status === 200) {
        setPopupData({
          type: "success",
          message: "Verify your Email address.",
        });
        setVerify(true);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        setPopupData({ type: "error", message: "Email already exists!" });
      } else if (error.response?.status === 412) {
        setPopupData({ type: "error", message: "ReCAPTCHA failed!" });
      } else {
        setPopupData({
          type: "error",
          message: "SignUp failed. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(
        "https://tour-folio-backend.vercel.app/api/user/signup/verify-email",
        {
          email,
          otp: code,
        }
      );

      if (res.status === 201) {
        setPopupData({
          type: "success",
          message: "Email verified successfully!",
        });
        navigate("/login");
      }
    } catch (error) {
      setPopupData({
        type: "error",
        message: "Verification failed. Try again!",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!verify ? (
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
            <h1 className="text-4xl font-semibold text-center mb-6">Sign Up</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <FaUser
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500"
                      : "bg-gray-100 border-gray-300 focus:ring-black"
                  }`}
                />
              </div>

              <div className="relative">
                <MdOutlineEmail
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500"
                      : "bg-gray-100 border-gray-300 focus:ring-black"
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
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500"
                      : "bg-gray-100 border-gray-300 focus:ring-black"
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
                >
                  Sign Up
                </button>
              ) : (
                <div
                  className={`rounded-lg ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                  }`}
                >
                  <Loader type="small" />
                </div>
              )}
            </form>

            <p className="text-center mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className={`font-semibold hover:underline ${
                  theme === "dark" ? "text-blue-400" : "text-black"
                }`}
              >
                Login now
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <div
          className={`flex items-center justify-center min-h-screen ${
            theme === "dark" ? "bg-gray-900" : "bg-white"
          }`}
        >
          <div
            className={`p-8 rounded-lg shadow-lg w-96 h-auto ${
              theme === "dark"
                ? "bg-gray-800 text-gray-200"
                : "bg-gray-100 text-gray-900"
            }`}
          >
            <h1 className="text-4xl font-semibold text-center mb-6">
              Verify Email
            </h1>
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="relative">
                <MdOutlineEmail
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500"
                      : "bg-gray-100 border-gray-300 focus:ring-black"
                  }`}
                />
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter verification code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  className={`w-full pl-4 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500"
                      : "bg-gray-100 border-gray-300 focus:ring-black"
                  }`}
                />
              </div>

              {!loading ? (
                <button
                  type="submit"
                  onClick={handleVerify}
                  className={`w-full py-2 font-semibold rounded-lg transition ${
                    theme === "dark"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-black hover:bg-gray-900 text-white"
                  }`}
                >
                  Verify
                </button>
              ) : (
                <div
                  className={`rounded-lg ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                  }`}
                >
                  <Loader type="small" />
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUp;
