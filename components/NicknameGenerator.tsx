
import React, { useState, useCallback } from 'react';
import { generateNickname } from '../services/geminiService';

const NicknameGenerator: React.FC = () => {
  const [nickname, setNickname] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGenerateNickname = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setNickname('');
    try {
      const newNickname = await generateNickname();
      setNickname(newNickname);
    } catch (err: any) {
      setError(err.message || 'Falha ao gerar apelido.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="bg-black bg-opacity-40 p-6 rounded-2xl shadow-lg shadow-cyan-500/30 text-center border-2 border-cyan-400">
      <h3 className="font-pixel text-2xl text-cyan-400 mb-4">Gerador de Apelidos</h3>
      <p className="mb-6 text-gray-300">Descubra a verdadeira identidade do CRL. Cuidado, pode ser ofensivo.</p>
      <button
        onClick={handleGenerateNickname}
        disabled={isLoading}
        className="font-pixel bg-cyan-500 hover:bg-cyan-400 text-black py-3 px-6 rounded-lg transition-transform transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {isLoading ? 'PENSANDO NA ZUEIRA...' : 'GERAR APELIDO PROIBIDO'}
      </button>
      {isLoading && <div className="mt-6 text-lime-400 animate-pulse">Consultando os astros...</div>}
      {error && <div className="mt-6 text-red-500 font-bold">{error}</div>}
      {nickname && (
        <div className="mt-8 p-4 bg-lime-400 text-black rounded-lg animate-fade-in">
          <p className="text-sm">O novo nome dele é...</p>
          <p className="font-pixel text-2xl font-bold">{nickname}</p>
        </div>
      )}
    </div>
  );
};

export default NicknameGenerator;
