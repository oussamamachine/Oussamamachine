import React, { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Stars, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import skillsData from '../data/skills.json';

// Skill Node Component
const SkillNode = ({ skill, isHovered, isConnected, isActive, onClick, onHover }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
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

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = skill.position[1] + Math.sin(state.clock.elapsedTime + skill.id) * 0.1;
      
      // Rotation for visual appeal
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5 + skill.id) * 0.1;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3 + skill.id) * 0.1;
    }
  });

  return (
    <group position={skill.position}>
      {/* Main Node Sphere */}
      <mesh
        ref={meshRef}
        scale={nodeScale}
        onClick={() => onClick(skill)}
        onPointerEnter={() => {
          setHovered(true);
          onHover(skill);
        }}
        onPointerLeave={() => {
          setHovered(false);
          onHover(null);
        }}
      >
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color={nodeColor}
          emissive={nodeColor}
          emissiveIntensity={glowIntensity * 0.3}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Outer Glow Ring */}
      <mesh scale={nodeScale * 1.5}>
        <ringGeometry args={[0.4, 0.5, 32]} />
        <meshBasicMaterial
          color={nodeColor}
          transparent
          opacity={glowIntensity * 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Skill Level Indicator (Ring) */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={nodeScale}>
        <ringGeometry args={[0.35, 0.38, 32, 1, 0, (skill.level / 100) * Math.PI * 2]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Floating Icon */}
      <Html
        position={[0, 0, 0.4]}
        center
        transform
        occlude
        style={{
          fontSize: hovered ? '24px' : '20px',
          transition: 'font-size 0.2s ease',
          filter: `drop-shadow(0 0 10px ${nodeColor})`,
          userSelect: 'none',
          pointerEvents: 'none'
        }}
      >
        <div>{skill.icon}</div>
      </Html>

      {/* Skill Name Label */}
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.15}
        color={nodeColor}
        anchorX="center"
        anchorY="middle"
        font-family="monospace"
        maxWidth={2}
        textAlign="center"
      >
        {skill.name}
      </Text>
    </group>
  );
};

