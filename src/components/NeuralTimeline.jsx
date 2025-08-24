import React, { useState, useEffect, useRef } from 'react';
import timelineData from '../data/timeline.json';

// Icon Components (using CSS-based 3D effects instead of Three.js for compatibility)
const IconRenderer = ({ icon, color, isHovered, isActive }) => {
  const getIconPath = (iconType) => {
    switch (iconType) {
      case 'brain-spark':
        return (
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full animate-pulse" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs">🧠</div>
          </div>
        );
      case 'react-helix':
        return (
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg rotate-45" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs">⚛️</div>
          </div>
        );
      case 'server-node':
        return (
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-md" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs">🖥️</div>
          </div>
        );
      case 'database-crystal':
        return (
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs">💾</div>
          </div>
        );
      case 'enterprise-cube':
        return (
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs">🏢</div>
          </div>
        );
      case 'blockchain-chain':
        return (
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs">🔗</div>
          </div>
        );
      case 'creative-fusion':
        return (
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg rotate-12" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs">🎨</div>
          </div>
        );
      case 'genesis-crown':
        return (
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-gradient-to-br from-magenta-400 to-magenta-600 rounded-full animate-spin-slow" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs">👑</div>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full" />
        );
    }
  };

  return (
    <div 
      className={`relative transition-all duration-300 ${
        isHovered ? 'scale-125' : 'scale-100'
      } ${isActive ? 'animate-pulse' : ''}`}
      style={{
        filter: isHovered 
          ? `drop-shadow(0 0 20px ${color}) brightness(1.3)` 
          : `drop-shadow(0 0 10px ${color})`
      }}
    >
      {getIconPath(icon)}
    </div>
  );
};

