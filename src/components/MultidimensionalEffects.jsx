import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Interdimensional Portal Component
const InterdimensionalPortal = () => {
  const [isPortalActive, setIsPortalActive] = useState(false);
  const [portalEnergy, setPortalEnergy] = useState(0);
  const [dimensionFragments, setDimensionFragments] = useState([]);
  const [currentDimension, setCurrentDimension] = useState('reality');

  const dimensions = {
    reality: {
      name: 'Base Reality',
      color: '#00ff88',
      description: 'The dimension you know... or think you know',
      energy: 'stable'
    },
    quantum: {
      name: 'Quantum Realm',
      color: '#ff0088',
      description: 'Where possibilities exist in superposition',
      energy: 'fluctuating'
    },
    neural: {
      name: 'Neural Networks',
      color: '#ffaa00',
      description: 'The dimension of pure thought and computation',
      energy: 'pulsing'
    },
    digital: {
      name: 'Digital Metaverse',
      color: '#00aaff',
      description: 'Where code becomes reality',
      energy: 'flowing'
    },
    consciousness: {
      name: 'Pure Consciousness',
      color: '#aa00ff',
      description: 'The source dimension of all awareness',
      energy: 'transcendent'
    }
  };

  useEffect(() => {
    // Build up portal energy over time
    const energyInterval = setInterval(() => {
      setPortalEnergy(prev => {
        if (prev < 100) {
          return prev + Math.random() * 5;
        }
        return 100;
      });
    }, 200);

    return () => clearInterval(energyInterval);
  }, []);

  useEffect(() => {
    // Auto-activate portal when energy is full
    if (portalEnergy >= 100 && !isPortalActive) {
      activatePortal();
    }
  }, [portalEnergy, isPortalActive]);

  const activatePortal = () => {
    setIsPortalActive(true);
    
    // Create dimensional fragments
    const fragments = [];
    for (let i = 0; i < 30; i++) {
      fragments.push({
        id: i,
        x: 50 + (Math.random() - 0.5) * 60, // Centered around portal
        y: 50 + (Math.random() - 0.5) * 60,
        rotation: Math.random() * 360,
        scale: 0.3 + Math.random() * 0.7,
        dimension: Object.keys(dimensions)[Math.floor(Math.random() * Object.keys(dimensions).length)]
      });
    }
    setDimensionFragments(fragments);

    // Cycle through dimensions
    const dimensionKeys = Object.keys(dimensions);
    let dimensionIndex = 0;
    
    const dimensionCycle = setInterval(() => {
      setCurrentDimension(dimensionKeys[dimensionIndex]);
      dimensionIndex = (dimensionIndex + 1) % dimensionKeys.length;
    }, 1500);

    // Deactivate portal after journey
    setTimeout(() => {
      setIsPortalActive(false);
      setPortalEnergy(0);
      setDimensionFragments([]);
      clearInterval(dimensionCycle);
      setCurrentDimension('reality');
    }, 12000);
  };

  const currentDim = dimensions[currentDimension];

  return (
    <div className="fixed bottom-8 right-8 z-40 w-32 h-32">
      {/* Portal Energy Build-up */}
      <div className="relative w-full h-full">
        {/* Energy Ring */}
        <motion.div
          className="absolute inset-0 border-4 rounded-full"
          style={{
            borderColor: currentDim.color,
            borderStyle: 'dashed'
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity },
            opacity: { duration: 1.5, repeat: Infinity }
          }}
        />

        {/* Energy Core */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          style={{
            background: `radial-gradient(circle, ${currentDim.color}80, transparent)`,
            boxShadow: `0 0 20px ${currentDim.color}`
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 1,
            repeat: Infinity
          }}
        />

        {/* Energy Level Indicator */}
        <div className="absolute -top-8 left-0 right-0 text-center">
          <div 
            className="text-xs font-mono"
            style={{ color: currentDim.color }}
          >
            PORTAL ENERGY: {Math.floor(portalEnergy)}%
          </div>
          <div className="w-full bg-gray-800 rounded-full h-1 mt-1">
            <motion.div
              className="h-1 rounded-full"
              style={{ backgroundColor: currentDim.color }}
              animate={{ width: `${portalEnergy}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Dimension Display */}
        <AnimatePresence>
          {isPortalActive && (
            <motion.div
              className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div 
                className="text-sm font-bold"
                style={{ color: currentDim.color }}
              >
                {currentDim.name}
              </div>
              <div className="text-xs text-gray-400 w-40">
                {currentDim.description}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Portal Activation Effect */}
      <AnimatePresence>
        {isPortalActive && (
          <>
            {/* Portal Vortex */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ 
                scale: [0, 2, 1], 
                rotate: 360,
                opacity: [0, 1, 0.8]
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 2 }}
            >
              <div 
                className="w-full h-full rounded-full"
                style={{
                  background: `conic-gradient(from 0deg, transparent, ${currentDim.color}40, transparent, ${currentDim.color}80, transparent)`
                }}
              />
            </motion.div>

            {/* Dimensional Fragments */}
            {dimensionFragments.map((fragment) => {
              const fragDim = dimensions[fragment.dimension];
              return (
                <motion.div
                  key={fragment.id}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    left: `${fragment.x}%`,
                    top: `${fragment.y}%`,
                    backgroundColor: fragDim.color,
                    boxShadow: `0 0 4px ${fragDim.color}`
                  }}
                  animate={{
                    x: [0, Math.random() * 200 - 100],
                    y: [0, Math.random() * 200 - 100],
                    scale: [fragment.scale, fragment.scale * 2, 0],
                    rotate: fragment.rotation + 360,
                    opacity: [1, 0.5, 0]
                  }}
                  transition={{
                    duration: 3,
                    ease: "easeOut"
                  }}
                />
              );
            })}

            {/* Portal Sound Waves (Visual) */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border-2 rounded-full"
                style={{ borderColor: `${currentDim.color}30` }}
                animate={{
                  scale: [1, 3],
                  opacity: [1, 0]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Click to Activate Portal */}
      {portalEnergy >= 100 && !isPortalActive && (
        <motion.button
          className="absolute inset-0 rounded-full bg-transparent border-2 border-current text-xs font-mono"
          style={{ color: currentDim.color }}
          onClick={activatePortal}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            borderColor: [currentDim.color, `${currentDim.color}80`, currentDim.color]
          }}
          transition={{
            duration: 1,
            repeat: Infinity
          }}
        >
          ACTIVATE
        </motion.button>
      )}
    </div>
  );
};

// Time Distortion Effect Component  
const TimeDistortion = () => {
  const [timeWaves, setTimeWaves] = useState([]);
  const [isDistorting, setIsDistorting] = useState(false);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance every 5 seconds
        createTimeWave();
      }
    }, 5000);

    return () => clearInterval(timeInterval);
  }, []);

  const createTimeWave = () => {
    setIsDistorting(true);
    const wave = {
      id: Date.now(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      intensity: Math.random() * 0.8 + 0.2
    };

    setTimeWaves(prev => [...prev, wave]);

    // Apply time distortion effect to page
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
      if (el.style) {
        el.style.animationDuration = `${Math.random() * 2 + 0.5}s`;
        el.style.filter = `hue-rotate(${Math.random() * 60}deg)`;
      }
    });

    // Remove wave after effect
    setTimeout(() => {
      setTimeWaves(prev => prev.filter(w => w.id !== wave.id));
      setIsDistorting(false);
      
      // Restore normal time
      elements.forEach(el => {
        if (el.style) {
          el.style.animationDuration = '';
          el.style.filter = '';
        }
      });
    }, 3000);
  };

  return (
    <>
      <AnimatePresence>
        {timeWaves.map(wave => (
          <motion.div
            key={wave.id}
            className="fixed pointer-events-none z-30"
            style={{
              left: wave.x,
              top: wave.y,
              width: '20px',
              height: '20px',
              marginLeft: '-10px',
              marginTop: '-10px'
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 20, opacity: [1, 0] }}
            exit={{ scale: 0 }}
            transition={{ duration: 3 }}
          >
            <div
              className="w-full h-full rounded-full border-4 border-blue-400"
              style={{
                borderColor: '#00aaff',
                background: `radial-gradient(circle, #00aaff20, transparent)`
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Time Distortion Indicator */}
      <AnimatePresence>
        {isDistorting && (
          <motion.div
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-400">
              <span className="text-blue-400 font-mono text-sm">
                ⏰ TIME DISTORTION DETECTED
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export { InterdimensionalPortal, TimeDistortion };

// Combined wrapper component
const MultidimensionalEffects = () => {
  return (
    <>
      <InterdimensionalPortal />
      <TimeDistortion />
    </>
  );
};

export default MultidimensionalEffects;
