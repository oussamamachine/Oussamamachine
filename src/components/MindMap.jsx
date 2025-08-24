import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MindMap = ({ mindMapData }) => {
  const [activeNode, setActiveNode] = useState(null);

  const nodes = [
    { id: 'projects', label: 'Projects', color: 'cyber-blue', icon: '🚀', data: mindMapData.projects },
    { id: 'skills', label: 'Skills', color: 'matrix-green', icon: '⚡', data: mindMapData.skills },
    { id: 'failures', label: 'Failures', color: 'red-400', icon: '💥', data: mindMapData.failures },
    { id: 'values', label: 'Values', color: 'cyber-purple', icon: '💎', data: mindMapData.values },
  ];

  const nodePositions = [
    { x: 25, y: 25 },  // top-left
    { x: 75, y: 25 },  // top-right  
    { x: 25, y: 75 },  // bottom-left
    { x: 75, y: 75 },  // bottom-right
  ];

  const handleNodeClick = (node) => {
    setActiveNode(activeNode?.id === node.id ? null : node);
  };

  const renderNodeContent = (node) => {
    switch (node.id) {
      case 'projects':
        return (
          <div className="space-y-4">
            {node.data.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="neural-card"
              >
                <h4 className="font-cyber text-lg text-cyber-blue mb-2">{project.title}</h4>
                <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs bg-neural-glow/30 border border-cyber-blue/20 rounded-full text-cyber-blue">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        );
      
      case 'skills':
        return (
          <div className="space-y-4">
            {node.data.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="neural-card"
              >
                <h4 className="font-cyber text-lg text-matrix-green mb-3">{category.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <span key={skill} className="px-3 py-1 text-sm bg-neural-glow/30 border border-matrix-green/20 rounded-full text-matrix-green">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        );
      
      case 'failures':
        return (
          <div className="space-y-4">
            {node.data.map((failure, index) => (
              <motion.div
                key={failure.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="neural-card"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-cyber text-lg text-red-400">{failure.title}</h4>
                  <span className="text-xs text-gray-500">{failure.year}</span>
                </div>
                <p className="text-yellow-400 text-sm font-mono mb-2">"{failure.lesson}"</p>
                <p className="text-gray-300 text-sm">{failure.impact}</p>
              </motion.div>
            ))}
          </div>
        );
      
      case 'values':
        return (
          <div className="space-y-4">
            {node.data.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="neural-card"
              >
                <h4 className="font-cyber text-lg text-cyber-purple mb-2">{value.title}</h4>
                <p className="text-gray-300 text-sm italic">"{value.description}"</p>
              </motion.div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

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
          <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
            MindMap Explorer
          </span>
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Navigate through the neural pathways of experience, knowledge, and wisdom
        </p>
      </motion.div>

      <div className="relative h-96 md:h-[500px] mb-12">
        {/* Central Neural Core */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 rounded-full border-4 border-cyber-blue bg-neural-darker flex items-center justify-center"
          >
            <span className="text-2xl">🧠</span>
          </motion.div>
        </div>

        {/* Neural Nodes */}
        {nodes.map((node, index) => {
          const position = nodePositions[index];
          const isActive = activeNode?.id === node.id;
          
          return (
            <motion.div
              key={node.id}
              className="absolute"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Connection Line */}
              <div 
                className={`absolute w-1 bg-gradient-to-r from-${node.color} to-cyber-blue opacity-30 z-0`}
                style={{
                  height: Math.sqrt(Math.pow(50 - position.x, 2) + Math.pow(50 - position.y, 2)) + '%',
                  transformOrigin: 'bottom',
                  transform: `rotate(${Math.atan2(50 - position.y, 50 - position.x) * 180 / Math.PI + 90}deg)`,
                  bottom: '2rem'
                }}
              />

              {/* Node */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNodeClick(node)}
                className={`w-24 h-24 rounded-full border-4 border-${node.color} bg-neural-darker flex flex-col items-center justify-center relative z-10 group transition-all duration-300 ${
                  isActive ? 'bg-neural-glow' : 'hover:bg-neural-glow/50'
                }`}
              >
                <span className="text-2xl mb-1">{node.icon}</span>
                <span className={`text-xs font-mono text-${node.color}`}>{node.label}</span>
                
                {/* Pulsing Ring */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={`absolute inset-0 rounded-full border-2 border-${node.color}`}
                />
              </motion.button>

              {/* Node Label */}
              <div className={`text-center mt-2 text-sm font-mono text-${node.color}`}>
                {node.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Active Node Content */}
      <AnimatePresence mode="wait">
        {activeNode && (
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="neural-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-2xl font-cyber text-${activeNode.color}`}>
                  {activeNode.icon} {activeNode.label}
                </h3>
                <button
                  onClick={() => setActiveNode(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              {renderNodeContent(activeNode)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MindMap;
