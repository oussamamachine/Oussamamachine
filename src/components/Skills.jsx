import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Line, Text3D, Center, Html } from '@react-three/drei';

const Skills = ({ isDarkMode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillCategories = [
    {
      name: 'Frontend',
      skills: [
        { name: 'React', level: 95, color: '#61DAFB' },
        { name: 'Vue.js', level: 85, color: '#4FC08D' },
        { name: 'Angular', level: 80, color: '#DD0031' },
        { name: 'TypeScript', level: 90, color: '#3178C6' },
        { name: 'Tailwind CSS', level: 95, color: '#06B6D4' },
      ]
    },
    {
      name: 'Backend',
      skills: [
        { name: 'Node.js', level: 90, color: '#339933' },
        { name: 'Python', level: 85, color: '#3776AB' },
        { name: 'Java', level: 80, color: '#ED8B00' },
        { name: 'PostgreSQL', level: 85, color: '#336791' },
        { name: 'MongoDB', level: 80, color: '#47A248' },
      ]
    },
    {
      name: '3D & Graphics',
      skills: [
        { name: 'Three.js', level: 85, color: '#000000' },
        { name: 'WebGL', level: 75, color: '#990000' },
        { name: 'Blender', level: 70, color: '#F5792A' },
        { name: 'Unity', level: 65, color: '#000000' },
      ]
    },
    {
      name: 'AI & ML',
      skills: [
        { name: 'TensorFlow', level: 75, color: '#FF6F00' },
        { name: 'PyTorch', level: 70, color: '#EE4C22' },
        { name: 'OpenAI API', level: 80, color: '#412991' },
        { name: 'Computer Vision', level: 75, color: '#00C853' },
      ]
    }
  ];

  // 3D DNA Strand Component
  const DNAStrand = ({ category, index }) => {
    const points = [];
    const colors = [];

    // Generate DNA helix points
    for (let i = 0; i < 20; i++) {
      const angle = i * 0.5;
      const radius = 1.5;
      const height = i * 0.3 - 3;

      // Left strand
      points.push(
        Math.sin(angle) * radius,
        height,
        Math.cos(angle) * radius
      );
      colors.push(0, 0.5, 1); // Blue

      // Right strand
      points.push(
        Math.sin(angle + Math.PI) * radius,
        height,
        Math.cos(angle + Math.PI) * radius
      );
      colors.push(0.5, 0, 1); // Purple
    }

    return (
      <Float speed={1 + index * 0.2} rotationIntensity={0.5} floatIntensity={1}>
        <group position={[index * 4 - 6, 0, 0]}>
          {/* DNA Strands */}
          <Line
            points={points}
            color={isDarkMode ? "#00F5FF" : "#8B5CF6"}
            lineWidth={2}
            transparent
            opacity={0.8}
          />

          {/* Skill Nodes */}
          {category.skills.map((skill, skillIndex) => (
            <group
              key={skill.name}
              position={[
                Math.sin(skillIndex * 0.5) * 1.5,
                skillIndex * 0.3 - 3,
                Math.cos(skillIndex * 0.5) * 1.5
              ]}
              onPointerEnter={() => setHoveredSkill(skill)}
              onPointerLeave={() => setHoveredSkill(null)}
            >
              <mesh>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial
                  color={skill.color}
                  emissive={skill.color}
                  emissiveIntensity={hoveredSkill?.name === skill.name ? 0.8 : 0.3}
                />
              </mesh>
            </group>
          ))}

          {/* Category Label */}
          <Html position={[0, 4, 0]} center>
            <div className={`text-sm font-cyber font-bold px-3 py-1 rounded ${isDarkMode ? 'bg-black/80 text-white' : 'bg-white/80 text-black'
              }`}>
              {category.name}
            </div>
          </Html>
        </group>
      </Float>
    );
  };

  return (
    <section ref={ref} className="relative min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-4xl md:text-6xl font-cyber font-bold mb-6 ${isDarkMode
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-purple to-matrix-green'
              : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
              }`}
          >
            Skills & Expertise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
          >
            A comprehensive collection of technical skills, visualized as living DNA strands
            that represent the building blocks of my digital consciousness.
          </motion.p>
        </motion.div>

        {/* 3D DNA Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="h-96 mb-16 relative"
        >
          <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            {skillCategories.map((category, index) => (
              <DNAStrand key={category.name} category={category} index={index} />
            ))}
          </Canvas>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.0 + categoryIndex * 0.1 }}
              className={`p-6 rounded-2xl border transition-all duration-300 ${isDarkMode
                ? 'bg-gray-800/50 border-gray-700 hover:border-cyber-blue/50 hover:bg-gray-800/80'
                : 'bg-white/50 border-gray-200 hover:border-purple-600/50 hover:bg-white/80'
                }`}
            >
              <h3 className={`text-xl font-cyber font-bold mb-4 ${isDarkMode ? 'text-cyber-blue' : 'text-purple-600'
                }`}>
                {category.name}
              </h3>

              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 1.2 + categoryIndex * 0.1 + skillIndex * 0.05 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                        {skill.name}
                      </span>
                      <span className="text-xs text-gray-500">{skill.level}%</span>
                    </div>
                    <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 1.5 + categoryIndex * 0.1 + skillIndex * 0.05 }}
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ backgroundColor: skill.color }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-16 text-center"
        >
          <h3 className={`text-2xl font-cyber font-bold mb-6 ${isDarkMode ? 'text-cyber-purple' : 'text-purple-600'
            }`}>
            Additional Tools & Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              'Git', 'Docker', 'AWS', 'Firebase', 'GraphQL', 'Redux', 'Next.js', 'Vite',
              'Jest', 'Cypress', 'Figma', 'Adobe Creative Suite', 'Linux', 'MacOS', 'Windows'
            ].map((tool, index) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 1.6 + index * 0.05 }}
                className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 ${isDarkMode
                  ? 'bg-gray-800/50 text-gray-300 border border-gray-700 hover:border-cyber-blue hover:bg-gray-800/80'
                  : 'bg-white/50 text-gray-700 border border-gray-200 hover:border-purple-600 hover:bg-white/80'
                  }`}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