// Milestone Node Component
const MilestoneNode = ({ milestone, index, isActive, onHover, onClick, position }) => {
  const [isHovered, setIsHovered] = useState(false);
  const nodeRef = useRef();

  return (
    <div 
      ref={nodeRef}
      className={`relative flex items-center transition-all duration-500 ${
        index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
      }`}
      style={{
        transform: `translateY(${position}px)`,
        opacity: isActive ? 1 : 0.7
      }}
    >
      {/* Content Box */}
      <div 
        className={`bg-black/40 backdrop-blur-md border border-cyan-400/30 rounded-lg p-4 max-w-xs transition-all duration-300 ${
          index % 2 === 0 ? 'mr-8' : 'ml-8'
        } ${isHovered ? 'border-cyan-400/60 bg-black/60' : ''}`}
        style={{
          boxShadow: isHovered ? `0 0 30px ${milestone.color}40` : `0 0 15px ${milestone.color}20`
        }}
      >
        <div className="text-sm font-mono text-cyan-400 mb-1">{milestone.category}</div>
        <div className="text-lg font-bold text-white mb-2">{milestone.title}</div>
        <div className="text-sm text-gray-300">{milestone.description}</div>
      </div>

      {/* Connection Line to Timeline */}
      <div 
        className="w-16 h-0.5 transition-all duration-300"
        style={{
          background: `linear-gradient(90deg, ${milestone.color}00, ${milestone.color}, ${milestone.color}00)`,
          boxShadow: isHovered ? `0 0 10px ${milestone.color}` : `0 0 5px ${milestone.color}`
        }}
      />

      {/* Node Circle */}
      <div 
        className="relative cursor-pointer"
        onMouseEnter={() => {
          setIsHovered(true);
          onHover(milestone.id);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          onHover(null);
        }}
        onClick={() => onClick(milestone.id)}
      >
        {/* Year Label */}
        <div 
          className={`absolute font-mono font-bold transition-all duration-300 ${
            index % 2 === 0 ? '-left-16 text-right' : '-right-16 text-left'
          }`}
          style={{
            color: milestone.color,
            textShadow: isHovered ? `0 0 10px ${milestone.color}` : 'none',
            fontSize: isHovered ? '1.1rem' : '1rem'
          }}
        >
          {milestone.year}
        </div>

        {/* Outer Glow Ring */}
        <div 
          className={`absolute -inset-4 rounded-full transition-all duration-300 ${
            isHovered ? 'animate-pulse' : ''
          }`}
          style={{
            background: `radial-gradient(circle, ${milestone.color}20 0%, transparent 70%)`,
            transform: isHovered ? 'scale(1.5)' : 'scale(1)'
          }}
        />

        {/* Main Node */}
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 relative overflow-hidden"
          style={{
            background: `radial-gradient(circle, ${milestone.color}40 0%, ${milestone.color}20 50%, transparent 100%)`,
            border: `2px solid ${milestone.color}`,
            boxShadow: isHovered 
              ? `0 0 30px ${milestone.color}, inset 0 0 20px ${milestone.color}30`
              : `0 0 15px ${milestone.color}, inset 0 0 10px ${milestone.color}20`,
            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
          }}
        >
          {/* Inner Icon */}
          <IconRenderer 
            icon={milestone.icon}
            color={milestone.color}
            isHovered={isHovered}
            isActive={isActive}
          />

          {/* Ripple Effect on Click */}
          {isActive && (
            <div 
              className="absolute inset-0 rounded-full animate-ping"
              style={{
                background: `${milestone.color}40`,
                animationDuration: '1s'
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Main Neural Timeline Component
const NeuralTimeline = () => {
  const [activeNode, setActiveNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef();
  const containerRef = useRef();

  // Handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;
        
        // Calculate scroll progress through the timeline
        const scrollStart = viewportHeight;
        const scrollEnd = -elementHeight;
        const scrollRange = scrollStart - scrollEnd;
        const currentProgress = Math.max(0, Math.min(1, (scrollStart - elementTop) / scrollRange));
        
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNodeHover = (nodeId) => {
    setHoveredNode(nodeId);
  };

  const handleNodeClick = (nodeId) => {
    setActiveNode(nodeId);
    
    // Trigger pulse animation
    setTimeout(() => {
      setActiveNode(null);
    }, 1000);

    // Find and scroll to the node (smooth scroll)
    const nodeElement = document.getElementById(`milestone-${nodeId}`);
    if (nodeElement) {
      nodeElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-black py-20 overflow-hidden" ref={containerRef}>
      {/* Background Particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-mono font-bold mb-4 text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text">
          NEURAL TIMELINE
        </h2>
        <p className="text-xl text-gray-400 font-mono">
          The Evolution of Digital Consciousness
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-6xl mx-auto px-4" ref={timelineRef}>
        {/* Central Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full">
          {/* Background Line */}
          <div className="w-full h-full bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />
          
          {/* Animated Progress Line */}
          <div 
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 transition-all duration-300"
            style={{
              height: `${scrollProgress * 100}%`,
              boxShadow: '0 0 20px currentColor',
              filter: 'blur(0.5px)'
            }}
          />
          
          {/* Glowing Tip */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300"
            style={{
              top: `${scrollProgress * 100}%`,
              boxShadow: '0 0 20px currentColor',
              opacity: scrollProgress > 0 ? 1 : 0
            }}
          />
        </div>

        {/* Timeline Milestones */}
        <div className="relative space-y-32">
          {timelineData.map((milestone, index) => (
            <div key={milestone.id} id={`milestone-${milestone.id}`}>
              <MilestoneNode
                milestone={milestone}
                index={index}
                isActive={activeNode === milestone.id}
                onHover={handleNodeHover}
                onClick={handleNodeClick}
                position={0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Hover Tooltip */}
      {hoveredNode && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
          <div className="bg-black/80 backdrop-blur-md border border-cyan-400/40 rounded-lg px-4 py-2">
            <div className="text-cyan-400 text-sm font-mono">
              Click to focus • Scroll to explore consciousness evolution
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default NeuralTimeline;
