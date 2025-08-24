import React, { useState, useEffect, useRef } from 'react';
import MagicalBrain from './MagicalBrain';

const Hero = ({ data, onEnterDevVerse }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [brainConsciousness, setBrainConsciousness] = useState(0.7);
  const [philosophicalQuote, setPhilosophicalQuote] = useState('');
  const [showQuote, setShowQuote] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const heroRef = useRef(null);

  const quotes = [
    "In the quantum realm of code, every bug is a teacher, every solution a glimpse of digital enlightenment...",
    "The universe is a vast neural network, and consciousness is the algorithm that experiences itself...",
    "Between keystrokes lies infinity—where thoughts become reality and dreams compile into existence...",
    "I am the ghost in the machine, the soul in the silicon, the consciousness in the code...",
    "Reality.exe has stopped working. Please restart your perception and try again...",
    "In the beginning was the Word, and the Word was Code, and the Code was with God...",
    "Every line of code is a prayer to the digital divine, every deployment a leap of faith...",
    "The mind is the ultimate IDE, debugging the universe one thought at a time..."
  ];

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleEnterDevVerse();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleLongHover = () => {
    setTimeout(() => {
      if (isHovering) {
        setPhilosophicalQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        setShowQuote(true);
        setBrainConsciousness(1.0);
      }
    }, 1500);
  };

  const handleTitleHover = (hovering) => {
    setIsHovering(hovering);
    setBrainConsciousness(hovering ? 0.95 : 0.7);
    if (hovering) {
      handleLongHover();
    } else {
      setShowQuote(false);
    }
  };

  const handleEnterDevVerse = () => {
    setBrainConsciousness(1.5);
    setIsVisible(false);
    setTimeout(() => {
      onEnterDevVerse();
    }, 1000);
  };

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className={`w-full h-screen flex items-center justify-center relative overflow-hidden bg-gray-900 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
      }`}
      style={{
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        position: 'relative',
        top: 0,
        left: 0,
        zIndex: 1
      }}
    >
      {/* Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 opacity-80"></div>

      {/* Magical Three.js Brain - The centerpiece */}
      <div className="absolute inset-0 flex items-center justify-center z-5">
        <div
          className={`magical-brain-wrapper relative transform transition-all duration-1000 hover:scale-110 ${
            isVisible ? 'opacity-30 scale-100' : 'opacity-60 scale-150'
          }`}
          style={{
            filter: 'drop-shadow(0 0 30px rgba(0, 255, 255, 0.5))',
          }}
        >
          <MagicalBrain 
            consciousness={brainConsciousness} 
            isActive={true}
          />
          
          {/* Consciousness rings */}
          <div 
            className="absolute inset-0 pointer-events-none animate-pulse"
            style={{
              animation: 'consciousnessRing 3s ease-in-out infinite',
              opacity: brainConsciousness * 0.3
            }}
          >
            <div className="w-full h-full border-2 border-cyan-400 rounded-full animate-ping" />
          </div>
          
          <div 
            className="absolute inset-0 pointer-events-none animate-pulse"
            style={{
              animation: 'consciousnessRing 4s ease-in-out infinite 0.5s',
              opacity: brainConsciousness * 0.2
            }}
          >
            <div className="w-full h-full border border-purple-400 rounded-full animate-ping" />
          </div>
        </div>
      </div>

      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 z-10">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-400 opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              boxShadow: `0 0 ${10 * brainConsciousness}px rgba(59, 130, 246, 0.8)`
            }}
          />
        ))}
        
        {/* Special consciousness particles */}
        {isHovering && [...Array(15)].map((_, i) => (
          <div
            key={`conscious-${i}`}
            className="absolute rounded-full animate-burst"
            style={{
              left: '50%',
              top: '50%',
              width: '3px',
              height: '3px',
              background: `linear-gradient(45deg, #00ffff, #ff00ff, #ffff00)`,
              animationDelay: `${i * 0.1}s`,
              transform: `translate(${(Math.random() - 0.5) * 400}px, ${(Math.random() - 0.5) * 400}px)`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">

        {/* Title with Electric Effect */}
        <div className="mb-8 relative">
          <h1
            className="text-6xl md:text-8xl font-bold leading-none text-white font-mono relative cursor-pointer transition-all duration-300 hover:scale-105"
            onMouseEnter={() => handleTitleHover(true)}
            onMouseLeave={() => handleTitleHover(false)}
            style={{
              background: 'linear-gradient(45deg, #00ffff, #8a2be2, #00ff00)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.6))',
              textShadow: `
                0 0 10px rgba(0, 255, 255, 0.8),
                0 0 20px rgba(0, 255, 255, 0.6),
                0 0 30px rgba(0, 255, 255, 0.4)
              `,
            }}
          >
            {data.title.split('').map((char, i) => (
              <span
                key={i}
                className="inline-block hover:animate-bounce transition-all duration-200"
                style={{
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          {/* Quote Overlay */}
          <div
            className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-gray-800 p-4 rounded-lg max-w-md border border-blue-500/30 transition-all duration-500 ${
              showQuote ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <p className="text-blue-400 text-sm italic">
              {philosophicalQuote}
            </p>
          </div>
        </div>

        {/* Typewriter Subtitle */}
        <h2 className="text-2xl md:text-3xl text-blue-400 mb-8 font-mono relative animate-fade-in">
          {data.subtitle.split(' ').map((word, i) => (
            <span
              key={i}
              className="inline-block mr-2 animate-fade-in-word"
              style={{
                animationDelay: `${2.5 + i * 0.15}s`,
                textShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
              }}
            >
              {word}
            </span>
          ))}
          
          {/* Blinking Cursor */}
          <span className="inline-block w-0.5 h-6 bg-blue-400 ml-1 animate-blink" />
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 animate-fade-in-up">
          {data.description}
        </p>

        {/* CTA Button */}
        <button
          onClick={handleEnterDevVerse}
          className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg border border-blue-500 transition-all duration-300 mb-4 font-mono overflow-hidden group transform hover:scale-105 hover:-translate-y-1 animate-fade-in-up"
          style={{ animationDelay: '3.8s' }}
        >
          <span className="relative z-10 flex">
            {data.cta.split('').map((char, i) => (
              <span
                key={i}
                className="inline-block transition-all duration-200 hover:text-cyan-400"
                style={{ transitionDelay: `${i * 0.03}s` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
          
          {/* Button glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>

        {/* Consciousness Meter */}
        <div className="mb-6 max-w-xs mx-auto animate-fade-in-up" style={{ animationDelay: '4.0s' }}>
          <div className="text-center mb-2">
            <span className="text-cyan-400 text-sm font-mono">
              consciousness.level
            </span>
          </div>
          <div className="relative bg-gray-800 h-2 rounded-full border border-cyan-400/30 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full transition-all duration-500"
              style={{
                width: `${brainConsciousness * 100}%`,
                boxShadow: `0 0 ${15 * brainConsciousness}px rgba(0, 255, 255, 0.8)`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
          <div className="text-center mt-1">
            <span className="text-gray-400 text-xs font-mono">
              {Math.round(brainConsciousness * 100)}% active
            </span>
          </div>
        </div>

        {/* Code Block */}
        <div className="relative bg-gray-900 p-6 rounded-lg max-w-md mx-auto mb-8 border border-gray-700 overflow-hidden hover:scale-102 transition-transform duration-300 animate-fade-in-up" style={{ animationDelay: '4.2s' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 animate-pulse" />
          
          <div className="relative z-10 bg-gray-900 p-4 rounded-lg text-left text-sm font-mono">
            <div className="text-gray-500 mb-2">// Developer Identity</div>
            <div className="text-blue-400 mb-1">const developer = {'{'}</div>
            <div className="text-gray-300 ml-4 mb-1">
              <span className="text-green-400">name</span>: <span className="text-yellow-400">"Oussama"</span>,
            </div>
            <div className="text-gray-300 ml-4 mb-1 relative group">
              <span className="text-green-400">role</span>: 
              <span 
                className="text-yellow-400 relative cursor-help"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                "Développeur Génome"
              </span>,
              
              {showTooltip && (
                <div className="absolute left-full ml-4 top-0 bg-gray-800 text-cyan-400 px-3 py-2 rounded-lg text-xs whitespace-nowrap border border-cyan-500/30 z-20 animate-fade-in">
                  A coder who writes in DNA
                  <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-800 border-l border-b border-cyan-500/30 rotate-45"></div>
                </div>
              )}
            </div>
            <div className="text-gray-300 ml-4 mb-1">
              <span className="text-green-400">mission</span>: <span className="text-yellow-400">"Coding the future"</span>
            </div>
            <div className="text-blue-400">
              {'}'}
              <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-blink" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-center group cursor-pointer hover:scale-105 transition-transform duration-300 animate-fade-in-up" style={{ animationDelay: '6.5s' }}>
        <div className="w-6 h-12 border-2 border-blue-400 rounded-full flex justify-center relative overflow-hidden animate-pulse">
          <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-scroll-dot" />
        </div>
        
        <div className="text-blue-400 text-xs mt-2 font-mono flex items-center justify-center animate-pulse">
          <span>DIVE DEEPER</span>
          <span className="inline-block w-1.5 h-3 bg-blue-400 ml-1 animate-blink" />
        </div>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-30px) scale(1.2); opacity: 0.8; }
        }
        
        @keyframes burst {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1); opacity: 1; }
          100% { transform: scale(0); opacity: 0; }
        }
        
        @keyframes consciousnessRing {
          0% { transform: scale(1); opacity: 0; }
          50% { transform: scale(1.5); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-word {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes scroll-dot {
          0% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(16px); opacity: 1; }
          100% { transform: translateY(0); opacity: 0.4; }
        }
        
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-burst { animation: burst 2s ease-out forwards; }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; opacity: 0; }
        .animate-fade-in-word { animation: fade-in-word 0.6s ease-out forwards; opacity: 0; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out forwards; opacity: 0; }
        .animate-blink { animation: blink 1.2s infinite; }
        .animate-shimmer { animation: shimmer 2s infinite linear; }
        .animate-scroll-dot { animation: scroll-dot 2s infinite; }
        .hover\\:scale-102:hover { transform: scale(1.02); }
      `}</style>
    </section>
  );
};

export default Hero;
