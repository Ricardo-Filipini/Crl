import React from 'react';
import { FLOATING_IMAGES } from '../assets';

const positions = [
  { top: '10vh', left: '5vw', transform: 'rotate(-15deg)' },
  { top: '20vh', right: '10vw', transform: 'rotate(20deg)' },
  { bottom: '15vh', left: '15vw', transform: 'rotate(10deg)' },
  { bottom: '5vh', right: '5vw', transform: 'rotate(-10deg)' },
  { top: '50vh', right: '2vw', transform: 'rotate(5deg)' },
  { top: '75vh', left: '25vw', transform: 'rotate(-5deg)' },
];

const FloatingCrls: React.FC = () => {
  const imagesToDisplay = FLOATING_IMAGES;

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {imagesToDisplay.map((img, index) => (
        <img
          key={index}
          src={img.src}
          alt={img.alt}
          className="absolute w-24 h-24 md:w-32 md:h-32 object-contain opacity-20 animate-pulse"
          style={{
            ...positions[index % positions.length],
            animationDelay: `${index * 0.5}s`,
            animationDuration: `${3 + index * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingCrls;