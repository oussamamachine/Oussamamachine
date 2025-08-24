import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Text3D, Center, Html } from '@react-three/drei';

const Experience = ({ isDarkMode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      id: 1,
      year: "2024",
      title: "Senior Full-Stack Developer",
      company: "TechCorp Innovations",
      description: "Leading development of cutting-edge AI-powered applications, mentoring junior developers, and architecting scalable solutions.",
      technologies: ["React", "Node.js", "Python", "AI/ML", "AWS"],
      achievements: ["Reduced API response time by 60%", "Implemented CI/CD pipeline", "Led team of 8 developers"],
      color: "#00F5FF"
    },
    {
      id: 2,
      year: "2023",
      title: "AI Research Engineer",
      company: "Neural Dynamics Lab",
      description: "Researching and developing next-generation neural network architectures for computer vision applications.",
      technologies: ["PyTorch", "TensorFlow", "Python", "CUDA", "OpenCV"],
      achievements: ["Published 3 research papers", "Developed novel CNN architecture", "Improved accuracy by 15%"],
      color: "#8B5CF6"
    },
    {
      id: 3,
      year: "2022",
      title: "Frontend Developer",
      company: "Digital Creations Studio",
      description: "Creating immersive web experiences with modern frontend technologies and 3D graphics.",
      technologies: ["React", "Three.js", "WebGL", "TypeScript", "Framer Motion"],
      achievements: ["Built 10+ interactive websites", "Optimized performance by 40%", "Implemented 3D visualizations"],
      color: "#00FF00"
    },
    {
      id: 4,
      year: "2021",
      title: "Software Engineer Intern",
      company: "Startup Ventures",
      description: "Full-stack development of web applications and mobile apps using modern technologies.",
      technologies: ["React Native", "Node.js", "MongoDB", "Firebase", "Git"],
      achievements: ["Developed 5 mobile apps", "Improved user engagement by 25%", "Reduced bug reports by 30%"],
      color: "#FF6B6B"
    }
  ];

  // 3D Timeline Element
  const TimelineElement3D = ({ experience, index }) => {
    return (
      <Float speed={1 + index * 0.2} rotationIntensity={0.3} floatIntensity={0.8}>
        <group position={[0, 0, 0]}>
          {/* Year Cube */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            <meshStandardMaterial
              color={experience.color}
              emissive={experience.color}
              emissiveIntensity={0.3}
            />
          </mesh>

          {/* Year Text */}
          <Html position={[0, 0, 0.8]} center>
            <div className={`text-lg font-cyber font-bold px-2 py-1 rounded ${isDarkMode ? 'bg-black/80 text-white' : 'bg-white/80 text-black'
              }`}>
              {experience.year}
            </div>
          </Html>

          {/* Connection Line */}
          <mesh position={[0, -1.5, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 1]} />
            <meshStandardMaterial
              color={experience.color}
              emissive={experience.color}
              emissiveIntensity={0.2}
            />
          </mesh>
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
            Professional Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
          >
            A timeline of my professional growth, showcasing the evolution of skills,
            responsibilities, and achievements throughout my career.
          </motion.p>
        </motion.div>

        {/* 3D Timeline Visualization */}
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
            {experiences.map((experience, index) => (
              <group key={experience.id} position={[index * 3 - 4.5, 0, 0]}>
                <TimelineElement3D experience={experience} index={index} />
              </group>
            ))}
          </Canvas>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className={`absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 transform -translate-x-1/2 ${isDarkMode ? 'bg-gradient-to-b from-cyber-blue via-cyber-purple to-matrix-green' : 'bg-gradient-to-b from-blue-500 via-purple-600 to-pink-500'
            }`} />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 z-10 ${isDarkMode ? 'bg-cyber-blue shadow-lg shadow-cyber-blue/50' : 'bg-purple-600 shadow-lg shadow-purple-600/50'
                  }`} />

                {/* Content Card */}
                <div className={`ml-16 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}>
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`p-6 rounded-2xl border transition-all duration-500 ${isDarkMode
                      ? 'bg-gray-800/50 border-gray-700 hover:border-cyber-blue/50 hover:bg-gray-800/80'
                      : 'bg-white/50 border-gray-200 hover:border-purple-600/50 hover:bg-white/80'
                      }`}
                  >
                    {/* Year Badge */}
                    <div className="inline-block mb-4">
                      <span
                        className="px-3 py-1 rounded-full text-sm font-cyber font-bold text-white"
                        style={{ backgroundColor: experience.color }}
                      >
                        {experience.year}
                      </span>
                    </div>

                    {/* Title and Company */}
                    <h3 className={`text-xl font-cyber font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                      {experience.title}
                    </h3>

                    <p className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-cyber-blue' : 'text-purple-600'
                      }`}>
                      {experience.company}
                    </p>

                    {/* Description */}
                    <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                      {experience.description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-4">
                      <h4 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-cyber-purple' : 'text-purple-600'
                        }`}>
                        Technologies Used:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <span
                            key={tech}
                            className={`px-2 py-1 rounded text-xs font-mono ${isDarkMode
                              ? 'bg-gray-700/50 text-gray-300'
                              : 'bg-gray-100 text-gray-700'
                              }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Achievements */}
                    <div>
                      <h4 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-matrix-green' : 'text-green-600'
                        }`}>
                        Key Achievements:
                      </h4>
                      <ul className="space-y-1">
                        {experience.achievements.map((achievement, idx) => (
                          <li key={idx} className={`text-xs flex items-start ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                            <span className="mr-2 mt-1">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 rounded-full font-cyber font-semibold transition-all duration-300 ${isDarkMode
              ? 'bg-gradient-to-r from-cyber-blue to-cyber-purple text-white shadow-lg shadow-cyber-blue/25 hover:shadow-xl hover:shadow-cyber-blue/40'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40'
              }`}
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
          >
            Let's Work Together
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
