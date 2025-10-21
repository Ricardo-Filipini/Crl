import React, { useState, useCallback } from 'react';
import { generateFunnyImage } from '../services/geminiService';
import { MEME_BASE_IMAGES, CrlImage } from '../assets';

const prompts = [
  "Transforme este homem em um super-herói com uma capa esvoaçante e um pijama de unicórnio cor-de-rosa.",
  "Coloque o rosto deste homem no corpo de um bebê gigante em um carrinho de bebê dourado.",
  "Recrie esta cena como se ele estivesse surfando em uma pizza gigante de pepperoni no espaço sideral, com estrelas de queijo.",
  "Imagine este homem como o vocalista de uma banda de rock farofa dos anos 80, com um mullet loiro, e roupas de couro apertadas.",
  "Faça este homem ser o rei de um castelo feito de doces e guloseimas, usando uma coroa de jujubas.",
  "Coloque este homem em uma festa num barco, mostrando seu famoso e hipnotizante 'molejo de ombros' para a multidão.",
  "Use IA para sutilmente (ou não) trocar os mamilos deste homem por duas fatias de calabresa.",
  "Crie uma cena onde o Sr. Odilon está claramente impressionado com o molejo do CRL, promovendo-o a diretor no meio do escritório.",
  "Desenvolva o logo para a 'CRL 9nhas Corp', uma empresa de 'agenciamento de talentos' com um ar bem suspeito, usando o rosto dele."
];

// Helper to fetch image from URL and convert to Base64
const urlToBase64 = async (url: string): Promise<{ base64: string, mimeType: string }> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Falha ao buscar imagem: ${response.statusText}`);
  }
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result as string;
      resolve({ base64: base64data.split(',')[1], mimeType: blob.type });
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};


const WallOfShame: React.FC = () => {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<CrlImage>(MEME_BASE_IMAGES[0]);

  const handleGenerateImage = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setGeneratedImage(null);
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setCurrentPrompt(`A IA está tentando: "${randomPrompt}"`);

    try {
      const { base64, mimeType } = await urlToBase64(selectedImage.src);
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
            <button key={index} onClick={() => setSelectedImage(img)} className={`rounded-lg overflow-hidden border-4 transition-all duration-200 ${selectedImage.src === img.src ? 'border-lime-400 scale-110' : 'border-transparent hover:border-lime-400/50'}`}>
              <img src={img.src} alt={img.alt} className="w-20 h-20 object-cover" />
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
