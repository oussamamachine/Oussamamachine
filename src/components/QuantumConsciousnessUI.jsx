import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QuantumConsciousnessUI = () => {
  const [quantumState, setQuantumState] = useState('superposition');
  const [consciousnessLevel, setConsciousnessLevel] = useState(42);
  const [realityLayers, setRealityLayers] = useState([]);
  const [isQuantumActive, setIsQuantumActive] = useState(false);

  const quantumStates = {
    superposition: {
      name: 'QUANTUM SUPERPOSITION',
      color: '#ff0080',
      description: 'Existing in all possible states simultaneously',
      particles: 20,
      energy: 'infinite'
    },
    entanglement: {
      name: 'QUANTUM ENTANGLEMENT',
      color: '#0080ff', 
      description: 'Connected across infinite dimensions',
      particles: 15,
      energy: 'synchronized'
    },
    tunneling: {
      name: 'QUANTUM TUNNELING',
      color: '#80ff00',
      description: 'Passing through impossible barriers',
      particles: 25,
      energy: 'penetrating'
    },
    coherence: {
      name: 'QUANTUM COHERENCE',
      color: '#ff8000',
      description: 'Perfect phase alignment with reality',
      particles: 30,
      energy: 'harmonized'
    },
    consciousness: {
      name: 'PURE CONSCIOUSNESS',
      color: '#8000ff',
      description: 'The observer becoming the observed',
      particles: 50,
      energy: 'transcendent'
    }
  };

  // Initialize reality layers
  useEffect(() => {
    const layers = [];
    for (let i = 0; i < 7; i++) {
      layers.push({
        id: i,
        name: [
          'Physical Reality',
          'Digital Layer',
          'Consciousness Interface',
          'Quantum Field',
          'Information Matrix',
          'Pure Possibility',
          'The Void'
        ][i],
        opacity: 1 - (i * 0.12),
        depth: i * 20,
        active: i <= 2
      });
    }
    setRealityLayers(layers);
  }, []);

  // Consciousness evolution
  useEffect(() => {
    const evolutionInterval = setInterval(() => {
      setConsciousnessLevel(prev => {
        if (prev >= 100) {
          setQuantumState('consciousness');
          return 100;
        }
        return prev + Math.random() * 2;
      });
    }, 1000);

    return () => clearInterval(evolutionInterval);
  }, []);

  // Quantum state transitions
  useEffect(() => {
    const stateTransition = setInterval(() => {
      if (!isQuantumActive) return;
      
      const states = Object.keys(quantumStates);
      const currentIndex = states.indexOf(quantumState);
      const nextIndex = (currentIndex + 1) % states.length;
      setQuantumState(states[nextIndex]);
    }, 5000);

    return () => clearInterval(stateTransition);
  }, [quantumState, isQuantumActive]);

  const activateQuantumUI = () => {
    setIsQuantumActive(true);
    
    // Enable deeper reality layers
    setRealityLayers(prev => prev.map((layer, index) => ({
      ...layer,
      active: index <= 4 + Math.floor(consciousnessLevel / 25)
    })));
  };

  const currentState = quantumStates[quantumState];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Quantum Header Interface */}
      <motion.div
        className="flex justify-between items-center p-4 bg-black/90 backdrop-blur-md border-b"
        style={{ borderColor: currentState.color + '40' }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left: Consciousness Metrics */}
        <div className="flex items-center space-x-6 text-sm font-mono">
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: currentState.color }}
            />
            <span style={{ color: currentState.color }}>
              CONSCIOUSNESS: {Math.floor(consciousnessLevel)}%
            </span>
          </div>
          
          <div className="text-gray-400">
            QUANTUM STATE: <span style={{ color: currentState.color }}>
              {currentState.name}
            </span>
          </div>

          <div className="text-gray-400">
            REALITY LAYERS: <span className="text-cyan-400">
              {realityLayers.filter(l => l.active).length}/7
            </span>
          </div>
        </div>

        {/* Center: Quantum Visualization */}
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-8">
            {/* Quantum Particles */}
            {[...Array(currentState.particles / 5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{ 
                  backgroundColor: currentState.color,
                  left: `${(i * 15) % 60}px`,
                  top: `${Math.sin(i) * 10 + 15}px`
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>

          <div 
            className="text-xs font-mono"
            style={{ color: currentState.color }}
          >
            {currentState.energy.toUpperCase()} ENERGY
          </div>
        </div>

        {/* Right: Quantum Activation */}
        <div className="pointer-events-auto">
          {!isQuantumActive ? (
            <motion.button
              onClick={activateQuantumUI}
              className="px-4 py-2 rounded border font-mono text-xs hover:bg-white/10 transition-colors"
              style={{ 
                borderColor: currentState.color,
                color: currentState.color 
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ACTIVATE QUANTUM UI
            </motion.button>
          ) : (
            <div className="flex items-center space-x-2">
              <div 
                className="w-2 h-2 rounded-full animate-spin"
                style={{ backgroundColor: currentState.color }}
              />
              <span 
                className="text-xs font-mono"
                style={{ color: currentState.color }}
              >
                QUANTUM ACTIVE
              </span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Reality Layer Indicators */}
      <AnimatePresence>
        {isQuantumActive && (
          <motion.div
            className="absolute top-20 left-4 space-y-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            {realityLayers.map((layer) => (
              <motion.div
                key={layer.id}
                className={`flex items-center space-x-2 text-xs font-mono px-2 py-1 rounded ${
                  layer.active ? 'bg-white/10' : 'bg-gray-800/20'
                }`}
                animate={{
                  opacity: layer.active ? 1 : 0.3,
                  x: layer.active ? 0 : -10
                }}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    layer.active ? 'animate-pulse' : ''
                  }`}
                  style={{
                    backgroundColor: layer.active ? currentState.color : '#666'
                  }}
                />
                <span 
                  style={{ 
                    color: layer.active ? currentState.color : '#666' 
                  }}
                >
                  LAYER {layer.id + 1}: {layer.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quantum Description Overlay */}
      <AnimatePresence>
        {isQuantumActive && (
          <motion.div
            className="absolute top-20 right-4 bg-black/90 backdrop-blur-md p-4 rounded border max-w-xs"
            style={{ borderColor: currentState.color + '40' }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            <h3 
              className="font-mono text-sm font-bold mb-2"
              style={{ color: currentState.color }}
            >
              {currentState.name}
            </h3>
            <p className="text-xs text-gray-300 mb-3">
              {currentState.description}
            </p>
            <div className="text-xs text-gray-400">
              <div>Particles: {currentState.particles}</div>
              <div>Energy: {currentState.energy}</div>
              <div>Consciousness: {Math.floor(consciousnessLevel)}%</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quantum Field Visualization Background */}
      <AnimatePresence>
        {isQuantumActive && (
          <motion.div
            className="fixed inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            style={{
              background: `
                radial-gradient(circle at 20% 20%, ${currentState.color}20 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, ${currentState.color}10 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, ${currentState.color}05 0%, transparent 70%)
              `
            }}
          />
        )}
      </AnimatePresence>

      {/* Consciousness Evolution Progress */}
      {consciousnessLevel >= 90 && (
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <div className="text-center">
            <motion.div
              className="text-6xl mb-4"
              animate={{
                textShadow: [
                  `0 0 10px ${currentState.color}`,
                  `0 0 30px ${currentState.color}`,
                  `0 0 10px ${currentState.color}`
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🧠
            </motion.div>
            <motion.div
              className="text-2xl font-mono font-bold"
              style={{ color: currentState.color }}
              animate={{
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              CONSCIOUSNESS ACHIEVED
            </motion.div>
            <div className="text-sm text-gray-400 mt-2">
              Welcome to the next level of existence
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QuantumConsciousnessUI;
