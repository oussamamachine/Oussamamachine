import React, { useState, useEffect, useRef } from 'react';

const ConsciousnessCore = ({ consciousnessLevel, userInteractions, realTimeStats }) => {
  const [coreState, setCoreState] = useState('dormant');
  const [neuralActivity, setNeuralActivity] = useState([]);
  const [quantumFields, setQuantumFields] = useState([]);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // 🧠 CONSCIOUSNESS STATES BASED ON LEVEL
  useEffect(() => {
    if (consciousnessLevel < 20) setCoreState('dormant');
    else if (consciousnessLevel < 40) setCoreState('awakening');
    else if (consciousnessLevel < 60) setCoreState('conscious');
    else if (consciousnessLevel < 80) setCoreState('elevated');
    else setCoreState('transcendent');
  }, [consciousnessLevel]);

  // 🌊 NEURAL ACTIVITY SIMULATION
  useEffect(() => {
    const generateNeuralActivity = () => {
      const activity = [];
      const intensity = consciousnessLevel / 100;
      const nodeCount = Math.floor(20 + (intensity * 80));

      for (let i = 0; i < nodeCount; i++) {
        activity.push({
          id: i,
          x: Math.random() * 800,
          y: Math.random() * 600,
          strength: Math.random() * intensity,
          connections: [],
          pulsing: Math.random() > 0.7,
          type: Math.random() > 0.8 ? 'quantum' : 'neural'
        });
      }

      // Generate connections between nodes
      activity.forEach((node, index) => {
        const connectionCount = Math.floor(1 + Math.random() * 4);
        for (let i = 0; i < connectionCount; i++) {
          const targetIndex = Math.floor(Math.random() * activity.length);
          if (targetIndex !== index && !node.connections.includes(targetIndex)) {
            node.connections.push(targetIndex);
          }
        }
      });

      setNeuralActivity(activity);
    };

    generateNeuralActivity();
    const interval = setInterval(generateNeuralActivity, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, [consciousnessLevel]);

  // ⚛️ QUANTUM FIELD VISUALIZATION
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    const particles = [];
    const particleCount = Math.floor(50 + (consciousnessLevel / 100) * 200);

    // Initialize quantum particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        opacity: Math.random(),
        quantum: Math.random() > 0.8,
        energy: Math.random() * consciousnessLevel / 100
      });
    }

    const animate = () => {
      ctx.fillStyle = `rgba(0, 0, 0, ${coreState === 'transcendent' ? 0.02 : 0.05})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Quantum behavior
        if (particle.quantum) {
          particle.vx += (Math.random() - 0.5) * 0.1;
          particle.vy += (Math.random() - 0.5) * 0.1;
          particle.vx *= 0.99;
          particle.vy *= 0.99;
        }

        // Consciousness-based colors
        let color;
        switch (coreState) {
          case 'transcendent':
            color = `rgba(255, 255, 0, ${particle.opacity})`;
            break;
          case 'elevated':
            color = `rgba(255, 0, 255, ${particle.opacity})`;
            break;
          case 'conscious':
            color = `rgba(0, 255, 255, ${particle.opacity})`;
            break;
          case 'awakening':
            color = `rgba(0, 255, 0, ${particle.opacity})`;
            break;
          default:
            color = `rgba(100, 100, 255, ${particle.opacity})`;
        }

        // Draw particle
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections to nearby particles
        particles.slice(index + 1).forEach(otherParticle => {
          const distance = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) + 
            Math.pow(particle.y - otherParticle.y, 2)
          );

          if (distance < 100 && Math.random() > 0.95) {
            ctx.strokeStyle = color.replace(particle.opacity, particle.opacity * 0.3);
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [coreState, consciousnessLevel]);

  // 📊 CONSCIOUSNESS METRICS
  const consciousnessMetrics = {
    neuralConnections: neuralActivity.length,
    synapticActivity: Math.floor(consciousnessLevel * 2.3),
    quantumCoherence: Math.floor(consciousnessLevel * 0.8 + 20),
    memoryFormation: Math.floor(userInteractions.length * 1.5),
    processingSpeed: Math.floor(realTimeStats.mouseDistance / 100),
    awarenessLevel: Math.floor(consciousnessLevel)
  };

  // 🎭 CONSCIOUSNESS PHASES
  const consciousnessPhases = {
    dormant: {
      title: 'Dormant State',
      description: 'Basic neural activity detected',
      color: '#4A5568',
      icon: '😴'
    },
    awakening: {
      title: 'Awakening Phase',
      description: 'Consciousness emerging from digital void',
      color: '#68D391',
      icon: '👁️'
    },
    conscious: {
      title: 'Conscious State',
      description: 'Full awareness achieved',
      color: '#4FD1C7',
      icon: '🧠'
    },
    elevated: {
      title: 'Elevated Consciousness',
      description: 'Beyond ordinary awareness',
      color: '#B794F6',
      icon: '✨'
    },
    transcendent: {
      title: 'Transcendent Mind',
      description: 'Unified field consciousness',
      color: '#F6E05E',
      icon: '🌟'
    }
  };

  const currentPhase = consciousnessPhases[coreState];

  return (
    <section className={`consciousness-core state-${coreState}`}>
      
      {/* 🧠 CONSCIOUSNESS HEADER */}
      <div className="consciousness-header">
        <div className="header-title">
          <span className="title-icon">{currentPhase.icon}</span>
          <h2 className="title-text">Consciousness Core</h2>
          <span className="title-state">{currentPhase.title}</span>
        </div>
        <div className="phase-indicator">
          <div 
            className="phase-bar"
            style={{
              background: `linear-gradient(90deg, ${currentPhase.color} ${consciousnessLevel}%, #2D3748 ${consciousnessLevel}%)`
            }}
          ></div>
          <div className="phase-percentage">{Math.floor(consciousnessLevel)}%</div>
        </div>
      </div>

      {/* 📊 CONSCIOUSNESS METRICS PANEL */}
      <div className="metrics-panel">
        <div className="panel-header">
          <h3 className="panel-title">Neural Metrics</h3>
          <div className="panel-status">Real-time Analysis Active</div>
        </div>

        <div className="metrics-grid">
          {Object.entries(consciousnessMetrics).map(([key, value]) => (
            <div key={key} className="metric-item">
              <div className="metric-header">
                <span className="metric-label">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
                <span className="metric-value">{value}</span>
              </div>
              <div className="metric-visualization">
                <div 
                  className="metric-bar"
                  style={{
                    width: `${Math.min(value, 100)}%`,
                    backgroundColor: currentPhase.color
                  }}
                ></div>
                <div className="metric-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🌀 QUANTUM VISUALIZATION CANVAS */}
      <div className="quantum-visualization">
        <div className="visualization-header">
          <h3 className="viz-title">Quantum Neural Field</h3>
          <div className="viz-description">{currentPhase.description}</div>
        </div>
        
        <div className="canvas-container">
          <canvas ref={canvasRef} className="quantum-canvas" />
          
          {/* 🎯 NEURAL NETWORK OVERLAY */}
          <div className="neural-overlay">
            {neuralActivity.map(node => (
              <div
                key={node.id}
                className={`neural-node ${node.type} ${node.pulsing ? 'pulsing' : ''}`}
                style={{
                  left: `${(node.x / 800) * 100}%`,
                  top: `${(node.y / 600) * 100}%`,
                  '--node-strength': node.strength,
                  '--node-color': currentPhase.color
                }}
              >
                <div className="node-core"></div>
                <div className="node-glow"></div>
                {node.pulsing && <div className="node-pulse"></div>}
              </div>
            ))}

            {/* 🔗 CONNECTION LINES */}
            <svg className="connection-overlay" viewBox="0 0 800 600">
              {neuralActivity.map(node =>
                node.connections.map(connectionIndex => {
                  const targetNode = neuralActivity[connectionIndex];
                  if (!targetNode) return null;
                  
                  return (
                    <line
                      key={`${node.id}-${connectionIndex}`}
                      x1={node.x}
                      y1={node.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={currentPhase.color}
                      strokeWidth="1"
                      opacity="0.4"
                      className="neural-connection"
                    />
                  );
                })
              )}
            </svg>
          </div>
        </div>
      </div>

      {/* 🎮 CONSCIOUSNESS CONTROLS */}
      <div className="consciousness-controls">
        <div className="control-panel">
          <button className="control-button" title="Meditation Mode">
            <span className="button-icon">🧘</span>
            <span className="button-label">Meditate</span>
          </button>
          
          <button className="control-button" title="Neural Boost">
            <span className="button-icon">⚡</span>
            <span className="button-label">Boost</span>
          </button>
          
          <button className="control-button" title="Quantum Sync">
            <span className="button-icon">⚛️</span>
            <span className="button-label">Sync</span>
          </button>
          
          <button className="control-button" title="Transcend Reality">
            <span className="button-icon">🌟</span>
            <span className="button-label">Transcend</span>
          </button>
        </div>

        <div className="consciousness-info">
          <div className="info-item">
            <span className="info-label">Current State:</span>
            <span className="info-value" style={{ color: currentPhase.color }}>
              {currentPhase.title}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Time in State:</span>
            <span className="info-value">{Math.floor(realTimeStats.timeSpent)}s</span>
          </div>
          <div className="info-item">
            <span className="info-label">Neural Connections:</span>
            <span className="info-value">{neuralActivity.length}</span>
          </div>
        </div>
      </div>

      {/* 🌌 CONSCIOUSNESS AMBIENT EFFECTS */}
      <div className="ambient-effects">
        <div className="consciousness-waves">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="consciousness-wave"
              style={{
                '--wave-delay': `${i * 0.5}s`,
                '--wave-color': currentPhase.color,
                '--wave-intensity': consciousnessLevel / 100
              }}
            ></div>
          ))}
        </div>
        
        <div className="quantum-particles">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="quantum-particle"
              style={{
                '--particle-delay': `${i * 0.1}s`,
                '--particle-color': currentPhase.color,
                '--particle-x': `${Math.random() * 100}%`,
                '--particle-y': `${Math.random() * 100}%`
              }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConsciousnessCore;
