import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Text3D, Center, Html } from '@react-three/drei';

const Projects = ({ isDarkMode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Neural Network Visualizer",
      description: "Interactive 3D visualization of neural networks with real-time training animations",
      technologies: ["React", "Three.js", "TensorFlow.js", "WebGL"],
      image: "/api/placeholder/400/300",
      category: "AI/ML",
      github: "https://github.com/oussama/neural-viz",
      live: "https://neural-viz.oussama.dev",
      color: "#FF6B6B",
      features: ["Real-time training", "3D network topology", "Interactive parameters", "Export models"]
    },
    {
      id: 2,
      title: "Quantum Portfolio",
      description: "Portfolio website with quantum-inspired animations and particle systems",
      technologies: ["React", "Framer Motion", "Three.js", "Tailwind CSS"],
      image: "/api/placeholder/400/300",
      category: "Web Development",
      github: "https://github.com/oussama/quantum-portfolio",
      live: "https://quantum.oussama.dev",
      color: "#4ECDC4",
      features: ["Particle systems", "Quantum animations", "Responsive design", "Performance optimized"]
    },
    {
      id: 3,
      title: "AI Code Assistant",
      description: "Intelligent code completion and suggestion system using machine learning",
      technologies: ["Python", "OpenAI API", "FastAPI", "React"],
      image: "/api/placeholder/400/300",
      category: "AI/ML",
      github: "https://github.com/oussama/ai-assistant",
      live: "https://ai-assistant.oussama.dev",
      color: "#45B7D1",
      features: ["Code completion", "Bug detection", "Refactoring suggestions", "Multi-language support"]
    },
    {
      id: 4,
      title: "3D Game Engine",
      description: "Custom 3D game engine built from scratch with physics and rendering",
      technologies: ["C++", "OpenGL", "Bullet Physics", "GLFW"],
      image: "/api/placeholder/400/300",
      category: "Game Development",
      github: "https://github.com/oussama/game-engine",
      live: null,
      color: "#96CEB4",
      features: ["Custom renderer", "Physics engine", "Scene graph", "Asset pipeline"]
    },
    {
      id: 5,
      title: "Blockchain Explorer",
      description: "Real-time blockchain data visualization and analytics platform",
      technologies: ["React", "Node.js", "WebSocket", "D3.js"],
      image: "/api/placeholder/400/300",
      category: "Blockchain",
      github: "https://github.com/oussama/blockchain-explorer",
      live: "https://explorer.oussama.dev",
      color: "#FFEAA7",
      features: ["Real-time data", "Interactive charts", "Multi-chain support", "API endpoints"]
    },
    {
      id: 6,
      title: "Virtual Reality Experience",
      description: "Immersive VR application for architectural visualization and design",
      technologies: ["Unity", "C#", "Oculus SDK", "Blender"],
      image: "/api/placeholder/400/300",
      category: "VR/AR",
      github: "https://github.com/oussama/vr-architect",
      live: null,
      color: "#DDA0DD",
      features: ["VR navigation", "3D modeling", "Collaborative design", "Export capabilities"]
    }
  ];

  // 3D Project Card Component
  const ProjectCard3D = ({ project, index }) => {
    return (
      <Float speed={1 + index * 0.1} rotationIntensity={0.5} floatIntensity={1}>
        <group
          position={[0, 0, 0]}
          onPointerEnter={() => setHoveredProject(project)}
          onPointerLeave={() => setHoveredProject(null)}
        >
          {/* Card Base */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[3, 4, 0.2]} />
            <meshStandardMaterial
              color={hoveredProject?.id === project.id ? project.color : (isDarkMode ? "#2A2A2A" : "#FFFFFF")}
              roughness={0.8}
              metalness={0.2}
            />
          </mesh>

          {/* Project Icon */}
          <mesh position={[0, 1, 0.2]}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial
              color={project.color}
              emissive={project.color}
              emissiveIntensity={hoveredProject?.id === project.id ? 0.8 : 0.3}
            />
          </mesh>

          {/* Project Title */}
          <Html position={[0, -0.5, 0.2]} center>
            <div className={`text-xs font-cyber font-bold px-2 py-1 rounded text-center ${isDarkMode ? 'bg-black/80 text-white' : 'bg-white/80 text-black'
              }`}>
              {project.title}
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
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
          >
            A collection of innovative projects that showcase the intersection of technology,
            creativity, and cutting-edge development practices.
          </motion.p>
        </motion.div>

        {/* 3D Project Showcase */}
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
            {projects.slice(0, 3).map((project, index) => (
              <group key={project.id} position={[index * 4 - 4, 0, 0]}>
                <ProjectCard3D project={project} index={index} />
              </group>
            ))}
          </Canvas>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ${isDarkMode
                  ? 'bg-gray-800/50 border-gray-700 hover:border-cyber-blue/50 hover:bg-gray-800/80'
                  : 'bg-white/50 border-gray-200 hover:border-purple-600/50 hover:bg-white/80'
                }`}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <div
                  className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center"
                  style={{ backgroundColor: project.color + '20' }}
                >
                  <span className="text-4xl">🚀</span>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-gray-800/80' : 'from-white/80'
                  } to-transparent`} />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${isDarkMode
                      ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30'
                      : 'bg-purple-600/20 text-purple-600 border border-purple-600/30'
                    }`}>
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className={`text-xl font-cyber font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                  {project.title}
                </h3>

                <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
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
                  {project.technologies.length > 3 && (
                    <span className={`px-2 py-1 rounded text-xs font-mono ${isDarkMode
                        ? 'bg-gray-700/50 text-gray-300'
                        : 'bg-gray-100 text-gray-700'
                      }`}>
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-cyber-blue' : 'text-purple-600'
                    }`}>
                    Key Features:
                  </h4>
                  <ul className="space-y-1">
                    {project.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className={`text-xs flex items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                        <span className="mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 px-4 py-2 rounded-lg text-center text-sm font-mono font-semibold transition-all duration-300 ${isDarkMode
                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                  >
                    GitHub
                  </motion.a>

                  {project.live && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 px-4 py-2 rounded-lg text-center text-sm font-mono font-semibold transition-all duration-300 ${isDarkMode
                          ? 'bg-cyber-blue text-white hover:bg-cyber-blue/80'
                          : 'bg-purple-600 text-white hover:bg-purple-600/80'
                        }`}
                    >
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isDarkMode ? 'from-cyber-blue/20' : 'from-purple-600/20'
                }`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 rounded-full font-cyber font-semibold transition-all duration-300 ${isDarkMode
                ? 'bg-gradient-to-r from-cyber-blue to-cyber-purple text-white shadow-lg shadow-cyber-blue/25 hover:shadow-xl hover:shadow-cyber-blue/40'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40'
              }`}
            onClick={() => window.open('https://github.com/oussama', '_blank')}
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
