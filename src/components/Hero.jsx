import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Line } from '@react-three/drei';

// Error Boundary for Hero 3D content
class Hero3DErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Hero 3D Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white/80">
              <div className="text-4xl mb-4">🧬</div>
              <p className="text-sm">3D DNA visualization unavailable</p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const Hero = ({ isDarkMode }) => {
  const containerRef = useRef(null);
  const [threeJSError, setThreeJSError] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  const springOpacity = useSpring(opacity, { stiffness: 300, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 300, damping: 30 });

  // Floating DNA Animation
  const FloatingDNA = () => {
    return (
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <group position={[0, 0, -5]}>
          {/* DNA Helix */}
          {Array.from({ length: 20 }).map((_, i) => (
            <group key={i} position={[0, i * 0.3 - 3, 0]}>
              <mesh position={[Math.sin(i * 0.5) * 0.5, 0, 0]}>
                <sphereGeometry args={[0.1, 8, 6]} />
                <meshStandardMaterial
                  color={isDarkMode ? "#00F5FF" : "#8B5CF6"}
                  emissive={isDarkMode ? "#00F5FF" : "#8B5CF6"}
                  emissiveIntensity={0.2}
                />
              </mesh>
              <mesh position={[-Math.sin(i * 0.5) * 0.5, 0, 0]}>
                <sphereGeometry args={[0.1, 8, 6]} />
                <meshStandardMaterial
                  color={isDarkMode ? "#8B5CF6" : "#00F5FF"}
                  emissive={isDarkMode ? "#8B5CF6" : "#00F5FF"}
                  emissiveIntensity={0.2}
                />
              </mesh>
              {/* Connection lines */}
              <Line
                points={[
                  [Math.sin(i * 0.5) * 0.5, 0, 0],
                  [-Math.sin(i * 0.5) * 0.5, 0, 0]
                ]}
                color={isDarkMode ? "#00FF00" : "#FF6B6B"}
                lineWidth={1}
              />
            </group>
          ))}
        </group>
      </Float>
    );
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{
        y: springY,
        opacity: springOpacity,
        scale: springScale
      }}
    >
      {/* 3D Background */}
      {!threeJSError ? (
        <Hero3DErrorBoundary>
          <div className="absolute inset-0">
            <Canvas
              camera={{ position: [0, 0, 8], fov: 60 }}
              onError={(error) => {
                console.log('Hero Canvas error:', error);
                setThreeJSError(true);
              }}
            >
              <ambientLight intensity={0.3} />
              <pointLight position={[10, 10, 10]} intensity={0.8} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              <FloatingDNA />
            </Canvas>
          </div>
        </Hero3DErrorBoundary>
      ) : (
        // Fallback when Three.js fails
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white/80">
              <div className="text-4xl mb-4">🧬</div>
              <p className="text-sm">3D DNA visualization unavailable</p>
              <p className="text-xs mt-2">Using fallback display</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`text-6xl md:text-8xl font-cyber font-bold mb-6 ${isDarkMode
            ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-purple to-matrix-green'
            : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
            }`}
        >
          OUSSAMA.MIND
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className={`text-xl md:text-2xl mb-8 font-mono ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
        >
          Welcome to OUSSAMA.MIND – The Living Portfolio
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className={`text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
        >
          A fusion of cutting-edge technology, creative innovation, and digital consciousness.
          Explore the intersection of code, art, and human potential.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 rounded-full font-cyber text-lg font-semibold transition-all duration-300 ${isDarkMode
              ? 'bg-gradient-to-r from-cyber-blue to-cyber-purple text-white shadow-lg shadow-cyber-blue/25 hover:shadow-xl hover:shadow-cyber-blue/40'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40'
              }`}
            onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
          >
            Explore My Mind
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 rounded-full font-cyber text-lg font-semibold border-2 transition-all duration-300 ${isDarkMode
              ? 'border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-white'
              : 'border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
              }`}
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
          >
            Connect
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`w-6 h-10 border-2 rounded-full flex justify-center ${isDarkMode ? 'border-cyber-blue' : 'border-purple-600'
              }`}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`w-1 h-3 rounded-full mt-2 ${isDarkMode ? 'bg-cyber-blue' : 'bg-purple-600'
                }`}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${isDarkMode ? 'bg-cyber-blue' : 'bg-purple-500'
              }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Hero;
