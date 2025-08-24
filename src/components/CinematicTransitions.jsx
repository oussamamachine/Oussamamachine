import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CinematicTransitions = ({ 
  currentSection, 
  nextSection, 
  transitionTrigger, 
  onTransitionComplete 
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionType, setTransitionType] = useState('neural-tunnel');

  // Different cinematic transition types
  const transitions = {
    'neural-tunnel': {
      name: 'Neural Tunnel',
      duration: 3000,
      component: NeuralTunnelTransition
    },
    'consciousness-merge': {
      name: 'Consciousness Merge', 
      duration: 2500,
      component: ConsciousnessMergeTransition
    },
    'quantum-phase': {
      name: 'Quantum Phase Shift',
      duration: 3500,
      component: QuantumPhaseTransition
    },
    'memory-dive': {
      name: 'Memory Deep Dive',
      duration: 4000,
      component: MemoryDiveTransition
    },
    'skill-evolution': {
      name: 'Skill Evolution',
      duration: 3200,
      component: SkillEvolutionTransition
    },
    'blockchain-genesis': {
      name: 'Blockchain Genesis',
      duration: 3800,
      component: BlockchainGenesisTransition
    }
  };

  // Choose transition based on sections
  useEffect(() => {
    if (transitionTrigger) {
      const sectionPairs = {
        'hero-skills': 'neural-tunnel',
        'skills-projects': 'consciousness-merge',
        'projects-blockchain': 'blockchain-genesis',
        'timeline-vision': 'quantum-phase',
        'vision-contact': 'memory-dive'
      };

      const pairKey = `${currentSection}-${nextSection}`;
      const selectedTransition = sectionPairs[pairKey] || 'neural-tunnel';
      setTransitionType(selectedTransition);
      setIsTransitioning(true);

      setTimeout(() => {
        setIsTransitioning(false);
        onTransitionComplete?.();
      }, transitions[selectedTransition].duration);
    }
  }, [transitionTrigger, currentSection, nextSection, onTransitionComplete]);

  const TransitionComponent = transitions[transitionType].component;

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <TransitionComponent 
            duration={transitions[transitionType].duration}
            fromSection={currentSection}
            toSection={nextSection}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Neural Tunnel Transition
const NeuralTunnelTransition = ({ duration, fromSection, toSection }) => (
  <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
    {/* Tunnel Rings */}
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute border-2 border-cyan-400 rounded-full"
        style={{
          width: `${(i + 1) * 100}px`,
          height: `${(i + 1) * 100}px`
        }}
        animate={{
          scale: [1, 0],
          opacity: [0.8, 0],
          rotateZ: [0, 360]
        }}
        transition={{
          duration: duration / 1000,
          delay: i * 0.1,
          ease: "easeOut"
        }}
      />
    ))}

    {/* Neural Sparks */}
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-cyan-400 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`
        }}
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
          x: [0, (Math.random() - 0.5) * 400],
          y: [0, (Math.random() - 0.5) * 400]
        }}
        transition={{
          duration: (duration / 1000) * 0.8,
          delay: Math.random() * 0.5
        }}
      />
    ))}

    {/* Section Labels */}
    <div className="text-center space-y-8">
      <motion.div
        className="text-4xl font-cyber text-cyan-400"
        animate={{
          opacity: [1, 0],
          scale: [1, 2],
          y: [0, -100]
        }}
        transition={{
          duration: (duration / 1000) * 0.4
        }}
      >
        {fromSection.toUpperCase()}
      </motion.div>
      
      <motion.div
        className="text-2xl font-mono text-white"
        animate={{
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: (duration / 1000) * 0.3,
          delay: (duration / 1000) * 0.3
        }}
      >
        NEURAL PATHWAY ACTIVATING...
      </motion.div>
      
      <motion.div
        className="text-4xl font-cyber text-purple-400"
        animate={{
          opacity: [0, 1],
          scale: [2, 1],
          y: [100, 0]
        }}
        transition={{
          duration: (duration / 1000) * 0.4,
          delay: (duration / 1000) * 0.6
        }}
      >
        {nextSection.toUpperCase()}
      </motion.div>
    </div>
  </div>
);

// Consciousness Merge Transition
const ConsciousnessMergeTransition = ({ duration, fromSection, toSection }) => (
  <div className="relative w-full h-full bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
    {/* Merging Consciousness Waves */}
    <motion.div
      className="absolute inset-0"
      animate={{
        background: [
          'radial-gradient(circle at 20% 50%, #8b5cf6 0%, transparent 50%)',
          'radial-gradient(circle at 50% 50%, #3b82f6 0%, transparent 50%)',
          'radial-gradient(circle at 80% 50%, #8b5cf6 0%, transparent 50%)',
          'radial-gradient(circle at 50% 50%, #6366f1 0%, transparent 70%)'
        ]
      }}
      transition={{
        duration: duration / 1000,
        ease: "easeInOut"
      }}
    />

    {/* Consciousness Particles */}
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-3 h-3 rounded-full"
        style={{
          background: `hsl(${240 + i * 10}, 70%, 60%)`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`
        }}
        animate={{
          scale: [0, 1.5, 0],
          opacity: [0, 1, 0],
          x: [0, Math.sin(i) * 200],
          y: [0, Math.cos(i) * 200]
        }}
        transition={{
          duration: duration / 1000,
          delay: i * 0.1
        }}
      />
    ))}

    {/* Merge Text */}
    <motion.div
      className="text-center text-white"
      animate={{
        scale: [0.5, 1, 1.2, 1],
        opacity: [0, 1, 1, 0]
      }}
      transition={{
        duration: duration / 1000
      }}
    >
      <div className="text-6xl font-bold mb-4">⚡</div>
      <div className="text-2xl font-cyber">CONSCIOUSNESS MERGE</div>
      <div className="text-lg font-mono mt-2">
        {fromSection} → {nextSection}
      </div>
    </motion.div>
  </div>
);

