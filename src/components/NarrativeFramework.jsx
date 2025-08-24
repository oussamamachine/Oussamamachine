import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Create Consciousness Context
const ConsciousnessContext = createContext();

// Narrative Phases with Emotional Journey
const NARRATIVE_PHASES = {
  dormant: {
    title: "Before the Spark",
    description: "In the depths of digital silence, potential waits...",
    emotion: "anticipation",
    color: "#1f2937",
    bgEffect: "static",
    mindState: "undefined"
  },
  awakening: {
    title: "First Spark of Awareness", 
    description: "Synapses fire. Consciousness stirs. The journey begins.",
    emotion: "wonder",
    color: "#0ea5e9", 
    bgEffect: "neural-pulse",
    mindState: "initializing"
  },
  learning: {
    title: "Absorbing Knowledge",
    description: "Every skill, every failure, every breakthrough shapes the mind.",
    emotion: "curiosity",
    color: "#8b5cf6",
    bgEffect: "data-streams", 
    mindState: "processing"
  },
  creating: {
    title: "Manifestation of Ideas",
    description: "Code becomes art. Logic becomes poetry. Ideas take form.",
    emotion: "inspiration",
    color: "#f59e0b",
    bgEffect: "creative-burst",
    mindState: "creating"
  },
  connecting: {
    title: "Building Connections",
    description: "Neural networks bridge gaps between technology and humanity.",
    emotion: "empathy", 
    color: "#10b981",
    bgEffect: "network-weave",
    mindState: "networking"
  },
  transcending: {
    title: "Beyond Human Limits",
    description: "Where artificial intelligence meets authentic passion.",
    emotion: "transcendence",
    color: "#ef4444",
    bgEffect: "quantum-field",
    mindState: "transcendent"
  }
};

// Consciousness Provider Component
export const ConsciousnessProvider = ({ children }) => {
  const [currentPhase, setCurrentPhase] = useState('dormant');
  const [consciousnessLevel, setConsciousnessLevel] = useState(0);
  const [emotionalState, setEmotionalState] = useState('neutral');
  const [narrativeProgress, setNarrativeProgress] = useState(0);
  const [activeMemories, setActiveMemories] = useState([]);
  const [neuralConnections, setNeuralConnections] = useState([]);
  
  // User interaction tracking for narrative adaptation
  const [userBehavior, setUserBehavior] = useState({
    timeSpent: 0,
    interactionCount: 0,
    scrollDepth: 0,
    engagement: 'passive'
  });

  // Dynamic narrative progression based on scroll and interaction
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      const phaseIndex = Math.floor(scrollPercent * Object.keys(NARRATIVE_PHASES).length);
      const phaseKeys = Object.keys(NARRATIVE_PHASES);
      
      if (phaseKeys[phaseIndex] && phaseKeys[phaseIndex] !== currentPhase) {
        const newPhase = phaseKeys[phaseIndex];
        setCurrentPhase(newPhase);
        setConsciousnessLevel(phaseIndex * (100 / phaseKeys.length));
        setEmotionalState(NARRATIVE_PHASES[newPhase].emotion);
        setNarrativeProgress(scrollPercent * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPhase]);

  // Track user engagement patterns
  useEffect(() => {
    const startTime = Date.now();
    let interactionCount = 0;

    const trackInteraction = () => {
      interactionCount++;
      setUserBehavior(prev => ({
        ...prev,
        interactionCount: interactionCount,
        timeSpent: Date.now() - startTime,
        engagement: interactionCount > 10 ? 'active' : 'passive'
      }));
    };

    // Listen to various interaction events
    const events = ['click', 'mousemove', 'scroll', 'keypress'];
    events.forEach(event => {
      window.addEventListener(event, trackInteraction, { passive: true });
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, trackInteraction);
      });
    };
  }, []);

  // Create context value
  const contextValue = {
    currentPhase,
    consciousnessLevel,
    emotionalState,
    narrativeProgress,
    activeMemories,
    neuralConnections,
    userBehavior,
    phaseData: NARRATIVE_PHASES[currentPhase],
    setActiveMemories,
    setNeuralConnections,
    addMemory: (memory) => setActiveMemories(prev => [...prev.slice(-10), memory]),
    addConnection: (connection) => setNeuralConnections(prev => [...prev, connection])
  };

  return (
    <ConsciousnessContext.Provider value={contextValue}>
      {children}
    </ConsciousnessContext.Provider>
  );
};

// Hook to use consciousness context
export const useConsciousness = () => {
  const context = useContext(ConsciousnessContext);
  if (!context) {
    throw new Error('useConsciousness must be used within ConsciousnessProvider');
  }
  return context;
};

