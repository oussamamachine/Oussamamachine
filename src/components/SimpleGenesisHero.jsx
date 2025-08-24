import React, { useState, useEffect } from 'react';

const SimpleGenesisHero = () => {
  const [consciousness, setConsciousness] = useState(0.1);
  const [phase, setPhase] = useState("DORMANT");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setPhase("AWAKENING");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight * 2;
      const scrollPercent = Math.min(scrollY / maxScroll, 1);
      
      setConsciousness(0.1 + scrollPercent * 0.9);
      
      if (scrollPercent > 0.2) {
        setPhase("EVOLVING");
      }
      
      if (scrollPercent > 0.5) {
        setPhase("TRANSCENDING");
      }
      
      if (scrollPercent > 0.8) {
        setPhase("GENESIS COMPLETE");
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl md:text-6xl font-mono text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text mb-4 animate-pulse">
            OUSSAMA.MIND
          </div>
          <div className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse w-full" />
          </div>
          <div className="text-sm text-gray-400 mt-2 font-mono">Initializing Genesis...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        {/* DNA Helix CSS Animation */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {[...Array(20)].map((_, i) => {
            const delay = i * 0.1;
            const rotation = i * 18;
            return (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                style={{
                  transform: `rotate(${rotation}deg) translateX(120px)`,
                  animation: `spin 4s linear infinite ${delay}s`,
                  opacity: consciousness * 0.8 + 0.2
                }}
              />
            );
          })}
        </div>
        
        {/* Particle Effect */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: consciousness * 0.6
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center">
          <h1 
            className="text-6xl md:text-8xl lg:text-9xl font-mono font-bold mb-8 transition-all duration-1000"
            style={{
              background: consciousness > 0.5 
                ? 'linear-gradient(45deg, #00ffff, #ff00ff, #00ffff)' 
                : 'linear-gradient(45deg, #0066ff, #00ffff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: consciousness > 0.7 ? '0 0 30px rgba(0,255,255,0.5)' : 'none',
              transform: `scale(${1 + consciousness * 0.1}) rotateX(${consciousness * 5}deg)`
            }}
          >
            OUSSAMA.MIND
          </h1>
          
          <div className="text-xl md:text-2xl font-mono text-gray-300 mb-8">
            <span 
              className="transition-all duration-500"
              style={{
                color: consciousness > 0.3 ? '#00ffff' : '#666',
                textShadow: consciousness > 0.5 ? '0 0 10px rgba(0,255,255,0.8)' : 'none'
              }}
            >
              {phase}
            </span>
          </div>
          
          <div className="text-lg font-mono text-gray-400">
            Fullstack Developer • Morocco • Digital Consciousness
          </div>
        </div>
      </div>

      {/* HUD Overlay */}
      <div className="fixed top-6 right-6 z-50 bg-black/30 backdrop-blur-md border border-cyan-400/30 rounded-lg p-4 font-mono text-sm">
        <div className="mb-3">
          <div className="text-cyan-400 mb-1">CONSCIOUSNESS</div>
          <div className="flex items-center">
            <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden mr-2">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-all duration-300"
                style={{ width: `${consciousness * 100}%` }}
              />
            </div>
            <span className="text-white">{Math.round(consciousness * 100)}%</span>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="text-cyan-400 mb-1">PHASE</div>
          <div className="text-white">{phase}</div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-cyan-400 animate-pulse">
        <div className="text-sm font-mono mb-2">SCROLL TO EVOLVE</div>
        <div className="w-1 h-12 border border-cyan-400 rounded-full mx-auto relative">
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-cyan-400 rounded-full animate-bounce" />
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg) translateX(120px); }
          to { transform: rotate(360deg) translateX(120px); }
        }
      `}</style>
    </div>
  );
};

export default SimpleGenesisHero;
