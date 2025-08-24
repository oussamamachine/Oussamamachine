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
  const [consciousnessLevel, setConsciousnessLevel] = useState(45);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [emotionalState, setEmotionalState] = useState('calm');
  const [interactionCount, setInteractionCount] = useState(0);
  const lastUpdateTime = useRef(0);

  // Color schemes for emotional states
  const colorSchemes = {
    calm: { bg: 'from-blue-900/20 to-purple-900/20', accent: 'cyan-400', glow: 'cyan' },
    excited: { bg: 'from-pink-900/20 to-red-900/20', accent: 'pink-400', glow: 'pink' },
    focused: { bg: 'from-green-900/20 to-teal-900/20', accent: 'emerald-400', glow: 'emerald' },
    creative: { bg: 'from-purple-900/20 to-indigo-900/20', accent: 'purple-400', glow: 'purple' },
    transcendent: { bg: 'from-yellow-900/20 to-orange-900/20', accent: 'amber-400', glow: 'amber' }
  };

  const currentColors = colorSchemes[emotionalState] || colorSchemes.calm;

  // ⚡ Ultra-fast scroll handler with RAF throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
          const phaseIndex = Math.floor(scrollPercent * 5);
          const phases = ['awakening', 'conscious', 'exploring', 'creating', 'transcendent'];
          const emotions = ['calm', 'excited', 'focused', 'creative', 'transcendent'];
          
          if (phases[phaseIndex] && phases[phaseIndex] !== currentPhase) {
            setCurrentPhase(phases[phaseIndex]);
            setEmotionalState(emotions[phaseIndex] || 'calm');
            setConsciousnessLevel(45 + scrollPercent * 50);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPhase]);

  // 🔮 Optimized mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastUpdateTime.current > 16) { // 60fps throttle
        setMousePosition({ x: e.clientX, y: e.clientY });
        setInteractionCount(prev => prev + 1);
        lastUpdateTime.current = now;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 🧠 Consciousness blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 200);
      }
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-cyan-400 text-2xl animate-pulse font-mono">
          🧠 Initializing Neural Network...
        </div>
      </div>
    }>
      <div 
        className={`min-h-screen bg-gradient-to-br ${currentColors.bg} text-white overflow-x-hidden`}
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.05) 0%, transparent 50%)`
        }}
      >
        {/* 🌟 REVOLUTIONARY HERO SECTION */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-10">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(${currentColors.accent === 'cyan-400' ? '34, 211, 238' : '168, 85, 247'}, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(${currentColors.accent === 'cyan-400' ? '34, 211, 238' : '168, 85, 247'}, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
              }}
            />
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center px-4">
            {/* Central Identity */}
            <h1 
              className={`text-6xl md:text-8xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-${currentColors.accent} via-purple-400 to-pink-400`}
              style={{
                textShadow: `0 0 30px rgba(${currentColors.glow === 'cyan' ? '34, 211, 238' : '168, 85, 247'}, 0.5)`,
                transform: `scale(${1 + consciousnessLevel * 0.005}) ${isBlinking ? 'rotate(0.5deg)' : 'rotate(0deg)'}`,
                filter: isBlinking ? 'brightness(1.5) blur(1px)' : 'brightness(1)',
                transition: 'all 0.3s ease'
              }}
            >
              OUSSAMA.MIND
            </h1>

            {/* Consciousness Stats */}
            <div className={`text-xl text-${currentColors.accent} mb-8 font-mono`}>
              <div className="opacity-80">
                🧠 Consciousness: {Math.round(consciousnessLevel)}%
              </div>
              <div className="opacity-60">
                🌌 Phase: {currentPhase.toUpperCase()}
              </div>
              <div className="opacity-60">
                💫 State: {emotionalState.toUpperCase()}
              </div>
            </div>

            {/* Interactive Orb */}
            <div 
              className="mx-auto w-32 h-32 rounded-full border-2 border-cyan-400/30 relative"
              style={{
                background: `radial-gradient(circle, rgba(${currentColors.glow === 'cyan' ? '34, 211, 238' : '168, 85, 247'}, ${isBlinking ? 0.3 : 0.1}) 0%, transparent 70%)`,
                boxShadow: `0 0 ${20 + consciousnessLevel}px rgba(${currentColors.glow === 'cyan' ? '34, 211, 238' : '168, 85, 247'}, 0.4)`,
                transform: `scale(${1 + consciousnessLevel * 0.01})`,
                animation: isBlinking ? 'pulse 0.5s ease-in-out' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              <div className="absolute inset-0 rounded-full animate-spin-slow border border-purple-400/20" />
              <div className="absolute inset-2 rounded-full animate-ping border border-cyan-400/30" />
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-gray-400 animate-bounce">
              <div className="text-sm mb-2">Scroll to explore</div>
              <div className="w-6 h-10 border-2 border-gray-400/30 rounded-full mx-auto relative">
                <div className="w-1 h-3 bg-cyan-400 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Cursor Follow Effect */}
          <div
            className="absolute pointer-events-none rounded-full border border-cyan-400/20"
            style={{
              left: `${mousePosition.x - 25}px`,
              top: `${mousePosition.y - 25}px`,
              width: '50px',
              height: '50px',
              background: `radial-gradient(circle, rgba(34, 211, 238, 0.05) 0%, transparent 70%)`,
              transition: 'all 0.1s ease'
            }}
          />
        </section>

        {/* 🔥 OPTIMIZED COMPONENT SECTIONS */}
        <section className="py-20">
          <NeuralGenesis data={portfolioData} />
        </section>

        <section className="py-20">
          <CodeDNA data={portfolioData} />
        </section>

        <section className="py-20">
          <DNASkillVisualizer skills={portfolioData.skills} />
        </section>

        <section className="py-20">
          <GeneticProjects projects={portfolioData.projects} />
        </section>

        <section className="py-20">
          <FailureRoom failures={portfolioData.failures} />
        </section>

        <section className="py-20">
          <VisionCortex vision={portfolioData.vision} />
        </section>

        <section className="py-20">
          <AITerminal data={portfolioData} />
        </section>

        {/* Easter Egg System */}
        <EasterEggSystem easterEggs={portfolioData.easterEggs} />

        {/* Performance Debug Info */}
        {interactionCount > 50 && (
          <div className="fixed bottom-4 right-4 text-xs text-gray-500 font-mono bg-black/50 p-2 rounded">
            🚀 Interactions: {interactionCount} | FPS: 60+ | Mode: Optimized
          </div>
        )}
      </div>
    </Suspense>
  );
}

export default App;
