import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegCopy, FaUsers, FaPlus, FaMinus } from "react-icons/fa"; // Import icons
import { useTheme } from "../../contexts/ThemeContext";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false); // Toggle state
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  useEffect(() => {
    async function fetchAllUsers() {
      try {
        const res = await axios.get("https://tour-folio-backend.vercel.app/api/user/", {
          withCredentials: true,
        });
        setUsers(res.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchAllUsers();
  }, []);

  async function handleDelete(userId) {
    try {
      await axios.delete(
        `https://tour-folio-backend.vercel.app/api/user/deleteAccount/${userId}`,
        {
          withCredentials: true,
        }
      );
      alert("User deleted successfully");
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  function copyToClipboard(id) {
    navigator.clipboard.writeText(id);
    alert("User ID copied: " + id);
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
        onClick={() => setShowUsers(!showUsers)}
      >
        <h1 className="text-3xl font-bold mb-5">All Users</h1>
        {showUsers ? (
          <FaMinus className="text-2xl" />
        ) : (
          <FaPlus className="text-2xl" />
        )}
      </div>

      {showUsers && (
        <div className="mt-6 space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className={`flex items-center justify-between p-4 rounded-lg shadow-md ${
                isDarkTheme
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={user.photo}
                  alt={user.name}
                  className="w-12 h-12 rounded-full border"
                />
                <div>
                  <p className="font-semibold">
                    {user.name}
                    <span
                      className={`font-light ml-2 ${
                        isDarkTheme ? "text-amber-400" : "text-amber-800"
                      }`}
                    >
                      ({user.email})
                    </span>
                  </p>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{user._id}</span>
                    <button
                      onClick={() => copyToClipboard(user._id)}
                      className={`hover:text-blue-400 ${
                        isDarkTheme ? "text-blue-300" : "text-blue-500"
                      }`}
                    >
                      <FaRegCopy />
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDelete(user._id)}
                className={`px-4 py-2 rounded-lg transition ${
                  isDarkTheme
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-red-600 hover:bg-red-700"
                } text-white`}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllUsers;
