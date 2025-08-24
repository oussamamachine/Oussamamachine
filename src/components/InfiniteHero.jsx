import React, { useState, useEffect, useRef } from 'react';

const InfiniteHero = ({ userPersonality, adaptiveTheme, onDimensionShift, realTimeStats }) => {
  const [heroPhase, setHeroPhase] = useState('awakening');
  const [personalizedGreeting, setPersonalizedGreeting] = useState('');
  const canvasRef = useRef(null);

  // 🎭 PERSONALITY-BASED GREETINGS
  useEffect(() => {
    const greetings = {
      'deep-researcher': 'Welcome, Deep Thinker. Your analytical mind intrigues the AI.',
      'creative-enthusiast': 'Greetings, Creative Soul. Your artistic energy illuminates the void.',
      'quick-professional': 'Hello, Efficient Explorer. Your focused approach is admirable.',
      'tech-explorer': 'Hey there, Tech Pioneer. Ready to push the boundaries?',
      'explorer': 'Welcome, Curious Mind. Let\'s explore infinite possibilities.'
    };

    setPersonalizedGreeting(greetings[userPersonality] || greetings.explorer);
  }, [userPersonality]);

  // 🌀 3D PARTICLE SYSTEM
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    
    // Responsive canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system based on user personality
    const particleCount = userPersonality === 'creative-enthusiast' ? 200 : 
                         userPersonality === 'tech-explorer' ? 150 : 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        vz: Math.random() * 5 + 1,
        size: Math.random() * 3 + 1,
        opacity: Math.random()
      });
    }

    const animate = () => {
      ctx.fillStyle = `rgba(0, 0, 0, ${adaptiveTheme === 'minimal-focus' ? 0.1 : 0.05})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        // Move particles
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z -= particle.vz;

        // Reset when particle goes too far
        if (particle.z <= 0) {
          particle.z = 1000;
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
        }

        // Calculate 3D projection
        const scale = 200 / particle.z;
        const x2d = particle.x * scale;
        const y2d = particle.y * scale;

        if (x2d >= 0 && x2d <= canvas.width && y2d >= 0 && y2d <= canvas.height) {
          const size = particle.size * scale;
          const opacity = Math.min(particle.opacity * (200 / particle.z), 1);

          // Theme-based colors
          const colors = {
            'neural-deep': `rgba(0, 255, 255, ${opacity})`,
            'artistic-flow': `rgba(255, 0, 255, ${opacity})`,
            'minimal-focus': `rgba(255, 255, 255, ${opacity})`,
            'quantum-tech': `rgba(0, 255, 0, ${opacity})`,
            'cosmic': `rgba(100, 150, 255, ${opacity})`
          };

          ctx.fillStyle = colors[adaptiveTheme] || colors.cosmic;
          ctx.beginPath();
          ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
          ctx.fill();

          // Connect nearby particles
          particles.forEach(otherParticle => {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) + 
              Math.pow(particle.y - otherParticle.y, 2)
            );

            if (distance < 100) {
              const otherScale = 200 / otherParticle.z;
              const otherX2d = otherParticle.x * otherScale;
              const otherY2d = otherParticle.y * otherScale;

              ctx.strokeStyle = colors[adaptiveTheme]?.replace(opacity, opacity * 0.3) || 
                               `rgba(100, 150, 255, ${opacity * 0.3})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(x2d, y2d);
              ctx.lineTo(otherX2d, otherY2d);
              ctx.stroke();
            }
          });
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [adaptiveTheme, userPersonality]);

  // 🎯 DIMENSION SHIFT BUTTONS
  const dimensions = [
    { id: 'timeline', label: 'Neural Timeline', icon: '⚡', description: 'Journey through my evolution' },
    { id: 'projects', label: 'Quantum Projects', icon: '🚀', description: 'Explore intelligent creations' },
    { id: 'core', label: 'Consciousness Core', icon: '🧠', description: 'Discover the essence' },
    { id: 'contact', label: 'Quantum Contact', icon: '🌐', description: 'Connect across dimensions' }
  ];

  return (
    <section className="infinite-hero">
      <canvas ref={canvasRef} className="hero-canvas" />
      
      <div className="hero-content">
        {/* 🎭 MAIN TITLE WITH TYPEWRITER EFFECT */}
        <div className="hero-title">
          <h1 className="title-main">
            <span className="title-word">OUSSAMA</span>
            <span className="title-word">BOUCHIKHI</span>
          </h1>
          <div className="title-subtitle">
            <span className="subtitle-text">Full Stack Developer</span>
            <span className="subtitle-divider">|</span>
            <span className="subtitle-text">AI Enthusiast</span>
            <span className="subtitle-divider">|</span>
            <span className="subtitle-text">Digital Architect</span>
          </div>
        </div>

        {/* 🤖 PERSONALIZED GREETING */}
        <div className="hero-greeting">
          <div className="greeting-text">{personalizedGreeting}</div>
          <div className="personality-badge">
            <span className="badge-label">Detected:</span>
            <span className="badge-value">{userPersonality}</span>
          </div>
        </div>

        {/* 📊 REAL-TIME STATS */}
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-value">{Math.floor(realTimeStats.timeSpent)}s</span>
            <span className="stat-label">Time Exploring</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{Math.floor(realTimeStats.scrollDistance / 100)}</span>
            <span className="stat-label">Scroll Units</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{realTimeStats.clicksCount}</span>
            <span className="stat-label">Interactions</span>
          </div>
        </div>

        {/* 🎯 DIMENSION NAVIGATION */}
        <div className="dimension-grid">
          {dimensions.map(dimension => (
            <button
              key={dimension.id}
              className="dimension-card"
              onClick={() => onDimensionShift(dimension.id)}
              data-dimension={dimension.id}
            >
              <div className="card-icon">{dimension.icon}</div>
              <div className="card-label">{dimension.label}</div>
              <div className="card-description">{dimension.description}</div>
              <div className="card-portal"></div>
            </button>
          ))}
        </div>

        {/* 🌟 SCROLL INDICATOR */}
        <div className="scroll-indicator">
          <div className="scroll-text">Scroll to explore dimensions</div>
          <div className="scroll-arrow">↓</div>
        </div>
      </div>
    </section>
  );
};

export default InfiniteHero;
