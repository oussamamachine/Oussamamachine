import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RealityGlitch = ({ trigger = null, intensity = 0.5, duration = 2000 }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchType, setGlitchType] = useState('matrix');
  const [realityFragments, setRealityFragments] = useState([]);

  // Different glitch reality types
  const glitchTypes = {
    matrix: {
      colors: ['#00ff00', '#00aa00', '#008800'],
      effect: 'digital-rain',
      message: 'REALITY.EXE HAS STOPPED WORKING'
    },
    quantum: {
      colors: ['#ff0080', '#8000ff', '#0080ff'],
      effect: 'quantum-superposition', 
      message: 'ENTERING QUANTUM SUPERPOSITION'
    },
    neural: {
      colors: ['#ffaa00', '#ff6600', '#ff3300'],
      effect: 'neural-firing',
      message: 'NEURAL PATHWAYS OVERLOADING'
    },
    blockchain: {
      colors: ['#ffd700', '#ffb347', '#ff8c00'],
      effect: 'block-corruption',
      message: 'BLOCKCHAIN REALITY FORKING'
    },
    consciousness: {
      colors: ['#ff69b4', '#da70d6', '#ba55d3'],
      effect: 'consciousness-break',
      message: 'CONSCIOUSNESS BUFFER OVERFLOW'
    }
  };

  // Trigger glitch effect
  useEffect(() => {
    if (trigger) {
      activateGlitch();
    }
  }, [trigger]);

  // Auto-trigger random glitches occasionally
  useEffect(() => {
    const randomGlitch = setInterval(() => {
      if (Math.random() < 0.05 && !isGlitching) { // 5% chance every 10 seconds
        const types = Object.keys(glitchTypes);
        setGlitchType(types[Math.floor(Math.random() * types.length)]);
        activateGlitch();
      }
    }, 10000);

    return () => clearInterval(randomGlitch);
  }, [isGlitching]);

  const activateGlitch = () => {
    setIsGlitching(true);
    
    // Create reality fragments
    const fragments = [];
    for (let i = 0; i < 20; i++) {
      fragments.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
        opacity: 0.3 + Math.random() * 0.7
      });
    }
    setRealityFragments(fragments);

    // Apply glitch effects to entire page
    document.body.style.filter = `
      hue-rotate(${Math.random() * 360}deg) 
      saturate(${2 + Math.random() * 3}) 
      contrast(${1.5 + Math.random()})
    `;
    
    // Randomly distort elements
    const elements = document.querySelectorAll('*');
    const glitchedElements = [];
    
    for (let i = 0; i < Math.min(elements.length, 50); i++) {
      const element = elements[Math.floor(Math.random() * elements.length)];
      if (element && element.style) {
        const originalTransform = element.style.transform || '';
        element.style.transform = `
          ${originalTransform} 
          skew(${Math.random() * 10 - 5}deg, ${Math.random() * 10 - 5}deg)
          translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px)
        `;
        glitchedElements.push({ element, originalTransform });
      }
    }

    // Restore after duration
    setTimeout(() => {
      setIsGlitching(false);
      setRealityFragments([]);
      document.body.style.filter = '';
      
      // Restore all glitched elements
      glitchedElements.forEach(({ element, originalTransform }) => {
        if (element && element.style) {
          element.style.transform = originalTransform;
        }
      });
    }, duration);
  };

  const currentGlitch = glitchTypes[glitchType];

  return (
    <AnimatePresence>
      {isGlitching && (
        <>
          {/* Full Screen Glitch Overlay */}
          <motion.div
            className="fixed inset-0 pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  ${currentGlitch.colors[0]}20 2px,
                  ${currentGlitch.colors[0]}20 4px
                ),
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 2px,
                  ${currentGlitch.colors[1]}20 2px,
                  ${currentGlitch.colors[1]}20 4px
                )
              `,
              mixBlendMode: 'overlay'
            }}
          />

          {/* Matrix Digital Rain Effect */}
          {currentGlitch.effect === 'digital-rain' && (
            <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute font-mono text-green-400 text-xs opacity-80"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: '-20px'
                  }}
                  animate={{
                    y: [0, window.innerHeight + 100],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: 2,
                    delay: Math.random()
                  }}
                >
                  {String.fromCharCode(0x30A0 + Math.random() * 96)}
                </motion.div>
              ))}
            </div>
          )}

          {/* Quantum Superposition Effect */}
          {currentGlitch.effect === 'quantum-superposition' && (
            <div className="fixed inset-0 pointer-events-none z-50">
              {realityFragments.map((fragment) => (
                <motion.div
                  key={fragment.id}
                  className="absolute w-32 h-32 border-2"
                  style={{
                    left: fragment.x,
                    top: fragment.y,
                    borderColor: currentGlitch.colors[fragment.id % 3],
                    backgroundColor: `${currentGlitch.colors[fragment.id % 3]}10`
                  }}
                  animate={{
                    rotate: [0, 360, -360, 0],
                    scale: [fragment.scale, fragment.scale * 2, fragment.scale],
                    opacity: [fragment.opacity, 0, fragment.opacity]
                  }}
                  transition={{
                    duration: 1,
                    repeat: 2
                  }}
                />
              ))}
            </div>
          )}

          {/* Neural Firing Effect */}
          {currentGlitch.effect === 'neural-firing' && (
            <div className="fixed inset-0 pointer-events-none z-50">
              <svg className="w-full h-full">
                {[...Array(30)].map((_, i) => (
                  <motion.line
                    key={i}
                    x1={Math.random() * window.innerWidth}
                    y1={Math.random() * window.innerHeight}
                    x2={Math.random() * window.innerWidth}
                    y2={Math.random() * window.innerHeight}
                    stroke={currentGlitch.colors[i % 3]}
                    strokeWidth="2"
                    animate={{
                      opacity: [0, 1, 0],
                      pathLength: [0, 1, 0]
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: 3,
                      delay: i * 0.1
                    }}
                  />
                ))}
              </svg>
            </div>
          )}

          {/* Block Corruption Effect */}
          {currentGlitch.effect === 'block-corruption' && (
            <div className="fixed inset-0 pointer-events-none z-50">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute border-4 border-yellow-400 bg-yellow-400/10"
                  style={{
                    left: `${(i % 5) * 20}%`,
                    top: `${Math.floor(i / 5) * 33}%`,
                    width: '120px',
                    height: '80px'
                  }}
                  animate={{
                    rotateX: [0, 180, 360],
                    rotateY: [0, 180, 360],
                    scale: [1, 0.5, 1],
                    opacity: [1, 0, 1]
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.1
                  }}
                >
                  <div className="text-xs font-mono text-yellow-400 p-2">
                    Block #{i + 1}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Consciousness Break Effect */}
          {currentGlitch.effect === 'consciousness-break' && (
            <div className="fixed inset-0 pointer-events-none z-50">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: '200px',
                    height: '200px',
                    marginLeft: '-100px',
                    marginTop: '-100px'
                  }}
                >
                  <motion.div
                    className="w-full h-full border-4 rounded-full"
                    style={{
                      borderColor: currentGlitch.colors[i % 3],
                      borderStyle: 'dashed'
                    }}
                    animate={{
                      scale: [1, 3 + i, 1],
                      opacity: [1, 0, 1],
                      rotate: [0, 360 * (i + 1), 0]
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2
                    }}
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* Glitch Message */}
          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 text-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              scale: [0, 1.2, 1, 0],
              rotateX: [0, 360, 0]
            }}
            transition={{ duration: duration / 1000 }}
          >
            <div 
              className="text-4xl md:text-6xl font-mono font-bold mb-4 glitch-text"
              style={{ 
                color: currentGlitch.colors[0],
                textShadow: `
                  2px 2px 0px ${currentGlitch.colors[1]},
                  -2px -2px 0px ${currentGlitch.colors[2]},
                  0px 0px 10px ${currentGlitch.colors[0]}
                `,
                filter: 'blur(0.5px)'
              }}
            >
              ERROR 404
            </div>
            
            <motion.div
              className="text-lg md:text-xl font-mono"
              style={{ color: currentGlitch.colors[1] }}
              animate={{
                opacity: [0, 1, 0],
                y: [20, 0, -20]
              }}
              transition={{
                duration: 1,
                repeat: 2
              }}
            >
              {currentGlitch.message}
            </motion.div>

            <motion.div
              className="text-sm font-mono mt-4 opacity-60"
              style={{ color: currentGlitch.colors[2] }}
              animate={{
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: 0.5,
                repeat: 4,
                delay: 1
              }}
            >
              REALITY WILL RESUME SHORTLY...
            </motion.div>
          </motion.div>

          {/* Glitch Sound Simulation (Visual) */}
          <motion.div
            className="fixed bottom-4 right-4 z-50 font-mono text-xs"
            style={{ color: currentGlitch.colors[0] }}
            animate={{
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 0.1,
              repeat: 20
            }}
          >
            [GLITCH_AUDIO_SIMULATION]
          </motion.div>

          {/* Static Noise Effect */}
          <div 
            className="fixed inset-0 pointer-events-none z-40 opacity-20"
            style={{
              background: `
                radial-gradient(circle, transparent 0%, ${currentGlitch.colors[0]}40 100%),
                url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")
              `
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
};

// Global Glitch Trigger Hook
export const useRealityGlitch = () => {
  const [glitchTrigger, setGlitchTrigger] = useState(0);

  const triggerGlitch = (type = 'matrix', intensity = 0.5, duration = 2000) => {
    setGlitchTrigger(prev => prev + 1);
    
    // You can add custom logic here for different trigger types
    console.log(`🌀 Reality glitch activated: ${type}`);
  };

  return { triggerGlitch, glitchTrigger };
};

export default RealityGlitch;
