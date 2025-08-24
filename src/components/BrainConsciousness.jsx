import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const BrainConsciousness = ({ onEnterBrain }) => {
  const [phase, setPhase] = useState('void'); // void -> awakening -> conscious -> transcendent
  const [thoughtStream, setThoughtStream] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [quantumField, setQuantumField] = useState([]);
  const [consciousnessLevel, setConsciousnessLevel] = useState(0);
  const [realityGlitch, setRealityGlitch] = useState(false);
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Reality distortion based on mouse position
  const distortionX = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [-100, 100]);
  const distortionY = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [-100, 100]);

  useEffect(() => {
    // Revolutionary consciousness fragments
    const voidThoughts = [
      "0x00000000",
      "undefined",
      "null",
      "void(0)"
    ];

    const awakingThoughts = [
      "const self = new Consciousness();",
      "while(sleeping) { dream(); }",
      "import reality from './universe';",
      "// First neural spark detected",
      "if (exists) { think(); }"
    ];

    const consciousThoughts = [
      "reality.exe is loading...",
      "class Developer extends Human { ... }",
      "console.log('I think, therefore I code');",
      "const vision = impossible * creativity;",
      "async function innovate() { ... }",
      "// TODO: Change the world",
      "while(true) { create(); evolve(); }"
    ];

    const transcendentThoughts = [
      "Matrix.override(reality);",
      "∞ === code.length",
      "Time.freeze(); Creativity.activate();",
      "const future = await imagination();",
      "Reality.version = '2.0-beta';",
      "export { consciousness } from './oussama';"
    ];

    const getCurrentThoughts = () => {
      switch(phase) {
        case 'void': return voidThoughts;
        case 'awakening': return awakingThoughts;
        case 'conscious': return consciousThoughts;
        case 'transcendent': return transcendentThoughts;
        default: return [];
      }
    };

    // The Grand Awakening Sequence
    const grandAwakening = async () => {
      // Phase 1: Void (1s)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Phase 2: Awakening (3s)
      setPhase('awakening');
      for (let i = 0; i <= 33; i++) {
        setConsciousnessLevel(i);
        await new Promise(resolve => setTimeout(resolve, 30));
      }
      
      // Phase 3: Conscious (3s)
      setPhase('conscious');
      for (let i = 34; i <= 66; i++) {
        setConsciousnessLevel(i);
        await new Promise(resolve => setTimeout(resolve, 30));
      }
      
      // Phase 4: Transcendent (3s)
      setPhase('transcendent');
      for (let i = 67; i <= 100; i++) {
        setConsciousnessLevel(i);
        await new Promise(resolve => setTimeout(resolve, 30));
      }

      // Reality Glitch Effect
      setRealityGlitch(true);
      setTimeout(() => setRealityGlitch(false), 2000);
    };

    grandAwakening();

    // Generate quantum consciousness field
    const field = [];
    for (let i = 0; i < 500; i++) {
      field.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 0.3 + 0.1,
        phase: Math.random() * Math.PI * 2,
        type: Math.random() > 0.7 ? 'neuron' : 'synapse'
      });
    }
    setQuantumField(field);

    // Reality-bending mouse tracking
    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePos({ x, y });
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        
        // Spawn consciousness fragments on movement
        if (Math.random() < 0.15 && phase !== 'void') {
          const thoughts = getCurrentThoughts();
          const thought = thoughts[Math.floor(Math.random() * thoughts.length)];
          setThoughtStream(prev => [
            ...prev.slice(-8),
            { 
              id: Date.now(), 
              text: thought, 
              x: x * 100, 
              y: y * 100,
              life: 1,
              phase: phase
            }
          ]);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [phase, mouseX, mouseY]);

  // Update thought stream life
  useEffect(() => {
    const interval = setInterval(() => {
      setThoughtStream(prev => 
        prev.map(thought => ({
          ...thought,
          life: thought.life - 0.02
        })).filter(thought => thought.life > 0)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const getPhaseColors = () => {
    switch(phase) {
      case 'void': return {
        primary: '#000000',
        secondary: '#111111',
        accent: '#333333',
        glow: '#000000'
      };
      case 'awakening': return {
        primary: '#1a1a2e',
        secondary: '#16213e',
        accent: '#0f3460',
        glow: '#e94560'
      };
      case 'conscious': return {
        primary: '#0d1421',
        secondary: '#1a237e',
        accent: '#3f51b5',
        glow: '#00bcd4'
      };
      case 'transcendent': return {
        primary: '#0a0a0a',
        secondary: '#1a0033',
        accent: '#4a148c',
        glow: '#e91e63'
      };
      default: return {
        primary: '#000000',
        secondary: '#000000',
        accent: '#000000',
        glow: '#000000'
      };
    }
  };

  const colors = getPhaseColors();

  return (
    <motion.section 
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${colors.accent}33 0%, ${colors.secondary} 50%, ${colors.primary} 100%)`
      }}
      animate={{
        filter: realityGlitch ? [
          'hue-rotate(0deg) contrast(1)',
          'hue-rotate(180deg) contrast(2)',
          'hue-rotate(360deg) contrast(1)',
        ] : 'hue-rotate(0deg) contrast(1)'
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Quantum Consciousness Field */}
      <div className="absolute inset-0">
        {quantumField.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full ${particle.type === 'neuron' ? 'bg-gradient-to-r from-cyan-400 to-purple-500' : 'bg-gradient-to-r from-pink-400 to-yellow-500'}`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              opacity: [0.1, 1, 0.1],
              scale: [0.5, 1.5, 0.5],
              x: [0, Math.sin(particle.phase) * 50, 0],
              y: [0, Math.cos(particle.phase) * 50, 0],
              boxShadow: [
                `0 0 ${particle.size * 2}px ${colors.glow}33`,
                `0 0 ${particle.size * 8}px ${colors.glow}66`,
                `0 0 ${particle.size * 2}px ${colors.glow}33`
              ]
            }}
            transition={{
              duration: particle.speed * 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Neural Connections */}
      <svg className="absolute inset-0 w-full h-full">
        {quantumField.slice(0, 50).map((start, i) => {
          const end = quantumField[(i + 1) % quantumField.length];
          return (
            <motion.line
              key={`connection-${i}`}
              x1={`${start.x}%`}
              y1={`${start.y}%`}
              x2={`${end.x}%`}
              y2={`${end.y}%`}
              stroke={colors.glow}
              strokeWidth="0.5"
              opacity="0.3"
              animate={{
                strokeDasharray: ["0 100", "50 100", "0 100"],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          );
        })}
      </svg>

      {/* Floating Consciousness Fragments */}
      {thoughtStream.map((thought) => (
        <motion.div
          key={thought.id}
          className="absolute pointer-events-none font-mono text-xs z-20"
          style={{
            left: `${thought.x}%`,
            top: `${thought.y}%`,
            color: colors.glow,
            opacity: thought.life,
            fontSize: `${8 + thought.life * 6}px`
          }}
          animate={{
            y: [0, -100],
            opacity: [thought.life, 0],
            scale: [1, 0.5]
          }}
          transition={{
            duration: 3,
            ease: "easeOut"
          }}
        >
          {thought.text}
        </motion.div>
      ))}

      {/* Central Consciousness Hub */}
      <motion.div 
        className="relative z-10 text-center"
        style={{
          transform: `translate(${distortionX}px, ${distortionY}px)`
        }}
      >
        {/* Main Consciousness Orb */}
        <motion.div
          className="mx-auto mb-8 relative"
          style={{ width: 200, height: 200 }}
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Outer Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 opacity-30"
            style={{ borderColor: colors.glow }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
          />
          
          {/* Middle Ring */}
          <motion.div
            className="absolute inset-4 rounded-full border opacity-50"
            style={{ borderColor: colors.glow }}
            animate={{
              scale: [1.1, 0.9, 1.1],
              rotate: [0, -360]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Core */}
          <motion.div
            className="absolute inset-8 rounded-full"
            style={{
              background: `radial-gradient(circle, ${colors.glow}88 0%, ${colors.accent} 50%, ${colors.primary} 100%)`
            }}
            animate={{
              boxShadow: [
                `0 0 20px ${colors.glow}66`,
                `0 0 60px ${colors.glow}99`,
                `0 0 20px ${colors.glow}66`
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-4xl">
              {phase === 'void' && '⚫'}
              {phase === 'awakening' && '🌅'}
              {phase === 'conscious' && '🧠'}
              {phase === 'transcendent' && '🌌'}
            </div>
          </motion.div>
        </motion.div>

        {/* Phase-dependent Content */}
        {phase === 'void' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <h1 className="text-6xl font-mono text-gray-800">
              void
            </h1>
            <div className="w-64 h-1 bg-gray-800 mx-auto">
              <div className="h-full bg-gray-600 w-0"></div>
            </div>
          </motion.div>
        )}

        {phase === 'awakening' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-4xl font-cyber text-red-400">
              AWAKENING
            </h1>
            <p className="text-lg text-gray-300 font-mono">
              Neural pathways initializing...
            </p>
            <div className="w-80 h-2 bg-gray-800 rounded-full mx-auto">
              <motion.div
                className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                style={{ width: `${consciousnessLevel}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </motion.div>
        )}

        {phase === 'conscious' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <h1 className="text-5xl font-cyber text-cyan-400">
              CONSCIOUS
            </h1>
            <p className="text-xl text-gray-200 max-w-md mx-auto">
              Synapses firing. Creativity activated.
            </p>
            <div className="w-80 h-2 bg-gray-800 rounded-full mx-auto">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                style={{ width: `${consciousnessLevel}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </motion.div>
        )}

        {phase === 'transcendent' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <motion.h1
              className="text-7xl font-cyber font-bold"
              animate={{
                textShadow: [
                  `0 0 20px ${colors.glow}`,
                  `0 0 60px ${colors.glow}`,
                  `0 0 20px ${colors.glow}`
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span 
                className="bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
              >
                OUSSAMA.MIND
              </span>
            </motion.h1>

            <motion.p
              className="text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Where <span className="text-cyan-400 font-bold">imagination</span> meets
              <span className="text-purple-400 font-bold"> code</span>,
              <br />
              and <span className="text-pink-400 font-bold">dreams</span> become
              <span className="text-yellow-400 font-bold"> reality</span>
            </motion.p>

            <div className="w-80 h-3 bg-gray-800 rounded-full mx-auto">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full"
                style={{ width: `${consciousnessLevel}%` }}
                animate={{
                  boxShadow: [
                    `0 0 10px ${colors.glow}66`,
                    `0 0 30px ${colors.glow}99`,
                    `0 0 10px ${colors.glow}66`
                  ]
                }}
                transition={{ 
                  width: { duration: 0.1 },
                  boxShadow: { duration: 2, repeat: Infinity }
                }}
              />
            </div>

            <motion.button
              onClick={onEnterBrain}
              className="relative px-16 py-6 rounded-full font-cyber font-bold text-xl text-white overflow-hidden group cursor-pointer"
              style={{
                background: `linear-gradient(45deg, ${colors.glow}88, ${colors.accent})`
              }}
              whileHover={{ 
                scale: 1.1,
                boxShadow: `0 0 40px ${colors.glow}99`
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <span className="relative z-10">ENTER THE NEURAL VERSE</span>
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(45deg, ${colors.accent}, ${colors.glow}88)`
                }}
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* Consciousness Level Indicator */}
      <div className="absolute top-8 left-8 z-30">
        <div className="neural-card p-4 bg-black/30 border border-gray-600/30">
          <p className="text-xs text-gray-400 font-mono mb-2">CONSCIOUSNESS LEVEL</p>
          <p className="text-2xl font-cyber text-white">{consciousnessLevel}%</p>
          <p className="text-xs text-gray-500 font-mono uppercase">{phase}</p>
        </div>
      </div>

      {/* Reality Status */}
      <div className="absolute bottom-8 left-8 z-30">
        <div className="neural-card p-3 bg-black/30 border border-gray-600/30">
          <div className="flex items-center space-x-2">
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: colors.glow }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 1,
                repeat: Infinity
              }}
            />
            <p className="text-xs font-mono text-gray-400">
              {realityGlitch ? 'REALITY GLITCH DETECTED' : 'NEURAL ACTIVITY STABLE'}
            </p>
          </div>
        </div>
      </div>

      {/* Quantum Signature */}
      <div className="absolute bottom-8 right-8 z-30">
        <motion.div
          className="neural-card p-3 bg-black/30 border border-gray-600/30"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <p className="text-xs font-mono text-gray-400">QUANTUM SIGNATURE</p>
          <p className="text-lg font-cyber text-white">0x{Date.now().toString(16).slice(-6).toUpperCase()}</p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BrainConsciousness;
