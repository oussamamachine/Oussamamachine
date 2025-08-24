import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const NeuralNodeExplorer = ({ nodes = [] }) => {
  const [activeNode, setActiveNode] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  // Neural network animation based on scroll
  const networkRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const nodeScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const nodePositions = [
    { x: 20, y: 30, size: 'large' },
    { x: 70, y: 20, size: 'medium' },
    { x: 50, y: 50, size: 'large' },
    { x: 30, y: 70, size: 'small' },
    { x: 80, y: 60, size: 'medium' },
    { x: 15, y: 80, size: 'small' },
  ];

  const getNodeColor = (index) => {
    const colors = ['#00F5FF', '#8B5CF6', '#00FF00', '#FF6B6B', '#FFD700', '#FF69B4'];
    return colors[index % colors.length];
  };

  const getSizeClass = (size) => {
    switch (size) {
      case 'large': return 'w-20 h-20';
      case 'medium': return 'w-16 h-16';
      case 'small': return 'w-12 h-12';
      default: return 'w-16 h-16';
    }
  };

  // Create neural connections
  const createConnections = () => {
    const connections = [];
    nodePositions.forEach((node, i) => {
      nodePositions.forEach((otherNode, j) => {
        if (i < j && Math.random() > 0.6) {
          connections.push({ from: i, to: j });
        }
      });
    });
    return connections;
  };

  const connections = createConnections();

  return (
    <section className="py-4 px-4 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute w-full h-full opacity-10"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, #00F5FF 0%, transparent 50%)`
          }}
        />
        {/* Floating particles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyber-blue rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-8xl font-cyber font-bold mb-8">
            <span className="bg-gradient-to-r from-cyber-blue via-cyber-purple to-matrix-green bg-clip-text text-transparent">
              Neural.explore()
            </span>
          </h2>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Navigate the interconnected neurons of knowledge and experience
            <br />
            <span className="text-cyber-blue font-mono">Each node pulses with living code</span>
          </p>
        </motion.div>

        {/* Neural Network Visualization */}
        <div className="relative h-96 md:h-[600px] mb-16">
          <motion.div
            style={{ rotate: networkRotation, scale: nodeScale }}
            className="w-full h-full relative"
          >
            {/* Neural Connections */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
              {connections.map((connection, index) => {
                const fromNode = nodePositions[connection.from];
                const toNode = nodePositions[connection.to];
                return (
                  <motion.line
                    key={index}
                    x1={`${fromNode.x}%`}
                    y1={`${fromNode.y}%`}
                    x2={`${toNode.x}%`}
                    y2={`${toNode.y}%`}
                    stroke={getNodeColor(index)}
                    strokeWidth="2"
                    opacity="0.3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: index * 0.2 }}
                  >
                    <animate
                      attributeName="opacity"
                      values="0.1;0.6;0.1"
                      dur="3s"
                      repeatCount="indefinite"
                      begin={`${index * 0.5}s`}
                    />
                  </motion.line>
                );
              })}
            </svg>

            {/* Neural Nodes */}
            {nodePositions.map((position, index) => {
              const node = nodes[index % nodes.length];
              const nodeColor = getNodeColor(index);
              const isActive = activeNode === index;
              
              return (
                <motion.div
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    zIndex: isActive ? 20 : 10,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveNode(isActive ? null : index)}
                >
                  {/* Node Core */}
                  <motion.div
                    className={`${getSizeClass(position.size)} rounded-full border-4 flex items-center justify-center relative group`}
                    style={{ 
                      borderColor: nodeColor,
                      backgroundColor: `${nodeColor}20`
                    }}
                    whileHover={{ scale: 1.2 }}
                    animate={isActive ? { 
                      scale: [1, 1.1, 1],
                      boxShadow: [`0 0 20px ${nodeColor}`, `0 0 40px ${nodeColor}`, `0 0 20px ${nodeColor}`]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-2xl">{node?.icon || '🚀'}</span>
                    
                    {/* Pulsing Rings */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 opacity-40"
                      style={{ borderColor: nodeColor }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.4, 0, 0.4],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    />
                    
                    {/* Energy Particles */}
                    {isActive && [...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{ backgroundColor: nodeColor }}
                        initial={{
                          x: 0,
                          y: 0,
                          opacity: 1,
                        }}
                        animate={{
                          x: Math.cos((i / 8) * Math.PI * 2) * 60,
                          y: Math.sin((i / 8) * Math.PI * 2) * 60,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Node Label */}
                  <motion.div
                    className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 1 : 0.7 }}
                  >
                    <div 
                      className="text-sm font-mono whitespace-nowrap"
                      style={{ color: nodeColor }}
                    >
                      {node?.title || `Node ${index + 1}`}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Active Node Details */}
        <AnimatePresence mode="wait">
          {activeNode !== null && (
            <motion.div
              key={activeNode}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="max-w-4xl mx-auto"
            >
              <div 
                className="neural-card relative overflow-hidden"
                style={{
                  borderColor: getNodeColor(activeNode),
                  boxShadow: `0 0 30px ${getNodeColor(activeNode)}40`
                }}
              >
                {/* Glitch Effect Background */}
                <motion.div
                  className="absolute inset-0 opacity-5"
                  style={{ backgroundColor: getNodeColor(activeNode) }}
                  animate={{
                    x: [-2, 2, -2],
                    opacity: [0.05, 0.1, 0.05],
                  }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 
                      className="text-3xl font-cyber font-bold"
                      style={{ color: getNodeColor(activeNode) }}
                    >
                      {nodes[activeNode % nodes.length]?.icon || '🚀'} 
                      {nodes[activeNode % nodes.length]?.title || `Neural Node ${activeNode + 1}`}
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setActiveNode(null)}
                      className="text-gray-400 hover:text-white transition-colors text-2xl"
                    >
                      ×
                    </motion.button>
                  </div>
                  
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    {nodes[activeNode % nodes.length]?.description || 
                     "This neural node contains fragments of consciousness, experiences encoded in digital DNA."}
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    {(nodes[activeNode % nodes.length]?.technologies || ['React', 'AI', 'Neural']).map((tech) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: Math.random() * 0.5 }}
                        className="px-4 py-2 text-sm bg-neural-glow/30 border rounded-full"
                        style={{ 
                          borderColor: `${getNodeColor(activeNode)}40`,
                          color: getNodeColor(activeNode)
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Neural Activity Monitor */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="neural-card max-w-xl mx-auto">
            <h4 className="font-cyber text-xl text-cyber-blue mb-4">
              🧠 Neural Activity Monitor
            </h4>
            <div className="flex justify-between items-center text-sm font-mono">
              <span className="text-gray-400">Neurons Active:</span>
              <motion.span 
                className="text-matrix-green"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {nodePositions.length}/∞
              </motion.span>
            </div>
            <div className="flex justify-between items-center text-sm font-mono mt-2">
              <span className="text-gray-400">Consciousness Level:</span>
              <motion.span 
                className="text-cyber-blue"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                EXPANDING...
              </motion.span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NeuralNodeExplorer;
