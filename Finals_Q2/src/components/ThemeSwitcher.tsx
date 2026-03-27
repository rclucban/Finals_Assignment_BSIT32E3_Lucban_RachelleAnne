import React from "react";
import { useTheme, type Theme } from "../context/ThemeContext";

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="theme-switcher">
      <span>Theme: </span>
      <select 
        value={theme} 
        onChange={(e) => setTheme(e.target.value as Theme)}
        className="theme-select"
      >
        <option value="midnight">Midnight</option>
        <option value="emerald">Emerald</option>
        <option value="solarized">Solarized</option>
      </select>
    </div>
  );
};

export default ThemeSwitcher;
