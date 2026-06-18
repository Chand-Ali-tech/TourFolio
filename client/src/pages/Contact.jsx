import { useTheme } from "../contexts/ThemeContext";

function Contact() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
    className={`max-w-4xl mx-4 sm:mx-auto my-8 sm:my-16 p-4 sm:p-8 md:p-10 rounded-xl shadow-lg transition-all duration-300 ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Header Section */}
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-6">
        📬 Get in Touch
      </h2>
    <p className="text-base sm:text-lg text-center mb-8">
        Have any questions, feedback, or collaboration ideas? I’d love to hear
        from you! Let’s build something amazing together. 🚀
      </p>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email Card */}
        <div
          className={`p-6 shadow-md rounded-lg flex flex-col items-center text-center transition-all duration-300 ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-2">📧 Email Me</h3>
          <p className="mb-4">Feel free to drop me an email anytime.</p>
          <a
            href="mailto:tourfolio.world"
            className="text-orange-500 text-base sm:text-lg font-medium hover:underline break-all"
          >
            tourfolio.world
          </a>
        </div>

        {/* GitHub Card */}
        <div
          className={`p-6 shadow-md rounded-lg flex flex-col items-center text-center transition-all duration-300 ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-2">🔗 GitHub Repository</h3>
          <p className="mb-4">
            Check out my projects, report issues, or contribute.
          </p>
          <a
            href="https://github.com/Chand-Ali-tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 text-base sm:text-lg font-medium hover:underline break-all"
          >
            github.com/Chand-Ali-tech
          </a>
        </div>
      </div>

      {/* How Can I Help Section */}
      <div
        className={`mt-10 p-8 rounded-lg shadow-md transition-all duration-300 ${
          isDark ? "bg-blue-900" : "bg-blue-50"
        }`}
      >
        <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          How Can I Help You? 💡
        </h3>
        <ul className="text-base sm:text-lg leading-relaxed text-center">
          <li>
            ✅ Need help with <b>TourFolio</b>?
          </li>
          <li>
            ✅ Want to report a <b>bug or issue</b>?
          </li>
          <li>
            ✅ Looking for <b>MERN stack guidance</b>?
          </li>
          <li>
            ✅ Interested in <b>collaborating on a project</b>?
          </li>
        </ul>
      </div>

      {/* Closing Statement */}
      <div className="mt-8 text-center">
        <p className="text-base sm:text-lg font-medium">
          No matter what your question is, I’m here to help. Don’t hesitate to
          reach out—I’d love to connect! 💙
        </p>
      </div>
    </div>
  );
}

export default Contact;
