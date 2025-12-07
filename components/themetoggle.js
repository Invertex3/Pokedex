import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 
               hover:bg-gray-300 dark:hover:bg-gray-600 
               transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <FiMoon className="w-5 h-5 text-gray-800" />
      ) : (
        <FiSun className="w-5 h-5 text-yellow-400" />
      )}
    </button>
  );
};

export default ThemeToggle;
