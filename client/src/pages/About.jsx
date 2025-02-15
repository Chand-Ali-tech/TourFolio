import { useTheme } from "../contexts/ThemeContext";

function About() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`max-w-4xl mx-auto my-16 p-10 rounded-xl shadow-lg transition-all duration-300 ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Header Section */}
      <h2 className="text-4xl font-extrabold text-center mb-6">
        🌍 About TourFolio
      </h2>
      <p className="text-lg text-center mb-8">
        Your ultimate travel companion, helping you discover the world one tour
        at a time. Whether you're a traveler looking for the best experiences or
        a tour provider wanting to showcase your trips, <b>TourFolio</b> is the
        perfect platform for you. ✈️🏔️
      </p>

      {/* What is TourFolio? */}
      <div
        className={`p-6 shadow-md rounded-lg mb-8 transition-all duration-300 ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h3 className="text-2xl font-semibold mb-3">📌 What is TourFolio?</h3>
        <p className="text-lg">
          TourFolio is a <b>modern tour management platform</b> that helps
          travelers find and book exciting tours with ease. It connects
          adventure seekers with top-rated tour providers, ensuring
          unforgettable experiences worldwide.
        </p>
      </div>

      {/* Key Features Section */}
      <div
        className={`p-6 shadow-md rounded-lg mb-8 transition-all duration-300 ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h3 className="text-2xl font-semibold mb-3">🚀 Key Features</h3>
        <ul className="text-lg leading-relaxed">
          <li>
            ✅ <b>Discover Top Tours</b> – Browse the best-rated tours in
            different locations.
          </li>
          <li>
            ✅ <b>Real User Reviews</b> – Get insights from travelers before
            booking.
          </li>
          <li>
            ✅ <b>Seamless Booking</b> – Easy and secure tour reservations.
          </li>
          <li>
            ✅ <b>Personalized Recommendations</b> – Find tours based on your
            interests.
          </li>
          <li>
            ✅ <b>Secure & Reliable</b> – Built with the latest web technologies
            for a smooth experience.
          </li>
        </ul>
      </div>

      {/* Why Choose TourFolio? */}
      <div
        className={`p-6 shadow-md rounded-lg mb-8 transition-all duration-300 ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h3 className="text-2xl font-semibold mb-3">
          🌟 Why Choose TourFolio?
        </h3>
        <p className="text-lg">
          We know that planning the perfect trip can be overwhelming. That’s why{" "}
          <b>TourFolio</b> takes the guesswork out of the process by offering:
        </p>
        <ul className="text-lg leading-relaxed mt-3">
          <li>
            ✅ <b>Authentic Tour Experiences</b> – Only verified and
            high-quality tours.
          </li>
          <li>
            ✅ <b>Simple & User-Friendly Interface</b> – Designed for travelers
            of all ages.
          </li>
          <li>
            ✅ <b>Community-Driven Ratings</b> – Make informed decisions based
            on honest reviews.
          </li>
          <li>
            ✅ <b>Fast & Secure Platform</b> – Powered by cutting-edge web
            technologies.
          </li>
        </ul>
      </div>

      {/* Our Mission */}
      <div
        className={`p-6 rounded-lg shadow-md mb-8 transition-all duration-300 ${
          isDark ? "bg-blue-900" : "bg-blue-50"
        }`}
      >
        <h3 className="text-2xl font-semibold mb-3">🎯 Our Mission</h3>
        <p className="text-lg">
          At <b>TourFolio</b>, we believe that{" "}
          <b>traveling should be stress-free and unforgettable</b>. Our mission
          is to bridge the gap between travelers and the best tour experiences,
          ensuring that every journey is filled with adventure, joy, and
          lifelong memories.
        </p>
      </div>

      {/* Closing Statement */}
      <div className="text-center mt-8">
        <p className="text-lg font-medium">
          🌍 Ready to explore the world with TourFolio? Start your adventure
          today and discover breathtaking tours at your fingertips! 🚀
        </p>
      </div>
    </div>
  );
}

export default About;
