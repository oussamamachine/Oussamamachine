import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const NeuralGenesis = ({ timeline, isActive }) => {
  const [activeNode, setActiveNode] = useState(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const generateNeuralPath = () => {
    if (!timeline || !Array.isArray(timeline)) return [];
    
    const path = [];
    timeline.forEach((phase, index) => {
      const angle = (index / timeline.length) * Math.PI * 2;
      const radius = 150 + (index * 20);
      const x = Math.cos(angle) * radius + 400;
      const y = Math.sin(angle) * radius + 400;
      path.push({ x, y, phase, index });
    });
    return path;
  };

  const neuralPath = generateNeuralPath();

  const getPhaseColor = (status) => {
    switch (status) {
      case 'completed': return '#00FF88';
      case 'active': return '#00F5FF';
      case 'future': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getPhaseIcon = (phase) => {
    const icons = {
      'Web Foundations': '🌐',
      'Backend Mastery': '⚙️',
      'Full Stack': '🔄',
      'AI Integration': '🤖',
      'Innovation Lab': '🚀'
    };
    return icons[phase.title] || '💎';
  };

  return (
    <section className="min-h-screen bg-black relative overflow-hidden py-20">
      {/* Neural Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
          {[...Array(400)].map((_, i) => (
            <motion.div
              key={i}
              className="border border-cyan-400/20"
              animate={{
                opacity: [0.1, 0.3, 0.1],
                borderColor: ['#00F5FF20', '#8B5CF660', '#00F5FF20']
              }}
              transition={{
                duration: Math.random() * 4 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-7xl font-cyber font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              NEURAL GENESIS
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The evolutionary journey of a developer's consciousness - 
            from first <span className="text-cyan-400 font-mono">{"<div>"}</span> to 
            AI architect
          </p>
        </motion.div>

        {/* Neural Network Timeline */}
        <div className="relative h-[800px] mx-auto max-w-4xl">
          {/* Neural Connections */}
          <svg className="absolute inset-0 w-full h-full">
            {neuralPath.map((node, index) => {
              if (index === neuralPath.length - 1) return null;
              const nextNode = neuralPath[index + 1];
              return (
                <motion.line
                  key={`connection-${index}`}
                  x1={node.x}
                  y1={node.y}
                  x2={nextNode.x}
                  y2={nextNode.y}
                  stroke="url(#neuralGradient)"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  viewport={{ once: true }}
                />
              );
            })}
            
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#00FF88" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Neural Nodes */}
          {neuralPath.map((node, index) => (
            <motion.div
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: node.x, top: node.y }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              viewport={{ once: true }}
              onHoverStart={() => setActiveNode(index)}
              onHoverEnd={() => setActiveNode(null)}
            >
              {/* Node Core */}
              <motion.div
                className="relative w-16 h-16 rounded-full border-2 flex items-center justify-center"
                style={{ 
                  borderColor: getPhaseColor(node.phase.status),
                  backgroundColor: `${getPhaseColor(node.phase.status)}20`
                }}
                animate={{
                  boxShadow: [
                    `0 0 20px ${getPhaseColor(node.phase.status)}40`,
                    `0 0 40px ${getPhaseColor(node.phase.status)}60`,
                    `0 0 20px ${getPhaseColor(node.phase.status)}40`
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                whileHover={{ scale: 1.2 }}
              >
                <span className="text-2xl">{getPhaseIcon(node.phase)}</span>
                
                {/* Pulsing Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: getPhaseColor(node.phase.status) }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.8, 0, 0.8]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Node Label */}
              <motion.div
                className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: activeNode === index ? 1 : 0.7, 
                  y: activeNode === index ? 0 : 10,
                  scale: activeNode === index ? 1.1 : 1
                }}
              >
                <h3 className="font-cyber font-bold text-white text-sm mb-1">
                  {node.phase.title}
                </h3>
                <p className="text-xs text-gray-400 font-mono">
                  {node.phase.year}
                </p>
              </motion.div>

              {/* Detailed Info Panel */}
              {activeNode === index && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  className="absolute top-32 left-1/2 transform -translate-x-1/2 w-80 bg-black/90 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-4 z-20"
                  style={{ borderColor: getPhaseColor(node.phase.status) }}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-cyber font-bold text-white">
                        {node.phase.title}
                      </h4>
                      <span 
                        className="px-2 py-1 rounded text-xs font-mono"
                        style={{ 
                          backgroundColor: `${getPhaseColor(node.phase.status)}20`,
                          color: getPhaseColor(node.phase.status)
                        }}
                      >
                        {node.phase.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {node.phase.description}
                    </p>
                    
                    {node.phase.skills && (
                      <div className="flex flex-wrap gap-1">
                        {node.phase.skills.map((skill, i) => (
                          <span 
                            key={i}
                            className="px-2 py-1 bg-gray-800 text-cyan-400 text-xs rounded font-mono"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}

          {/* Data Flow Animation */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ y }}
          >
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 200 - 100],
                  y: [0, Math.random() * 200 - 100],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Neural Code Display */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-black/50 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-8"
        >
          <h3 className="text-2xl font-cyber font-bold text-cyan-400 mb-6">
            {"// Neural Evolution Code"}
          </h3>
          <div className="font-mono text-sm text-gray-300 leading-relaxed">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-purple-400">const</span> <span className="text-cyan-400">developerEvolution</span> = {"{"}
              <br />
              <span className="ml-4 text-green-400">origin:</span> <span className="text-yellow-400">"curiosity"</span>,
              <br />
              <span className="ml-4 text-green-400">journey:</span> <span className="text-yellow-400">"continuous_learning"</span>,
              <br />
              <span className="ml-4 text-green-400">destination:</span> <span className="text-yellow-400">"innovation"</span>,
              <br />
              <span className="ml-4 text-green-400">motto:</span> <span className="text-yellow-400">"Code. Create. Inspire."</span>
              <br />
              {"}"};
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NeuralGenesis;
