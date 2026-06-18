import { useEffect, useState } from "react";
import "./Slider.css"; // Custom CSS

const ImageSlider = () => {
  const images = ["/1.jpg", "/3.jpg", "/4.jpg", "/6.jpg", "/7.jpg", "/8.jpg"];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000); // Change image every 6 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[520px] overflow-hidden">
      {/* Images */}
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Slide ${index + 1}`}
          className={`absolute w-full h-full object-cover transition-opacity duration-2000 ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center px-4 sm:px-8 md:px-14 text-white">
        <div className="relative">
          {/* Flying Plane (Above Heading) */}
          <img
            src="/plane.png"
            alt="Plane"
            className="absolute left-0 top-2 sm:top-4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flying-plane-header"
          />
          <h1 className="ml-10 sm:ml-12 md:ml-15 text-shadow-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-2 sm:mb-4">
            Explore the World
          </h1>
          <p className="italic ml-10 sm:ml-12 md:ml-18 text-shadow-black text-sm sm:text-lg md:text-2xl max-w-[90%] sm:max-w-2xl">
            Adventure is not a destination, it&apos;s a way of life.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;