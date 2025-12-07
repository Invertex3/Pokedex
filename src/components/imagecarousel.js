import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ImageCarousel = ({ sprites }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Get all available sprites
  const spriteImages = [
    { label: 'Front', url: sprites?.front_default },
    { label: 'Back', url: sprites?.back_default },
    { label: 'Shiny Front', url: sprites?.front_shiny },
    { label: 'Shiny Back', url: sprites?.back_shiny },
    { label: 'Official Art', url: sprites?.other?.['official-artwork']?.front_default },
    { label: 'Dream World', url: sprites?.other?.dream_world?.front_default },
    { label: 'Home Front', url: sprites?.other?.home?.front_default },
    { label: 'Home Shiny', url: sprites?.other?.home?.front_shiny },
  ].filter(sprite => sprite.url);

  if (spriteImages.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">No images available</p>
      </div>
    );
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === spriteImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? spriteImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
        <div 
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {spriteImages.map((sprite, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <div className="relative h-64 flex items-center justify-center p-4">
                <img
                  src={sprite.url}
                  alt={sprite.label}
                  className="max-h-56 max-w-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
                              bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {sprite.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 
                 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700
                 p-2 rounded-full shadow-lg transition-colors duration-200"
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 
                 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700
                 p-2 rounded-full shadow-lg transition-colors duration-200"
      >
        <FiChevronRight className="w-5 h-5" />
      </button>

      <div className="flex justify-center mt-4 space-x-2">
        {spriteImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-blue-600 w-4' 
                : 'bg-gray-300 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