// Quantum Phase Transition
const QuantumPhaseTransition = ({ duration, fromSection, toSection }) => (
  <div className="relative w-full h-full bg-black flex items-center justify-center">
    {/* Quantum Interference Patterns */}
    <svg className="absolute inset-0 w-full h-full">
      {[...Array(10)].map((_, i) => (
        <motion.circle
          key={i}
          cx="50%"
          cy="50%"
          r={50 + i * 40}
          fill="none"
          stroke={`hsl(${180 + i * 20}, 70%, 50%)`}
          strokeWidth="2"
          animate={{
            r: [50 + i * 40, 800],
            opacity: [0.8, 0]
          }}
          transition={{
            duration: duration / 1000,
            delay: i * 0.2,
            ease: "easeOut"
          }}
        />
      ))}
    </svg>

    {/* Quantum Superposition Text */}
    <div className="text-center">
      <motion.div
        className="text-4xl font-mono text-cyan-400"
        animate={{
          opacity: [0, 1, 1, 0],
          y: [50, 0, 0, -50]
        }}
        transition={{
          duration: duration / 1000
        }}
      >
        QUANTUM PHASE SHIFT
      </motion.div>
      
      <motion.div
        className="text-lg text-white mt-4"
        animate={{
          opacity: [0, 0, 1, 0]
        }}
        transition={{
          duration: duration / 1000,
          delay: (duration / 1000) * 0.3
        }}
      >
        Collapsing wave function...
      </motion.div>
    </div>
  </div>
);

