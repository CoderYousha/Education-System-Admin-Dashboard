import { useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
     const muiTheme = theme === "light" ? lightTheme : darkTheme;
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};