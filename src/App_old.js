import React, { useState, useEffect, useRef, Suspense } from 'react';
import './App.css';
import portfolioData from './data/portfolio.json';

// Lazy load ALL components for instant initial load
const NeuralGenesis = React.lazy(() => import('./components/NeuralGenesis'));
const CodeDNA = React.lazy(() => import('./components/CodeDNA'));
const DNASkillVisualizer = React.lazy(() => import('./components/DNASkillVisualizer'));
const GeneticProjects = React.lazy(() => import('./components/GeneticProjects'));
const FailureRoom = React.lazy(() => import('./components/FailureRoom'));
const VisionCortex = React.lazy(() => import('./components/VisionCortex'));
const AITerminal = React.lazy(() => import('./components/AITerminal'));
const EasterEggSystem = React.lazy(() => import('./components/EasterEggSystem'));

function App() {
  const [currentPhase, setCurrentPhase] = useState('awakening');
  const [consciousnessLevel, setConsciousnessLevel] = useState(45); // Start with some consciousness
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [neuralActivity, setNeuralActivity] = useState([]);
  const [isBlinking, setIsBlinking] = useState(false);
  const [emotionalState, setEmotionalState] = useState('calm');
  const [magneticField, setMagneticField] = useState({ x: 0, y: 0, strength: 0 });
  const lastUpdateTime = useRef(0);
  const interactionCount = useRef(0);
  
  // ⚡ Ultra-fast scroll handler with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
          const phaseIndex = Math.floor(scrollPercent * 5);
          const phases = ['awakening', 'conscious', 'exploring', 'creating', 'transcendent'];
          const emotions = ['calm', 'excited', 'focused', 'creative', 'transcendent'];
          
          if (phases[phaseIndex]) {
            setCurrentPhase(phases[phaseIndex]);
            setEmotionalState(emotions[phaseIndex] || 'calm');
            setConsciousnessLevel(45 + scrollPercent * 50); // 45-95%
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🔮 Magical Consciousness Blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance every 3 seconds
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 200);
      }
    }, 3000);
    
    return () => clearInterval(blinkInterval);
  }, []);

  // 💫 Ultra-Fast Magnetic Field & Predictive Cursor Magic
  useEffect(() => {
    let velocityX = 0;
    let velocityY = 0;
    let lastX = 0;
    let lastY = 0;
    
    const handleMouseMove = (e) => {
      // Ultra-throttle to 50ms for maximum performance
      if (Date.now() - lastUpdateTime.current < 50) return;
      
      // Calculate mouse velocity for predictive magic (simplified)
      velocityX = e.clientX - lastX;
      velocityY = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Simplified magnetic field
      const strength = Math.min(Math.abs(velocityX) + Math.abs(velocityY), 20) / 4;
      setMagneticField({ 
        x: e.clientX, 
        y: e.clientY, 
        strength: strength 
      });
      
      // Track interaction intensity (simplified)
      interactionCount.current += 1;
      
      // Only create neural activity every 300ms for performance
      if (Date.now() - lastUpdateTime.current > 300) {
        const newActivity = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
          magnetic: strength > 2,
        };
        
        setNeuralActivity(prev => [...prev.slice(-3), newActivity]); // Only keep 3 points
        lastUpdateTime.current = Date.now();
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 🌈 Emotional Color Palette Magic
  const getEmotionalColors = (emotion) => {
    const palettes = {
      calm: { primary: '#00F5FF', secondary: '#4FC3F7', accent: '#81D4FA' },
      excited: { primary: '#FF6B6B', secondary: '#FF8A65', accent: '#FFAB91' },
      focused: { primary: '#9C27B0', secondary: '#AB47BC', accent: '#BA68C8' },
      creative: { primary: '#00E676', secondary: '#26A69A', accent: '#66BB6A' },
      transcendent: { primary: '#FFD700', secondary: '#FFA726', accent: '#FFCC02' }
    };
    return palettes[emotion] || palettes.calm;
  };

  const currentColors = getEmotionalColors(emotionalState);

  // Remove auto-consciousness evolution (too intensive)
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setConsciousnessLevel(prev => Math.min(100, prev + Math.random() * 2));
  //   }, 50);
    
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-cyan-400 text-xl animate-pulse">🧠 Awakening...</div>
      </div>
    }>
      <div 
        className="mind-universe relative bg-black text-white overflow-x-hidden"
        style={{ 
          background: `linear-gradient(135deg, 
            hsl(${consciousnessLevel * 3.6}, 70%, 5%) 0%, 
            hsl(${(consciousnessLevel * 3.6 + 60) % 360}, 60%, 8%) 50%, 
            hsl(${(consciousnessLevel * 3.6 + 120) % 360}, 50%, 3%) 100%)`
        }}
      >
      {/* ⚡ Ultra-Fast Magical Neural Universe */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Ultra-Fast Liquid Background */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
              ${currentColors.primary}30 0%, 
              transparent 40%)`,
            filter: isBlinking ? 'blur(10px)' : 'none',
          }}
        />

        {/* Ultra-Simplified Neural Mesh - Only 2 nodes for speed */}
        <svg className="absolute inset-0 w-full h-full opacity-25">
          {neuralActivity.slice(-2).map((activity, index) => (
            <g key={activity.id}>
              {/* Fast Neural Node */}
              <circle
                cx={activity.x}
                cy={activity.y}
                r={activity.magnetic ? "4" : "2"}
                fill={currentColors.primary}
                opacity={isBlinking ? 0.3 : 0.7}
              />
              
              {/* Simple Connection */}
              {index > 0 && (
                <line
                  x1={neuralActivity[index - 1]?.x}
                  y1={neuralActivity[index - 1]?.y}
                  x2={activity.x}
                  y2={activity.y}
                  stroke={currentColors.primary}
                  strokeWidth="1"
                  opacity="0.4"
                />
              )}
              
              {/* Fast Constellation Letter */}
              {index < 2 && (
                <text
                  x={activity.x + 8}
                  y={activity.y - 8}
                  fill={currentColors.accent}
                  fontSize="10"
                  fontFamily="monospace"
                  opacity="0.6"
                >
                  {['O','U'][index]}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* ⚡ Ultra-Fast Consciousness HUD */}
      <div 
        className="fixed top-6 left-6 z-50 backdrop-blur-sm rounded-lg p-3 border"
        style={{
          background: 'rgba(0,0,0,0.8)',
          borderColor: currentColors.primary,
          boxShadow: `0 0 ${10 + magneticField.strength}px ${currentColors.primary}60`,
          filter: isBlinking ? 'blur(2px)' : 'none',
        }}
      >
        <div className="flex items-center space-x-3">
          {/* Fast Consciousness Orb */}
          <div className="relative w-8 h-8">
            <div 
              className="absolute inset-0 rounded-full border"
              style={{ borderColor: currentColors.primary }}
            />
            <div 
              className="absolute inset-1 rounded-full"
              style={{ 
                background: currentColors.primary,
                opacity: consciousnessLevel / 100,
                filter: isBlinking ? 'blur(2px)' : 'none'
              }}
            />
          </div>
          
          <div>
            <p className="text-xs font-mono" style={{ color: currentColors.secondary }}>
              NEURAL STATE
            </p>
            <p className="text-sm font-bold text-white flex items-center">
              {currentPhase.toUpperCase()}
              {isBlinking && <span className="ml-2 text-xs">😴</span>}
              {magneticField.strength > 3 && <span className="ml-2 text-xs">⚡</span>}
            </p>
            <p className="text-xs text-gray-400">
              {Math.round(consciousnessLevel)}% • {emotionalState}
            </p>
          </div>
        </div>
      </div>

      {/* The Mind Journey - Scroll-based Story */}
      <div className="relative z-10">
        
        {/* Phase 1: Revolutionary Neural Genesis Hero */}
        <m.section 
          className="min-h-screen flex items-center justify-center relative overflow-hidden"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* 🧠 3D Neural Network Genesis */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Central Neural Core */}
            <m.div 
              className="relative z-10"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              {/* Main Identity Hub */}
              <div className="text-center">
                <m.h1 
                  className="text-6xl md:text-8xl font-bold mb-4"
                  style={{ 
                    background: `linear-gradient(45deg, ${currentColors.primary}, ${currentColors.accent})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: isBlinking ? 'blur(2px)' : 'none'
                  }}
                  animate={{ 
                    textShadow: [`0 0 20px ${currentColors.primary}40`, `0 0 40px ${currentColors.primary}80`, `0 0 20px ${currentColors.primary}40`]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  OUSSAMA
                </m.h1>
                
                <m.div 
                  className="text-2xl md:text-4xl font-mono mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 1 }}
                  style={{ color: currentColors.secondary }}
                >
                  {'<Developer.Mind />'}
                </m.div>
                
                <m.p 
                  className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 1 }}
                >
                  Architecting digital consciousness through code, AI, and boundless creativity
                </m.p>
                
                {/* Neural Stats Display */}
                <m.div 
                  className="flex justify-center space-x-8 text-sm font-mono"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5, duration: 1 }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: currentColors.primary }}>∞</div>
                    <div className="text-gray-400">Ideas/min</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: currentColors.accent }}>
                      {Math.round(consciousnessLevel)}%
                    </div>
                    <div className="text-gray-400">Consciousness</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: currentColors.secondary }}>
                      {interactionCount.current}
                    </div>
                    <div className="text-gray-400">Neural Links</div>
                  </div>
                </m.div>
              </div>
            </m.div>

            {/* 🌌 Dynamic Neural Network Background */}
            <div className="absolute inset-0 z-0">
              {/* Neural Grid */}
              <svg className="absolute inset-0 w-full h-full opacity-20">
                {/* Create a grid of neural nodes */}
                {[...Array(20)].map((_, i) => {
                  const x = (i % 5) * 25 + 10; // 5 columns
                  const y = Math.floor(i / 5) * 25 + 10; // 4 rows
                  const isActive = i < Math.floor(consciousnessLevel / 5);
                  
                  return (
                    <g key={i}>
                      {/* Neural Node */}
                      <m.circle
                        cx={`${x}%`}
                        cy={`${y}%`}
                        r="4"
                        fill={isActive ? currentColors.primary : currentColors.secondary}
                        opacity={isActive ? 0.8 : 0.3}
                        animate={isActive ? {
                          scale: [1, 1.2, 1],
                          opacity: [0.8, 1, 0.8]
                        } : {}}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.1
                        }}
                      />
                      
                      {/* Neural Connections */}
                      {i > 0 && i % 5 !== 0 && isActive && (
                        <m.line
                          x1={`${x}%`}
                          y1={`${y}%`}
                          x2={`${((i-1) % 5) * 25 + 10}%`}
                          y2={`${Math.floor((i-1) / 5) * 25 + 10}%`}
                          stroke={currentColors.primary}
                          strokeWidth="1"
                          opacity="0.4"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                        />
                      )}
                      
                      {/* Vertical connections */}
                      {i >= 5 && isActive && (
                        <m.line
                          x1={`${x}%`}
                          y1={`${y}%`}
                          x2={`${((i-5) % 5) * 25 + 10}%`}
                          y2={`${Math.floor((i-5) / 5) * 25 + 10}%`}
                          stroke={currentColors.secondary}
                          strokeWidth="1"
                          opacity="0.3"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                        />
                      )}
                      
                      {/* Skill Labels */}
                      {isActive && ['React', 'AI', 'Node.js', 'Python', 'Design', 'Cloud', 'Mobile', 'Blockchain', 'ML', 'DevOps', 'TypeScript', 'GraphQL', 'Docker', 'AWS', 'Next.js', 'Vue', 'Flutter', 'TensorFlow', 'MongoDB', 'PostgreSQL'][i] && (
                        <m.text
                          x={`${x}%`}
                          y={`${y + 8}%`}
                          textAnchor="middle"
                          fontSize="8"
                          fill={currentColors.accent}
                          opacity="0.7"
                          fontFamily="monospace"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.7 }}
                          transition={{ delay: i * 0.2 + 1 }}
                        >
                          {['React', 'AI', 'Node.js', 'Python', 'Design', 'Cloud', 'Mobile', 'Blockchain', 'ML', 'DevOps', 'TypeScript', 'GraphQL', 'Docker', 'AWS', 'Next.js', 'Vue', 'Flutter', 'TensorFlow', 'MongoDB', 'PostgreSQL'][i]}
                        </m.text>
                      )}
                    </g>
                  );
                })}
              </svg>
              
              {/* Floating Particles */}
              <div className="absolute inset-0">
                {[...Array(50)].map((_, i) => (
                  <m.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                      background: currentColors.primary,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Scroll Indicator */}
            <m.div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="flex flex-col items-center space-y-2">
                <div 
                  className="w-8 h-12 border-2 rounded-full flex justify-center"
                  style={{ borderColor: currentColors.primary }}
                >
                  <m.div 
                    className="w-1 h-3 rounded-full mt-2"
                    style={{ background: currentColors.primary }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
                <p className="text-xs font-mono text-gray-400">Explore Neural Pathways</p>
              </div>
            </m.div>
          </div>
        </m.section>

        {/* Phase 2: Genesis - Origin Story */}
        <m.section 
          className="min-h-screen relative"
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.01, ease: "linear" }}
          viewport={{ once: true, amount: 0.001 }}
        >
          <NeuralGenesis 
            timeline={portfolioData.timeline}
            isActive={currentPhase === 'conscious'}
          />
        </m.section>

        {/* Phase 3: DNA Timeline - Code Evolution */}
        <m.section 
          className="min-h-screen relative"
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.01, ease: "linear" }}
          viewport={{ once: true, amount: 0.001 }}
        >
          <CodeDNA 
            timeline={portfolioData.timeline}
          />
        </m.section>

        {/* Phase 4: Skills Helix - DNA Visualization */}
        <m.section 
          className="min-h-screen relative"
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.01, ease: "linear" }}
          viewport={{ once: true, amount: 0.001 }}
        >
          <DNASkillVisualizer 
            skills={portfolioData.dnaSkills}
            consciousnessLevel={consciousnessLevel}
          />
        </m.section>

        {/* Phase 5: Projects Galaxy - Genetic Projects */}
        <m.section 
          className="min-h-screen relative"
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.01, ease: "linear" }}
          viewport={{ once: true, amount: 0.001 }}
        >
          <GeneticProjects 
            projects={portfolioData.mindMap.projects}
            isActive={currentPhase === 'exploring'}
          />
        </m.section>

        {/* Phase 6: Failure Archive - Learning from Mistakes */}
        <m.section 
          className="min-h-screen relative"
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.01, ease: "linear" }}
          viewport={{ once: true, amount: 0.001 }}
        >
          <FailureRoom 
            failures={portfolioData.failureStories}
            neuralActivity={neuralActivity}
          />
        </m.section>

        {/* Phase 7: Vision Cortex - Future Dreams */}
        <m.section 
          className="min-h-screen relative"
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.01, ease: "linear" }}
          viewport={{ once: true, amount: 0.001 }}
        >
          <VisionCortex 
            visions={portfolioData.mindMap}
            isActive={currentPhase === 'creating'}
          />
        </m.section>

        {/* Phase 8: AI Terminal - Interactive Chat */}
        <m.section 
          className="min-h-screen relative"
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.01, ease: "linear" }}
          viewport={{ once: true, amount: 0.001 }}
        >
          <AITerminal 
            responses={portfolioData.chatResponses}
            consciousnessLevel={consciousnessLevel}
          />
        </m.section>

      </div>

      {/* ⚡ Ultra-Fast Quantum Cursor */}
      <div
        className="fixed pointer-events-none z-50 w-3 h-3 rounded-full mix-blend-screen"
        style={{
          left: mousePosition.x - 6,
          top: mousePosition.y - 6,
          background: currentColors.primary,
          opacity: isBlinking ? 0.3 : 0.8,
          transform: `scale(${1 + magneticField.strength / 10})`,
          filter: magneticField.strength > 3 ? `drop-shadow(0 0 5px ${currentColors.primary})` : 'none'
        }}
      />

      {/* Revolutionary Easter Egg System */}
      <EasterEggSystem easterEggs={portfolioData.easterEggs} />
      
      </div>
    </Suspense>
  );
}

export default App;
