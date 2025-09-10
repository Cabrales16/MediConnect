import React, { useEffect, useState } from "react";
import ToggleSwitch from "./ToggleSwitch";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="flex justify-between items-center p-4">
      <span className="text-gray-800 font-medium">Modo oscuro</span>
      <ToggleSwitch enabled={darkMode} onToggle={() => setDarkMode(!darkMode)} />
    </div>
  );
}
