import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GenomePortal = ({ onPortalComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    // Show skip button after 1 second
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 1000);

    // Auto-dismiss after 3 seconds
    const autoTimer = setTimeout(() => {
      handleComplete();
    }, 3000);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(autoTimer);
    };
  }, []);

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onPortalComplete();
    }, 800);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-blue-900/30 via-purple-900/20 to-black"></div>

        {/* Main Portal Content */}
        <div className="relative flex flex-col items-center justify-center">
          
          {/* Lightweight SVG Genome */}
          <motion.div
            className="relative mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              className="drop-shadow-2xl"
            >
              {/* Background Circle */}
              <motion.circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="rgba(59, 130, 246, 0.2)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.3 }}
              />

              {/* Genome Dots - 8 strategic positions */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                const x = 100 + 80 * Math.cos((angle - 90) * Math.PI / 180);
                const y = 100 + 80 * Math.sin((angle - 90) * Math.PI / 180);
                
                const colors = [
                  '#00ffff', // Cyan - Frontend
                  '#8b5cf6', // Purple - Backend  
                  '#00ff00', // Green - AI
                  '#ff6b6b', // Red - DevOps
                  '#ffd700', // Gold - Mobile
                  '#ff69b4', // Pink - Design
                  '#00bfff', // Sky - Cloud
                  '#32cd32'  // Lime - Data
                ];

                return (
                  <motion.g key={i}>
                    {/* Glow Effect */}
                    <motion.circle
                      cx={x}
                      cy={y}
                      r="8"
                      fill={colors[i]}
                      filter="blur(4px)"
                      opacity="0.6"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 0.9, 0.6],
                      }}
                      transition={{
                        duration: 2 + i * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.1
                      }}
                    />
                    
                    {/* Main Dot */}
                    <motion.circle
                      cx={x}
                      cy={y}
                      r="4"
                      fill={colors[i]}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.5 + i * 0.1,
                        ease: "easeOut"
                      }}
                    />

                    {/* Pulse Ring */}
                    <motion.circle
                      cx={x}
                      cy={y}
                      r="4"
                      fill="none"
                      stroke={colors[i]}
                      strokeWidth="1"
                      opacity="0.8"
                      animate={{
                        r: [4, 12, 4],
                        opacity: [0.8, 0, 0.8],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeOut"
                      }}
                    />
                  </motion.g>
                );
              })}

              {/* Connecting Lines */}
              {[0, 2, 4, 6].map((startIndex) => {
                const angle1 = [0, 45, 90, 135, 180, 225, 270, 315][startIndex];
                const angle2 = [0, 45, 90, 135, 180, 225, 270, 315][(startIndex + 2) % 8];
                
                const x1 = 100 + 80 * Math.cos((angle1 - 90) * Math.PI / 180);
                const y1 = 100 + 80 * Math.sin((angle1 - 90) * Math.PI / 180);
                const x2 = 100 + 80 * Math.cos((angle2 - 90) * Math.PI / 180);
                const y2 = 100 + 80 * Math.sin((angle2 - 90) * Math.PI / 180);

                return (
                  <motion.line
                    key={startIndex}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(0, 255, 255, 0.3)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 1 + startIndex * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                );
              })}

              {/* Central Pulse */}
              <motion.circle
                cx="100"
                cy="100"
                r="3"
                fill="#ffffff"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.8, 0.3, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </svg>

            {/* Rotating Ring */}
            <motion.div
              className="absolute inset-0 border border-cyan-400/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>

          {/* Portal Text */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.h2 
              className="text-2xl md:text-3xl font-mono text-cyan-400 mb-2"
              animate={{
                textShadow: [
                  "0 0 10px rgba(0, 255, 255, 0.5)",
                  "0 0 20px rgba(0, 255, 255, 0.8)",
                  "0 0 10px rgba(0, 255, 255, 0.5)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              OUSSAMA.MIND
            </motion.h2>
            
            <motion.p 
              className="text-sm text-gray-400 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              Initializing consciousness...
            </motion.p>

            {/* Loading Bar */}
            <motion.div className="w-64 h-1 bg-gray-800 rounded-full mx-auto mt-4 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

          {/* Skip Button */}
          <AnimatePresence>
            {showSkip && (
              <motion.button
                onClick={handleComplete}
                className="absolute bottom-8 right-8 text-gray-400 hover:text-cyan-400 font-mono text-sm transition-colors duration-300 group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">Skip Intro</span>
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
                
                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 border border-cyan-400/30 rounded-lg opacity-0 group-hover:opacity-100 -m-2"
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Ambient Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, -200],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GenomePortal;
