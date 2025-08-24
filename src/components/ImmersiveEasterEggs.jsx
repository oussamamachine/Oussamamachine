import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImmersiveEasterEggs = () => {
  const [discoveredEggs, setDiscoveredEggs] = useState([]);
  const [activeEgg, setActiveEgg] = useState(null);
  const [secretMode, setSecretMode] = useState(false);
  const [konamiSequence, setKonamiSequence] = useState([]);
  const [matrixMode, setMatrixMode] = useState(false);
  const [timeWarpMode, setTimeWarpMode] = useState(false);
  const [codeRainActive, setCCodeRainActive] = useState(false);

  // Easter Egg Database
  const easterEggs = {
    konami: {
      id: 'konami',
      name: '🎮 Konami Code',
      sequence: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'],
      reward: 'Developer Console Access',
      action: () => setSecretMode(true)
    },
    matrix: {
      id: 'matrix',
      name: '💊 Matrix Mode',
      trigger: 'triple-click on "Neural"',
      action: () => {
        setMatrixMode(true);
        setCCodeRainActive(true);
        setTimeout(() => {
          setMatrixMode(false);
          setCCodeRainActive(false);
        }, 10000);
      }
    },
    timeWarp: {
      id: 'timeWarp',
      name: '⏰ Time Warp',
      trigger: 'Hold Shift + Click + Mouse wheel',
      action: () => {
        setTimeWarpMode(true);
        document.body.style.filter = 'hue-rotate(180deg) saturate(2)';
        setTimeout(() => {
          setTimeWarpMode(false);
          document.body.style.filter = '';
        }, 5000);
      }
    },
    gravity: {
      id: 'gravity',
      name: '🌍 Anti-Gravity',
      trigger: 'Type "fly" anywhere on the page',
      action: () => {
        document.querySelectorAll('.floating-element').forEach(el => {
          el.style.animation = 'anti-gravity 10s ease-in-out';
        });
      }
    },
    consciousness: {
      id: 'consciousness',
      name: '🧠 Consciousness Hack',
      trigger: 'Stare at the brain for 10 seconds',
      action: () => {
        // Unlock hidden developer thoughts
        setActiveEgg('consciousness');
      }
    },
    blockchain: {
      id: 'blockchain',
      name: '⛓️ Blockchain Genesis',
      trigger: 'Click "Blockchain" 7 times',
      action: () => {
        // Show cryptocurrency appreciation
        setActiveEgg('blockchain');
      }
    },
    moroccan: {
      id: 'moroccan',
      name: '🇲🇦 Moroccan Heritage',
      trigger: 'Type "Morocco" or "Maroc"',
      action: () => {
        setActiveEgg('moroccan');
      }
    }
  };

  // Konami Code Detection
  useEffect(() => {
    const handleKeyPress = (e) => {
      const newSequence = [...konamiSequence, e.code].slice(-10);
      setKonamiSequence(newSequence);
      
      if (JSON.stringify(newSequence) === JSON.stringify(easterEggs.konami.sequence)) {
        unlockEasterEgg('konami');
        setKonamiSequence([]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [konamiSequence]);

  // Text detection for easter eggs
  useEffect(() => {
    let typedText = '';
    const handleKeyPress = (e) => {
      if (e.key.length === 1) {
        typedText += e.key.toLowerCase();
        typedText = typedText.slice(-20); // Keep last 20 characters

        if (typedText.includes('fly')) {
          unlockEasterEgg('gravity');
        }
        if (typedText.includes('morocco') || typedText.includes('maroc')) {
          unlockEasterEgg('moroccan');
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Complex gesture detection
  useEffect(() => {
    let shiftHeld = false;
    let mouseDown = false;

    const handleKeyDown = (e) => {
      if (e.key === 'Shift') shiftHeld = true;
    };

    const handleKeyUp = (e) => {
      if (e.key === 'Shift') shiftHeld = false;
    };

    const handleMouseDown = () => {
      mouseDown = true;
    };

    const handleMouseUp = () => {
      mouseDown = false;
    };

    const handleWheel = () => {
      if (shiftHeld && mouseDown) {
        unlockEasterEgg('timeWarp');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('wheel', handleWheel);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Triple-click detection for Matrix mode
  useEffect(() => {
    let clickCount = 0;
    let clickTimer = null;

    const handleClick = (e) => {
      if (e.target.textContent && e.target.textContent.toLowerCase().includes('neural')) {
        clickCount++;
        
        if (clickTimer) clearTimeout(clickTimer);
        
        clickTimer = setTimeout(() => {
          if (clickCount === 3) {
            unlockEasterEgg('matrix');
          }
          clickCount = 0;
        }, 500);
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
      if (clickTimer) clearTimeout(clickTimer);
    };
  }, []);

  const unlockEasterEgg = useCallback((eggId) => {
    if (!discoveredEggs.includes(eggId)) {
      setDiscoveredEggs(prev => [...prev, eggId]);
      setActiveEgg(eggId);
      
      if (easterEggs[eggId]?.action) {
        easterEggs[eggId].action();
      }

      // Store in localStorage for persistence
      const stored = JSON.parse(localStorage.getItem('discoveredEasterEggs') || '[]');
      localStorage.setItem('discoveredEasterEggs', JSON.stringify([...stored, eggId]));
    }
  }, [discoveredEggs]);

  // Load discovered eggs from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('discoveredEasterEggs') || '[]');
    setDiscoveredEggs(stored);
  }, []);

  // Matrix Code Rain Component
  const MatrixRain = () => (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-green-400 font-mono text-xs opacity-80"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-20px'
          }}
          animate={{
            y: [0, window.innerHeight + 100],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        >
          {String.fromCharCode(0x30A0 + Math.random() * 96)}
        </motion.div>
      ))}
    </div>
  );

  // Easter Egg Notification
  const EasterEggNotification = ({ egg, onClose }) => (
    <motion.div
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg p-6 text-white shadow-2xl border border-white/20"
      initial={{ y: -100, opacity: 0, scale: 0.5 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: -100, opacity: 0, scale: 0.5 }}
      transition={{ type: 'spring', damping: 15 }}
    >
      <div className="text-center">
        <motion.div
          className="text-4xl mb-2"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: 3 }}
        >
          🎉
        </motion.div>
        <div className="text-xl font-bold mb-2">Easter Egg Unlocked!</div>
        <div className="text-lg">{egg.name}</div>
        <div className="text-sm opacity-80 mt-1">Reward: {egg.reward || 'Secret Knowledge'}</div>
        
        <motion.button
          className="mt-4 px-4 py-2 bg-white/20 rounded-full text-sm hover:bg-white/30 transition-colors"
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Awesome! 🚀
        </motion.button>
      </div>
    </motion.div>
  );

  // Easter Egg Collection Panel
  const CollectionPanel = () => (
    <motion.div
      className="fixed bottom-4 left-4 z-40 bg-black/90 backdrop-blur-sm rounded-lg p-4 border border-cyan-400/50"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 2 }}
    >
      <div className="text-cyan-400 font-mono text-sm mb-2">
        🥚 Easter Eggs: {discoveredEggs.length}/{Object.keys(easterEggs).length}
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {Object.entries(easterEggs).map(([id, egg]) => (
          <motion.div
            key={id}
            className={`w-8 h-8 rounded border-2 flex items-center justify-center text-xs ${
              discoveredEggs.includes(id)
                ? 'border-green-400 bg-green-400/20 text-green-400'
                : 'border-gray-600 bg-gray-800/50 text-gray-600'
            }`}
            whileHover={{ scale: discoveredEggs.includes(id) ? 1.2 : 1 }}
            animate={discoveredEggs.includes(id) ? {
              boxShadow: ['0 0 0px #10b981', '0 0 20px #10b981', '0 0 0px #10b981']
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {discoveredEggs.includes(id) ? '✓' : '?'}
          </motion.div>
        ))}
      </div>
      
      {discoveredEggs.length === Object.keys(easterEggs).length && (
        <motion.div
          className="text-yellow-400 font-mono text-xs mt-2 text-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          🏆 MASTER EXPLORER! 🏆
        </motion.div>
      )}
    </motion.div>
  );

  // Secret Developer Console
  const DeveloperConsole = () => (
    <motion.div
      className="fixed inset-4 z-50 bg-black/95 backdrop-blur-sm rounded-lg border border-green-400 font-mono"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: 180 }}
    >
      <div className="bg-green-400/10 p-2 rounded-t-lg border-b border-green-400">
        <div className="flex justify-between items-center">
          <span className="text-green-400">🚀 SECRET DEVELOPER CONSOLE</span>
          <button
            onClick={() => setSecretMode(false)}
            className="text-green-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      </div>
      
      <div className="p-4 h-96 overflow-y-auto text-green-400 text-sm space-y-2">
        <div>{'> system.status()'}</div>
        <div className="text-green-300">  Neural Network: ACTIVE</div>
        <div className="text-green-300">  Consciousness Level: {Math.round(Math.random() * 100)}%</div>
        <div className="text-green-300">  Easter Eggs Found: {discoveredEggs.length}/7</div>
        
        <div className="mt-4">{'> developer.secrets()'}</div>
        <div className="text-cyan-400">  - This portfolio took 200+ hours to create</div>
        <div className="text-cyan-400">  - Hidden message in console: "console.log('Hello fellow developer! 👋')"</div>
        <div className="text-cyan-400">  - 42 is indeed the answer to everything</div>
        <div className="text-cyan-400">  - The consciousness theme represents continuous learning</div>
        
        <div className="mt-4">{'> skills.blockchain()'}</div>
        <div className="text-yellow-400">  Smart Contracts Deployed: 15+</div>
        <div className="text-yellow-400">  Gas Fees Paid: Too much... 💸</div>
        <div className="text-yellow-400">  Favorite Chain: Polygon (for the low fees!)</div>
        
        <div className="mt-4">{'> location.morocco()'}</div>
        <div className="text-red-400">  Current City: Rabat 🇲🇦</div>
        <div className="text-red-400">  Favorite Moroccan Dish: Tagine</div>
        <div className="text-red-400">  Languages: العربية, Français, English</div>
        
        <div className="mt-4 text-purple-400 animate-pulse">
          {'> Thank you for exploring! Keep coding! 🚀'}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="immersive-easter-eggs">
      {/* Matrix Rain Effect */}
      <AnimatePresence>
        {matrixMode && <MatrixRain />}
      </AnimatePresence>

      {/* Collection Panel */}
      <AnimatePresence>
        {discoveredEggs.length > 0 && <CollectionPanel />}
      </AnimatePresence>

      {/* Active Easter Egg Notification */}
      <AnimatePresence>
        {activeEgg && (
          <EasterEggNotification
            egg={easterEggs[activeEgg]}
            onClose={() => setActiveEgg(null)}
          />
        )}
      </AnimatePresence>

      {/* Secret Developer Console */}
      <AnimatePresence>
        {secretMode && <DeveloperConsole />}
      </AnimatePresence>

      {/* Time Warp Visual Effect */}
      <AnimatePresence>
        {timeWarpMode && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-cyan-500/20" />
            <motion.div
              className="absolute inset-0 border-4 border-white/50"
              animate={{
                borderRadius: ['0%', '50%', '0%'],
                rotate: [0, 360, 0]
              }}
              transition={{ duration: 2, repeat: 2 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Anti-Gravity CSS */}
      <style jsx>{`
        @keyframes anti-gravity {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-200px) rotate(180deg); }
          100% { transform: translateY(0) rotate(360deg); }
        }
        
        .floating-element {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default ImmersiveEasterEggs;
