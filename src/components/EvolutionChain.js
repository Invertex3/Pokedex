import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { getPokemonById } from './pokeapi';

const EvolutionChain = ({ chain }) => {
  const [evolutions, setEvolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvolutions = async () => {
      try {
        const evolutionList = [];
        let current = chain?.chain;
        let safetyCounter = 0;
        
        while (current && safetyCounter < 10) {
          safetyCounter++;
          const pokemonId = current.species.url.split('/').slice(-2, -1)[0];
          try {
            const pokemon = await getPokemonById(pokemonId);
            evolutionList.push({
              pokemon,
              details: current.evolution_details?.[0]
            });
          } catch (error) {
            console.error(`Error fetching evolution ${pokemonId}:`, error);
            evolutionList.push({
              pokemon: {
                id: pokemonId,
                name: current.species.name,
                sprites: {},
                types: []
              },
              details: current.evolution_details?.[0]
            });
          }
          current = current.evolves_to?.[0];
        }
        
        setEvolutions(evolutionList);
      } catch (error) {
        console.error('Error fetching evolutions:', error);
        setEvolutions([]);
      } finally {
        setLoading(false);
      }
    };

    if (chain) {
      fetchEvolutions();
    } else {
      setLoading(false);
      setEvolutions([]);
    }
  }, [chain]);

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
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (evolutions.length <= 1) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 opacity-50">
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-2xl"></span>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400">This Pokémon does not evolve.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {evolutions.map((evolution, index) => (
        <div key={evolution.pokemon.id} className="flex items-center justify-center gap-4">
          <Link 
            to={`/pokemon/${evolution.pokemon.id}`}
            className="flex flex-col items-center"
          >
            <div className="card p-4 flex flex-col items-center">
              <img
                src={evolution.pokemon.sprites?.other?.['official-artwork']?.front_default || 
                     evolution.pokemon.sprites?.front_default}
                alt={evolution.pokemon.name}
                className="w-24 h-24 object-contain drop-shadow-md"
              />
              <p className="capitalize text-sm font-medium mt-2">{evolution.pokemon.name}</p>
            </div>
          </Link>
          {index < evolutions.length - 1 && (
            <FiArrowRight className="w-6 h-6 text-gray-400" />
          )}
        </div>
      ))}
    </div>
  );
};

export default EvolutionChain;
