import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { usePopUpData } from "../../contexts/PopUpDataContext";
import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import UserReviews from "./../Reviews/UserReviews";
import UserBookings from "./../Bookings/UserBookings";
import Loader from "./../Utils/Loader";
import FavouriteTours from "./../TourDetails/FavouriteTours";

function Profile() {
  const { isLoggedIn, user, setUser, setIsLoggedIn } = useAuth();
  const { setPopupData } = usePopUpData();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [newPhoto, setNewPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  function logout(e) {
    e.preventDefault();

    async function handleLogout() {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:8000/api/user/logout/", {
          withCredentials: true,
        });

        if (res.status === 200) {
          setIsLoggedIn(false);
          setPopupData({
            message: "Logged out successfully!",
            type: "success",
          });
          setIsLoggedIn(false);
          setUser(null);
          navigate(-1);
        }
      } catch (error) {
        console.log("Error getting user", error);
      } finally {
        setLoading(false);
      }
    }

    handleLogout();
  }

  function handlePhotoClick() {
    document.getElementById("file-input").click();
  }

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (file) {
      setNewPhoto(URL.createObjectURL(file));
      uploadPhoto(file);
    }
  }

  async function uploadPhoto(file) {
    const formData = new FormData();
    formData.append("photo", file);

    try {
      setLoading(true);
      const res = await axios.patch(
        "http://localhost:8000/api/user/updateMe",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        setPopupData({
          message: "Profile Photo updated successfully!",
          type: "success",
        });
        setIsLoggedIn((prev) => ({ ...prev, photo: res.data.photo }));
      }
    } catch (error) {
      setPopupData({
        title: "Error",
        message: "There was an error uploading your photo.",
        type: "error",
      });
      console.log("Error updating photo", error);
    } finally {
      setLoading(false);
    }
  }
  console.log("Profile Component Rendered!");
  console.log("User role is:- " + user.role)
  return (
    <>
      {isLoggedIn ? (
        <>
          <div
            className={`flex justify-center items-center h-auto py-4 transition ${
              theme === "dark"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-900"
            }`}
          >
            <div
              className={`p-6 rounded-xl shadow-lg w-96 text-center border transition ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-600"
                  : "bg-white border-gray-200"
              }`}
            >
              {/* Profile Image with Hover Effect */}
              <div
                className="relative w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-gray-300 shadow-md cursor-pointer group"
                onClick={handlePhotoClick}
              >
                <img
                  src={newPhoto || user.photo}
                  alt={user.name}
                  className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-60"
                />
                <span className="absolute inset-0 flex items-center justify-center text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Change Profile
                </span>
              </div>

              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />

              {/* User Details */}
              <div className="mb-4 mt-4">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <h3 className="text-sm opacity-80">{user.email}</h3>
              </div>

              {/* Logout Button */}
              {!loading ? (
                <button
                  type="submit"
                  className="w-40 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all"
                  disabled={loading}
                  onClick={logout}
                >
                  Logout
                </button>
              ) : (
                <div className="bg-red-500 rounded-lg py-2 text-white font-semibold">
                  <Loader type="small" />
                </div>
              )}
            </div>
          </div>

          {user.role !== "admin" && (
          
            
            <>
              <FavouriteTours />
              <UserBookings />
              <UserReviews />
            </>
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default Profile;
