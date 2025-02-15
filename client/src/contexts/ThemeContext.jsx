import { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

    const toggleTheme = () => {
        console.log("Chnage theme");
        console.log(theme);
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
        console.log(theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;

export function useTheme() {
  return useContext(ThemeContext);
}