// Connection Lines Component
const ConnectionLines = ({ skills, activeSkill, hoveredSkill, connectedSkills }) => {
  const linesRef = useRef();

  const connections = useMemo(() => {
    const lines = [];
    skills.forEach(skill => {
      skill.connections.forEach(connectedId => {
        const connectedSkill = skills.find(s => s.id === connectedId);
        if (connectedSkill) {
          lines.push({
            start: skill.position,
            end: connectedSkill.position,
            isActive: activeSkill && (skill.id === activeSkill.id || connectedId === activeSkill.id),
            isHovered: hoveredSkill && (skill.id === hoveredSkill.id || connectedId === hoveredSkill.id),
            color: activeSkill && skill.id === activeSkill.id ? '#ff00ff' : '#00ffff'
          });
        }
      });
    });
    return lines;
  }, [skills, activeSkill, hoveredSkill]);

  useFrame((state) => {
    if (linesRef.current) {
      // Animate line opacity and glow
      linesRef.current.children.forEach((line, index) => {
        const connection = connections[index];
        if (connection) {
          const baseOpacity = connection.isActive ? 0.8 : connection.isHovered ? 0.6 : 0.3;
          const pulseOpacity = Math.sin(state.clock.elapsedTime * 2 + index) * 0.2 + 0.8;
          line.material.opacity = baseOpacity * pulseOpacity;
        }
      });
    }
  });

  return (
    <group ref={linesRef}>
      {connections.map((connection, index) => {
        const start = new THREE.Vector3(...connection.start);
        const end = new THREE.Vector3(...connection.end);
        const direction = end.clone().sub(start);
        const length = direction.length();
        const midPoint = start.clone().add(direction.multiplyScalar(0.5));

        return (
          <group key={index} position={midPoint.toArray()}>
            <mesh
              rotation={[0, 0, Math.atan2(direction.y, direction.x)]}
              scale={[length, 1, 1]}
            >
              <planeGeometry args={[1, 0.02]} />
              <meshBasicMaterial
                color={connection.color}
                transparent
                opacity={0.5}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// Floating Particles Background
const ParticleNetwork = () => {
  const particlesRef = useRef();
  const particleCount = 200;

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10
        ],
        velocity: [
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ]
      });
    }
    return temp;
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      
      particles.forEach((particle, i) => {
        const index = i * 3;
        
        // Update positions
        positions[index] += particle.velocity[0];
        positions[index + 1] += particle.velocity[1];
        positions[index + 2] += particle.velocity[2];
        
        // Wrap around boundaries
        if (Math.abs(positions[index]) > 10) particle.velocity[0] *= -1;
        if (Math.abs(positions[index + 1]) > 7.5) particle.velocity[1] *= -1;
        if (Math.abs(positions[index + 2]) > 5) particle.velocity[2] *= -1;
      });
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={new Float32Array(particles.flatMap(p => p.position))}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00ffff"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Tooltip Component
const SkillTooltip = ({ skill, mousePosition }) => {
  if (!skill) return null;

  const experienceText = skill.experience === 1 ? '1 year' : `${skill.experience} years`;
  const levelColor = skill.level >= 90 ? '#00ff00' : skill.level >= 75 ? '#ffff00' : skill.level >= 60 ? '#ff8800' : '#ff4400';

  return (
    <div 
      className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full"
      style={{
        left: mousePosition.x,
        top: mousePosition.y - 10
      }}
    >
      <div className="bg-black/90 backdrop-blur-md border border-cyan-400/40 rounded-lg px-4 py-3 font-mono text-sm">
        <div className="text-cyan-400 font-bold text-lg mb-1">{skill.name}</div>
        <div className="text-white mb-2">{skill.category}</div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300">Level:</span>
          <span style={{ color: levelColor }} className="font-bold">{skill.level}%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Experience:</span>
          <span className="text-white">{experienceText}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
          <div 
            className="h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${skill.level}%`,
              background: `linear-gradient(90deg, ${levelColor}, ${levelColor}aa)`
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Camera Controller
const CameraController = () => {
  const { camera } = useThree();
  
  useFrame((state) => {
    // Smooth camera movement
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 2;
    camera.position.y = Math.cos(state.clock.elapsedTime * 0.15) * 1;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

// 3D Scene Component
const SkillMapScene = ({ activeSkill, hoveredSkill, onSkillClick, onSkillHover }) => {
  const connectedSkills = useMemo(() => {
    if (!activeSkill) return [];
    return skillsData.filter(skill => 
      activeSkill.connections.includes(skill.id) || skill.id === activeSkill.id
    );
  }, [activeSkill]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#00ffff" />
      <pointLight position={[-10, -10, 10]} intensity={0.6} color="#ff00ff" />
      <spotLight
        position={[0, 20, 0]}
        angle={Math.PI / 4}
        penumbra={0.5}
        intensity={1}
        color="#ffffff"
      />

      {/* Background Stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />
      
      {/* Particle Network */}
      <ParticleNetwork />

      {/* Connection Lines */}
      <ConnectionLines 
        skills={skillsData}
        activeSkill={activeSkill}
        hoveredSkill={hoveredSkill}
        connectedSkills={connectedSkills}
      />

      {/* Skill Nodes */}
      {skillsData.map(skill => (
        <SkillNode
          key={skill.id}
          skill={skill}
          isHovered={hoveredSkill && hoveredSkill.id === skill.id}
          isConnected={connectedSkills.some(s => s.id === skill.id)}
          isActive={activeSkill && activeSkill.id === skill.id}
          onClick={onSkillClick}
          onHover={onSkillHover}
        />
      ))}

      {/* Camera Controller */}
      <CameraController />
    </>
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

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-black py-20 overflow-hidden"
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
          Interactive 3D Visualization of Technical Mastery
        </p>
      </div>

      {/* 3D Canvas */}
      <div className={`h-[70vh] transition-all duration-1000 delay-500 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
        >
          <SkillMapScene
            activeSkill={activeSkill}
            hoveredSkill={hoveredSkill}
            onSkillClick={handleSkillClick}
            onSkillHover={handleSkillHover}
          />
        </Canvas>
      </div>

      {/* Skills Tooltip */}
      <SkillTooltip skill={hoveredSkill} mousePosition={mousePosition} />

      {/* Category Legend */}
      <div className={`absolute top-20 right-6 bg-black/40 backdrop-blur-md border border-cyan-400/30 rounded-lg p-4 font-mono text-sm transition-all duration-1000 delay-700 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
      }`}>
        <div className="text-cyan-400 font-bold mb-3">SKILL CATEGORIES</div>
        {Object.entries(categoryStats).map(([category, stats]) => (
          <div key={category} className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ 
                  backgroundColor: {
                    'Frontend': '#00ffff',
                    'Backend': '#00ff88',
                    'Database': '#88ff00',
                    'Blockchain': '#ff0088',
                    '3D/Creative': '#8800ff',
                    'Design': '#ff8800',
                    'Tools': '#ff4400',
                    'DevOps': '#0088ff',
                    'Cloud': '#ffff00'
                  }[category] || '#ffffff'
                }}
              />
              <span className="text-white text-xs">{category}</span>
            </div>
            <span className="text-gray-400 text-xs">{stats.count} • {stats.avgLevel}%</span>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-cyan-400 font-mono text-sm transition-all duration-1000 delay-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}>
        <div className="mb-2">🖱️ HOVER: View skill details • 🖱️ CLICK: Highlight connections</div>
        <div className="text-gray-500">Neural pathways reveal the interconnected nature of digital consciousness</div>
      </div>

      {/* Active Skill Info */}
      {activeSkill && (
        <div className="fixed bottom-8 right-8 bg-black/80 backdrop-blur-md border border-cyan-400/40 rounded-lg p-4 font-mono text-sm animate-fadeIn">
          <div className="text-cyan-400 font-bold mb-2">ACTIVE NEURAL CLUSTER</div>
          <div className="text-white mb-1">{activeSkill.name}</div>
          <div className="text-gray-400 text-xs">
            Connected to {activeSkill.connections.length} related skills
          </div>
        </div>
      )}
    </div>
  );
};

export default NeuralSkillMap;
