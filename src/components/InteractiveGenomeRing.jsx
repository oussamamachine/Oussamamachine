import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const InteractiveGenomeRing = () => {
  const [hoveredSection, setHoveredSection] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const ringRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Transform ring based on scroll
  const ringRotation = useTransform(scrollYProgress, [0, 0.3], [0, 360]);
  const ringScale = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 0.8, 0.3]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.1, 0.3], [1, 0.9, 0.4]);

  // Define sections of the mind/site
  const mindSections = [
    {
      id: 'hero',
      name: 'Consciousness',
      color: '#00ffff',
      angle: 0,
      quote: 'The awakening of digital consciousness...',
      description: 'Entry portal to the mind'
    },
    {
      id: 'codedna',
      name: 'Evolution',
      color: '#8a2be2',
      angle: 45,
      quote: 'Every line of code is evolution in action...',
      description: 'Developer DNA timeline'
    },
    {
      id: 'skills',
      name: 'Synapses',
      color: '#00ff00',
      angle: 90,
      quote: 'Neural pathways of knowledge...',
      description: 'Skill visualization'
    },
    {
      id: 'neural-explorer',
      name: 'Networks',
      color: '#ff6b6b',
      angle: 135,
      quote: 'Thoughts connecting across dimensions...',
      description: 'Neural node explorer'
    },
    {
      id: 'projects',
      name: 'Creations',
      color: '#ffd700',
      angle: 180,
      quote: 'Dreams materialized through code...',
      description: 'Genetic projects'
    },
    {
      id: 'failure-room',
      name: 'Wisdom',
      color: '#ff4444',
      angle: 225,
      quote: 'Failure is the universe teaching us...',
      description: 'Lessons from failure'
    },
    {
      id: 'mindmap',
      name: 'Memory',
      color: '#9d4edd',
      angle: 270,
      quote: 'The map of all experiences...',
      description: 'Mind map visualization'
    },
    {
      id: 'chat',
      name: 'Dialogue',
      color: '#06ffa5',
      angle: 315,
      quote: 'Conversation with the digital soul...',
      description: 'AI chat interface'
    }
  ];

  // Handle section navigation
  const navigateToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setActiveSection(sectionId);
    }
  };

  // Calculate position on ring
  const getPositionOnRing = (angle, radius = 120) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius
    };
  };

  // Track current section
  useEffect(() => {
    const handleScroll = () => {
      const sections = mindSections.map(section => document.getElementById(section.id));
      const currentSection = sections.find(section => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
      });
      
      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      ref={ringRef}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none genome-ring"
      style={{
        rotate: ringRotation,
        scale: ringScale,
        opacity: ringOpacity,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 2 }}
    >
      {/* Central Core */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center"
        animate={{
          boxShadow: [
            '0 0 20px rgba(0, 255, 255, 0.4)',
            '0 0 40px rgba(0, 255, 255, 0.8)',
            '0 0 20px rgba(0, 255, 255, 0.4)',
          ],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="w-6 h-6 bg-white rounded-full opacity-80" />
      </motion.div>

      {/* DNA Ring Sections */}
      {mindSections.map((section, index) => {
        const position = getPositionOnRing(section.angle);
        const isHovered = hoveredSection === section.id;
        const isActive = activeSection === section.id;
        
        return (
          <motion.div
            key={section.id}
            className="absolute pointer-events-auto group cursor-pointer"
            style={{
              left: `calc(50% + ${position.x}px)`,
              top: `calc(50% + ${position.y}px)`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
            }}
            transition={{ 
              delay: index * 0.1,
              duration: 0.8,
              ease: "easeOut"
            }}
            whileHover={{ scale: 1.3 }}
            onClick={() => navigateToSection(section.id)}
            onMouseEnter={() => setHoveredSection(section.id)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            {/* Main Node */}
            <motion.div
              className="w-4 h-4 rounded-full relative genome-node"
              style={{
                backgroundColor: section.color,
                boxShadow: `0 0 15px ${section.color}`,
              }}
              animate={{
                scale: isActive ? [1, 1.4, 1] : isHovered ? 1.2 : 1,
                boxShadow: isActive 
                  ? [
                      `0 0 15px ${section.color}`,
                      `0 0 30px ${section.color}`,
                      `0 0 15px ${section.color}`,
                    ]
                  : `0 0 15px ${section.color}`,
              }}
              transition={{ 
                duration: isActive ? 2 : 0.3,
                repeat: isActive ? Infinity : 0
              }}
            >
              {/* Pulsing Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 opacity-60"
                style={{ borderColor: section.color }}
                animate={{
                  scale: [1, 2, 3],
                  opacity: [0.6, 0.3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />
            </motion.div>

            {/* Connection Line to Center */}
            <motion.div
              className="absolute top-1/2 left-1/2 origin-left"
              style={{
                width: '120px',
                height: '1px',
                background: `linear-gradient(to right, ${section.color}40, transparent)`,
                transform: `translate(-50%, -50%) rotate(${section.angle + 180}deg)`,
              }}
              animate={{
                opacity: isHovered || isActive ? 0.8 : 0.3,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Tooltip */}
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 genome-tooltip text-white px-3 py-2 rounded-lg border border-gray-700 whitespace-nowrap z-40 min-w-max"
                style={{
                  boxShadow: `0 0 15px ${section.color}40`,
                  borderColor: section.color + '40',
                }}
              >
                <div className="text-sm font-mono font-bold" style={{ color: section.color }}>
                  {section.name}
                </div>
                <div className="text-xs text-gray-400 italic">
                  {section.quote}
                </div>
                <div className="text-xs text-gray-500">
                  {section.description}
                </div>
                
                {/* Tooltip Arrow */}
                <div 
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45"
                  style={{ 
                    backgroundColor: section.color + '20',
                    borderTop: `1px solid ${section.color}40`,
                    borderLeft: `1px solid ${section.color}40`,
                  }}
                />
              </motion.div>
            )}
          </motion.div>
        );
      })}

      {/* Orbital Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: '50%',
            top: '50%',
          }}
          animate={{
            rotate: [0, 360],
            x: Math.cos((i * 45 * Math.PI) / 180) * (140 + i * 5),
            y: Math.sin((i * 45 * Math.PI) / 180) * (140 + i * 5),
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            rotate: { duration: 20 + i * 2, repeat: Infinity, ease: "linear" },
            opacity: { duration: 3, repeat: Infinity, delay: i * 0.5 },
          }}
        />
      ))}

      {/* Central Data Stream */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-mono text-xs text-cyan-400 opacity-60"
        animate={{
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="text-center">
          <div>MIND.EXE</div>
          <div className="text-[8px] text-gray-500">v2.0.25</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InteractiveGenomeRing;
