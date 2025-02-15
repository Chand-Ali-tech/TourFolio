import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Loader from "./../Utils/Loader"

function ProtectedRoute() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <Loader />; // Show a loading spinner while checking auth
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  return <Outlet />; // Render the protected route's children
}

export default ProtectedRoute;
