import React, { useState, useEffect } from 'react';
import { getPokemonMoveDetails } from './pokeapi';

const MovesList = ({ moves }) => {
  const [moveDetails, setMoveDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoveDetails = async () => {
      try {
        // Get top 10 moves by level learned (if available)
        const sortedMoves = [...moves]
          .sort((a, b) => {
            const levelA = a.version_group_details[0]?.level_learned_at || 0;
            const levelB = b.version_group_details[0]?.level_learned_at || 0;
            return levelB - levelA;
          })
          .slice(0, 10);

        const details = await Promise.all(
          sortedMoves.map(async (move) => {
            const moveData = await getPokemonMoveDetails(move.move.url);
            const learnMethod = move.version_group_details[0]?.move_learn_method?.name;
            const levelLearned = move.version_group_details[0]?.level_learned_at;
            
            return {
              name: move.move.name,
              ...moveData,
              learnMethod,
              levelLearned
            };
          })
        );

        setMoveDetails(details);
      } catch (error) {
        console.error('Error fetching move details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (moves.length > 0) {
      fetchMoveDetails();
    } else {
      setLoading(false);
    }
  }, [moves]);

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
      <div className="flex justify-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (moveDetails.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-600 dark:text-gray-400">No moves available</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {moveDetails.map((move, index) => (
        <div 
          key={move.name} 
          className="card p-4 animate-fade-in hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-bold text-gray-800 dark:text-white capitalize">
                {move.name}
              </h4>
              {move.learnMethod && (
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Learn: {move.learnMethod} {move.levelLearned ? `(Level ${move.levelLearned})` : ''}
                </p>
              )}
            </div>
            <span className={`type-badge ${getTypeColor(move.type?.name)} text-xs px-2 py-1 capitalize`}>
              {move.type?.name}
            </span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Power: {move.power || '—'} | Accuracy: {move.accuracy || '—'}%
          </p>
        </div>
      ))}
    </div>
  );
};

export default MovesList;
