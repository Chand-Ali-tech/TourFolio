import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useLoading } from "./LoadingContext";

export const AuthContext = createContext();

function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [loading, setLoading] = useState(true);
  const { setLoading } = useLoading();

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/check-auth`,
          {
            withCredentials: true,
          }
        );

        // console.log(res.data.data.user)
        setUser(res.data.data.user);
        // console.log("User created: " + res.data.data.user);

        setIsLoggedIn(true);
        // setLoading(false);
      } catch (error) {
        setIsLoggedIn(false);
        setUser(null);
        // console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const value = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    // fetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// State is updated asynchronously
