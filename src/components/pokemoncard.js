import React from 'react';
import { Link } from 'react-router-dom';

const PokemonCard = ({ pokemon }) => {
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

  // Get image URL with fallback
  const getImageUrl = () => {
    if (pokemon.sprites?.other?.['official-artwork']?.front_default) {
      return pokemon.sprites.other['official-artwork'].front_default;
    }
    if (pokemon.sprites?.front_default) {
      return pokemon.sprites.front_default;
    }
    // Fallback to a placeholder
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  };

  const imageUrl = getImageUrl();

  return (
    <Link to={`/pokemon/${pokemon.id}`} className="card group hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-400">
      <div className="relative flex flex-col h-full">
        <div className="card-media p-4 relative flex flex-col items-center">
          <span className="poke-number">#{pokemon.id.toString().padStart(3, '0')}</span>
          <img
            src={imageUrl}
            alt={pokemon.name}
            className="max-h-40 max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
            loading="lazy"
            onError={(e) => {
              e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
            }}
          />
        </div>

        <div className="flex-1 flex flex-col p-4 gap-2">
          <h3 className="text-lg font-bold capitalize mb-1 tracking-tight transition-colors">
            <span className="card-title">{pokemon.name}</span>
          </h3>

          <div className="flex flex-wrap gap-2 mb-2">
            {pokemon.types?.map((typeInfo, index) => (
              <span
                key={index}
                className={`type-badge shadow-sm border border-white/30 dark:border-black/20 text-xs px-3 py-1`}
                style={{ filter: 'brightness(1.05) saturate(1.1)' }}
              >
                {typeInfo.type.name}
              </span>
            )) || <span className="type-badge bg-gray-500">Unknown</span>}
          </div>

          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-auto pt-2 border-t border-gray-100 dark:border-gray-800">
            <div>
              <span className="font-semibold">Height: </span>
              {(pokemon.height / 10).toFixed(1)}m
            </div>
            <div>
              <span className="font-semibold">Weight: </span>
              {(pokemon.weight / 10).toFixed(1)}kg
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
