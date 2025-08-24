import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const DNASkillVisualizer = ({ skills }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  // Enhanced transforms for more dynamic movement with safe initial values
  const dnaRotation = useTransform(scrollYProgress, [0, 1], [0, 1080]);
  const particleFloat = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.3]);
  const ringScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.8]);
  const ringY = useTransform(scrollYProgress, [0, 0.4], [0, -50]);

  const skillColors = {
    'frontend': '#00F5FF',
    'backend': '#8B5CF6', 
    'ai': '#00FF00',
    'devops': '#FF6B6B'
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const createDNAHelix = () => {
    const points = [];
    for (let i = 0; i < 120; i++) {
      const angle = (i / 120) * Math.PI * 10;
      const y = (i / 120) * 800;
      points.push({
        x1: Math.cos(angle) * 40,
        x2: Math.cos(angle + Math.PI) * 40,
        y: y,
        id: i,
        intensity: Math.sin(angle) * 0.5 + 0.5
      });
    }
    return points;
  };

  const helixPoints = createDNAHelix();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-dark-bg via-dark-bg to-cyber-blue/5">
      {/* Genome Hero Section - Fixed Height */}
      <div className="h-[80vh] flex flex-col justify-center items-center relative overflow-hidden">
        {/* Scroll-triggered transition overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-gray-900 to-transparent"
          initial={{ opacity: 1 }}
          style={{
            opacity: overlayOpacity,
          }}
        />

        {/* Enhanced Ambient Background */}
      <div className="absolute inset-0 z-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-3xl ${
              i % 3 === 0 ? 'bg-cyber-blue/10' : 
              i % 3 === 1 ? 'bg-cyber-purple/10' : 'bg-matrix-green/10'
            }`}
            style={{
              width: `${200 + i * 50}px`,
              height: `${200 + i * 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: mousePosition.x * (0.01 + i * 0.002),
              y: mousePosition.y * (0.01 + i * 0.002),
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              x: { type: "spring", stiffness: 30, damping: 30 },
              y: { type: "spring", stiffness: 30, damping: 30 },
              scale: { duration: 8 + i, repeat: Infinity },
              rotate: { duration: 20 + i * 3, repeat: Infinity, ease: "linear" },
            }}
          />
        ))}
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-cyber-blue rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: particleFloat,
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-4">
        {/* Cinematic DNA Genome Ring */}
        <motion.div
          className="flex items-center justify-center py-2"
          initial={{ opacity: 1, scale: 1, y: 0 }}
          style={{
            opacity: ringOpacity,
            scale: ringScale,
            y: ringY,
          }}
        >
          <div className="relative">
            {/* Main DNA Ring */}
            <motion.div
              className="w-48 h-48 rounded-full border-2 border-cyan-400/30 relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {/* DNA Points */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                const x = Math.cos((angle - 90) * Math.PI / 180) * 80;
                const y = Math.sin((angle - 90) * Math.PI / 180) * 80;
                const colors = ['#00ffff', '#8b5cf6', '#00ff00', '#ff6b6b', '#ffd700', '#ff69b4', '#00bfff', '#32cd32'];
                
                return (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      backgroundColor: colors[i],
                      boxShadow: `0 0 15px ${colors[i]}`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2 + i * 0.2,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                );
              })}

              {/* Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                  className="text-center"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="text-cyan-400 font-mono text-sm mb-2">DNA.init()</div>
                  <div className="text-white font-cyber text-lg">SKILLS</div>
                </motion.div>

                {/* Pulsing Down Arrow */}
                <motion.button
                  className="mt-4 text-cyan-400 hover:text-white transition-colors cursor-pointer"
                  onClick={() => {
                    const skillsContent = document.querySelector('#skills-content');
                    if (skillsContent) {
                      skillsContent.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  animate={{
                    y: [0, 10, 0],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="flex flex-col items-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    <span className="text-xs mt-1 font-mono">Dive into Skills</span>
                  </div>
                </motion.button>
              </div>
            </motion.div>

            {/* Orbital Particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  rotate: [0, 360],
                  x: Math.cos((i * 60 * Math.PI) / 180) * (100 + i * 10),
                  y: Math.sin((i * 60 * Math.PI) / 180) * (100 + i * 10),
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  rotate: { duration: 15 + i * 3, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 3, repeat: Infinity, delay: i * 0.5 },
                }}
              />
            ))}
          </div>
        </motion.div>
        </div> {/* Close max-w-7xl container */}

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            opacity: ringOpacity,
          }}
        >
          <div className="flex flex-col items-center text-cyan-400/80">
            <span className="text-xs font-mono mb-2">Explore Skills</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div> {/* End of Genome Hero Section */}

      {/* Skills Content Section - Seamless Transition */}
      <div className="relative z-10 bg-gradient-to-b from-gray-900 to-dark-bg">
        <div className="max-w-7xl mx-auto px-4">
        {/* Main Skills Content */}
        <div id="skills-content">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <motion.h2
            className="text-5xl md:text-7xl font-cyber font-bold mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="consciousness-flow bg-clip-text text-transparent">
              DNA.skills()
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Every skill is a genetic code in the developer's consciousness, 
            <br />
            <span className="text-cyber-blue font-mono">evolving through experience.execute()</span>
          </motion.p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* Enhanced DNA Helix Visualization */}
          <div className="lg:w-1/2 relative h-[500px] flex justify-center">
            <motion.div
              style={{ rotate: dnaRotation }}
              className="relative w-96 h-96"
            >
              <svg className="w-full h-full" viewBox="-60 0 120 800">
                {/* DNA Strands */}
                {helixPoints.map((point, index) => (
                  <g key={point.id}>
                    {/* Left strand with enhanced effects */}
                    <motion.circle
                      cx={point.x1}
                      cy={point.y}
                      r="4"
                      fill="#00F5FF"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0.6, 1, 0.6], 
                        scale: [1, 1.2, 1],
                        fill: ["#00F5FF", "#8B5CF6", "#00FF00", "#00F5FF"]
                      }}
                      transition={{ 
                        delay: index * 0.03,
                        duration: 2 + Math.random(),
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      style={{
                        filter: `drop-shadow(0 0 8px rgba(0, 245, 255, ${point.intensity}))`,
                      }}
                    />
                    {/* Right strand with enhanced effects */}
                    <motion.circle
                      cx={point.x2}
                      cy={point.y}
                      r="4"
                      fill="#8B5CF6"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0.6, 1, 0.6], 
                        scale: [1, 1.2, 1],
                        fill: ["#8B5CF6", "#00FF00", "#00F5FF", "#8B5CF6"]
                      }}
                      transition={{ 
                        delay: index * 0.03 + 0.1,
                        duration: 2 + Math.random(),
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      style={{
                        filter: `drop-shadow(0 0 8px rgba(139, 92, 246, ${point.intensity}))`,
                      }}
                    />
                    
                    {/* Connecting bonds with animation */}
                    {index % 5 === 0 && (
                      <motion.line
                        x1={point.x1}
                        y1={point.y}
                        x2={point.x2}
                        y2={point.y}
                        stroke="rgba(0, 255, 255, 0.3)"
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ 
                          pathLength: [0, 1, 0], 
                          opacity: [0, 0.6, 0],
                          stroke: [
                            "rgba(0, 255, 255, 0.3)",
                            "rgba(139, 92, 246, 0.3)",
                            "rgba(0, 255, 0, 0.3)"
                          ]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.05,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </g>
                ))}
                
                {/* Particle effects */}
                {[...Array(8)].map((_, i) => (
                  <motion.circle
                    key={`particle-${i}`}
                    r="1"
                    fill="rgba(0, 255, 255, 0.8)"
                    initial={{ 
                      cx: Math.random() * 120 - 60,
                      cy: Math.random() * 800,
                      opacity: 0 
                    }}
                    animate={{
                      cx: [
                        Math.random() * 120 - 60,
                        Math.random() * 120 - 60,
                        Math.random() * 120 - 60
                      ],
                      cy: [
                        Math.random() * 800,
                        Math.random() * 800,
                        Math.random() * 800
                      ],
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.5, 0.5]
                    }}
                    transition={{
                      duration: 4 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 3,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </svg>
              
              {/* Ambient glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 blur-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>

          {/* Skill Categories */}
          <div className="lg:w-1/2 space-y-8">
            {Object.entries(skills).map(([categoryKey, categoryData], categoryIndex) => (
              <motion.div
                key={categoryKey}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                viewport={{ once: true }}
                className="neural-card group cursor-pointer"
                onMouseEnter={() => setHoveredSkill(categoryKey)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="flex items-center mb-6">
                  <div 
                    className="w-4 h-4 rounded-full mr-4"
                    style={{ backgroundColor: skillColors[categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)] }}
                  />
                  <h3 
                    className="text-2xl font-cyber font-bold"
                    style={{ color: skillColors[categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)] }}
                  >
                    {categoryKey}.genome
                  </h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.values(categoryData).flat().map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: `0 0 20px ${skillColors[categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)]}40`
                      }}
                      transition={{ 
                        delay: skillIndex * 0.1,
                        type: "spring",
                        stiffness: 300
                      }}
                      className="relative group/skill"
                    >
                      <div 
                        className="px-4 py-3 rounded-lg border text-center relative overflow-hidden"
                        style={{ 
                          borderColor: `${skillColors[categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)]}40`,
                          backgroundColor: `${skillColors[categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)]}10`
                        }}
                      >
                        <span 
                          className="text-sm font-mono relative z-10"
                          style={{ color: skillColors[categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)] }}
                        >
                          {skill}
                        </span>
                        
                        {/* Skill pulse effect */}
                        <motion.div
                          className="absolute inset-0 rounded-lg opacity-0 group-hover/skill:opacity-30"
                          style={{ backgroundColor: skillColors[categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)] }}
                          animate={{
                            scale: hoveredSkill === categoryKey ? [1, 1.05, 1] : 1,
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />

                        {/* Neural connection lines */}
                        <motion.div
                          className="absolute top-0 left-0 w-full h-0.5 opacity-0 group-hover/skill:opacity-60"
                          style={{ backgroundColor: skillColors[categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)] }}
                          animate={{
                            width: hoveredSkill === categoryKey ? ["0%", "100%", "0%"] : "0%"
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Category connection visualization */}
                {hoveredSkill === categoryKey && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    className="mt-4 h-0.5 bg-gradient-to-r opacity-60"
                    style={{ 
                      backgroundImage: `linear-gradient(90deg, ${skillColors[categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)]}, transparent)`
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skill Evolution Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-4 text-center"
        >
          <div className="neural-card max-w-2xl mx-auto">
            <h4 className="font-cyber text-2xl text-cyber-blue mb-6">
              🧬 Evolution Sequence
            </h4>
            <div className="font-mono text-lg text-gray-300 leading-relaxed space-y-2">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              >
                <span className="text-cyber-blue">01:</span> HTML.createElement() 
                <span className="text-matrix-green">→ Foundation</span>
              </motion.div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <span className="text-cyber-blue">02:</span> React.useState() 
                <span className="text-matrix-green">→ Interaction</span>
              </motion.div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <span className="text-cyber-blue">03:</span> AI.predict() 
                <span className="text-matrix-green">→ Intelligence</span>
              </motion.div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              >
                <span className="text-cyber-blue">∞:</span> Consciousness.evolve() 
                <span className="text-matrix-green">→ Transcendence</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
        </div> {/* Close skills-content */}
        </div> {/* Close max-w-7xl container */}
      </div> {/* Close skills content section */}
    </section>
  );
};

export default DNASkillVisualizer;
