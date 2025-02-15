import { useTheme } from "../../contexts/ThemeContext"; // Import Theme Context

function TourGallery({ tour }) {
  const { theme } = useTheme(); // Get theme state

  return (
    <div className="mt-6">
      <h2
        className={`text-2xl font-bold ${
          theme === "dark" ? "text-gray-200" : "text-gray-800"
        }`}
      >
        Gallery
      </h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {tour.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Tour image ${index + 1}`}
            className="w-full h-60 object-cover rounded-xl shadow-sm"
          />
        ))}
      </div>
    </div>
  );
}

export default TourGallery;
