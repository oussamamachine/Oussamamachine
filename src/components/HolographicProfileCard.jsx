import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

const HolographicProfileCard = ({ profile }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeLayer, setActiveLayer] = useState('surface');
  const [scanLine, setScanLine] = useState(0);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const cardRef = useRef(null);

  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

  // Default profile data
  const defaultProfile = {
    name: 'Oussama Mind',
    title: 'Digital Consciousness Architect',
    location: 'Neural Networks, Cloud Infrastructure',
    status: 'ONLINE - CONSCIOUSNESS ACTIVE',
    avatar: '/api/placeholder/150/150',
    stats: {
      projects: 50,
      commits: 1247,
      neural_connections: 9999,
      consciousness_level: 85
    },
    skills: ['React', 'Node.js', 'Blockchain', 'AI/ML', 'Consciousness Design'],
    bio: 'Bridging the gap between human creativity and artificial intelligence. Building the future, one neural connection at a time.',
    contact: {
      email: 'contact@example.com',
      github: 'github.com/oussamamind',
      linkedin: 'linkedin.com/in/oussamamind'
    }
  };

  const profileData = profile || defaultProfile;

  // Holographic layers
  const layers = {
    surface: {
      name: 'Surface Layer',
      color: '#00ff88',
      opacity: 1,
      content: 'basic'
    },
    neural: {
      name: 'Neural Layer',
      color: '#ff0088',
      opacity: 0.8,
      content: 'stats'
    },
    consciousness: {
      name: 'Consciousness Layer',
      color: '#0088ff',
      opacity: 0.6,
      content: 'deep'
    },
    quantum: {
      name: 'Quantum Layer',
      color: '#ff8800',
      opacity: 0.4,
      content: 'meta'
    }
  };

  // Mouse tracking
  const handleMouseMove = (event) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(event.clientX - centerX);
      mouseY.set(event.clientY - centerY);
    }
  };

  // Scanning animation
  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanLine(prev => (prev >= 100 ? 0 : prev + 2));
    }, 50);

    return () => clearInterval(scanInterval);
  }, []);

  // Random glitch effects
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 200);
      }
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  const renderLayerContent = (layer) => {
    switch (layers[layer].content) {
      case 'basic':
        return (
          <div className="space-y-4">
            {/* Avatar with holographic effect */}
            <div className="relative mx-auto w-24 h-24 mb-4">
              <motion.div
                className="w-full h-full rounded-full bg-gradient-to-br from-green-400 to-blue-500 p-1"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(0,255,136,0.5)',
                    '0 0 30px rgba(0,255,136,0.8)',
                    '0 0 20px rgba(0,255,136,0.5)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-2xl">
                  🧠
                </div>
              </motion.div>
              
              {/* Holographic rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border-2 border-green-400/30 rounded-full"
                  animate={{
                    scale: [1, 1.5 + i * 0.3],
                    opacity: [0.5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                />
              ))}
            </div>

            {/* Basic Info */}
            <div className="text-center">
              <h2 className="text-xl font-bold text-green-400 glitch-text">
                {profileData.name}
              </h2>
              <p className="text-sm text-gray-300 mb-2">
                {profileData.title}
              </p>
              <p className="text-xs text-gray-400">
                📍 {profileData.location}
              </p>
              <div className="mt-2 inline-flex items-center space-x-2 bg-green-900/20 px-2 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-green-400 font-mono">
                  {profileData.status}
                </span>
              </div>
            </div>
          </div>
        );

      case 'stats':
        return (
          <div className="space-y-3">
            <h3 className="text-center text-pink-400 font-mono text-sm mb-4">
              NEURAL STATISTICS
            </h3>
            {Object.entries(profileData.stats).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-xs text-gray-300 capitalize">
                  {key.replace('_', ' ')}:
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-800 rounded-full h-1">
                    <motion.div
                      className="h-1 rounded-full bg-pink-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((value / 2000) * 100, 100)}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <span className="text-pink-400 font-mono text-xs min-w-[3rem] text-right">
                    {value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );

      case 'deep':
        return (
          <div className="space-y-3">
            <h3 className="text-center text-blue-400 font-mono text-sm mb-4">
              CONSCIOUSNESS CORE
            </h3>
            <div className="bg-blue-900/10 rounded p-3 border border-blue-400/20">
              <p className="text-xs text-gray-300 leading-relaxed">
                {profileData.bio}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {profileData.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="bg-blue-800/20 px-2 py-1 rounded text-xs text-blue-300 text-center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'meta':
        return (
          <div className="space-y-3">
            <h3 className="text-center text-orange-400 font-mono text-sm mb-4">
              QUANTUM CONTACT LAYER
            </h3>
            <div className="space-y-2">
              {Object.entries(profileData.contact).map(([key, value]) => (
                <motion.div
                  key={key}
                  className="flex items-center space-x-2 bg-orange-900/10 p-2 rounded border border-orange-400/20"
                  whileHover={{ scale: 1.02, borderColor: 'rgba(255,136,0,0.5)' }}
                >
                  <div className="w-6 h-6 bg-orange-400/20 rounded flex items-center justify-center">
                    <span className="text-xs">
                      {key === 'email' && '📧'}
                      {key === 'github' && '🔗'}
                      {key === 'linkedin' && '💼'}
                    </span>
                  </div>
                  <span className="text-xs text-orange-300 font-mono">
                    {value}
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-4">
              <motion.button
                className="bg-orange-400/20 hover:bg-orange-400/30 border border-orange-400 text-orange-400 px-4 py-2 rounded text-xs font-mono transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ESTABLISH QUANTUM ENTANGLEMENT
              </motion.button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-40 w-80">
      <motion.div
        ref={cardRef}
        className={`relative bg-black/90 backdrop-blur-md border-2 rounded-xl p-6 cursor-pointer overflow-hidden ${glitchEffect ? 'animate-pulse' : ''}`}
        style={{
          borderColor: layers[activeLayer].color,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        onMouseMove={handleMouseMove}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
      >
        {/* Holographic Background Grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(${layers[activeLayer].color}40 1px, transparent 1px),
              linear-gradient(90deg, ${layers[activeLayer].color}40 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />

        {/* Scanning Line */}
        <motion.div
          className="absolute left-0 right-0 h-px"
          style={{
            top: `${scanLine}%`,
            backgroundColor: layers[activeLayer].color,
            boxShadow: `0 0 10px ${layers[activeLayer].color}`
          }}
          animate={{
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 0.1 }}
        />

        {/* Layer Selector */}
        <div className="absolute top-2 right-2 flex space-x-1">
          {Object.entries(layers).map(([key, layer]) => (
            <motion.button
              key={key}
              className={`w-3 h-3 rounded-full border ${
                activeLayer === key ? 'border-current' : 'border-gray-600'
              }`}
              style={{
                backgroundColor: activeLayer === key ? layer.color : 'transparent',
                borderColor: layer.color
              }}
              onClick={() => setActiveLayer(key)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>

        {/* Layer Indicator */}
        <div className="absolute top-2 left-2 text-xs font-mono">
          <span style={{ color: layers[activeLayer].color }}>
            {layers[activeLayer].name}
          </span>
        </div>

        {/* Content Layer */}
        <motion.div
          key={activeLayer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: layers[activeLayer].opacity, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          style={{
            color: layers[activeLayer].color,
            filter: glitchEffect ? 'hue-rotate(180deg) saturate(3)' : 'none'
          }}
        >
          {renderLayerContent(activeLayer)}
        </motion.div>

        {/* Holographic Glitch Effects */}
        {glitchEffect && (
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-px bg-current opacity-50"
                style={{
                  top: `${20 + i * 15}%`,
                  left: `${Math.random() * 10}%`,
                  color: layers[activeLayer].color
                }}
                animate={{
                  x: ['-100%', '100%'],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 0.2,
                  delay: i * 0.02
                }}
              />
            ))}
          </div>
        )}

        {/* 3D Holographic Border Effect */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Corner holograms */}
          {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(position => (
            <div
              key={position}
              className={`absolute w-4 h-4 ${position} ${position.includes('top') ? 'border-t-2' : 'border-b-2'} ${
                position.includes('left') ? 'border-l-2' : 'border-r-2'
              }`}
              style={{ borderColor: layers[activeLayer].color }}
            />
          ))}
        </div>

        {/* Particle Effect */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  backgroundColor: layers[activeLayer].color,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  y: [0, -50],
                  opacity: [1, 0],
                  scale: [1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* External Holographic Projectors */}
      <div className="absolute -inset-4 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              i === 0 ? '-top-2 -left-2' :
              i === 1 ? '-top-2 -right-2' :
              i === 2 ? '-bottom-2 -left-2' : '-bottom-2 -right-2'
            }`}
            style={{
              backgroundColor: layers[activeLayer].color,
              boxShadow: `0 0 10px ${layers[activeLayer].color}`
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HolographicProfileCard;
