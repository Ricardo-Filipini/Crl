
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center p-6 bg-black bg-opacity-50 rounded-xl border-4 border-double border-cyan-400 shadow-2xl shadow-cyan-500/50">
      <h1 className="font-pixel text-3xl sm:text-4xl md:text-5xl text-cyan-400 animate-pulse">
        FELIZ ANIVERSÁRIO,
      </h1>
      <h2 className="font-pixel text-4xl sm:text-5xl md:text-6xl text-lime-400 mt-4 animate-bounce">
        CRL!
      </h2>
      <p className="mt-4 text-lg text-fuchsia-400">A Lenda. O Mito. O Mestre da Zueira.</p>
    </header>
  );
};

export default Header;
