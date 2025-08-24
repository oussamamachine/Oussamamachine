import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const QuantumTransitions = ({ children, sectionId }) => {
  const [quantumState, setQuantumState] = useState('superposition');
  const [entangledSections, setEntangledSections] = useState([]);
  const [waveFunction, setWaveFunction] = useState(0);
  const [collapseProbability, setCollapseProbability] = useState(0);
  
  const { scrollYProgress } = useScroll();
  
  // Quantum-inspired transforms
  const particleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const quantumRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const uncertaintyPosition = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  // Wave function collapse effect
  useEffect(() => {
    const interval = setInterval(() => {
      setWaveFunction(prev => (prev + 1) % 100);
      
      // Probability of wave function collapse
      const probability = Math.sin(waveFunction * 0.1) * 0.5 + 0.5;
      setCollapseProbability(probability);
      
      if (probability > 0.8) {
        setQuantumState('collapsed');
        setTimeout(() => setQuantumState('superposition'), 1000);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [waveFunction]);

  // Quantum entanglement between sections
  const entangleSections = (targetSection) => {
    setEntangledSections(prev => 
      prev.includes(targetSection) 
        ? prev.filter(s => s !== targetSection)
        : [...prev, targetSection]
    );
  };

  // Heisenberg Uncertainty Principle - mouse position affects particle behavior
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [uncertaintyLevel, setUncertaintyLevel] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePosition({ x, y });
      
      // Higher mouse speed = higher uncertainty
      setUncertaintyLevel(Math.abs(e.movementX) + Math.abs(e.movementY));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Quantum particles that exist in multiple states
  const QuantumParticles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: quantumState === 'superposition' 
              ? `hsl(${(waveFunction + i * 18) % 360}, 70%, 60%)`
              : '#3b82f6',
            filter: 'blur(0.5px)'
          }}
          animate={quantumState === 'superposition' ? {
            x: [
              mousePosition.x * window.innerWidth * 0.8,
              (mousePosition.x * window.innerWidth * 0.8) + (Math.sin(waveFunction * 0.1 + i) * 100),
              mousePosition.x * window.innerWidth * 0.8
            ],
            y: [
              mousePosition.y * window.innerHeight * 0.8,
              (mousePosition.y * window.innerHeight * 0.8) + (Math.cos(waveFunction * 0.1 + i) * 100),
              mousePosition.y * window.innerHeight * 0.8
            ],
            opacity: [0.3, collapseProbability, 0.3],
            scale: [0.5, 1, 0.5]
          } : {
            x: mousePosition.x * window.innerWidth * 0.8,
            y: mousePosition.y * window.innerHeight * 0.8,
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1
          }}
        />
      ))}
    </div>
  );

  // Quantum tunneling effect for section transitions
  const QuantumTunnel = ({ isActive }) => (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Tunnel effect */}
          <div className="absolute inset-0 bg-black">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute border border-cyan-400 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  width: `${(i + 1) * 100}px`,
                  height: `${(i + 1) * 100}px`,
                  marginLeft: `${-((i + 1) * 50)}px`,
                  marginTop: `${-((i + 1) * 50)}px`,
                }}
                animate={{
                  scale: [1, 0],
                  opacity: [0.8, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
          
          {/* Quantum data stream */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-cyan-400 font-mono text-lg"
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 1.5],
                y: [50, 0, -50]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              QUANTUM TUNNELING...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Probability wave visualization
  const ProbabilityWave = () => (
    <motion.div
      className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
      style={{
        opacity: particleOpacity,
        scaleX: collapseProbability
      }}
      animate={{
        x: [-100, window.innerWidth + 100]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );

  return (
    <div className="quantum-section relative" data-section={sectionId}>
      {/* Quantum State Indicator */}
      <motion.div
        className="absolute top-4 left-4 z-30 bg-black/80 backdrop-blur-sm rounded-lg p-2 text-xs font-mono"
        animate={{ 
          borderColor: quantumState === 'superposition' ? '#8b5cf6' : '#3b82f6',
          boxShadow: quantumState === 'superposition' 
            ? '0 0 20px #8b5cf650'
            : '0 0 20px #3b82f650'
        }}
        style={{ border: '1px solid' }}
      >
        <div className="text-gray-400">Quantum State:</div>
        <div className={quantumState === 'superposition' ? 'text-purple-400' : 'text-blue-400'}>
          {quantumState.toUpperCase()}
        </div>
        <div className="text-gray-400 text-xs mt-1">
          Ψ²: {Math.round(collapseProbability * 100)}%
        </div>
        <div className="text-gray-400 text-xs">
          Uncertainty: {Math.round(uncertaintyLevel)}
        </div>
      </motion.div>

      {/* Entanglement Controls */}
      <div className="absolute top-4 right-4 z-30 space-y-1">
        {['skills', 'projects', 'vision'].map((section) => (
          <motion.button
            key={section}
            className="block px-2 py-1 text-xs font-mono rounded bg-black/80 backdrop-blur-sm border border-gray-600 hover:border-cyan-400 transition-colors"
            onClick={() => entangleSections(section)}
            animate={{
              borderColor: entangledSections.includes(section) ? '#00ffff' : '#4b5563',
              backgroundColor: entangledSections.includes(section) ? '#00ffff20' : 'rgba(0,0,0,0.8)'
            }}
          >
            ⚛️ {section}
          </motion.button>
        ))}
      </div>

      {/* Quantum Particles */}
      <QuantumParticles />

      {/* Entanglement Visualization */}
      <AnimatePresence>
        {entangledSections.length > 1 && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <svg className="w-full h-full">
              {entangledSections.map((section, i) => (
                <motion.line
                  key={section}
                  x1="50%"
                  y1="50%"
                  x2={`${30 + i * 20}%`}
                  y2={`${30 + i * 20}%`}
                  stroke="#00ffff"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  animate={{
                    strokeDashoffset: [0, -10],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                />
              ))}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Probability Wave */}
      <ProbabilityWave />

      {/* Quantum Tunnel */}
      <QuantumTunnel isActive={quantumState === 'collapsed'} />

      {/* Content with quantum effects */}
      <motion.div
        className="relative z-20"
        style={{
          x: uncertaintyPosition,
          rotateY: quantumRotation,
          filter: `blur(${uncertaintyLevel * 0.1}px)`
        }}
        animate={{
          scale: quantumState === 'superposition' ? [1, 1.02, 1] : 1,
          opacity: quantumState === 'superposition' ? [1, 0.95, 1] : 1
        }}
        transition={{
          duration: 2,
          repeat: quantumState === 'superposition' ? Infinity : 0
        }}
      >
        {children}
      </motion.div>

      {/* Quantum field fluctuations */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            style={{ top: `${20 + i * 20}%` }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default QuantumTransitions;
