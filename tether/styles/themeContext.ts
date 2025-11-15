import themes from "./themes"
import { createContext, useState, useContext } from 'react';


const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isLight, setIsLight] = useState(true);

  const toggleTheme = () => setIsLight(!isLight);

  const theme = isLight ? themes.light : themes.dark;

  return (
    <ThemeContext.Provider value={{ theme, isLight, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);