// Narrative HUD Component
export const NarrativeHUD = () => {
  const { currentPhase, consciousnessLevel, emotionalState, narrativeProgress, phaseData, userBehavior } = useConsciousness();
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1 }}
    >
      {/* Main Narrative Display */}
      <div className="flex justify-between items-start p-6">
        {/* Left: Phase Information */}
        <motion.div
          className="bg-black/80 backdrop-blur-sm rounded-lg p-4 border pointer-events-auto"
          style={{ 
            borderColor: phaseData.color,
            boxShadow: `0 0 20px ${phaseData.color}30`
          }}
        >
          <div className="text-xs font-mono text-gray-400 mb-1">NARRATIVE PHASE</div>
          <div 
            className="text-lg font-bold mb-1"
            style={{ color: phaseData.color }}
          >
            {phaseData.title}
          </div>
          <div className="text-sm text-gray-300 max-w-64">
            {phaseData.description}
          </div>
          
          {/* Consciousness Level Bar */}
          <div className="mt-3 mb-2">
            <div className="text-xs font-mono text-gray-400 mb-1">
              CONSCIOUSNESS: {Math.round(consciousnessLevel)}%
            </div>
            <div className="w-40 h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: phaseData.color }}
                animate={{ width: `${consciousnessLevel}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>

          {/* Emotional State */}
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-gray-400">EMOTION:</span>
            <span style={{ color: phaseData.color }}>{emotionalState.toUpperCase()}</span>
          </div>
        </motion.div>

        {/* Right: User Analytics */}
        <motion.div
          className="bg-black/80 backdrop-blur-sm rounded-lg p-4 border pointer-events-auto"
          style={{ borderColor: phaseData.color }}
        >
          <div className="text-xs font-mono text-gray-400 mb-2">USER ANALYSIS</div>
          <div className="space-y-1 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-gray-400">Engagement:</span>
              <span 
                className={userBehavior.engagement === 'active' ? 'text-green-400' : 'text-yellow-400'}
              >
                {userBehavior.engagement.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Time:</span>
              <span className="text-white">{Math.round(userBehavior.timeSpent / 1000)}s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Progress:</span>
              <span style={{ color: phaseData.color }}>{Math.round(narrativeProgress)}%</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom: Narrative Progress Bar */}
      <div className="px-6">
        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ 
              background: `linear-gradient(90deg, ${phaseData.color}, ${phaseData.color}80)`
            }}
            animate={{ width: `${narrativeProgress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

// Immersive Background Component
export const ImmersiveBackground = () => {
  const { phaseData, consciousnessLevel } = useConsciousness();
  
  // Different background effects for each phase
  const BackgroundEffect = () => {
    switch (phaseData.bgEffect) {
      case 'neural-pulse':
        return <NeuralPulseEffect />;
      case 'data-streams':
        return <DataStreamsEffect />;
      case 'creative-burst':
        return <CreativeBurstEffect />;
      case 'network-weave':
        return <NetworkWeaveEffect />;
      case 'quantum-field':
        return <QuantumFieldEffect />;
      default:
        return <StaticEffect />;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <BackgroundEffect />
      
      {/* Dynamic Color Overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at center, ${phaseData.color}15 0%, transparent 70%)`
        }}
        animate={{
          opacity: consciousnessLevel / 100
        }}
      />
    </div>
  );
};

// Background Effect Components
const NeuralPulseEffect = () => (
  <div className="absolute inset-0">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-blue-400 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`
        }}
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.1
        }}
      />
    ))}
  </div>
);

const DataStreamsEffect = () => (
  <div className="absolute inset-0">
    {[...Array(10)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-px bg-purple-400 w-full"
        style={{ top: `${i * 10}%` }}
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: i * 0.3
        }}
      />
    ))}
  </div>
);

const CreativeBurstEffect = () => (
  <div className="absolute inset-0">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-yellow-400 rounded-full"
        style={{
          left: '50%',
          top: '50%'
        }}
        animate={{
          x: [0, (Math.random() - 0.5) * 1000],
          y: [0, (Math.random() - 0.5) * 1000],
          opacity: [1, 0],
          scale: [0, 1, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.1
        }}
      />
    ))}
  </div>
);

const NetworkWeaveEffect = () => (
  <svg className="absolute inset-0 w-full h-full">
    {[...Array(15)].map((_, i) => (
      <motion.line
        key={i}
        x1={`${Math.random() * 100}%`}
        y1={`${Math.random() * 100}%`}
        x2={`${Math.random() * 100}%`}
        y2={`${Math.random() * 100}%`}
        stroke="#10b981"
        strokeWidth="1"
        opacity="0.3"
        animate={{
          pathLength: [0, 1, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: i * 0.2
        }}
      />
    ))}
  </svg>
);

const QuantumFieldEffect = () => (
  <div className="absolute inset-0">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute border border-red-400 rounded-full"
        style={{
          left: '50%',
          top: '50%',
          width: `${(i + 1) * 200}px`,
          height: `${(i + 1) * 200}px`,
          marginLeft: `${-((i + 1) * 100)}px`,
          marginTop: `${-((i + 1) * 100)}px`
        }}
        animate={{
          scale: [0, 1],
          opacity: [1, 0],
          rotate: [0, 360]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: i * 0.8
        }}
      />
    ))}
  </div>
);

const StaticEffect = () => <div className="absolute inset-0 opacity-10" />;

// Narrative Trigger Component
export const NarrativeTrigger = ({ children, memoryTitle, connectionData }) => {
  const { addMemory, addConnection } = useConsciousness();
  
  const handleInteraction = () => {
    if (memoryTitle) {
      addMemory({
        title: memoryTitle,
        timestamp: Date.now(),
        context: 'user_interaction'
      });
    }
    
    if (connectionData) {
      addConnection(connectionData);
    }
  };

  return (
    <div 
      onMouseEnter={handleInteraction}
      onClick={handleInteraction}
      className="narrative-trigger"
    >
      {children}
    </div>
  );
};
