import React from 'react';
import Header from './components/Header';
import NicknameGenerator from './components/NicknameGenerator';
import WallOfShame from './components/WallOfShame';
import CrlQuiz from './components/CrlQuiz';
import MessageBoard from './components/MessageBoard';
import ImageGallery from './components/ImageGallery';
import FloatingCrls from './components/FloatingCrls';
import CrlGame from './components/CrlGame';
import VideoGallery from './components/VideoGallery';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8 overflow-x-hidden relative">
      <FloatingCrls />
      <div 
        className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-gray-900/80 to-purple-900/80"
        style={{
          backgroundImage: "url('/Crl/Imagens/STK-20231224-WA0026.webp')",
          backgroundSize: '200px 200px',
          backgroundBlendMode: 'multiply',
          opacity: 0.1,
        }}
      ></div>
      <div className="container mx-auto max-w-5xl relative z-10">
        <Header />

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="md:col-span-2">
            <NicknameGenerator />
          </div>

          <div className="md:col-span-2">
            <WallOfShame />
          </div>

          <div className="md:col-span-2">
            <CrlGame />
          </div>

          <div className="bg-black bg-opacity-40 p-6 rounded-2xl shadow-lg shadow-lime-500/30 border-2 border-lime-500">
            <CrlQuiz />
          </div>

          <div className="bg-black bg-opacity-40 p-6 rounded-2xl shadow-lg shadow-fuchsia-500/30 border-2 border-fuchsia-500">
            <MessageBoard />
          </div>
          
          <div className="md:col-span-2">
            <ImageGallery />
          </div>

          <div className="md:col-span-2">
            <VideoGallery />
          </div>
        </main>

        <footer className="text-center mt-12 pb-8">
          <p className="font-pixel text-sm text-gray-400">
            Feito com admiração e muita zueira. Te amamos, CRL! ❤️
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;