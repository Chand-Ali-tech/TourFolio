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
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Images */}
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Slide ${index + 1}`}
          className={`absolute w-full h-[500px] transition-opacity duration-2000 ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Text Overlay */}
      <div className="absolute text-shadow-black top-[30%] left-[30%] transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl shadow-lg font-light font-ubuntu">
        <div className="relative">
          {/* Flying Plane (Above Heading) */}
          <img
            src="/plane.png"
            alt="Plane"
            className="absolute left-0 top-[25px] w-[50px] h-[50px] flying-plane-header"
          />
          <h1 className="ml-[60px] shadow-lg text-7xl font-bold mb-5">
            Explore the World
          </h1>
          <p className="italic ml-[70px] mt-2 text-2xl">
            Adventure is not a destination, it's a way of life.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;