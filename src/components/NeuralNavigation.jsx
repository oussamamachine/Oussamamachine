import React from 'react';

const NeuralNavigation = ({ currentSection }) => {
  const navItems = [
    { id: 'home', label: 'Genesis', icon: '🧠' },
    { id: 'journey', label: 'Journey', icon: '🛤️' },
    { id: 'projects', label: 'Creations', icon: '🎭' },
    { id: 'about', label: 'Consciousness', icon: '👤' },
    { id: 'contact', label: 'Connect', icon: '⚡' }
  ];

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <nav className="neural-navigation">
      <div className="nav-container">
        {/* Neural logo */}
        <div 
          className="neural-logo"
          onClick={() => scrollToSection('home')}
        >
          <div className="logo-brain">
            <div className="brain-node"></div>
            <div className="brain-connections">
              <div className="connection"></div>
              <div className="connection"></div>
            </div>
          </div>
          <span className="logo-text">NEURAL GENESIS</span>
        </div>

        {/* Navigation links */}
        <ul className="nav-links">
          {navItems.map(item => (
            <li key={item.id}>
              <button
                className={`nav-link ${currentSection === item.id ? 'active' : ''}`}
                onClick={() => scrollToSection(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                <div className="neural-underline"></div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .neural-navigation {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(253, 253, 248, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(102, 126, 234, 0.1);
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        /* Neural Logo */
        .neural-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .neural-logo:hover {
          transform: scale(1.05);
        }

        .logo-brain {
          position: relative;
          width: 32px;
          height: 24px;
        }

        .brain-node {
          width: 8px;
          height: 8px;
          background: var(--neural-blue);
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: nodePulse 2s ease-in-out infinite;
        }

        .brain-connections {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .connection {
          position: absolute;
          height: 1px;
          background: linear-gradient(90deg, 
            var(--neural-blue), 
            var(--consciousness-purple), 
            var(--synapse-gold));
          animation: connectionFlow 3s ease-in-out infinite;
        }

        .connection:nth-child(1) {
          top: 6px;
          left: 4px;
          width: 24px;
          transform: rotate(15deg);
          animation-delay: 0s;
        }

        .connection:nth-child(2) {
          bottom: 6px;
          left: 4px;
          width: 24px;
          transform: rotate(-15deg);
          animation-delay: 1s;
        }

        @keyframes nodePulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 0 0 5px var(--neural-blue);
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.2);
            box-shadow: 0 0 10px var(--neural-blue);
          }
        }

        @keyframes connectionFlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; box-shadow: 0 0 3px currentColor; }
        }

        .logo-text {
          font-size: 1.2rem;
          font-weight: 700;
          background: linear-gradient(135deg, 
            var(--neural-blue), 
            var(--consciousness-purple));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 0.5px;
        }

        /* Navigation Links */
        .nav-links {
          display: flex;
          list-style: none;
          gap: 2rem;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--thought-gray);
          transition: all 0.3s ease;
          border-radius: 25px;
        }

        .nav-link:hover,
        .nav-link.active {
          color: var(--neural-blue);
          transform: translateY(-2px);
        }

        .nav-link.active .neural-underline {
          width: 100%;
        }

        .nav-icon {
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .nav-link:hover .nav-icon {
          transform: scale(1.2);
        }

        .neural-underline {
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, 
            var(--neural-blue), 
            var(--synapse-gold));
          transition: width 0.3s ease;
          border-radius: 1px;
        }

        .nav-link:hover .neural-underline {
          width: 80%;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .nav-container {
            padding: 1rem;
          }

          .nav-links {
            display: none;
          }

          .logo-text {
            font-size: 1rem;
          }

          .neural-logo {
            gap: 0.5rem;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .brain-node,
          .connection {
            animation: none !important;
          }
          
          .neural-logo:hover,
          .nav-link:hover {
            transform: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default NeuralNavigation;
