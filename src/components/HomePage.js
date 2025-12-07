import React, { useState, useEffect } from 'react';
import PokemonCard from './pokemoncard.js';
import SearchBar from './SearchBar';
import Pagination from './pagination.js';
import { getPokemonList } from './pokeapi';

const HomePage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const pokemonPerPage = 25;

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const offset = (currentPage - 1) * pokemonPerPage;
        const data = await getPokemonList(offset, pokemonPerPage);
        setPokemonList(data.results);
        setTotalPages(Math.ceil(data.count / pokemonPerPage));
        setFilteredPokemon(data.results);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [currentPage]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredPokemon(pokemonList);
    } else {
      const filtered = pokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPokemon(filtered);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredPokemon(pokemonList);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Discover Pokemon
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Browse through {totalPages * pokemonPerPage} Pokemon with detailed information
        </p>
        
        <SearchBar onSearch={handleSearch} />
        
        {searchQuery && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-gray-600 dark:text-gray-400">
              Showing results for: <span className="font-semibold">{searchQuery}</span>
            </p>
            <button
              onClick={handleClearSearch}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="pokemon-grid">
            {filteredPokemon.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>

          {filteredPokemon.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 opacity-50">
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                No Pokemon Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try searching with a different name
              </p>
            </div>
          )}

          {!searchQuery && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
