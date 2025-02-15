import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-blue-950 text-gray-300 py-10">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Section - Branding & Description */}
                <div>
                    <h2 className="text-3xl font-extrabold text-white">🌍 TourFolio</h2>
                    <p className="text-gray-400 mt-2 text-sm">
                        Explore the world with ease. Find, review, and book the best travel experiences, 
                        all in one place. Your next adventure starts here!
                    </p>
                </div>

                {/* Right Section - Quick Links & Socials */}
                <div className="flex flex-col md:items-end">
                    <h3 className="text-lg font-semibold text-white">Get in Touch</h3>
                    <a href="mailto:tourfolio.world" className="text-orange-400 hover:underline text-sm mt-1">
                        📧 tourfolio.world
                    </a>

                    {/* Social Icons */}
                    <div className="flex space-x-4 mt-4">
                        <a href="#" className="hover:text-blue-400 transition"><FaFacebookF size={18} /></a>
                        <a href="#" className="hover:text-blue-300 transition"><FaTwitter size={18} /></a>
                        <a href="#" className="hover:text-pink-400 transition"><FaInstagram size={18} /></a>
                        <a href="https://github.com/Chand-Ali-tech" target="_blank" rel="noopener noreferrer"
                            className="hover:text-gray-400 transition">
                            <FaGithub size={18} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700 my-6 mx-6"></div>

            {/* Footer Bottom Section */}
            <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-400">
                <p>© {new Date().getFullYear()} TourFolio. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
