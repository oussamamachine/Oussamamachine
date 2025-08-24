import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MatrixCodeRain = ({ trigger = null, autoTrigger = true }) => {
  const [isRaining, setIsRaining] = useState(false);
  const [intensity, setIntensity] = useState(50);
  const [codeDrops, setCodeDrops] = useState([]);
  const [matrixPhrase, setMatrixPhrase] = useState('');
  const canvasRef = useRef(null);

  const matrixPhrases = [
    'WELCOME TO THE MATRIX',
    'FOLLOW THE WHITE RABBIT',
    'THERE IS NO SPOON',
    'WAKE UP NEO',
    'TAKE THE RED PILL',
    'THE MATRIX HAS YOU',
    'IGNORANCE IS BLISS',
    'WHAT IS REAL',
    'DIGITAL CONSCIOUSNESS ACTIVATED',
    'REALITY IS A SIMULATION',
    'CONSCIOUSNESS UPLOADING',
    'ENTERING THE GRID'
  ];

  // Katakana characters used in the Matrix
  const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

  // Auto trigger effect
  useEffect(() => {
    if (!autoTrigger) return;

    const triggerInterval = setInterval(() => {
      if (Math.random() < 0.03 && !isRaining) { // 3% chance every 5 seconds
        startMatrixRain();
      }
    }, 5000);

    return () => clearInterval(triggerInterval);
  }, [isRaining, autoTrigger]);

  // Manual trigger
  useEffect(() => {
    if (trigger) {
      startMatrixRain();
    }
  }, [trigger]);

  const startMatrixRain = () => {
    setIsRaining(true);
    setMatrixPhrase(matrixPhrases[Math.floor(Math.random() * matrixPhrases.length)]);
    
    // Create initial code drops
    const drops = [];
    const numDrops = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < numDrops; i++) {
      drops.push({
        id: i,
        x: i * 20,
        y: Math.random() * -200,
        speed: 2 + Math.random() * 4,
        length: 10 + Math.random() * 20,
        chars: generateCharString(10 + Math.random() * 20)
      });
    }
    
    setCodeDrops(drops);

    // Stop rain after duration
    setTimeout(() => {
      setIsRaining(false);
      setCodeDrops([]);
    }, 8000);
  };

  const generateCharString = (length) => {
    return Array.from({ length }, () => 
      matrixChars[Math.floor(Math.random() * matrixChars.length)]
    ).join('');
  };

  // Canvas-based matrix rain for better performance
  useEffect(() => {
    if (!isRaining || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1);

    const draw = () => {
      // Black background with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff88';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Gradient effect - brighter at the bottom
        const opacity = Math.min(1, drops[i] / 20);
        ctx.fillStyle = `rgba(0, 255, 136, ${opacity})`;
        
        ctx.fillText(char, x, y);

        // Reset drop to top when it reaches bottom
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const animationId = setInterval(draw, 50);
    return () => clearInterval(animationId);
  }, [isRaining]);

  // Resize canvas
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AnimatePresence>
      {isRaining && (
        <>
          {/* Matrix Canvas Background */}
          <motion.canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Matrix Phrase Overlay */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <div className="text-center">
              <motion.div
                className="text-4xl md:text-6xl font-mono font-bold mb-4 text-green-400"
                style={{
                  textShadow: '0 0 20px #00ff88, 0 0 40px #00ff88',
                  filter: 'brightness(1.2)'
                }}
                animate={{
                  textShadow: [
                    '0 0 20px #00ff88, 0 0 40px #00ff88',
                    '0 0 30px #00ff88, 0 0 60px #00ff88',
                    '0 0 20px #00ff88, 0 0 40px #00ff88'
                  ]
                }}
                transition={{ duration: 2, repeat: 2 }}
              >
                {matrixPhrase}
              </motion.div>
              
              {/* Matrix cursor */}
              <motion.div
                className="inline-block w-1 h-8 bg-green-400 ml-2"
                animate={{
                  opacity: [1, 0, 1]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity
                }}
              />
            </div>
          </motion.div>

          {/* Matrix HUD Elements */}
          <div className="fixed inset-0 pointer-events-none z-45">
            {/* Top left terminal info */}
            <motion.div
              className="absolute top-4 left-4 font-mono text-green-400 text-sm"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              <div>MATRIX_PROTOCOL: ACTIVE</div>
              <div>REALITY_STATUS: COMPROMISED</div>
              <div>CONSCIOUSNESS: DIGITAL</div>
              <div>USER_LEVEL: {Math.floor(Math.random() * 10) + 1}</div>
            </motion.div>

            {/* Top right system stats */}
            <motion.div
              className="absolute top-4 right-4 font-mono text-green-400 text-sm text-right"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
            >
              <div>SIGNAL_STRENGTH: {Math.floor(Math.random() * 100)}%</div>
              <div>NEURAL_ACTIVITY: HIGH</div>
              <div>CONNECTION: SECURE</div>
              <div>TIME: {new Date().toLocaleTimeString()}</div>
            </motion.div>

            {/* Bottom scanning line */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px bg-green-400"
              animate={{
                opacity: [0, 1, 0],
                scaleX: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                repeat: 2,
                delay: 1.5
              }}
              style={{
                boxShadow: '0 0 10px #00ff88'
              }}
            />
          </div>

          {/* Matrix Sound Visualization */}
          <motion.div
            className="fixed bottom-4 left-4 flex space-x-1 pointer-events-none z-45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-green-400"
                animate={{
                  height: [5, Math.random() * 40 + 10, 5]
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
                style={{
                  boxShadow: '0 0 2px #00ff88'
                }}
              />
            ))}
          </motion.div>

          {/* Glitch effects */}
          <motion.div
            className="fixed inset-0 pointer-events-none z-44"
            animate={{
              background: [
                'transparent',
                'rgba(0, 255, 136, 0.02)',
                'transparent'
              ]
            }}
            transition={{
              duration: 0.1,
              repeat: 5,
              delay: 3
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
};

// Hook for triggering Matrix rain manually
export const useMatrixRain = () => {
  const [trigger, setTrigger] = useState(0);

  const activateMatrix = () => {
    setTrigger(prev => prev + 1);
    console.log('🟢 Matrix rain activated - Reality compromised');
  };

  return { activateMatrix, trigger };
};

export default MatrixCodeRain;
