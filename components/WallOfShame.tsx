import React, { useState, useCallback } from 'react';
import { generateFunnyImage } from '../services/geminiService';
import { MEME_BASE_IMAGES } from '../assets';

const prompts = [
  "Transforme este homem em um super-herói com uma capa esvoaçante e um pijama de unicórnio cor-de-rosa.",
  "Coloque o rosto deste homem no corpo de um bebê gigante em um carrinho de bebê dourado.",
  "Recrie esta cena como se ele estivesse surfando em uma pizza gigante de pepperoni no espaço sideral, com estrelas de queijo.",
  "Imagine este homem como o vocalista de uma banda de rock farofa dos anos 80, com um mullet loiro, e roupas de couro apertadas.",
  "Faça este homem ser o rei de um castelo feito de doces e guloseimas, usando uma coroa de jujubas.",
  "Coloque o rosto deste homem em um corpo de um anão de jardim dançando macarena em cima de um cogumelo.",
  "Recrie a imagem com este homem participando de uma competição de comer pão com vina.",
];

const WallOfShame: React.FC = () => {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState(MEME_BASE_IMAGES[0]);

  const handleGenerateImage = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setGeneratedImage(null);
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setCurrentPrompt(`A IA está tentando: "${randomPrompt}"`);

    try {
      const { base64, mimeType } = selectedImage;
      const newImage = await generateFunnyImage(base64, mimeType, randomPrompt);
      setGeneratedImage(newImage);
    } catch (err: any) {
      setError(err.message || 'Falha ao gerar a imagem.');
      setGeneratedImage(null);
    } finally {
      setIsLoading(false);
    }
  }, [selectedImage]);

  return (
    <div className="bg-black bg-opacity-40 p-6 rounded-2xl shadow-lg shadow-red-500/30 text-center border-2 border-red-500">
      <h3 className="font-pixel text-2xl text-red-500 mb-4">Mural da Vergonha IA 2.0</h3>
      <p className="mb-4 text-gray-300">1. Escolha a vítima. 2. Clique no botão. 3. Reze.</p>
      
      <div className="mb-6">
        <h4 className="text-lg text-yellow-400 mb-3">Escolha a base para o meme:</h4>
        <div className="flex justify-center flex-wrap gap-2">
          {MEME_BASE_IMAGES.map((img, index) => (
            <button key={index} onClick={() => setSelectedImage(img)} className={`rounded-lg overflow-hidden border-4 transition-all duration-200 ${selectedImage.base64 === img.base64 ? 'border-lime-400 scale-110' : 'border-transparent hover:border-lime-400/50'}`}>
              <img src={`data:${img.mimeType};base64,${img.base64}`} alt={`Base Meme ${index + 1}`} className="w-20 h-20 object-cover" />
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col items-center">
        <button
          onClick={handleGenerateImage}
          disabled={isLoading}
          className="font-pixel bg-red-600 hover:bg-red-500 text-white py-3 px-6 rounded-lg transition-transform transform hover:scale-105 disabled:bg-gray-500"
        >
          {isLoading ? 'PROCESSANDO VERGONHA...' : 'CRIAR MEME DO CRL'}
        </button>

        {isLoading && (
          <div className="mt-6 text-center">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-lime-400 mx-auto"></div>
            <p className="text-lime-400 mt-4 animate-pulse">{currentPrompt}</p>
          </div>
        )}

        {error && <div className="mt-6 text-red-400 font-bold p-4 bg-red-900/50 rounded-lg">{error}</div>}

        {generatedImage && !isLoading && (
          <div className="mt-8 border-4 border-lime-400 p-2 rounded-lg bg-gray-800 animate-fade-in">
            <img src={generatedImage} alt="Generated Meme" className="max-w-full h-auto rounded-md mx-auto" />
          </div>
        )}
      </div>
    </div>
  );
};

export default WallOfShame;