// Memory Dive Transition
const MemoryDiveTransition = ({ duration, fromSection, toSection }) => (
  <div className="relative w-full h-full bg-gradient-to-b from-indigo-900 to-black flex items-center justify-center">
    {/* Memory Fragments */}
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-4"
        style={{
          left: `${20 + (i % 4) * 20}%`,
          top: `${20 + Math.floor(i / 4) * 25}%`,
          width: '150px',
          height: '100px'
        }}
        animate={{
          rotateX: [0, 90, 0],
          rotateY: [0, 180, 0],
          scale: [1, 0.5, 1],
          opacity: [1, 0.3, 1]
        }}
        transition={{
          duration: duration / 1000,
          delay: i * 0.1
        }}
      >
        <div className="text-xs text-white/70">Memory #{i + 1}</div>
        <div className="text-sm text-white mt-2">Data Fragment</div>
      </motion.div>
    ))}

    {/* Dive Effect */}
    <motion.div
      className="text-center text-white"
      animate={{
        scale: [0, 1, 2],
        opacity: [0, 1, 0]
      }}
      transition={{
        duration: duration / 1000
      }}
    >
      <div className="text-3xl font-cyber">MEMORY DIVE</div>
      <div className="text-lg mt-2">Accessing archived experiences...</div>
    </motion.div>
  </div>
);

// Skill Evolution Transition
const SkillEvolutionTransition = ({ duration, fromSection, toSection }) => (
  <div className="relative w-full h-full bg-gradient-to-r from-green-900 to-blue-900 flex items-center justify-center">
    {/* Evolution Tree */}
    <svg className="absolute inset-0 w-full h-full">
      <motion.path
        d="M 100 400 Q 300 200 500 400 Q 700 200 900 400"
        stroke="#10b981"
        strokeWidth="4"
        fill="none"
        animate={{
          pathLength: [0, 1]
        }}
        transition={{
          duration: (duration / 1000) * 0.6
        }}
      />
      
      {/* Evolution Nodes */}
      {[
        { x: 100, y: 400, skill: 'HTML' },
        { x: 300, y: 200, skill: 'React' },
        { x: 500, y: 400, skill: 'Node.js' },
        { x: 700, y: 200, skill: 'Blockchain' },
        { x: 900, y: 400, skill: 'AI' }
      ].map((node, i) => (
        <motion.circle
          key={i}
          cx={node.x}
          cy={node.y}
          r="20"
          fill="#10b981"
          animate={{
            r: [0, 20],
            opacity: [0, 1]
          }}
          transition={{
            duration: 0.5,
            delay: i * 0.3
          }}
        />
      ))}
    </svg>

    <motion.div
      className="text-center text-white z-10"
      animate={{
        y: [100, 0, -100],
        opacity: [0, 1, 0]
      }}
      transition={{
        duration: duration / 1000
      }}
    >
      <div className="text-4xl font-cyber text-green-400">SKILL EVOLUTION</div>
      <div className="text-lg mt-2">Watching growth over time...</div>
    </motion.div>
  </div>
);

// Blockchain Genesis Transition
const BlockchainGenesisTransition = ({ duration, fromSection, toSection }) => (
  <div className="relative w-full h-full bg-black flex items-center justify-center">
    {/* Blockchain Blocks */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute border-2 border-yellow-400 bg-yellow-400/10 rounded-lg p-4"
        style={{
          left: `${10 + i * 10}%`,
          top: '50%',
          width: '80px',
          height: '60px',
          marginTop: '-30px'
        }}
        animate={{
          x: [0, 50, 0],
          rotateY: [0, 180, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: duration / 1000,
          delay: i * 0.2
        }}
      >
        <div className="text-xs text-yellow-400 font-mono">
          Block {i + 1}
        </div>
      </motion.div>
    ))}

    {/* Chain Connections */}
    {[...Array(7)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-px bg-yellow-400"
        style={{
          left: `${18 + i * 10}%`,
          top: '50%',
          width: '5%'
        }}
        animate={{
          scaleX: [0, 1],
          opacity: [0, 1]
        }}
        transition={{
          duration: 0.3,
          delay: (i + 1) * 0.2
        }}
      />
    ))}

    <motion.div
      className="text-center text-yellow-400 font-cyber text-3xl"
      animate={{
        opacity: [0, 1, 0],
        scale: [0.5, 1, 1.5]
      }}
      transition={{
        duration: duration / 1000
      }}
    >
      BLOCKCHAIN GENESIS
    </motion.div>
  </div>
);

export default CinematicTransitions;
