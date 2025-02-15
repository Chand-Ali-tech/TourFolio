import { useEffect, useState } from "react";
import axios from "axios";
import TourCard from "./../TourDetails/TourCard";

function TrendingTours() {
  const [topTours, setTopTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTopTours() {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://tour-folio-backend.vercel.app/api/tour/top-5-tours"
        );
        setTopTours(response.data.data.tours);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getTopTours();
  }, []);

  return (
    <div className="mx-8 my-10">
      {/* 🔥 Trending Tours Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-6 flex items-center justify-center">
        🌏Trending <span className="text-orange-500 ml-2">Tours</span>
        <img src="/logo2.jpg" alt="TourFolio Logo" className="w-8 h-8 ml-2" />
      </h2>

      <p className="text-center text-gray-600 text-lg mb-8">
        Explore the most popular destinations people are loving right now!
      </p>

      {/* Tour Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading tours...</p>
        ) : topTours.length > 0 ? (
          topTours.map((tour) => <TourCard key={tour._id} tour={tour} />)
        ) : (
          <p className="text-gray-500 text-center">No tours found.</p>
        )}
      </div>
    </div>
  );
}

export default TrendingTours;
