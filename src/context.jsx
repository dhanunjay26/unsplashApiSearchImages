import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const useGlobalContext = () => useContext(AppContext);

const getInitialDarkMode = () => {
  const preferredMode = window.matchMedia(
    "(prefers-color-scheme:dark)"
  ).matches;
  const storedMode = localStorage.getItem("preferredTheme");

  if (storedMode === null) {
    return preferredMode;
  }

  return storedMode === "true";
};

const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
  const [searchValue, setSearchValue] = useState("cat");

  const toggleDarkTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    console.log("toggled dark theme");

    // isDarkTheme
    //   ? document.body.classList.remove("dark-theme")
    //   : document.body.classList.add("dark-theme");
    document.body.classList.toggle("dark-theme", newTheme);
    localStorage.setItem("preferredTheme", newTheme);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, []);

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchValue, setSearchValue }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
