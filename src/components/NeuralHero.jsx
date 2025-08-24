import React, { useState, useEffect, useRef } from 'react';

const NeuralHero = ({ mousePosition }) => {
  const [bootSequence, setBootSequence] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const brainRef = useRef(null);
  
  const bootMessages = [
    "> Initializing Neural Pathways...",
    "> Loading Consciousness...",
    "> Establishing Connections...",
    "> OUSSAMA MIND - ONLINE",
    "> Neural Genesis Developer"
  ];

  // Boot sequence animation
  useEffect(() => {
    const sequence = async () => {
      for (let i = 0; i < bootMessages.length; i++) {
        await new Promise(resolve => setTimeout(resolve, i === 0 ? 500 : 800));
        setBootSequence(i);
      }
      setIsLoaded(true);
    };
    sequence();
  }, []);

  // 3D Brain rotation based on mouse position
  useEffect(() => {
    if (brainRef.current && mousePosition) {
      const rotateX = (mousePosition.y - 50) * 0.1;
      const rotateY = (mousePosition.x - 50) * 0.2;
      brainRef.current.style.transform = 
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1)`;
    }
  }, [mousePosition]);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="neural-hero">
      {/* 3D Holographic Brain */}
      <div className="brain-container">
        <div 
          ref={brainRef}
          className="holographic-brain"
        >
          {/* Brain structure made of code streams */}
          <div className="brain-hemisphere left">
            <div className="code-stream stream-1">
              <span>function consciousness() {`{`}</span>
              <span>  return neural.genesis();</span>
              <span>{`}`}</span>
            </div>
            <div className="code-stream stream-2">
              <span>const mind = new Developer({`{`}</span>
              <span>  creativity: 'infinite',</span>
              <span>  passion: 'coding'</span>
              <span>{`}`});</span>
            </div>
          </div>
          
          <div className="brain-hemisphere right">
            <div className="code-stream stream-3">
              <span>&lt;React&gt;</span>
              <span>  &lt;Innovation /&gt;</span>
              <span>  &lt;Solutions /&gt;</span>
              <span>&lt;/React&gt;</span>
            </div>
            <div className="code-stream stream-4">
              <span>neural.connect(</span>
              <span>  'frontend',</span>
              <span>  'backend',</span>
              <span>  'future'</span>
              <span>);</span>
            </div>
          </div>

          {/* Neural connections between hemispheres */}
          <div className="neural-bridge">
            <div className="connection-line line-1"></div>
            <div className="connection-line line-2"></div>
            <div className="connection-line line-3"></div>
          </div>

          {/* Central consciousness core */}
          <div className="consciousness-core">
            <div className="core-pulse"></div>
          </div>
        </div>
      </div>

      {/* Boot sequence terminal */}
      <div className="neural-terminal">
        {bootMessages.slice(0, bootSequence + 1).map((message, index) => (
          <div 
            key={index} 
            className={`terminal-line ${index === bootSequence ? 'typing' : 'complete'}`}
          >
            {message}
            {index === bootSequence && <span className="cursor">_</span>}
          </div>
        ))}
      </div>

      {/* Main content - appears after boot sequence */}
      <div className={`hero-content ${isLoaded ? 'loaded' : ''}`}>
        <h1 className="neural-title">
          <span className="title-primary">NEURAL</span>
          <span className="title-secondary">GENESIS</span>
        </h1>
        
        <p className="neural-subtitle">
          Bridging Human Creativity with Digital Intelligence
        </p>

        <div className="neural-cta">
          <button 
            className="cta-primary"
            onClick={() => scrollToSection('journey')}
          >
            <span className="cta-icon">🧠</span>
            Explore Neural Network
          </button>
          
          <button 
            className="cta-secondary"
            onClick={() => scrollToSection('contact')}
          >
            <span className="cta-icon">⚡</span>
            Connect Consciousness
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="neural-scroll-hint">
          <div className="scroll-pulse"></div>
          <span>Dive Deeper</span>
        </div>
      </div>

      <style jsx>{`
        .neural-hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 2rem;
          text-align: center;
        }

        /* 3D Holographic Brain */
        .brain-container {
          perspective: 1000px;
          margin-bottom: 2rem;
        }

        .holographic-brain {
          width: 300px;
          height: 200px;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
          animation: brainFloat 6s ease-in-out infinite;
        }

        @keyframes brainFloat {
          0%, 100% { transform: translateY(0px) rotateY(0deg); }
          50% { transform: translateY(-20px) rotateY(180deg); }
        }

        .brain-hemisphere {
          position: absolute;
          width: 140px;
          height: 180px;
          border-radius: 70px 70px 70px 70px;
          background: linear-gradient(135deg, 
            rgba(102, 126, 234, 0.1) 0%, 
            rgba(118, 75, 162, 0.15) 100%);
          border: 1px solid rgba(102, 126, 234, 0.3);
          backdrop-filter: blur(10px);
        }

        .brain-hemisphere.left {
          left: 0;
          transform: rotateY(-15deg);
        }

        .brain-hemisphere.right {
          right: 0;
          transform: rotateY(15deg);
        }

        .code-stream {
          position: absolute;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          color: var(--neural-blue);
          opacity: 0.8;
          line-height: 1.2;
          animation: codeFlow 8s ease-in-out infinite;
        }

        .stream-1 { top: 20px; left: 10px; animation-delay: 0s; }
        .stream-2 { top: 80px; left: 15px; animation-delay: 2s; }
        .stream-3 { top: 30px; right: 10px; animation-delay: 1s; }
        .stream-4 { top: 90px; right: 15px; animation-delay: 3s; }

        @keyframes codeFlow {
          0%, 100% { opacity: 0.8; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-5px); }
        }

        /* Neural connections */
        .neural-bridge {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 2px;
        }

        .connection-line {
          position: absolute;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, 
            transparent, 
            var(--synapse-gold), 
            transparent);
          animation: neuralPulse 3s ease-in-out infinite;
        }

        .line-1 { top: -5px; animation-delay: 0s; }
        .line-2 { top: 0px; animation-delay: 1s; }
        .line-3 { top: 5px; animation-delay: 2s; }

        @keyframes neuralPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; box-shadow: 0 0 10px var(--synapse-gold); }
        }

        /* Consciousness core */
        .consciousness-core {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
        }

        .core-pulse {
          width: 100%;
          height: 100%;
          background: var(--synapse-gold);
          border-radius: 50%;
          animation: corePulse 2s ease-in-out infinite;
        }

        @keyframes corePulse {
          0%, 100% { 
            transform: scale(1); 
            box-shadow: 0 0 10px var(--synapse-gold);
          }
          50% { 
            transform: scale(1.5); 
            box-shadow: 0 0 20px var(--synapse-gold);
          }
        }

        /* Terminal boot sequence */
        .neural-terminal {
          background: rgba(0, 0, 0, 0.9);
          border: 1px solid var(--neural-blue);
          border-radius: 8px;
          padding: 1.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          color: var(--neural-blue);
          margin-bottom: 3rem;
          min-height: 120px;
          backdrop-filter: blur(10px);
        }

        .terminal-line {
          margin-bottom: 0.5rem;
          opacity: 0;
          animation: fadeInTyping 0.3s ease-out forwards;
        }

        .terminal-line.typing {
          position: relative;
        }

        .cursor {
          animation: blink 1s infinite;
          color: var(--synapse-gold);
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @keyframes fadeInTyping {
          to { opacity: 1; }
        }

        /* Hero content */
        .hero-content {
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s ease-out 0.5s;
        }

        .hero-content.loaded {
          opacity: 1;
          transform: translateY(0);
        }

        .neural-title {
          font-size: clamp(2.5rem, 8vw, 4rem);
          font-weight: 700;
          margin-bottom: 1rem;
          line-height: 1.1;
        }

        .title-primary {
          background: var(--neural-blue);
          background: linear-gradient(135deg, var(--neural-blue), var(--consciousness-purple));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .title-secondary {
          background: var(--synapse-gold);
          background: linear-gradient(135deg, var(--synapse-gold), var(--neural-blue));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .neural-subtitle {
          font-size: 1.3rem;
          color: var(--thought-gray);
          margin-bottom: 3rem;
          opacity: 0.9;
        }

        .neural-cta {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          margin-bottom: 4rem;
          flex-wrap: wrap;
        }

        .cta-primary,
        .cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          font-weight: 600;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .cta-primary {
          background: linear-gradient(135deg, var(--neural-blue), var(--consciousness-purple));
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .cta-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: var(--neural-blue);
          border: 2px solid var(--neural-blue);
          backdrop-filter: blur(10px);
        }

        .cta-secondary:hover {
          background: rgba(102, 126, 234, 0.1);
          transform: translateY(-3px);
        }

        .cta-icon {
          font-size: 1.2rem;
        }

        /* Scroll hint */
        .neural-scroll-hint {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: var(--neural-blue);
          opacity: 0.7;
        }

        .scroll-pulse {
          width: 2px;
          height: 30px;
          background: linear-gradient(to bottom, 
            transparent, 
            var(--neural-blue), 
            transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }

        @keyframes scrollPulse {
          0%, 100% { transform: scaleY(1); opacity: 0.7; }
          50% { transform: scaleY(1.5); opacity: 1; }
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .neural-hero {
            padding: 1rem;
          }

          .holographic-brain {
            width: 250px;
            height: 160px;
          }

          .neural-cta {
            flex-direction: column;
            align-items: center;
          }

          .cta-primary,
          .cta-secondary {
            width: 100%;
            max-width: 280px;
            justify-content: center;
          }

          .neural-terminal {
            padding: 1rem;
            font-size: 0.8rem;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .holographic-brain,
          .core-pulse,
          .scroll-pulse {
            animation: none !important;
          }
          
          .hero-content.loaded {
            transition: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

export default NeuralHero;
