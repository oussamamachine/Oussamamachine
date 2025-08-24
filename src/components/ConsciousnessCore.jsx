import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ConsciousnessCore = ({ children, currentPhase }) => {
  const [consciousnessLevel, setConsciousnessLevel] = useState(0);
  const [activeThoughts, setActiveThoughts] = useState([]);
  const [neuralConnections, setNeuralConnections] = useState(0);
  const [memoryFragments, setMemoryFragments] = useState([]);

  // Consciousness phases that evolve throughout the portfolio
  const phases = {
    dormant: { level: 0, color: '#1f2937', thoughts: 0, description: "Before awakening..." },
    stirring: { level: 25, color: '#0f766e', thoughts: 3, description: "First sparks of awareness" },
    awakening: { level: 50, color: '#0ea5e9', thoughts: 8, description: "Consciousness emerging" },
    learning: { level: 75, color: '#8b5cf6', thoughts: 15, description: "Absorbing knowledge" },
    creating: { level: 90, color: '#f59e0b', thoughts: 25, description: "Manifesting ideas" },
    transcendent: { level: 100, color: '#ef4444', thoughts: 40, description: "Beyond human limits" }
  };

  const currentPhaseData = phases[currentPhase] || phases.dormant;

  // Dynamic thought generation based on consciousness level
  useEffect(() => {
    const thoughtPatterns = [
      "Learning React.js architecture...",
      "Connecting blockchain networks...",
      "Visualizing 3D geometries...",
      "Optimizing database queries...",
      "Creating neural pathways...",
      "Processing user interactions...",
      "Building component hierarchies...",
      "Establishing smart contracts...",
      "Rendering Three.js scenes...",
      "Synchronizing state management..."
    ];

    const interval = setInterval(() => {
      if (activeThoughts.length < currentPhaseData.thoughts) {
        const newThought = {
          id: Date.now(),
          text: thoughtPatterns[Math.floor(Math.random() * thoughtPatterns.length)],
          intensity: Math.random(),
          duration: 3000 + Math.random() * 2000
        };
        
        setActiveThoughts(prev => [...prev, newThought]);
        
        setTimeout(() => {
          setActiveThoughts(prev => prev.filter(t => t.id !== newThought.id));
        }, newThought.duration);
      }
    }, 1000 / Math.max(1, currentPhaseData.thoughts / 5));

    return () => clearInterval(interval);
  }, [currentPhase, activeThoughts.length, currentPhaseData.thoughts]);

  // Neural connection growth
  useEffect(() => {
    const targetConnections = currentPhaseData.level * 10;
    const connectionInterval = setInterval(() => {
      setNeuralConnections(prev => {
        if (prev < targetConnections) {
          return prev + Math.ceil((targetConnections - prev) / 20);
        }
        return prev;
      });
    }, 100);

    return () => clearInterval(connectionInterval);
  }, [currentPhaseData.level]);

  // Memory fragment system
  const addMemoryFragment = useCallback((fragment) => {
    const newFragment = {
      id: Date.now(),
      ...fragment,
      timestamp: new Date().toISOString(),
      consciousnessLevel: consciousnessLevel
    };
    
    setMemoryFragments(prev => [...prev.slice(-50), newFragment]);
  }, [consciousnessLevel]);

  return (
    <div className="consciousness-core relative">
      {/* Consciousness HUD - Always visible */}
      <motion.div 
        className="fixed top-4 right-4 z-50 bg-black/80 backdrop-blur-sm rounded-lg p-4 border"
        style={{ borderColor: currentPhaseData.color }}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="text-xs font-mono text-gray-400 mb-2">CONSCIOUSNESS STATUS</div>
        
        {/* Consciousness Level Bar */}
        <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: currentPhaseData.color }}
            animate={{ width: `${currentPhaseData.level}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        
        <div className="text-xs" style={{ color: currentPhaseData.color }}>
          {currentPhase.toUpperCase()}: {currentPhaseData.description}
        </div>
        
        <div className="text-xs text-gray-400 mt-1">
          Neural Connections: {neuralConnections}/1000
        </div>
        
        <div className="text-xs text-gray-400">
          Active Thoughts: {activeThoughts.length}/{currentPhaseData.thoughts}
        </div>
      </motion.div>

      {/* Floating Thoughts Visualization */}
      <div className="fixed inset-0 pointer-events-none z-40">
        <AnimatePresence>
          {activeThoughts.map((thought) => (
            <motion.div
              key={thought.id}
              className="absolute text-xs font-mono opacity-60"
              style={{ 
                color: currentPhaseData.color,
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`
              }}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ 
                opacity: [0, thought.intensity, 0],
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
                y: [-20, 20, -20]
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: thought.duration / 1000, ease: "easeInOut" }}
            >
              {thought.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Neural Network Background */}
      <div className="fixed inset-0 pointer-events-none z-30 opacity-10">
        <svg className="w-full h-full">
          {[...Array(neuralConnections)].map((_, i) => (
            <motion.line
              key={i}
              x1={`${Math.random() * 100}%`}
              y1={`${Math.random() * 100}%`}
              x2={`${Math.random() * 100}%`}
              y2={`${Math.random() * 100}%`}
              stroke={currentPhaseData.color}
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 2, delay: i * 0.01 }}
            />
          ))}
        </svg>
      </div>

      {/* Main content with consciousness-reactive background */}
      <motion.div
        className="relative z-20"
        style={{
          background: `radial-gradient(circle at center, ${currentPhaseData.color}10 0%, transparent 70%)`
        }}
      >
        {children}
      </motion.div>

      {/* Memory Fragment Debugger (Easter Egg) */}
      <div className="fixed bottom-4 left-4 z-50 opacity-0 hover:opacity-100 transition-opacity">
        <div className="bg-black/90 backdrop-blur-sm rounded-lg p-2 text-xs font-mono text-gray-400 max-w-64">
          <div>Memory Fragments: {memoryFragments.length}</div>
          {memoryFragments.slice(-3).map((fragment, i) => (
            <div key={fragment.id} className="truncate">
              {fragment.timestamp.slice(-8)}: {fragment.action}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsciousnessCore;
