import { Routes, Route } from "react-router-dom";
import Login from "./../components/auth/Login";
import SignUp from "./../components/auth/SignUp";
import DashBoard from "./../pages/DashBoard";
import Tours from "./../pages/Tours";
import Tour from "./../pages/Tour";
import Panel from "./../components/Panels/Panel";
import ProtectedRoute from "../components/auth/ProtectedRoute"; // Import Protected Route
import BookingTour from "../components/Bookings/UserBookings";
import Contact from "../pages/Contact";
import About from "../pages/About";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashBoard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/tour/:id" element={<Tour />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/me" element={<Panel />} />
        <Route path="/book-tour" element={<BookingTour />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
