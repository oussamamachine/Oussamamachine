import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GeneticProjects = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [glitchActive, setGlitchActive] = useState(false);

  // Simulate genetic code sequences
  const generateGeneticCode = (project) => {
    const bases = ['A', 'T', 'C', 'G'];
    const techMap = {
      'React': 'ATCG',
      'Node.js': 'GCTA',
      'Python': 'CGAT',
      'TypeScript': 'TAGC',
      'Next.js': 'ATGC',
      'AI': 'CGTG',
      'ML': 'TGCA'
    };
    
    let sequence = '';
    project.technologies.forEach(tech => {
      sequence += techMap[tech] || 'ATCG';
    });
    
    // Pad sequence to desired length
    while (sequence.length < 48) {
      sequence += bases[Math.floor(Math.random() * bases.length)];
    }
    
    return sequence.slice(0, 48);
  };

  const getProjectColor = (status) => {
    switch (status) {
      case 'active': return '#00F5FF';
      case 'completed': return '#39FF14';
      case 'future': return '#FF6B35';
      default: return '#9D4EDD';
    }
  };

  const triggerGlitch = () => {
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) triggerGlitch();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-4 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-cyber font-bold mb-6">
          <span className="bg-gradient-to-r from-cyber-blue to-matrix-green bg-clip-text text-transparent">
            Project.DNA()
          </span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Each project encoded in genetic sequences—where technology meets biology
          <br />
          <span className="text-cyber-blue font-mono">Click the DNA strands to decode project information</span>
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => {
          const geneticCode = generateGeneticCode(project);
          const projectColor = getProjectColor(project.status);
          
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
            >
              {/* DNA Helix Container */}
              <div className="neural-card p-6 h-96 relative overflow-hidden">
                {/* Glitch Effect */}
                {glitchActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.1, repeat: 3 }}
                    className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-blue-500/20 mix-blend-overlay pointer-events-none"
                  />
                )}

                {/* Project Title */}
                <div className="relative z-10 mb-4">
                  <motion.h3
                    animate={{
                      color: hoveredProject === project.id ? projectColor : '#fff'
                    }}
                    className="text-xl font-cyber font-bold mb-2 transition-colors"
                  >
                    {project.title}
                  </motion.h3>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-400">Status:</span>
                    <motion.span
                      animate={{
                        color: projectColor,
                        textShadow: hoveredProject === project.id ? `0 0 10px ${projectColor}` : 'none'
                      }}
                      className="font-mono capitalize"
                    >
                      {project.status}
                    </motion.span>
                  </div>
                </div>

                {/* DNA Sequence Display */}
                <div className="relative h-48 mb-4">
                  <div className="absolute inset-0 flex flex-col justify-center">
                    {/* DNA Strands */}
                    {[0, 1, 2, 3].map((strandIndex) => (
                      <motion.div
                        key={strandIndex}
                        className="flex items-center justify-center mb-2"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ 
                          x: 0, 
                          opacity: 1,
                          transition: {
                            delay: strandIndex * 0.2,
                            duration: 0.8
                          }
                        }}
                      >
                        <div className="font-mono text-xs flex space-x-1">
                          {geneticCode.slice(strandIndex * 12, (strandIndex + 1) * 12)
                            .split('')
                            .map((base, baseIndex) => (
                              <motion.span
                                key={baseIndex}
                                className={`
                                  w-6 h-6 flex items-center justify-center rounded border
                                  ${base === 'A' ? 'bg-red-500/20 border-red-500/50 text-red-300' : ''}
                                  ${base === 'T' ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' : ''}
                                  ${base === 'C' ? 'bg-green-500/20 border-green-500/50 text-green-300' : ''}
                                  ${base === 'G' ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300' : ''}
                                `}
                                whileHover={{ 
                                  scale: 1.2,
                                  boxShadow: '0 0 10px currentColor'
                                }}
                                animate={{
                                  opacity: hoveredProject === project.id ? [0.7, 1, 0.7] : 0.7
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: hoveredProject === project.id ? Infinity : 0,
                                  delay: baseIndex * 0.1
                                }}
                              >
                                {base}
                              </motion.span>
                            ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Connecting Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {[0, 1, 2].map((lineIndex) => (
                      <motion.line
                        key={lineIndex}
                        x1="20%"
                        y1={`${25 + lineIndex * 20}%`}
                        x2="80%"
                        y2={`${35 + lineIndex * 20}%`}
                        stroke={projectColor}
                        strokeWidth="1"
                        strokeDasharray="5,5"
                        initial={{ pathLength: 0 }}
                        animate={{ 
                          pathLength: 1,
                          opacity: hoveredProject === project.id ? 0.8 : 0.3
                        }}
                        transition={{ 
                          duration: 2,
                          delay: lineIndex * 0.3
                        }}
                      />
                    ))}
                  </svg>
                </div>

                {/* Technologies */}
                <div className="relative z-10">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: techIndex * 0.1 }}
                        className="px-2 py-1 bg-neural-glow/20 border border-gray-600/30 rounded text-xs font-mono text-gray-300"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                  animate={{
                    backgroundColor: hoveredProject === project.id 
                      ? `${projectColor}10` 
                      : 'rgba(0, 0, 0, 0)'
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Status Indicator */}
                <motion.div
                  className="absolute top-4 right-4 w-3 h-3 rounded-full"
                  animate={{
                    backgroundColor: projectColor,
                    boxShadow: `0 0 20px ${projectColor}`,
                    scale: hoveredProject === project.id ? [1, 1.3, 1] : 1
                  }}
                  transition={{
                    duration: 2,
                    repeat: hoveredProject === project.id ? Infinity : 0
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="neural-card max-w-2xl mx-4 p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const project = projects.find(p => p.id === selectedProject);
                if (!project) return null;
                
                const geneticCode = generateGeneticCode(project);
                const projectColor = getProjectColor(project.status);
                
                return (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-cyber font-bold text-white">
                        {project.title}
                      </h3>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedProject(null)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </motion.button>
                    </div>

                    <div className="mb-6">
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {project.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <h4 className="text-sm font-cyber text-cyber-blue mb-2">STATUS</h4>
                          <span 
                            className="font-mono capitalize"
                            style={{ color: projectColor }}
                          >
                            {project.status}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-sm font-cyber text-cyber-blue mb-2">TECHNOLOGIES</h4>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.map(tech => (
                              <span key={tech} className="px-2 py-1 bg-neural-glow/20 border border-gray-600/30 rounded text-xs font-mono text-gray-300">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-sm font-cyber text-cyber-blue mb-3">GENETIC SEQUENCE</h4>
                        <div className="bg-neural-glow/10 p-4 rounded-lg font-mono text-sm">
                          <div className="grid grid-cols-12 gap-1">
                            {geneticCode.split('').map((base, index) => (
                              <motion.span
                                key={index}
                                className={`
                                  w-6 h-6 flex items-center justify-center rounded border text-xs
                                  ${base === 'A' ? 'bg-red-500/20 border-red-500/50 text-red-300' : ''}
                                  ${base === 'T' ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' : ''}
                                  ${base === 'C' ? 'bg-green-500/20 border-green-500/50 text-green-300' : ''}
                                  ${base === 'G' ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300' : ''}
                                `}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.02 }}
                              >
                                {base}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="cyber-button px-6 py-2"
                        onClick={() => setSelectedProject(null)}
                      >
                        Understood
                      </motion.button>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GeneticProjects;
