import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const LivingGenomeLogo = ({ consciousnessLevel = 50 }) => {
  const [dnaSequence, setDnaSequence] = useState('CONSCIOUSNESS.LOADING()');
  const [isTranscending, setIsTranscending] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  useEffect(() => {
    // Generate evolving DNA sequence
    const sequences = [
      'ATCG-CODE-DREAM-REALITY',
      'MIND.OVERRIDE(IMPOSSIBLE)',
      'const FUTURE = await IMAGINATION',
      'CONSCIOUSNESS.LEVEL_UP()',
      'DNA.SPLICE(CREATIVITY, LOGIC)',
      'if(DREAM === REALITY) { TRANSCEND(); }'
    ];
    
    const interval = setInterval(() => {
      setDnaSequence(sequences[Math.floor(Math.random() * sequences.length)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleTranscendClick = () => {
    setIsTranscending(true);
    setTimeout(() => {
      const nextSection = document.querySelector('[data-section="cognitive-lab"]');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000);
  };

  return (
    <motion.section 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity, scale }}
    >
      {/* Quantum Background */}
      <div className="absolute inset-0">
        {/* Living DNA Strands */}
        <svg className="absolute inset-0 w-full h-full">
          {[...Array(6)].map((_, i) => (
            <motion.path
              key={i}
              d={`M${i * 250} 0 Q${i * 250 + 125} 400 ${i * 250} 800`}
              stroke="url(#dnaGradient)"
              strokeWidth="2"
              fill="none"
              opacity="0.4"
              animate={{
                d: [
                  `M${i * 250} 0 Q${i * 250 + 125} 400 ${i * 250} 800`,
                  `M${i * 250} 0 Q${i * 250 - 125} 400 ${i * 250} 800`,
                  `M${i * 250} 0 Q${i * 250 + 125} 400 ${i * 250} 800`
                ]
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
          <defs>
            <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F5FF" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#00FF00" />
            </linearGradient>
          </defs>
        </svg>

        {/* Consciousness Particles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-30, 30],
              x: [-20, 20],
              opacity: [0.2, 1, 0.2],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Main Logo Container */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Holographic Name */}
        <motion.div
          className="mb-12"
          animate={{ 
            textShadow: [
              '0 0 30px #00F5FF, 0 0 60px #00F5FF, 0 0 90px #00F5FF',
              '0 0 40px #8B5CF6, 0 0 70px #8B5CF6, 0 0 100px #8B5CF6',
              '0 0 30px #00F5FF, 0 0 60px #00F5FF, 0 0 90px #00F5FF'
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 bg-clip-text text-transparent leading-tight">
            OUSSAMA
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-mono mt-2 text-cyan-300">
            .MIND
          </h2>
          <motion.p 
            className="text-xs sm:text-sm text-gray-400 mt-4 font-mono"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Neural Network | Digital Consciousness | Code Architect
          </motion.p>
        </motion.div>

        {/* Living DNA Sequence */}
        <motion.div 
          className="mb-12 p-4 sm:p-6 border border-cyan-500/30 bg-black/50 backdrop-blur-sm rounded-lg max-w-3xl mx-auto"
          animate={{ 
            borderColor: ['rgba(0,245,255,0.3)', 'rgba(139,92,246,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,245,255,0.3)'],
            boxShadow: [
              '0 0 20px rgba(0,245,255,0.2)',
              '0 0 30px rgba(139,92,246,0.2)',
              '0 0 20px rgba(0,255,0,0.2)',
              '0 0 20px rgba(0,245,255,0.2)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="text-xs text-cyan-400 mb-3 font-mono">NEURAL_SEQUENCE.DNA</div>
          <motion.div 
            className="font-mono text-sm sm:text-base md:text-lg text-white"
            key={dnaSequence}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {dnaSequence.split('').map((char, i) => (
              <motion.span
                key={`${dnaSequence}-${i}`}
                className="inline-block"
                animate={{ 
                  color: ['#00F5FF', '#8B5CF6', '#00FF00', '#FF6B6B', '#00F5FF'],
                }}
                transition={{ 
                  duration: 3,
                  delay: i * 0.05,
                  repeat: Infinity 
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Consciousness Level Indicator */}
        <motion.div 
          className="mb-12 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-cyan-400 font-mono text-sm">CONSCIOUSNESS LEVEL</span>
          <div className="w-64 h-3 bg-gray-800 rounded-full overflow-hidden border border-cyan-500/30">
            <motion.div 
              className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400"
              style={{ width: `${consciousnessLevel}%` }}
              animate={{ 
                opacity: [0.8, 1, 0.8],
                boxShadow: [
                  '0 0 10px rgba(0,245,255,0.5)',
                  '0 0 20px rgba(139,92,246,0.5)',
                  '0 0 10px rgba(0,255,0,0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <span className="text-white font-mono text-sm font-bold">{Math.round(consciousnessLevel)}%</span>
        </motion.div>

        {/* Transcend Button */}
        <motion.button
          onClick={handleTranscendClick}
          className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 font-mono text-sm sm:text-base md:text-lg uppercase tracking-wider overflow-hidden transition-all duration-500 hover:text-black rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={isTranscending ? { 
            scale: [1, 1.3, 0],
            opacity: [1, 1, 0],
            rotate: [0, 180, 360]
          } : {}}
          transition={isTranscending ? { duration: 2 } : {}}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"
          />
          <span className="relative z-10 font-bold">
            {isTranscending ? 'TRANSCENDING REALITY...' : 'ENTER THE NEURAL VERSE'}
          </span>
        </motion.button>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <div className="text-cyan-400 text-center">
            <div className="text-xs sm:text-sm font-mono mb-3 opacity-80">SCROLL TO EXPLORE THE MIND</div>
            <motion.div 
              className="w-6 h-12 border-2 border-cyan-400 rounded-full flex justify-center relative"
              animate={{ 
                borderColor: ['#00F5FF', '#8B5CF6', '#00FF00', '#00F5FF'],
                boxShadow: [
                  '0 0 10px rgba(0,245,255,0.3)',
                  '0 0 15px rgba(139,92,246,0.3)',
                  '0 0 10px rgba(0,255,0,0.3)',
                  '0 0 10px rgba(0,245,255,0.3)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div 
                className="w-1 h-4 bg-cyan-400 rounded-full mt-2"
                animate={{ 
                  y: [0, 20, 0],
                  backgroundColor: ['#00F5FF', '#8B5CF6', '#00FF00', '#00F5FF']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default LivingGenomeLogo;
