import React from 'react';
import { GALLERY_VIDEOS } from '../assets';

const VideoGallery: React.FC = () => {
  return (
    <div className="bg-black bg-opacity-40 p-6 rounded-2xl shadow-lg shadow-teal-500/30 text-center border-2 border-teal-500">
      <h3 className="font-pixel text-2xl text-teal-400 mb-6">Videoteca da Vergonha</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {GALLERY_VIDEOS.map((video, index) => (
          <div key={index} className="group overflow-hidden rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:z-10">
            <video 
              src={video.src} 
              className="w-full h-full object-cover"
              controls
              loop
              playsInline
              muted
            >
              Seu navegador não suporta o vídeo. Que pena!
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;