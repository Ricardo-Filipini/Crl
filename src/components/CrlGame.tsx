import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GAME_PLAYER_IMAGE, GAME_OBSTACLE_IMAGE, GAME_COLLECTIBLE_IMAGE } from '../assets';

const PLAYER_SIZE = 60;
const ITEM_SIZE = 50;
const GAME_DURATION = 30; // seconds
const ITEM_SPAWN_INTERVAL = 800; // ms
const ITEM_SPEED = 2.5;

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
  const gameIntervalId = useRef<number>();

  const resetGame = useCallback(() => {
    setGameState('idle');
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setItems([]);
    if (gameAreaRef.current) {
        const rect = gameAreaRef.current.getBoundingClientRect();
        setPlayerPos({ x: rect.width / 2 - PLAYER_SIZE / 2, y: rect.height / 2 - PLAYER_SIZE / 2 });
    }
  }, []);
  
  const startGame = () => {
    setGameState('playing');
  };
  
  useEffect(() => {
    // Reset game state when starting
    if (gameState === 'playing') {
      setScore(0);
      setTimeLeft(GAME_DURATION);
      setItems([]);
    }
  }, [gameState]);


  const gameLoop = useCallback(() => {
    setItems(prevItems => {
        const newItems = prevItems
            .map(item => ({ ...item, y: item.y + ITEM_SPEED }))
            .filter(item => item.y < (gameAreaRef.current?.clientHeight || 0));

        // Collision detection
        const playerRect = {
            x: playerPos.x,
            y: playerPos.y,
            width: PLAYER_SIZE,
            height: PLAYER_SIZE,
        };

        let scoreGained = 0;
        const remainingItems = [];

        for (const item of newItems) {
            const itemRect = { x: item.x, y: item.y, width: ITEM_SIZE, height: ITEM_SIZE };
            const isColliding =
                playerRect.x < itemRect.x + itemRect.width &&
                playerRect.x + playerRect.width > itemRect.x &&
                playerRect.y < itemRect.y + itemRect.height &&
                playerRect.y + playerRect.height > itemRect.y;

            if (isColliding) {
                if (item.type === 'collectible') {
                    scoreGained++;
                } else {
                    setGameState('over');
                    return [];
                }
            } else {
                remainingItems.push(item);
            }
        }
        if (scoreGained > 0) {
            setScore(s => s + scoreGained);
        }
        return remainingItems;
    });

    animationFrameId.current = requestAnimationFrame(gameLoop);
  }, [playerPos]);


  useEffect(() => {
    if (gameState === 'playing') {
      animationFrameId.current = requestAnimationFrame(gameLoop);

      gameIntervalId.current = window.setInterval(() => {
        // Timer
        setTimeLeft(t => {
          if (t <= 1) {
            setGameState('over');
            return 0;
          }
          return t - 1;
        });
        
        // Item Spawner
        if (gameAreaRef.current) {
          const gameWidth = gameAreaRef.current.clientWidth;
          const type: ItemType = Math.random() < 0.7 ? 'collectible' : 'obstacle';
          setItems(prev => [
            ...prev,
            {
              id: Date.now() + Math.random(),
              x: Math.random() * (gameWidth - ITEM_SIZE),
              y: -ITEM_SIZE,
              type,
              rotation: Math.random() * 360,
            },
          ]);
        }

      }, ITEM_SPAWN_INTERVAL);

    }

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (gameIntervalId.current) clearInterval(gameIntervalId.current);
    };
  }, [gameState, gameLoop]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gameState !== 'playing' || !gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - PLAYER_SIZE / 2;
    const y = e.clientY - rect.top - PLAYER_SIZE / 2;
    
    const clampedX = Math.max(0, Math.min(x, rect.width - PLAYER_SIZE));
    const clampedY = Math.max(0, Math.min(y, rect.height - PLAYER_SIZE));

    setPlayerPos({ x: clampedX, y: clampedY });
  };
  
  useEffect(() => {
    const handleResize = () => {
        if (gameAreaRef.current) {
             const rect = gameAreaRef.current.getBoundingClientRect();
             setPlayerPos({ x: rect.width / 2 - PLAYER_SIZE / 2, y: rect.height / 2 - PLAYER_SIZE / 2 });
        }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className="bg-black bg-opacity-40 p-6 rounded-2xl shadow-lg shadow-purple-500/30 text-center border-2 border-purple-500">
      <h3 className="font-pixel text-2xl text-purple-400 mb-2">Natação Calabresal</h3>
      <p className="mb-4 text-gray-300">Ajude o CRL a resgatar as 'Pecesas' e desviar das calabresas!</p>
      
      <div 
        ref={gameAreaRef}
        onMouseMove={handleMouseMove}
        className="relative w-full h-96 bg-gradient-to-br from-blue-800 to-cyan-600 rounded-lg overflow-hidden cursor-none border-2 border-purple-400"
      >
        {gameState !== 'playing' && (
            <div className="absolute inset-0 bg-black/60 z-20 flex flex-col justify-center items-center p-4">
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
                    {gameState === 'over' ? 'Jogar de Novo' : 'Começar!'}
                </button>
            </div>
        )}

        {gameState === 'playing' && (
          <>
            <div className="absolute top-2 left-3 font-pixel text-white text-xl z-10">Pecesas: {score}</div>
            <div className="absolute top-2 right-3 font-pixel text-white text-xl z-10">Tempo: {timeLeft}</div>
            
            <img 
              src={GAME_PLAYER_IMAGE.src} 
              alt="Player"
              className="absolute rounded-full"
              style={{
                left: playerPos.x,
                top: playerPos.y,
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