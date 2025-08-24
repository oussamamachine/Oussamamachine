import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Text3D, Center, Html } from '@react-three/drei';

// Error Boundary for About 3D content
class About3DErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('About 3D Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-full w-full bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg flex items-center justify-center">
          <div className="text-center text-white/80">
            <div className="text-6xl mb-4">🧠</div>
            <p className="text-sm">3D Brain visualization unavailable</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const About = ({ isDarkMode }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [hoveredSkill, setHoveredSkill] = useState(null);
    const [threeJSError, setThreeJSError] = useState(false);

    const skills = [
        { name: 'React', level: 95, color: '#61DAFB' },
        { name: 'JavaScript', level: 90, color: '#F7DF1E' },
        { name: 'Node.js', level: 85, color: '#339933' },
        { name: 'Python', level: 80, color: '#3776AB' },
        { name: 'Three.js', level: 75, color: '#000000' },
        { name: 'AI/ML', level: 70, color: '#FF6B6B' },
    ];

    // 3D Brain Component
    const InteractiveBrain = () => {
        return (
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <group position={[0, 0, 0]}>
                    {/* Brain Base */}
                    <mesh position={[0, 0, 0]}>
                        <sphereGeometry args={[2, 32, 32]} />
                        <meshStandardMaterial
                            color={isDarkMode ? "#2A2A2A" : "#E5E7EB"}
                            roughness={0.8}
                            metalness={0.2}
                        />
                    </mesh>

                    {/* Neural Pathways */}
                    {Array.from({ length: 15 }).map((_, i) => (
                        <group key={i} position={[
                            Math.sin(i * 0.8) * 1.5,
                            Math.cos(i * 0.6) * 1.2,
                            Math.sin(i * 0.4) * 1.8
                        ]}>
                            <mesh>
                                <sphereGeometry args={[0.1, 8, 6]} />
                                <meshStandardMaterial
                                    color={hoveredSkill ? hoveredSkill.color : (isDarkMode ? "#00F5FF" : "#8B5CF6")}
                                    emissive={hoveredSkill ? hoveredSkill.color : (isDarkMode ? "#00F5FF" : "#8B5CF6")}
                                    emissiveIntensity={hoveredSkill ? 0.8 : 0.3}
                                />
                            </mesh>
                        </group>
                    ))}

                    {/* Skill Nodes */}
                    {skills.map((skill, i) => (
                        <group
                            key={skill.name}
                            position={[
                                Math.sin(i * Math.PI * 2 / skills.length) * 2.5,
                                Math.cos(i * Math.PI * 2 / skills.length) * 2.5,
                                0
                            ]}
                            onPointerEnter={() => setHoveredSkill(skill)}
                            onPointerLeave={() => setHoveredSkill(null)}
                        >
                            <mesh>
                                <sphereGeometry args={[0.3, 16, 16]} />
                                <meshStandardMaterial
                                    color={skill.color}
                                    emissive={skill.color}
                                    emissiveIntensity={hoveredSkill?.name === skill.name ? 0.8 : 0.2}
                                />
                            </mesh>

                            {/* Skill Label */}
                            <Html position={[0, 0.5, 0]} center>
                                <div className={`text-xs font-mono font-bold px-2 py-1 rounded ${isDarkMode ? 'bg-black/80 text-white' : 'bg-white/80 text-black'
                                    }`}>
                                    {skill.name}
                                </div>
                            </Html>
                        </group>
                    ))}
                </group>
            </Float>
        );
    };

    return (
        <section ref={ref} className="relative min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* 3D Brain */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-96 lg:h-[500px] relative"
                    >
                        {!threeJSError ? (
                          <About3DErrorBoundary>
                            <Canvas 
                              camera={{ position: [0, 0, 8], fov: 60 }}
                              onError={(error) => {
                                console.log('About Canvas error:', error);
                                setThreeJSError(true);
                              }}
                            >
                                <ambientLight intensity={0.4} />
                                <pointLight position={[10, 10, 10]} intensity={0.8} />
                                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                                <InteractiveBrain />
                            </Canvas>
                          </About3DErrorBoundary>
                        ) : (
                          // Fallback when Three.js fails
                          <div className="h-full w-full bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg flex items-center justify-center">
                            <div className="text-center text-white/80">
                              <div className="text-6xl mb-4">🧠</div>
                              <p className="text-sm">3D Brain visualization unavailable</p>
                              <p className="text-xs mt-2">Using fallback display</p>
                            </div>
                          </div>
                        )}
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-6"
                    >
                        <h2 className={`text-4xl lg:text-5xl font-cyber font-bold ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                            About My Mind
                        </h2>
                        
                        <p className={`text-lg leading-relaxed ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                            I'm a passionate developer and creative technologist who believes in the power of code to transform ideas into reality. 
                            My journey spans from web development to AI/ML, always pushing the boundaries of what's possible.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            {skills.map((skill) => (
                                <div key={skill.name} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className={`font-mono text-sm ${
                                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                        }`}>
                                            {skill.name}
                                        </span>
                                        <span className={`text-xs font-bold ${
                                            isDarkMode ? 'text-cyber-blue' : 'text-purple-600'
                                        }`}>
                                            {skill.level}%
                                        </span>
                                    </div>
                                    <div className={`h-2 rounded-full ${
                                        isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                                    }`}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                                            transition={{ duration: 1, delay: 0.6 + skills.indexOf(skill) * 0.1 }}
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: skill.color }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-6 py-3 rounded-lg font-cyber font-semibold transition-all duration-300 ${
                                isDarkMode
                                    ? 'bg-gradient-to-r from-cyber-blue to-cyber-purple text-white hover:shadow-lg hover:shadow-cyber-blue/25'
                                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25'
                            }`}
                            onClick={() => document.getElementById('skills').scrollIntoView({ behavior: 'smooth' })}
                        >
                            Explore My Skills
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
