import React, { useEffect, useState } from 'react';

const StatsChart = ({ stats }) => {
  const [animatedStats, setAnimatedStats] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats(stats);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [stats]);

  const statNames = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    speed: 'Speed'
  };

  const getStatColor = (value) => {
    if (value >= 100) return 'bg-green-500';
    if (value >= 70) return 'bg-yellow-500';
    if (value >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-4">
      {stats.map((stat, index) => (
        <div key={stat.stat.name} className="space-y-2 animate-fade-in" 
             style={{ animationDelay: `${index * 100}ms` }}>
          <div className="flex justify-between items-center">
            <span className="font-medium stat-label capitalize">
              {statNames[stat.stat.name] || stat.stat.name}
            </span>
            <span className="font-bold text-gray-800 dark:text-white">
              {animatedStats[index]?.base_stat || 0}
            </span>
          </div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${getStatColor(stat.base_stat)} stat-bar`}
              style={{ 
                width: animatedStats[index] ? `${(animatedStats[index].base_stat / 255) * 100}%` : '0%'
              }}
            />
          </div>
        </div>
      ))}
      
      <div className="pt-4 border-t border-gray-300 dark:border-gray-700 mt-4">
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-800 dark:text-white">Total</span>
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatsChart;
