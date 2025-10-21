import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GAME_PLAYER_IMAGE, GAME_OBSTACLE_IMAGE, GAME_COLLECTIBLE_IMAGE } from '../assets';

// Parâmetros do Jogo Ajustados
const PLAYER_SIZE = 50;
const ITEM_SIZE = 40;
const GAME_DURATION = 30; // segundos
const ITEM_SPAWN_INTERVAL = 1000; // ms (mais lento)
const ITEM_SPEED = 2; // (mais lento)

type ItemType = 'collectible' | 'obstacle';
interface Item {
  id: number;
  x: number;
  y: number;
  type: ItemType;
  rotation: number;
}

const CrlGame: React.FC = () => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'over'>('idle');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [items, setItems] = useState<Item[]>([]);
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>();
  // Fix: In a browser environment, `setInterval` returns a `number`, not a `NodeJS.Timeout`.
  const gameIntervals = useRef<number[]>([]);

  // Função para limpar todos os timers e loops
  const cleanup = useCallback(() => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    gameIntervals.current.forEach(clearInterval);
    gameIntervals.current = [];
  }, []);

  // Função principal do loop do jogo
  const gameLoop = useCallback(() => {
    if (gameState !== 'playing') return;

    setItems(prevItems => {
      const playerRect = { x: playerPos.x, y: playerPos.y, width: PLAYER_SIZE, height: PLAYER_SIZE };
      let newScore = score;
      const updatedItems: Item[] = [];

      for (const item of prevItems) {
        const newItem = { ...item, y: item.y + ITEM_SPEED };

        if (newItem.y < (gameAreaRef.current?.clientHeight || 0)) {
           const itemRect = { x: newItem.x, y: newItem.y, width: ITEM_SIZE, height: ITEM_SIZE };
            const isColliding =
              playerRect.x < itemRect.x + itemRect.width &&
              playerRect.x + playerRect.width > itemRect.x &&
              playerRect.y < itemRect.y + itemRect.height &&
              playerRect.y + playerRect.height > itemRect.y;

          if (isColliding) {
            if (item.type === 'collectible') {
              newScore++;
            } else {
              setGameState('over');
              return []; // Limpa os itens e para o loop
            }
          } else {
            updatedItems.push(newItem);
          }
        }
      }
      if (newScore !== score) {
        setScore(newScore);
      }
      return updatedItems;
    });

    animationFrameId.current = requestAnimationFrame(gameLoop);
  }, [gameState, playerPos.x, playerPos.y, score]);

  // Efeito para controlar o estado do jogo (iniciar/parar)
  useEffect(() => {
    if (gameState === 'playing') {
      // Inicia o timer do jogo
      const timerId = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            setGameState('over');
            return 0;
          }
          return t - 1;
        });
      }, 1000);

      // Inicia o spawner de itens
      const spawnerId = setInterval(() => {
        if (gameAreaRef.current) {
          const gameWidth = gameAreaRef.current.clientWidth;
          setItems(prev => [
            ...prev,
            {
              id: Date.now() + Math.random(),
              x: Math.random() * (gameWidth - ITEM_SIZE),
              y: -ITEM_SIZE,
              type: Math.random() < 0.75 ? 'collectible' : 'obstacle',
              rotation: Math.random() * 90 - 45,
            },
          ]);
        }
      }, ITEM_SPAWN_INTERVAL);

      gameIntervals.current.push(timerId, spawnerId);
      animationFrameId.current = requestAnimationFrame(gameLoop);

    } else {
      cleanup();
    }
    
    // Função de limpeza ao desmontar o componente ou mudar o estado
    return cleanup;
  }, [gameState, gameLoop, cleanup]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setItems([]);
    if (gameAreaRef.current) {
        const rect = gameAreaRef.current.getBoundingClientRect();
        setPlayerPos({ x: (rect.width - PLAYER_SIZE) / 2, y: rect.height - PLAYER_SIZE - 20 });
    }
    setGameState('playing');
  };
  
  const updatePlayerPosition = (clientX: number) => {
    if (!gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = clientX - rect.left - PLAYER_SIZE / 2;
    const clampedX = Math.max(0, Math.min(x, rect.width - PLAYER_SIZE));
    setPlayerPos(prev => ({ ...prev, x: clampedX }));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gameState !== 'playing') return;
    updatePlayerPosition(e.clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (gameState !== 'playing') return;
    updatePlayerPosition(e.touches[0].clientX);
  };

  return (
    <div className="bg-black bg-opacity-40 p-6 rounded-2xl shadow-lg shadow-purple-500/30 text-center border-2 border-purple-500">
      <h3 className="font-pixel text-2xl text-purple-400 mb-2">Natação Calabresal</h3>
      <p className="mb-4 text-gray-300">Pegue os joinhas e desvie das calabresas!</p>
      
      <div 
        ref={gameAreaRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full h-96 bg-gradient-to-br from-blue-900 to-cyan-700 rounded-lg overflow-hidden cursor-none border-2 border-purple-400 touch-none"
      >
        {gameState !== 'playing' && (
          <div className="absolute inset-0 bg-black/70 z-20 flex flex-col justify-center items-center p-4 animate-fade-in">
            {gameState === 'over' && (
              <>
                <h4 className="font-pixel text-4xl text-red-500">GAME OVER</h4>
                <p className="text-2xl mt-4 text-white">Você resgatou {score} pecesas!</p>
              </>
            )}
            {gameState === 'idle' && (
              <p className="font-pixel text-2xl text-white">Pronto para nadar?</p>
            )}
            <button 
              onClick={startGame}
              className="font-pixel mt-6 bg-lime-500 hover:bg-lime-400 text-black py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
            >
              {gameState === 'over' ? 'Tentar de Novo' : 'Começar!'}
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <>
            <div className="absolute top-2 left-3 font-pixel text-white text-xl z-10" style={{textShadow: '2px 2px 4px #000'}}>Pecesas: {score}</div>
            <div className="absolute top-2 right-3 font-pixel text-white text-xl z-10" style={{textShadow: '2px 2px 4px #000'}}>Tempo: {timeLeft}</div>
            
            <img 
              src={GAME_PLAYER_IMAGE.src} 
              alt="Player"
              className="absolute"
              style={{
                left: playerPos.x,
                bottom: 10, // Posição fixa no fundo
                width: PLAYER_SIZE,
                height: PLAYER_SIZE,
                filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.7))',
              }}
            />

            {items.map(item => (
              <img
                key={item.id}
                src={item.type === 'collectible' ? GAME_COLLECTIBLE_IMAGE.src : GAME_OBSTACLE_IMAGE.src}
                alt={item.type}
                className="absolute"
                style={{
                  left: item.x,
                  top: item.y,
                  width: ITEM_SIZE,
                  height: ITEM_SIZE,
                  transform: `rotate(${item.rotation}deg)`,
                }}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CrlGame;