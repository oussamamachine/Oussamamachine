import React, { useState, useEffect } from 'react';

const QuantumNavigation = ({ 
  currentDimension, 
  onNavigate, 
  consciousnessLevel, 
  userPersonality, 
  adaptiveTheme 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [pulseIntensity, setPulseIntensity] = useState(1);

  // 🌟 CONSCIOUSNESS-BASED PULSE EFFECT
  useEffect(() => {
    setPulseIntensity(1 + (consciousnessLevel / 100));
  }, [consciousnessLevel]);

  // 🎯 NAVIGATION DIMENSIONS
  const dimensions = [
    { 
      id: 'entry', 
      label: 'Genesis', 
      icon: '🌌', 
      color: '#00ffff',
      description: 'The beginning of everything'
    },
    { 
      id: 'timeline', 
      label: 'Evolution', 
      icon: '⚡', 
      color: '#ff6b6b',
      description: 'Journey through time'
    },
    { 
      id: 'projects', 
      label: 'Creations', 
      icon: '🚀', 
      color: '#4ecdc4',
      description: 'Digital manifestations'
    },
    { 
      id: 'core', 
      label: 'Essence', 
      icon: '🧠', 
      color: '#45b7d1',
      description: 'The consciousness core'
    },
    { 
      id: 'contact', 
      label: 'Connection', 
      icon: '🌐', 
      color: '#96ceb4',
      description: 'Quantum entanglement'
    }
  ];

  const currentDimensionData = dimensions.find(d => d.id === currentDimension);

  return (
    <>
      {/* 🧭 MAIN NAVIGATION HUD */}
      <nav className={`quantum-navigation ${isExpanded ? 'expanded' : ''}`}>
        
        {/* 🎯 CONSCIOUSNESS INDICATOR */}
        <div className="consciousness-indicator">
          <div 
            className="consciousness-orb"
            style={{
              '--pulse-intensity': pulseIntensity,
              '--consciousness-color': currentDimensionData?.color || '#00ffff'
            }}
          >
            <div className="orb-core"></div>
            <div className="orb-rings">
              <div className="ring ring-1"></div>
              <div className="ring ring-2"></div>
              <div className="ring ring-3"></div>
            </div>
            <div className="consciousness-level">{Math.floor(consciousnessLevel)}%</div>
          </div>
        </div>

        {/* 🌟 LOGO & BRAND */}
        <div className="nav-brand">
          <div className="brand-logo">
            <span className="logo-text">OB</span>
            <div className="logo-particles">
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
            </div>
          </div>
          <div className="brand-title">
            <span className="title-line-1">OUSSAMA</span>
            <span className="title-line-2">BOUCHIKHI</span>
          </div>
        </div>

        {/* 🎭 PERSONALITY STATUS */}
        <div className="personality-status">
          <div className="status-label">AI Analysis</div>
          <div className={`status-value status-${userPersonality}`}>
            {userPersonality.replace('-', ' ').toUpperCase()}
          </div>
          <div className="status-bar">
            <div 
              className="status-fill"
              style={{ 
                width: `${Math.min(consciousnessLevel + 20, 100)}%`,
                backgroundColor: currentDimensionData?.color 
              }}
            ></div>
          </div>
        </div>

        {/* 🌀 QUANTUM MENU TOGGLE */}
        <button 
          className="quantum-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label="Toggle Navigation"
        >
          <div className="toggle-icon">
            <span className="line line-1"></span>
            <span className="line line-2"></span>
            <span className="line line-3"></span>
          </div>
          <div className="toggle-energy"></div>
        </button>

        {/* 🎯 DIMENSION MENU */}
        <div className="dimension-menu">
          {dimensions.map((dimension, index) => (
            <button
              key={dimension.id}
              className={`dimension-button ${currentDimension === dimension.id ? 'active' : ''}`}
              onClick={() => onNavigate(dimension.id)}
              style={{
                '--dimension-color': dimension.color,
                '--animation-delay': `${index * 0.1}s`
              }}
            >
              <div className="button-background"></div>
              <div className="button-icon">{dimension.icon}</div>
              <div className="button-content">
                <span className="button-label">{dimension.label}</span>
                <span className="button-description">{dimension.description}</span>
              </div>
              <div className="button-portal">
                <div className="portal-ring"></div>
                <div className="portal-core"></div>
              </div>
              {currentDimension === dimension.id && (
                <div className="active-indicator">
                  <div className="indicator-pulse"></div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* 🌐 QUANTUM FIELD BACKGROUND */}
        <div className="quantum-field">
          <div className="field-lines">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="field-line"
                style={{
                  '--line-delay': `${i * 0.2}s`,
                  '--line-color': currentDimensionData?.color
                }}
              ></div>
            ))}
          </div>
        </div>
      </nav>

      {/* 🎮 FLOATING ACTION PANEL */}
      <div className="floating-actions">
        
        {/* 🧠 CONSCIOUSNESS METER */}
        <div className="consciousness-meter">
          <div className="meter-label">CONSCIOUSNESS</div>
          <div className="meter-bar">
            <div 
              className="meter-fill"
              style={{ 
                height: `${consciousnessLevel}%`,
                backgroundColor: currentDimensionData?.color 
              }}
            ></div>
            <div className="meter-markers">
              {[20, 40, 60, 80, 100].map(marker => (
                <div 
                  key={marker}
                  className={`marker ${consciousnessLevel >= marker ? 'active' : ''}`}
                  style={{ bottom: `${marker}%` }}
                ></div>
              ))}
            </div>
          </div>
          <div className="meter-value">{Math.floor(consciousnessLevel)}%</div>
        </div>

        {/* ⚡ QUANTUM ACTIONS */}
        <div className="quantum-actions">
          <button className="action-button" title="Quantum Reset">
            <span className="button-glow"></span>
            <span className="button-text">⚡</span>
          </button>
          
          <button className="action-button" title="Reality Shift">
            <span className="button-glow"></span>
            <span className="button-text">🌀</span>
          </button>
          
          <button className="action-button" title="AI Analysis">
            <span className="button-glow"></span>
            <span className="button-text">🤖</span>
          </button>
        </div>
      </div>

      {/* 🌊 BACKGROUND WAVES */}
      <div className="background-waves">
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
      </div>
    </>
  );
};

export default QuantumNavigation;
