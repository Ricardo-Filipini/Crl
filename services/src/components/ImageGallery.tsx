import React from 'react';
import { GALLERY_IMAGES } from '../assets';

const ImageGallery: React.FC = () => {
  return (
    <div className="bg-black bg-opacity-40 p-6 rounded-2xl shadow-lg shadow-yellow-500/30 text-center border-2 border-yellow-500">
      <h3 className="font-pixel text-2xl text-yellow-400 mb-6">Galeria dos Clássicos</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {GALLERY_IMAGES.map((img, index) => (
          <div key={index} className="group overflow-hidden rounded-lg shadow-lg transform transition-transform hover:scale-110 hover:z-10">
            <img 
              src={img.src} 
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:rotate-3 group-hover:scale-125"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;