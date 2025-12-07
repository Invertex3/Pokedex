import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './HomePage';
import PokemonDetailPage from './PokemonDetailPage';
import GamePage from '/GamePage';
import ThemeToggle from '/ThemeToggle';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const location = useLocation();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 site-header">
        <div className="container mx-auto px-4 py-4 header-container">
          <div className="flex items-center justify-between">
            <div className="w-16" aria-hidden />

            <div className="header-center">
              <Link to="/" className="header-link" style={{ fontWeight: 700, fontSize: '1.125rem' }}>
                Pokedex
              </Link>

              <Link to="/" className={`header-link ${location.pathname === '/' ? 'underline' : ''}`}>
                Home
              </Link>

              <Link to="/game" className={`header-link ${location.pathname === '/game' ? 'underline' : ''}`}>
                Guess Game
              </Link>
            </div>

            <div className="theme-toggle-wrapper">
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="site-footer py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Pokedex</h3>
              <p className="text-gray-400">
                The ultimate Pokemon database with detailed information about every Pokemon.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Search and browse Pokemon</li>
                <li>Detailed Pokemon information</li>
                <li>Evolution chains</li>
                <li>Pokemon guess game</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Data Source</h3>
              <p className="text-gray-400">
                All data is provided by the 
                <a 
                  href="https://pokeapi.co/api/v2/pokemon/ditto" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 ml-1"
                >
                    PokeAPI
                </a>
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 Pokedex Website. Made for educational purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
