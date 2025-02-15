import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet styles
import L from "leaflet";
import { useTheme } from "../../contexts/ThemeContext"; // Import Theme Context

// Custom larger marker icon
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const largeMarker = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [35, 55], // Increased size
  iconAnchor: [17, 55], // Adjusted anchor for centering
  popupAnchor: [1, -40],
});

function TourMap({ tour }) {
  const [coordinates, setCoordinates] = useState(null);
  const { theme } = useTheme(); // Get theme state

  useEffect(() => {
    async function fetchCoordinates() {
      if (!tour?.locations) return;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            tour?.locations
          )}`
        );
        const data = await response.json();

        if (data.length > 0) {
          const { lat, lon } = data[0]; // Get first matching location
          setCoordinates({ lat: parseFloat(lat), lon: parseFloat(lon) });
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    }

    fetchCoordinates();
  }, [tour?.locations]);

  return (
    <>
      <h2
        className={`text-2xl font-bold mb-4 ${
          theme === "dark" ? "text-gray-200" : "text-gray-800"
        }`}
      >
        Tour Destination Map
      </h2>
      <div
        className={`max-w-3xl mx-auto p-4 rounded-lg shadow-lg ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Map Container */}
        <div className="h-96 w-full rounded-lg overflow-hidden">
          {coordinates ? (
            <MapContainer
              center={[coordinates.lat, coordinates.lon]}
              zoom={15} // Higher zoom level for closer look
              className="h-full w-full"
              scrollWheelZoom={true} // Enable zooming with scroll
            >
              {/* Dynamic Map Tile Layer */}
              <TileLayer
                url={
                  theme === "dark"
                    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" // Dark mode map tiles
                    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // Light mode map tiles
                }
                attribution={
                  theme === "dark"
                    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }
              />

              <Marker
                position={[coordinates.lat, coordinates.lon]}
                icon={largeMarker}
              >
                <Popup>
                  <strong>📍 {tour?.locations}</strong>
                </Popup>
              </Marker>
            </MapContainer>
          ) : (
            <p
              className={`text-center ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Loading map...
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default TourMap;
