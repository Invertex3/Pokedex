import React from 'react';
import PokemonGuessGame from './PokemonGuessGame';

const GamePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Pokemon Guess Game
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Test your Pokemon knowledge! Guess the Pokemon from its silhouette.
          </p>
        </div>

        <div className="card p-8">
          <PokemonGuessGame />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card p-6">
            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
              How to Play
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li> Look at the Pokemon silhouette</li>
              <li> Choose from 4 possible names</li>
              <li> Get 10 guesses to score as high as possible</li>
              <li> Correct answers earn 1 point</li>
            </ul>
          </div>

          <div className="card p-6">
            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
              Tips
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li> Pay attention to the silhouette shape</li>
              <li> Consider the Pokemon's generation</li>
              <li> Eliminate obviously wrong answers first</li>
              <li> Practice makes perfect!</li>
            </ul>
          </div>

          <div className="card p-6">
            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
              Game Features
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li> Random Pokemon from Gen 1</li>
              <li> 10 rounds per game</li>
              <li> Instant feedback on answers</li>
              <li> Final score and performance rating</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
