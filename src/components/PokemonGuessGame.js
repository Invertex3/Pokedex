import React, { useState, useEffect } from 'react';
import { getPokemonById } from './pokeapi';
import { FiRefreshCw, FiCheck, FiX } from 'react-icons/fi';

const PokemonGuessGame = () => {
  const [pokemon, setPokemon] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [totalGuesses, setTotalGuesses] = useState(0);
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState("");

  const isRevealed = selectedAnswer !== null || gameOver;

  const silhouetteStyle = {
    filter: isRevealed ? 'none' : 'brightness(0) saturate(100%) contrast(200%)',
    transition: 'filter 500ms ease'
  };

  const startNewRound = async () => {
    setLoading(true);
    setSelectedAnswer(null);
    setFeedback("");

    try {
      const randomId = Math.floor(Math.random() * 151) + 1;
      const randomPokemon = await getPokemonById(randomId);

      const otherIds = new Set();
      while (otherIds.size < 3) {
        const id = Math.floor(Math.random() * 151) + 1;
        if (id !== randomId) otherIds.add(id);
      }

      const otherPokemon = await Promise.all(
        Array.from(otherIds).map(id => getPokemonById(id))
      );

      const allOptions = [
        { ...randomPokemon, isCorrect: true },
        ...otherPokemon.map(p => ({ ...p, isCorrect: false }))
      ].sort(() => Math.random() - 0.5);

      setPokemon(randomPokemon);
      setOptions(allOptions);
    } catch (error) {
      console.error('Error starting new round:', error);
      setTimeout(startNewRound, 1000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    startNewRound();
  }, []);

  const handleAnswer = (option) => {
    if (selectedAnswer || gameOver) return;

    setSelectedAnswer(option);
    setTotalGuesses(prev => prev + 1);

    if (option.isCorrect) {
      setScore(prev => prev + 1);
      setFeedback("You are correct!");
    } else {
      setFeedback(`Wrong! The correct answer is ${pokemon.name}.`);
    }

    setTimeout(() => {
      if (totalGuesses + 1 >= 10) {
        setGameOver(true);
      } else {
        startNewRound();
      }
    }, 2000);
  };

  const resetGame = () => {
    setScore(0);
    setTotalGuesses(0);
    setGameOver(false);
    startNewRound();
  };

  if (loading || !pokemon) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading Pokémon...</p>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="text-center space-y-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Game Over!</h3>
        <div className="space-y-2">
          <p className="text-gray-600 dark:text-gray-400">Final Score</p>
          <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
            {score} / 10
          </p>
        </div>
        <button
          onClick={resetGame}
          className="btn-primary inline-flex items-center gap-2"
        >
          <FiRefreshCw className="w-4 h-4" />
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="text-center space-y-8">
      <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
        <span>Round {totalGuesses + 1}/10</span>
        <span>Score: {score}</span>
      </div>

      {/* Pokémon image with silhouette before reveal */}
      <div className="flex justify-center">
        <div className="w-48 h-48 bg-black/5 dark:bg-white/5 rounded-2xl flex items-center justify-center">
          <img
            src={pokemon.sprites?.front_default}
            alt={isRevealed ? pokemon.name : "Who's that Pokémon?"}
            className="w-40 h-40 object-contain"
            style={silhouetteStyle}
          />
        </div>
      </div>

      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleAnswer(option)}
            disabled={selectedAnswer !== null}
            className={`w-full rounded-lg font-semibold text-lg capitalize
                        transition-all
                        ${selectedAnswer && option.isCorrect ? 'border-2 border-green-500' : ''}
                        ${selectedAnswer && !option.isCorrect && selectedAnswer === option ? 'border-2 border-red-500' : ''}
                        bg-gray-100 hover:bg-gray-200
                        dark:bg-transparent dark:hover:bg-transparent`}
          >
            <div className="flex items-center justify-between">
              <span>{option.name}</span>
              {selectedAnswer === option && (
                <span className={option.isCorrect ? 'text-green-500' : 'text-red-500'}>
                  {option.isCorrect ? <FiCheck /> : <FiX />}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {feedback && (
        <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
          {feedback}
        </p>
      )}
    </div>
  );
};

export default PokemonGuessGame;
