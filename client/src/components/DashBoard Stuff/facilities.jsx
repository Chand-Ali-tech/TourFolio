import { FaBus, FaHotel, FaUtensils, FaMapMarkedAlt, FaUserShield, FaHeadset } from "react-icons/fa";

const Facilities = () => {
  const facilities = [
    { icon: <FaBus className="text-4xl text-blue-500" />, title: "Comfortable Transport", desc: "Luxury buses & private vehicles for smooth travel." },
    { icon: <FaHotel className="text-4xl text-green-500" />, title: "Premium Stays", desc: "Top-rated hotels & resorts for a relaxing stay." },
    { icon: <FaUtensils className="text-4xl text-red-500" />, title: "Delicious Meals", desc: "Tasty and hygienic food throughout your journey." },
    { icon: <FaMapMarkedAlt className="text-4xl text-yellow-500" />, title: "Guided Tours", desc: "Experienced guides for an enriching experience." },
    { icon: <FaUserShield className="text-4xl text-purple-500" />, title: "Safety & Security", desc: "24/7 assistance and safety protocols in place." },
    { icon: <FaHeadset className="text-4xl text-indigo-500" />, title: "Customer Support", desc: "Round-the-clock support for all your needs." },
  ];

  return (
    <div className=" py-12 px-6">
      <h2 className="text-center text-4xl font-bold mb-8">Why Choose Tourfolio?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {facilities.map((facility, index) => (
          <div key={index} className="flex items-center space-x-4 p-5  shadow-md rounded-lg">
            {facility.icon}
            <div>
              <h3 className="text-xl font-semibold">{facility.title}</h3>
              <p className="text-gray-600">{facility.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Facilities;
