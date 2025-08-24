import React, { useState, useEffect } from 'react';

const BeautifulHero = ({ mousePosition }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  
  const extraordinaryWords = [
    'Developer',
    'Creator',
    'Innovator',
    'Dreamer',
    'Builder'
  ];

  useEffect(() => {
    // Gentle reveal animation
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Eye-friendly word rotation
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % extraordinaryWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`beautiful-hero ${isVisible ? 'hero-visible' : ''}`}>
      {/* Gentle floating elements */}
      <div 
        className="hero-background-elements"
        style={{
          '--mouse-x': `${mousePosition.x}%`,
          '--mouse-y': `${mousePosition.y}%`
        }}
      >
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
      </div>

      {/* Main content */}
      <div className="hero-content">
        <div className="hero-greeting">
          <span className="greeting-emoji">👋</span>
          <span className="greeting-text">Hello, I'm</span>
        </div>

        <h1 className="hero-name">
          <span className="name-first">Oussama</span>
          <span className="name-last">Mind</span>
        </h1>

        <div className="hero-role">
          <span className="role-prefix">Full-Stack </span>
          <span className="role-dynamic">
            {extraordinaryWords[currentWord]}
          </span>
        </div>

        <p className="hero-description">
          Crafting extraordinary digital experiences with modern web technologies.
          <br />
          Passionate about creating beautiful, functional, and user-friendly applications.
        </p>

        {/* Eye-friendly call-to-action buttons */}
        <div className="hero-actions">
          <a 
            href="#projects" 
            className="cta-button cta-primary"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
          >
            <span className="cta-icon">🚀</span>
            View My Work
          </a>
          
          <a 
            href="#contact" 
            className="cta-button cta-secondary"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
          >
            <span className="cta-icon">💬</span>
            Let's Talk
          </a>
        </div>

        {/* Gentle scroll indicator */}
        <div className="scroll-hint">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span className="scroll-text">Scroll to explore</span>
        </div>
      </div>

      <style jsx>{`
        .beautiful-hero {
          width: 100%;
          max-width: 900px;
          text-align: center;
          position: relative;
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .hero-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Gentle background elements */
        .hero-background-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .floating-circle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.08;
          filter: blur(2px);
          animation: gentleFloat 15s infinite ease-in-out;
        }

        .circle-1 {
          width: 120px;
          height: 120px;
          background: var(--magic-gradient);
          top: 10%;
          left: calc(var(--mouse-x) * 0.1% + 10%);
          animation-delay: 0s;
        }

        .circle-2 {
          width: 80px;
          height: 80px;
          background: var(--sunset-magic);
          top: 60%;
          right: calc(var(--mouse-y) * 0.08% + 15%);
          animation-delay: -5s;
        }

        .circle-3 {
          width: 100px;
          height: 100px;
          background: var(--ocean-dream);
          bottom: 20%;
          left: calc(var(--mouse-x) * 0.05% + 20%);
          animation-delay: -10s;
        }

        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }

        /* Hero content */
        .hero-content {
          position: relative;
          z-index: 2;
          padding: 2rem;
        }

        .hero-greeting {
          font-size: 1.2rem;
          color: var(--gentle-text);
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 0.2s forwards;
        }

        .greeting-emoji {
          font-size: 1.5rem;
          animation: wave 2s infinite;
        }

        @keyframes wave {
          0%, 50%, 100% { transform: rotate(0deg); }
          10%, 30% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          40% { transform: rotate(-4deg); }
        }

        .hero-name {
          font-family: var(--display-font);
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 1rem;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 0.4s forwards;
        }

        .name-first {
          background: var(--magic-gradient);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .name-last {
          background: var(--sunset-magic);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-role {
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--gentle-text);
          margin-bottom: 2rem;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 0.6s forwards;
        }

        .role-dynamic {
          background: var(--aurora-lights);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: all 0.5s ease;
          position: relative;
        }

        .hero-description {
          font-size: 1.2rem;
          line-height: 1.8;
          color: var(--gentle-text);
          max-width: 600px;
          margin: 0 auto 3rem;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 0.8s forwards;
        }

        .hero-actions {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 4rem;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 1s forwards;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 50px;
          transition: var(--magic-bounce);
          position: relative;
          overflow: hidden;
          border: none;
          cursor: pointer;
        }

        .cta-primary {
          background: var(--magic-gradient);
          color: white;
          box-shadow: var(--gentle-lift);
        }

        .cta-secondary {
          background: rgba(255, 255, 255, 0.9);
          color: var(--comfort-text);
          border: 2px solid rgba(102, 126, 234, 0.2);
          backdrop-filter: blur(10px);
        }

        .cta-button:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: var(--magical-glow);
        }

        .cta-button:active {
          transform: translateY(-1px) scale(1.02);
        }

        .cta-icon {
          font-size: 1.2rem;
          transition: transform 0.3s ease;
        }

        .cta-button:hover .cta-icon {
          transform: scale(1.2);
        }

        /* Gentle scroll hint */
        .scroll-hint {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: var(--soft-accent);
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 1.2s forwards;
        }

        .scroll-mouse {
          width: 24px;
          height: 40px;
          border: 2px solid var(--soft-accent);
          border-radius: 12px;
          position: relative;
          opacity: 0.6;
        }

        .scroll-wheel {
          width: 2px;
          height: 6px;
          background: var(--soft-accent);
          border-radius: 1px;
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          animation: scrollAnimation 2s infinite;
        }

        @keyframes scrollAnimation {
          0% { top: 6px; opacity: 1; }
          100% { top: 24px; opacity: 0; }
        }

        .scroll-text {
          font-size: 0.9rem;
          opacity: 0.7;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .hero-actions {
            flex-direction: column;
            align-items: center;
          }

          .cta-button {
            width: 100%;
            max-width: 280px;
            justify-content: center;
          }

          .hero-greeting {
            font-size: 1.1rem;
          }

          .hero-role {
            font-size: 1.5rem;
          }

          .hero-description {
            font-size: 1.1rem;
            padding: 0 1rem;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .beautiful-hero,
          .floating-circle,
          .scroll-wheel,
          .greeting-emoji {
            animation: none !important;
          }
          
          .hero-visible {
            opacity: 1;
            transform: none;
          }
          
          .hero-content > * {
            opacity: 1 !important;
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BeautifulHero;