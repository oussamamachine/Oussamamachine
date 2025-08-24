import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MemoryVault = ({ projects, isActive }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [vaultMode, setVaultMode] = useState('grid'); // grid, timeline, neural
  const [memoryFragments, setMemoryFragments] = useState([]);

  useEffect(() => {
    // Generate floating memory fragments
    const fragments = [];
    for (let i = 0; i < 30; i++) {
      fragments.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        text: ['Code', 'Create', 'Debug', 'Deploy', 'Innovate', 'Solve'][Math.floor(Math.random() * 6)]
      });
    }
    setMemoryFragments(fragments);
  }, []);

  const ProjectHologram = ({ project, index, mode }) => {
    const isSelected = selectedProject === project.id;
    
    return (
      <motion.div
        layout
        className="relative group cursor-pointer"
        initial={{ opacity: 0, scale: 0, rotateY: -90 }}
        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        viewport={{ once: true }}
        onClick={() => setSelectedProject(isSelected ? null : project.id)}
        whileHover={{ 
          scale: mode === 'neural' ? 1.1 : 1.05,
          rotateY: mode === 'neural' ? 10 : 0,
          z: 50
        }}
      >
        {/* Project Core */}
        <motion.div
          className="relative p-6 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 backdrop-blur-sm border border-cyan-400/30 rounded-lg overflow-hidden"
          animate={{
            borderColor: isSelected ? '#00F5FF' : '#00F5FF50',
            boxShadow: isSelected 
              ? '0 0 40px #00F5FF80, inset 0 0 40px #00F5FF20' 
              : '0 0 20px #00F5FF40'
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Holographic Grid Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
              {[...Array(64)].map((_, i) => (
                <motion.div
                  key={i}
                  className="border border-cyan-400/30"
                  animate={{
                    opacity: [0.1, 0.5, 0.1],
                    borderColor: ['#00F5FF30', '#8B5CF630', '#00F5FF30']
                  }}
                  transition={{
                    duration: Math.random() * 2 + 1,
                    repeat: Infinity,
                    delay: Math.random()
                  }}
                />
              ))}
            </div>
          </div>

          {/* Project Content */}
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <motion.div
                  className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center"
                  animate={{ rotate: isSelected ? 360 : 0 }}
                  transition={{ duration: 1 }}
                >
                  <span className="text-white text-sm font-bold">{project.emoji || '💎'}</span>
                </motion.div>
                <div>
                  <h3 className="text-lg font-cyber font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="text-xs text-cyan-400 font-mono">
                    {project.category || 'Innovation'}
                  </p>
                </div>
              </div>

              <motion.div
                className="text-green-400 font-mono text-xs"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ACTIVE
              </motion.div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1 mb-4">
              {project.technologies && project.technologies.slice(0, 4).map((tech, i) => (
                <motion.span
                  key={i}
                  className="px-2 py-1 bg-gray-800/50 text-cyan-400 text-xs rounded font-mono"
                  whileHover={{ scale: 1.1, backgroundColor: '#1F2937' }}
                >
                  {tech}
                </motion.span>
              ))}
              {project.technologies && project.technologies.length > 4 && (
                <span className="px-2 py-1 bg-gray-800/50 text-gray-400 text-xs rounded">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>

            {/* Project Stats */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-cyan-400 font-mono text-xs">Impact</div>
                <div className="text-white font-bold text-sm">{project.impact || 'High'}</div>
              </div>
              <div>
                <div className="text-purple-400 font-mono text-xs">Status</div>
                <div className="text-white font-bold text-sm">{project.status || 'Complete'}</div>
              </div>
              <div>
                <div className="text-green-400 font-mono text-xs">Year</div>
                <div className="text-white font-bold text-sm">{project.year || '2024'}</div>
              </div>
            </div>
          </div>

          {/* Scanning Line Effect */}
          <motion.div
            className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            animate={{
              y: [-20, 300, -20]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>

        {/* Expanded Details */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ opacity: 0, height: 0, rotateX: -90 }}
              animate={{ opacity: 1, height: 'auto', rotateX: 0 }}
              exit={{ opacity: 0, height: 0, rotateX: -90 }}
              transition={{ duration: 0.5 }}
              className="mt-4 p-6 bg-black/70 backdrop-blur-sm border border-cyan-400/50 rounded-lg"
            >
              <div className="space-y-4">
                {/* Detailed Description */}
                <div>
                  <h4 className="text-cyan-400 font-cyber font-bold mb-2">Memory Core</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {project.detailed_description || project.description}
                  </p>
                </div>

                {/* Full Tech Stack */}
                {project.technologies && (
                  <div>
                    <h4 className="text-purple-400 font-cyber font-bold mb-2">Neural Pathways</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <motion.span
                          key={i}
                          className="px-3 py-1 bg-gradient-to-r from-cyan-900/50 to-purple-900/50 text-white text-xs rounded-full border border-cyan-400/30"
                          whileHover={{ scale: 1.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>📄</span>
                      <span className="text-sm font-mono">Source</span>
                    </motion.a>
                  )}
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>🚀</span>
                      <span className="text-sm font-mono">Launch</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <section className="min-h-screen bg-black relative overflow-hidden py-20">
      {/* Floating Memory Fragments */}
      <div className="absolute inset-0 pointer-events-none">
        {memoryFragments.map((fragment) => (
          <motion.div
            key={fragment.id}
            className="absolute text-cyan-400/20 font-mono text-xs"
            style={{
              left: `${fragment.x}%`,
              top: `${fragment.y}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
              rotateZ: [0, 5, -5, 0]
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            {fragment.text}
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl md:text-7xl font-cyber font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
              MEMORY VAULT
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Digital archives of innovation - where ideas become reality
          </p>
        </motion.div>

        {/* View Mode Selector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="flex space-x-2 bg-black/30 backdrop-blur-sm rounded-full p-2 border border-cyan-400/30">
            {[
              { mode: 'grid', icon: '⚏', label: 'Grid' },
              { mode: 'timeline', icon: '⧁', label: 'Timeline' },
              { mode: 'neural', icon: '🧠', label: 'Neural' }
            ].map(({ mode, icon, label }) => (
              <motion.button
                key={mode}
                onClick={() => setVaultMode(mode)}
                className={`px-4 py-2 rounded-full font-cyber font-bold text-sm transition-all duration-300 ${
                  vaultMode === mode 
                    ? 'bg-cyan-400 text-black' 
                    : 'text-white hover:text-cyan-400'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">{icon}</span>
                {label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Display */}
        <motion.div
          layout
          className={`
            ${vaultMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : ''}
            ${vaultMode === 'timeline' ? 'space-y-8' : ''}
            ${vaultMode === 'neural' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8' : ''}
          `}
        >
          {projects && projects.map((project, index) => (
            <ProjectHologram 
              key={project.id || index} 
              project={project} 
              index={index} 
              mode={vaultMode}
            />
          ))}
        </motion.div>

        {/* Neural Code Display */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-black/50 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-8"
        >
          <h3 className="text-2xl font-cyber font-bold text-cyan-400 mb-6">
            {"// Memory Vault Protocol"}
          </h3>
          <div className="font-mono text-sm text-gray-300 leading-relaxed">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-purple-400">const</span> <span className="text-cyan-400">memoryVault</span> = {"{"}<br />
              <span className="ml-4 text-green-400">store:</span> <span className="text-yellow-400">(idea) =&gt; innovation</span>,<br />
              <span className="ml-4 text-green-400">retrieve:</span> <span className="text-yellow-400">(challenge) =&gt; solution</span>,<br />
              <span className="ml-4 text-green-400">process:</span> <span className="text-yellow-400">(concept) =&gt; reality</span>,<br />
              <span className="ml-4 text-green-400">legacy:</span> <span className="text-yellow-400">&quot;Code that changes the world&quot;</span><br />
              {"}"};
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MemoryVault;
