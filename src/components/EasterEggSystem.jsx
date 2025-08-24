import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EasterEggSystem = ({ easterEggs, isDarkMode }) => {
  const [activeEasterEggs, setActiveEasterEggs] = useState([]);
  const [matrixRain, setMatrixRain] = useState(false);
  const [particleExplosion, setParticleExplosion] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);

  useEffect(() => {
    // Process new easter eggs
    easterEggs.forEach(egg => {
      if (!activeEasterEggs.includes(egg)) {
        triggerEasterEgg(egg);
        setActiveEasterEggs(prev => [...prev, egg]);
      }
    });
  }, [easterEggs]);

  const triggerEasterEgg = (eggType) => {
    switch (eggType) {
      case 'konami':
        setMatrixRain(true);
        setTimeout(() => setMatrixRain(false), 5000);
        break;
      case 'secret':
        setParticleExplosion(true);
        setTimeout(() => setParticleExplosion(false), 3000);
        break;
      case 'glitch':
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 2000);
        break;
      default:
        break;
    }
  };

  // Matrix Rain Effect
  const MatrixRain = () => {
    if (!matrixRain) return null;

    return (
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400 font-mono text-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-20px',
              fontSize: `${Math.random() * 20 + 10}px`
            }}
            initial={{ y: -20, opacity: 0 }}
            animate={{
              y: ['0vh', '120vh'],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear"
            }}
          >
            {String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))}
          </motion.div>
        ))}

        {/* Matrix Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
        >
          <div className="text-6xl font-cyber font-bold text-green-400 mb-4">
            MATRIX MODE
          </div>
          <div className="text-xl text-green-300 font-mono">
            Welcome to the digital realm...
          </div>
        </motion.div>
      </div>
    );
  };

  // Particle Explosion Effect
  const ParticleExplosion = () => {
    if (!particleExplosion) return null;

    return (
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: '50%',
              top: '50%',
              backgroundColor: [
                '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
                '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
              ][Math.floor(Math.random() * 10)]
            }}
            initial={{
              x: 0,
              y: 0,
              scale: 0,
              opacity: 1
            }}
            animate={{
              x: (Math.random() - 0.5) * 800,
              y: (Math.random() - 0.5) * 600,
              scale: [0, 1, 0],
              opacity: [1, 1, 0]
            }}
            transition={{
              duration: 2,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Explosion Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
        >
          <div className="text-6xl font-cyber font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 mb-4">
            BOOM!
          </div>
          <div className="text-xl text-gray-300 font-mono">
            You found a secret!
          </div>
        </motion.div>
      </div>
    );
  };

  // Glitch Effect
  const GlitchEffect = () => {
    if (!glitchEffect) return null;

    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        <motion.div
          className="absolute inset-0 bg-red-500 mix-blend-multiply"
          animate={{
            opacity: [0, 0.3, 0, 0.3, 0],
            x: [0, -2, 2, -2, 0],
            y: [0, 1, -1, 1, 0]
          }}
          transition={{
            duration: 0.1,
            repeat: 20,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute inset-0 bg-blue-500 mix-blend-multiply"
          animate={{
            opacity: [0, 0.3, 0, 0.3, 0],
            x: [0, 2, -2, 2, 0],
            y: [0, -1, 1, -1, 0]
          }}
          transition={{
            duration: 0.1,
            repeat: 20,
            ease: "linear"
          }}
        />

        {/* Glitch Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
        >
          <div className="text-6xl font-cyber font-bold text-white mb-4">
            GLITCH
          </div>
          <div className="text-xl text-gray-300 font-mono">
            Reality is breaking...
          </div>
        </motion.div>
      </div>
    );
  };

  // Floating Easter Egg Indicators
  const FloatingEasterEggs = () => {
    if (activeEasterEggs.length === 0) return null;

    return (
      <div className="fixed bottom-4 right-4 z-40">
        <div className="flex flex-col space-y-2">
          {activeEasterEggs.map((egg, index) => (
            <motion.div
              key={egg}
              initial={{ opacity: 0, scale: 0, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xs ${egg === 'konami' ? 'bg-green-500' :
                  egg === 'secret' ? 'bg-purple-500' :
                    egg === 'glitch' ? 'bg-red-500' : 'bg-blue-500'
                } shadow-lg`}
              title={`Easter Egg: ${egg}`}
            >
              {egg === 'konami' ? '🎮' :
                egg === 'secret' ? '🎁' :
                  egg === 'glitch' ? '💥' : '🥚'}
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  // Hidden Easter Egg Triggers
  const HiddenTriggers = () => {
    useEffect(() => {
      let clickCount = 0;
      let lastClickTime = 0;

      const handleClick = (e) => {
        const now = Date.now();
        if (now - lastClickTime < 500) {
          clickCount++;
          if (clickCount === 5) {
            triggerEasterEgg('secret');
            clickCount = 0;
          }
        } else {
          clickCount = 1;
        }
        lastClickTime = now;
      };

      const handleKeyPress = (e) => {
        if (e.key === 'g' && e.ctrlKey) {
          e.preventDefault();
          triggerEasterEgg('glitch');
        }
      };

      document.addEventListener('click', handleClick);
      document.addEventListener('keydown', handleKeyPress);

      return () => {
        document.removeEventListener('click', handleClick);
        document.removeEventListener('keydown', handleKeyPress);
      };
    }, []);

    return null;
  };

  return (
    <>
      <MatrixRain />
      <ParticleExplosion />
      <GlitchEffect />
      <FloatingEasterEggs />
      <HiddenTriggers />

      {/* Easter Egg Instructions (Hidden) */}
      <div className="fixed bottom-4 left-4 z-40 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className={`p-3 rounded-lg text-xs font-mono ${isDarkMode
            ? 'bg-gray-800/80 text-gray-300 border border-gray-600'
            : 'bg-white/80 text-gray-700 border border-gray-300'
          }`}>
          <div className="font-bold mb-2">Easter Eggs Found:</div>
          <div className="space-y-1">
            {activeEasterEggs.length === 0 ? (
              <div className="text-gray-500">None yet...</div>
            ) : (
              activeEasterEggs.map(egg => (
                <div key={egg} className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${egg === 'konami' ? 'bg-green-500' :
                      egg === 'secret' ? 'bg-purple-500' :
                        egg === 'glitch' ? 'bg-red-500' : 'bg-blue-500'
                    }`} />
                  <span className="capitalize">{egg}</span>
                </div>
              ))
            )}
          </div>
          <div className="mt-3 pt-2 border-t border-gray-400/30">
            <div className="text-xs text-gray-500">
              Try: Konami code, 5 rapid clicks, Ctrl+G
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EasterEggSystem;
