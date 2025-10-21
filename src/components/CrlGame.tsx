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
  const gameTimerId = useRef<number>();
  const itemSpawnerId = useRef<number>();

  const endGame = useCallback(() => {
    if (gameState === 'playing') {
      setGameState('over');
    }
  }, [gameState]);

  useEffect(() => {
    // Cleanup intervals and animation frames when game ends or component unmounts
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (gameTimerId.current) clearInterval(gameTimerId.current);
      if (itemSpawnerId.current) clearInterval(itemSpawnerId.current);
    };
  }, []);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setItems([]);
    setGameState('playing');
  };

  const gameLoop = useCallback(() => {
    setItems(prevItems => {
      const playerRect = {
        x: playerPos.x,
        y: playerPos.y,
        width: PLAYER_SIZE,
        height: PLAYER_SIZE,
      };

      let scoreDelta = 0;
      const remainingItems = [];

      for (const item of prevItems) {
        // Move item
        const newItem = { ...item, y: item.y + ITEM_SPEED };
        
        // Check if item is off-screen
        if (newItem.y > (gameAreaRef.current?.clientHeight || 0)) {
          continue;
        }

        const itemRect = { x: newItem.x, y: newItem.y, width: ITEM_SIZE, height: ITEM_SIZE };
        const isColliding =
          playerRect.x < itemRect.x + itemRect.width &&
          playerRect.x + playerRect.width > itemRect.x &&
          playerRect.y < itemRect.y + itemRect.height &&
          playerRect.y + playerRect.height > itemRect.y;

        if (isColliding) {
          if (newItem.type === 'collectible') {
            scoreDelta++;
          } else {
            endGame();
            return []; // Clear all items on collision
          }
        } else {
          remainingItems.push(newItem);
        }
      }
      
      if (scoreDelta > 0) {
        setScore(s => s + scoreDelta);
      }
      
      return remainingItems;
    });

    animationFrameId.current = requestAnimationFrame(gameLoop);
  }, [playerPos, endGame]);

  useEffect(() => {
    if (gameState === 'playing') {
      animationFrameId.current = requestAnimationFrame(gameLoop);

      gameTimerId.current = window.setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            endGame();
            return 0;
          }
          return t - 1;
        });
      }, 1000);

      itemSpawnerId.current = window.setInterval(() => {
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

    } else {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (gameTimerId.current) clearInterval(gameTimerId.current);
      if (itemSpawnerId.current) clearInterval(itemSpawnerId.current);
    }
  }, [gameState, gameLoop, endGame]);
  
  const updatePlayerPosition = (clientX: number, clientY: number) => {
    if (!gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = clientX - rect.left - PLAYER_SIZE / 2;
    const y = clientY - rect.top - PLAYER_SIZE / 2;
    
    const clampedX = Math.max(0, Math.min(x, rect.width - PLAYER_SIZE));
    const clampedY = Math.max(0, Math.min(y, rect.height - PLAYER_SIZE));

    setPlayerPos({ x: clampedX, y: clampedY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gameState !== 'playing') return;
    updatePlayerPosition(e.clientX, e.clientY);
  };
  
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (gameState !== 'playing') return;
    e.preventDefault();
    const touch = e.touches[0];
    updatePlayerPosition(touch.clientX, touch.clientY);
  };
  
  useEffect(() => {
    const handleResize = () => {
      if (gameAreaRef.current) {
        const rect = gameAreaRef.current.getBoundingClientRect();
        if (gameState !== 'playing') {
          setPlayerPos({ x: rect.width / 2 - PLAYER_SIZE / 2, y: rect.height / 2 - PLAYER_SIZE / 2 });
        }
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    return () => window.removeEventListener('resize', handleResize);
  }, [gameState]);


  return (
    <div className="bg-black bg-opacity-40 p-6 rounded-2xl shadow-lg shadow-purple-500/30 text-center border-2 border-purple-500">
      <h3 className="font-pixel text-2xl text-purple-400 mb-2">Natação Calabresal</h3>
      <p className="mb-4 text-gray-300">Ajude o CRL a resgatar as 'Pecesas' e desviar das calabresas!</p>
      
      <div 
        ref={gameAreaRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full h-96 bg-gradient-to-br from-blue-800 to-cyan-600 rounded-lg overflow-hidden cursor-none border-2 border-purple-400 touch-none"
      >
        {gameState !== 'playing' && (
          <div className="absolute inset-0 bg-black/60 z-20 flex flex-col justify-center items-center p-4 animate-fade-in">
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
            <div className="absolute top-2 left-3 font-pixel text-white text-xl z-10" style={{textShadow: '2px 2px 4px #000'}}>Pecesas: {score}</div>
            <div className="absolute top-2 right-3 font-pixel text-white text-xl z-10" style={{textShadow: '2px 2px 4px #000'}}>Tempo: {timeLeft}</div>
            
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
