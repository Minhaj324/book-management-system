import React, { useState, useEffect } from "react";
import { Menu, X, BookOpen, Sun, Moon } from "lucide-react";

function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      root.style.setProperty("--color-primary", "#3b82f6"); 
    } else {
      root.classList.remove("dark");
      root.style.setProperty("--color-primary", "#4b3621"); 
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <header className="w-full bg-primary text-text shadow-md fixed top-0 left-0 z-50">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-around">
       
        <div className="flex items-center gap-2 justify-center">
          <BookOpen className="w-8 h-8 text-white mt-1" />
          <h1 className="hidden xs:block text-white text-xl md:text-2xl font-bold tracking-wide">
            Book Management System
          </h1>
        </div>

       
        <button
          onClick={toggleDarkMode}
          className="focus:outline-none text-white"
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </nav>
    </header>
  );
}

export default Header;
