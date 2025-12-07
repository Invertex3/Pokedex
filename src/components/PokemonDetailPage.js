import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiExternalLink } from 'react-icons/fi';
import { getPokemonById, getPokemonSpecies, getEvolutionChain } from './pokeapi';
import StatsChart from './StatsChart';
import EvolutionChain from './EvolutionChain';
import ImageCarousel from './imagecarousel.js';
import MovesList from './MovesList';

const PokemonDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true);
      try {
        const pokemonData = await getPokemonById(id);
        const speciesData = await getPokemonSpecies(id);
        
        setPokemon(pokemonData);
        setSpecies(speciesData);
        
        if (speciesData.evolution_chain?.url) {
          const evolutionData = await getEvolutionChain(speciesData.evolution_chain.url);
          setEvolutionChain(evolutionData);
        }
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPokemonData();
    }
  }, [id, navigate]);

  const getTypeColor = (type) => {
    const colors = {
      normal: 'bg-pokemon-normal',
      fire: 'bg-pokemon-fire',
      water: 'bg-pokemon-water',
      grass: 'bg-pokemon-grass',
      electric: 'bg-pokemon-electric',
      ice: 'bg-pokemon-ice',
      fighting: 'bg-pokemon-fighting',
      poison: 'bg-pokemon-poison',
      ground: 'bg-pokemon-ground',
      flying: 'bg-pokemon-flying',
      psychic: 'bg-pokemon-psychic',
      bug: 'bg-pokemon-bug',
      rock: 'bg-pokemon-rock',
      ghost: 'bg-pokemon-ghost',
      dark: 'bg-pokemon-dark',
      dragon: 'bg-pokemon-dragon',
      steel: 'bg-pokemon-steel',
      fairy: 'bg-pokemon-fairy',
    };
    return colors[type] || 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!pokemon) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        aria-label="Back to Pokédex"
        title="Back"
        className="p-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-[color:var(--card)]/90 dark:hover:bg-[color:var(--card)]/80 transition-colors mb-6"
      >
        <FiArrowLeft className="w-5 h-5" />
      </button>
      {/* Pokemon Header */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 
                    rounded-2xl p-8 mb-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
          {/* Image */}
          <div className="flex-shrink-0">
            <div className="w-64 h-64 bg-white/50 dark:bg-gray-800/50 rounded-2xl p-4 
                          flex items-center justify-center">
              <img
                src={pokemon.sprites?.other?.['official-artwork']?.front_default || 
                     pokemon.sprites?.front_default}
                alt={pokemon.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Info */}
            <div className="flex-grow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white capitalize">
                  {pokemon.name}
                </h1>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                    #{pokemon.id.toString().padStart(3, '0')}
                  </span>
                  <div className="flex space-x-2">
                    {pokemon.types?.map((type, index) => (
                      <span
                        key={index}
                        className={`type-badge ${getTypeColor(type.type.name)} px-4 py-1`}
                      >
                        {type.type.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Height</p>
                <p className="text-xl font-bold text-gray-800 dark:text-white">
                  {(pokemon.height / 10).toFixed(1)} m
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Weight</p>
                <p className="text-xl font-bold text-gray-800 dark:text-white">
                  {(pokemon.weight / 10).toFixed(1)} kg
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Base XP</p>
                <p className="text-xl font-bold text-gray-800 dark:text-white">
                  {pokemon.base_experience || '—'}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Abilities</p>
                <div className="space-y-1">
                  {pokemon.abilities?.slice(0, 3).map((ability, index) => (
                    <p key={index} className="font-medium text-gray-800 dark:text-white capitalize">
                      {ability.ability.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-300 dark:border-gray-700 mb-6">
              <div className="flex space-x-4">
                {['about', 'stats', 'evolution', 'moves', 'images'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 px-1 capitalize font-medium ${
                      activeTab === tab
                        ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === 'about' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card p-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Description
              </h3>
              {species?.flavor_text_entries?.find(entry => entry.language.name === 'en') ? (
                <p className="text-gray-600 dark:text-gray-300">
                  {species.flavor_text_entries.find(entry => entry.language.name === 'en')
                    .flavor_text.replace(/\f/g, ' ')}
                </p>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No description available</p>
              )}
            </div>
            <div className="card p-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Habitat & Breeding
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Habitat</p>
                  <p className="font-medium text-gray-800 dark:text-white capitalize">
                    {species?.habitat?.name || 'Unknown'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Color</p>
                  <p className="font-medium text-gray-800 dark:text-white capitalize">
                    {species?.color?.name || 'Unknown'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Capture Rate</p>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {species?.capture_rate || 'Unknown'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="card p-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Base Stats
            </h3>
            <StatsChart stats={pokemon.stats} />
          </div>
        )}

        {activeTab === 'evolution' && (
          <div className="card p-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Evolution Chain
            </h3>
            <EvolutionChain chain={evolutionChain} />
          </div>
        )}

        {activeTab === 'moves' && (
          <div className="card p-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Top Moves
            </h3>
            <MovesList moves={pokemon.moves} />
          </div>
        )}

        {activeTab === 'images' && (
          <div className="card p-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Image Gallery
            </h3>
            <ImageCarousel sprites={pokemon.sprites} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonDetailPage;
