import React, { useState, useEffect, useRef, useMemo } from 'react';
import skillsData from '../data/skills.json';

// CSS-based 3D Skill Node Component
const SkillNode = ({ skill, index, isHovered, isConnected, isActive, onClick, onHover }) => {
  const [localHovered, setLocalHovered] = useState(false);
  
  const categoryColors = {
    'Frontend': '#00ffff',
    'Backend': '#00ff88',
    'Database': '#88ff00',
    'Blockchain': '#ff0088',
    '3D/Creative': '#8800ff',
    'Design': '#ff8800',
    'Tools': '#ff4400',
    'DevOps': '#0088ff',
    'Cloud': '#ffff00'
  };

  const nodeColor = categoryColors[skill.category] || '#ffffff';
  const glowIntensity = isHovered ? 2 : isConnected ? 1.5 : isActive ? 1.2 : 0.8;
  const nodeScale = isHovered ? 1.3 : isConnected ? 1.15 : 1;

  // Convert 3D position to 2D with perspective
  const x = skill.position[0] * 80 + 50; // Convert to percentage
  const y = skill.position[1] * 80 + 50;
  const z = skill.position[2] * 20; // Depth for transform3d

  return (
    <div
      className="absolute cursor-pointer transition-all duration-300 select-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) translateZ(${z}px) scale(${nodeScale})`,
        zIndex: isHovered ? 50 : isConnected ? 30 : 20,
        animationDelay: `${index * 0.1}s`
      }}
      onClick={() => onClick(skill)}
      onMouseEnter={() => {
        setLocalHovered(true);
        onHover(skill);
      }}
      onMouseLeave={() => {
        setLocalHovered(false);
        onHover(null);
      }}
    >
      {/* Outer Glow Ring */}
      <div 
        className="absolute -inset-8 rounded-full transition-all duration-300 animate-pulse"
        style={{
          background: `radial-gradient(circle, ${nodeColor}${Math.round(glowIntensity * 20).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
          transform: isHovered ? 'scale(2)' : 'scale(1)',
          opacity: glowIntensity * 0.3
        }}
      />

      {/* Main Node */}
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300"
        style={{
          background: `radial-gradient(circle, ${nodeColor}40 0%, ${nodeColor}20 50%, transparent 100%)`,
          border: `3px solid ${nodeColor}`,
          boxShadow: isHovered 
            ? `0 0 40px ${nodeColor}, inset 0 0 20px ${nodeColor}30, 0 0 80px ${nodeColor}60`
            : `0 0 20px ${nodeColor}, inset 0 0 10px ${nodeColor}20`,
          animation: `nodeFloat 6s ease-in-out infinite ${index * 0.5}s, nodePulse 3s ease-in-out infinite ${index * 0.3}s`
        }}
      >
        {/* Skill Level Arc */}
        <div 
          className="absolute inset-1 rounded-full border-2 border-transparent"
          style={{
            background: `conic-gradient(${nodeColor} 0deg, ${nodeColor} ${(skill.level / 100) * 360}deg, transparent ${(skill.level / 100) * 360}deg)`,
            mask: 'radial-gradient(circle at center, transparent 60%, black 62%, black 100%)',
            WebkitMask: 'radial-gradient(circle at center, transparent 60%, black 62%, black 100%)'
          }}
        />

        {/* Icon */}
        <div 
          className="text-2xl transition-all duration-300 relative z-10"
          style={{
            filter: `drop-shadow(0 0 10px ${nodeColor})`,
            fontSize: localHovered ? '32px' : '24px'
          }}
        >
          {skill.icon}
        </div>

        {/* Ripple Effect on Active */}
        {isActive && (
          <>
            <div 
              className="absolute inset-0 rounded-full animate-ping"
              style={{
                background: `${nodeColor}40`,
                animationDuration: '1s'
              }}
            />
            <div 
              className="absolute inset-2 rounded-full animate-ping"
              style={{
                background: `${nodeColor}60`,
                animationDuration: '1.5s',
                animationDelay: '0.3s'
              }}
            />
          </>
        )}
      </div>

      {/* Skill Name */}
      <div 
        className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center font-mono text-sm transition-all duration-300"
        style={{
          color: nodeColor,
          textShadow: isHovered ? `0 0 15px ${nodeColor}` : `0 0 8px ${nodeColor}`,
          fontSize: isHovered ? '16px' : '12px',
          fontWeight: isHovered ? 'bold' : 'normal'
        }}
      >
        {skill.name}
        <div className="text-xs text-gray-400 mt-1">{skill.level}%</div>
      </div>
    </div>
  );
};

// Connection Lines Component (CSS-based)
const ConnectionLines = ({ skills, activeSkill, hoveredSkill }) => {
  const connections = useMemo(() => {
    const lines = [];
    skills.forEach(skill => {
      skill.connections.forEach(connectedId => {
        const connectedSkill = skills.find(s => s.id === connectedId);
        if (connectedSkill && skill.id < connectedId) { // Avoid duplicates
          const x1 = skill.position[0] * 80 + 50;
          const y1 = skill.position[1] * 80 + 50;
          const x2 = connectedSkill.position[0] * 80 + 50;
          const y2 = connectedSkill.position[1] * 80 + 50;
          
          const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
          const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
          
          lines.push({
            x: x1,
            y: y1,
            length,
            angle,
            isActive: activeSkill && (skill.id === activeSkill.id || connectedId === activeSkill.id),
            isHovered: hoveredSkill && (skill.id === hoveredSkill.id || connectedId === hoveredSkill.id),
            color: activeSkill && skill.id === activeSkill.id ? '#ff00ff' : '#00ffff'
          });
        }
      });
    });
    return lines;
  }, [skills, activeSkill, hoveredSkill]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {connections.map((connection, index) => (
        <div
          key={index}
          className="absolute transition-all duration-500"
          style={{
            left: `${connection.x}%`,
            top: `${connection.y}%`,
            width: `${connection.length}%`,
            height: '2px',
            transform: `rotate(${connection.angle}deg)`,
            transformOrigin: 'left center',
            background: `linear-gradient(90deg, ${connection.color}00 0%, ${connection.color}80 20%, ${connection.color}80 80%, ${connection.color}00 100%)`,
            boxShadow: connection.isActive || connection.isHovered 
              ? `0 0 20px ${connection.color}` 
              : `0 0 10px ${connection.color}60`,
            opacity: connection.isActive ? 1 : connection.isHovered ? 0.8 : 0.4,
            animation: `connectionPulse 2s ease-in-out infinite ${index * 0.2}s`
          }}
        />
      ))}
    </div>
  );
};

// Floating Particles Background
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30">
      {[...Array(80)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
            transform: `translateZ(${Math.random() * 50}px)`
          }}
        />
      ))}
      
      {/* Floating larger particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={`large-${i}`}
          className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `floatParticle 8s ease-in-out infinite ${Math.random() * 4}s`,
            transform: `translateZ(${Math.random() * 100}px)`
          }}
        />
      ))}
    </div>
  );
};

// Skill Tooltip Component
const SkillTooltip = ({ skill, mousePosition }) => {
  if (!skill) return null;

  const experienceText = skill.experience === 1 ? '1 year' : `${skill.experience} years`;
  const levelColor = skill.level >= 90 ? '#00ff00' : skill.level >= 75 ? '#ffff00' : skill.level >= 60 ? '#ff8800' : '#ff4400';

  return (
    <div 
      className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full animate-fadeIn"
      style={{
        left: mousePosition.x,
        top: mousePosition.y - 10
      }}
    >
      <div className="bg-black/95 backdrop-blur-md border border-cyan-400/60 rounded-lg px-4 py-3 font-mono text-sm shadow-2xl"
           style={{ boxShadow: `0 0 30px ${skill.color || '#00ffff'}40` }}>
        <div className="text-cyan-400 font-bold text-lg mb-1 flex items-center">
          <span className="text-xl mr-2">{skill.icon}</span>
          {skill.name}
        </div>
        <div className="text-white mb-2 opacity-80">{skill.category}</div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300">Mastery Level:</span>
          <span style={{ color: levelColor }} className="font-bold">{skill.level}%</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-300">Experience:</span>
          <span className="text-white">{experienceText}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="h-2 rounded-full transition-all duration-500"
            style={{ 
              width: `${skill.level}%`,
              background: `linear-gradient(90deg, ${levelColor}, ${levelColor}aa)`,
              boxShadow: `0 0 10px ${levelColor}60`
            }}
          />
        </div>
        <div className="text-xs text-gray-400 mt-2">
          Connected to {skill.connections.length} related technologies
        </div>
      </div>
    </div>
  );
};

// Main Neural Skill Map Component
const NeuralSkillMap = () => {
  const [activeSkill, setActiveSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef();

  // Intersection Observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Track mouse position for tooltips
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSkillClick = (skill) => {
    setActiveSkill(activeSkill && activeSkill.id === skill.id ? null : skill);
  };

  const handleSkillHover = (skill) => {
    setHoveredSkill(skill);
  };

  // Calculate category stats
  const categoryStats = useMemo(() => {
    const categories = {};
    skillsData.forEach(skill => {
      if (!categories[skill.category]) {
        categories[skill.category] = { count: 0, avgLevel: 0, totalLevel: 0 };
      }
      categories[skill.category].count++;
      categories[skill.category].totalLevel += skill.level;
    });
    
    Object.keys(categories).forEach(category => {
      categories[category].avgLevel = Math.round(categories[category].totalLevel / categories[category].count);
    });
    
    return categories;
  }, []);

  const categoryColors = {
    'Frontend': '#00ffff',
    'Backend': '#00ff88',
    'Database': '#88ff00',
    'Blockchain': '#ff0088',
    '3D/Creative': '#8800ff',
    'Design': '#ff8800',
    'Tools': '#ff4400',
    'DevOps': '#0088ff',
    'Cloud': '#ffff00'
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-black py-20 overflow-hidden"
      style={{ 
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Section Header */}
      <div className="text-center mb-16 relative z-10">
        <h2 className={`text-5xl md:text-6xl font-mono font-bold mb-4 text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          NEURAL SKILL MAP
        </h2>
        <p className={`text-xl text-gray-400 font-mono transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          Interactive Network of Technical Mastery
        </p>
      </div>

      {/* 3D Skill Network Container */}
      <div 
        className={`relative h-[70vh] transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{ 
          transformStyle: 'preserve-3d',
          transform: 'rotateX(10deg)'
        }}
      >
        {/* Particle Background */}
        <ParticleBackground />

        {/* Connection Lines */}
        <ConnectionLines 
          skills={skillsData}
          activeSkill={activeSkill}
          hoveredSkill={hoveredSkill}
        />

        {/* Skill Nodes */}
        {skillsData.map((skill, index) => (
          <SkillNode
            key={skill.id}
            skill={skill}
            index={index}
            isHovered={hoveredSkill && hoveredSkill.id === skill.id}
            isConnected={activeSkill && (activeSkill.connections.includes(skill.id) || skill.id === activeSkill.id)}
            isActive={activeSkill && activeSkill.id === skill.id}
            onClick={handleSkillClick}
            onHover={handleSkillHover}
          />
        ))}
      </div>

      {/* Skills Tooltip */}
      <SkillTooltip skill={hoveredSkill} mousePosition={mousePosition} />

      {/* Category Legend */}
      <div className={`absolute top-20 right-6 bg-black/40 backdrop-blur-md border border-cyan-400/30 rounded-lg p-4 font-mono text-sm transition-all duration-1000 delay-700 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
      }`}>
        <div className="text-cyan-400 font-bold mb-3 text-center">SKILL CATEGORIES</div>
        {Object.entries(categoryStats).map(([category, stats]) => (
          <div key={category} className="flex items-center justify-between mb-2 text-xs">
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2 animate-pulse"
                style={{ 
                  backgroundColor: categoryColors[category] || '#ffffff',
                  boxShadow: `0 0 8px ${categoryColors[category] || '#ffffff'}60`
                }}
              />
              <span className="text-white">{category}</span>
            </div>
            <span className="text-gray-400">{stats.count} • {stats.avgLevel}%</span>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-cyan-400 font-mono text-sm transition-all duration-1000 delay-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}>
        <div className="mb-2">🖱️ HOVER: View skill details • 🖱️ CLICK: Highlight neural cluster</div>
        <div className="text-gray-500">Each node pulses with the rhythm of digital consciousness</div>
      </div>

      {/* Active Skill Info */}
      {activeSkill && (
        <div className="fixed bottom-8 right-8 bg-black/90 backdrop-blur-md border border-cyan-400/60 rounded-lg p-4 font-mono text-sm animate-fadeIn"
             style={{ boxShadow: `0 0 30px ${categoryColors[activeSkill.category] || '#00ffff'}40` }}>
          <div className="text-cyan-400 font-bold mb-2">ACTIVE NEURAL CLUSTER</div>
          <div className="text-white mb-1 flex items-center">
            <span className="text-xl mr-2">{activeSkill.icon}</span>
            {activeSkill.name}
          </div>
          <div className="text-gray-400 text-xs mb-2">{activeSkill.category}</div>
          <div className="text-sm">
            Mastery: <span style={{ color: categoryColors[activeSkill.category] }}>{activeSkill.level}%</span>
          </div>
          <div className="text-gray-400 text-xs mt-1">
            Connected to {activeSkill.connections.length} related technologies
          </div>
        </div>
      )}

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes nodeFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(5deg); }
          50% { transform: translateY(-5px) rotate(-3deg); }
          75% { transform: translateY(-15px) rotate(3deg); }
        }

        @keyframes nodePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes connectionPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        @keyframes floatParticle {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% { 
            transform: translateY(-20px) translateX(10px) rotate(90deg);
          }
          50% { 
            transform: translateY(-10px) translateX(-15px) rotate(180deg);
          }
          75% { 
            transform: translateY(-30px) translateX(5px) rotate(270deg);
          }
        }
      `}</style>
    </div>
  );
};

export default NeuralSkillMap;
