import React, { useState, useEffect, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { searchPokemon } from './pokeapi';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const results = await searchPokemon(query);
        setSuggestions(results);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
      setEmptyError(false);
    } else {
      setEmptyError(true);
    }
  };

  const handleSuggestionClick = (pokemonName) => {
    setQuery(pokemonName);
    onSearch(pokemonName);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    setEmptyError(false);
    onSearch('');
  };

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
              if (emptyError) setEmptyError(false);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder={emptyError ? "Please enter a name" : "Search Pokemon by name..."}
            className={`input-field${emptyError ? ' border-red-500' : ''}`}
          />
          {loading && (
            <div className="absolute right-16 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[color:var(--accent)]"></div>
            </div>
          )}
          {query && !loading && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          )}
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-panel">
          {suggestions.map((pokemon) => (
            <button
              key={pokemon.id}
              onClick={() => handleSuggestionClick(pokemon.name)}
              className="suggestion-item w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="flex items-center gap-2">
                <img
                  src={pokemon.sprites?.front_default || pokemon.sprites?.other?.['official-artwork']?.front_default}
                  alt={pokemon.name}
                  className="w-8 h-8 object-contain"
                />
                <span className="capitalize">{pokemon.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
