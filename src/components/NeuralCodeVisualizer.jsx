import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NeuralCodeVisualizer = ({ isActive = true, codeBase = null }) => {
  const [activeNodes, setActiveNodes] = useState([]);
  const [codeFlow, setCodeFlow] = useState([]);
  const [executionState, setExecutionState] = useState('idle');
  const [neuralConnections, setNeuralConnections] = useState([]);
  const [liveDebugging, setLiveDebugging] = useState(false);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Code patterns that represent different technologies
  const codePatterns = {
    react: {
      color: '#61dafb',
      patterns: ['useState()', 'useEffect()', 'JSX', 'component()'],
      frequency: 0.8,
      complexity: 'high'
    },
    blockchain: {
      color: '#f7931a',
      patterns: ['contract', 'mapping', 'modifier', 'payable'],
      frequency: 0.6,
      complexity: 'extreme'
    },
    nodejs: {
      color: '#339933',
      patterns: ['require()', 'async/await', 'express()', 'middleware'],
      frequency: 0.7,
      complexity: 'medium'
    },
    threejs: {
      color: '#000000',
      patterns: ['THREE.', 'scene.add()', 'renderer', 'camera'],
      frequency: 0.5,
      complexity: 'high'
    },
    ai: {
      color: '#ff6b6b',
      patterns: ['neural', 'tensor', 'model.fit()', 'predict()'],
      frequency: 0.4,
      complexity: 'extreme'
    }
  };

  // Initialize neural network
  useEffect(() => {
    const initializeNetwork = () => {
      const nodes = [];
      const connections = [];
      
      // Create neural nodes for each technology
      Object.entries(codePatterns).forEach(([tech, config], techIndex) => {
        const baseX = (techIndex * 150) + 100;
        const baseY = 200;
        
        // Main technology node
        const mainNode = {
          id: `${tech}-main`,
          x: baseX,
          y: baseY,
          tech,
          type: 'main',
          activity: 0,
          connections: [],
          codeFragment: config.patterns[0],
          color: config.color
        };
        nodes.push(mainNode);

        // Create pattern nodes
        config.patterns.forEach((pattern, patternIndex) => {
          const angle = (patternIndex / config.patterns.length) * Math.PI * 2;
          const radius = 80;
          const nodeX = baseX + Math.cos(angle) * radius;
          const nodeY = baseY + Math.sin(angle) * radius;

          const patternNode = {
            id: `${tech}-${patternIndex}`,
            x: nodeX,
            y: nodeY,
            tech,
            type: 'pattern',
            activity: 0,
            codeFragment: pattern,
            color: config.color,
            parentId: mainNode.id
          };
          nodes.push(patternNode);

          // Create connection
          connections.push({
            id: `${mainNode.id}-${patternNode.id}`,
            from: mainNode.id,
            to: patternNode.id,
            strength: 0,
            dataFlow: []
          });
        });
      });

      // Create inter-technology connections
      for (let i = 0; i < nodes.length - 1; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeA = nodes[i];
          const nodeB = nodes[j];
          
          // Connect different technologies if they're compatible
          if (nodeA.tech !== nodeB.tech && 
              nodeA.type === 'main' && 
              nodeB.type === 'main') {
            connections.push({
              id: `${nodeA.id}-${nodeB.id}`,
              from: nodeA.id,
              to: nodeB.id,
              strength: 0,
              dataFlow: [],
              crossTech: true
            });
          }
        }
      }

      setActiveNodes(nodes);
      setNeuralConnections(connections);
    };

    initializeNetwork();
  }, []);

  // Simulate code execution
  useEffect(() => {
    if (!isActive) return;

    const executionInterval = setInterval(() => {
      // Randomly activate nodes
      setActiveNodes(prev => prev.map(node => {
        const pattern = codePatterns[node.tech];
        const shouldActivate = Math.random() < pattern.frequency * 0.1;
        
        return {
          ...node,
          activity: shouldActivate ? 
            Math.min(node.activity + 0.3, 1) : 
            Math.max(node.activity - 0.1, 0)
        };
      }));

      // Update connection strength
      setNeuralConnections(prev => prev.map(conn => {
        const fromNode = activeNodes.find(n => n.id === conn.from);
        const toNode = activeNodes.find(n => n.id === conn.to);
        
        if (fromNode && toNode) {
          const combinedActivity = (fromNode.activity + toNode.activity) / 2;
          return {
            ...conn,
            strength: combinedActivity,
            dataFlow: combinedActivity > 0.5 ? 
              generateDataFlow(fromNode, toNode) : []
          };
        }
        return conn;
      }));

      // Update execution state
      const totalActivity = activeNodes.reduce((sum, node) => sum + node.activity, 0);
      if (totalActivity > 5) setExecutionState('high');
      else if (totalActivity > 2) setExecutionState('medium');
      else setExecutionState('idle');

    }, 200);

    return () => clearInterval(executionInterval);
  }, [isActive, activeNodes]);

  // Generate data flow between nodes
  const generateDataFlow = (fromNode, toNode) => {
    const flow = [];
    const steps = 10;
    
    for (let i = 0; i <= steps; i++) {
      const progress = i / steps;
      flow.push({
        x: fromNode.x + (toNode.x - fromNode.x) * progress,
        y: fromNode.y + (toNode.y - fromNode.y) * progress,
        progress,
        data: fromNode.codeFragment
      });
    }
    
    return flow;
  };

  // Live code execution simulation
  const executeCode = (techType) => {
    setExecutionState('executing');
    
    // Activate specific technology nodes
    setActiveNodes(prev => prev.map(node => ({
      ...node,
      activity: node.tech === techType ? 1 : node.activity * 0.5
    })));

    // Add code flow animation
    const newFlow = {
      id: Date.now(),
      tech: techType,
      code: codePatterns[techType].patterns[0],
      path: generateExecutionPath(techType),
      progress: 0
    };

    setCodeFlow(prev => [...prev.slice(-5), newFlow]);

    setTimeout(() => {
      setExecutionState('idle');
      setCodeFlow(prev => prev.filter(f => f.id !== newFlow.id));
    }, 3000);
  };

  const generateExecutionPath = (techType) => {
    const techNodes = activeNodes.filter(node => node.tech === techType);
    return techNodes.map(node => ({ x: node.x, y: node.y }));
  };

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw neural connections
      neuralConnections.forEach(conn => {
        if (conn.strength > 0.1) {
          const fromNode = activeNodes.find(n => n.id === conn.from);
          const toNode = activeNodes.find(n => n.id === conn.to);
          
          if (fromNode && toNode) {
            ctx.strokeStyle = conn.crossTech ? '#ffffff40' : `${fromNode.color}80`;
            ctx.lineWidth = conn.strength * 3;
            ctx.beginPath();
            ctx.moveTo(fromNode.x, fromNode.y);
            ctx.lineTo(toNode.x, toNode.y);
            ctx.stroke();

            // Draw data flow
            conn.dataFlow.forEach((flow, i) => {
              ctx.fillStyle = fromNode.color;
              ctx.globalAlpha = 1 - flow.progress;
              ctx.beginPath();
              ctx.arc(flow.x, flow.y, 2, 0, Math.PI * 2);
              ctx.fill();
              ctx.globalAlpha = 1;
            });
          }
        }
      });

      // Draw neural nodes
      activeNodes.forEach(node => {
        // Node glow effect
        if (node.activity > 0.1) {
          ctx.shadowBlur = node.activity * 20;
          ctx.shadowColor = node.color;
        }

        // Main node circle
        ctx.fillStyle = node.type === 'main' ? node.color : `${node.color}80`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.type === 'main' ? 15 : 8, 0, Math.PI * 2);
        ctx.fill();

        // Activity pulse
        if (node.activity > 0.5) {
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 20 + node.activity * 10, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.shadowBlur = 0;
      });

      if (isActive) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [activeNodes, neuralConnections, isActive]);

  return (
    <div className="neural-code-visualizer relative w-full max-w-4xl mx-auto">
      {/* Control Panel */}
      <div className="flex justify-between items-center mb-4 p-4 bg-black/50 backdrop-blur-sm rounded-lg border border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="text-cyan-400 font-mono text-lg">🧠 NEURAL CODE</div>
          <div 
            className={`px-3 py-1 rounded-full text-xs font-mono ${
              executionState === 'high' ? 'bg-red-500/20 text-red-400' :
              executionState === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-green-500/20 text-green-400'
            }`}
          >
            {executionState.toUpperCase()}
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded font-mono text-sm hover:bg-purple-600/30 transition-colors"
            onClick={() => setLiveDebugging(!liveDebugging)}
          >
            {liveDebugging ? 'Stop Debug' : 'Live Debug'}
          </button>
        </div>
      </div>

      {/* Technology Execution Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(codePatterns).map(([tech, config]) => (
          <motion.button
            key={tech}
            className="px-4 py-2 rounded font-mono text-sm border-2 transition-all"
            style={{
              borderColor: `${config.color}40`,
              backgroundColor: `${config.color}10`,
              color: config.color
            }}
            onClick={() => executeCode(tech)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Execute {tech.toUpperCase()}
          </motion.button>
        ))}
      </div>

      {/* Main Canvas */}
      <div className="relative bg-black/70 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden">
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="w-full"
          style={{ background: 'linear-gradient(45deg, #000000, #111827)' }}
        />

        {/* Code Flow Overlay */}
        <AnimatePresence>
          {codeFlow.map(flow => (
            <motion.div
              key={flow.id}
              className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded px-3 py-2 font-mono text-sm"
              style={{ color: codePatterns[flow.tech].color }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              {flow.tech}: {flow.code}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Node Information */}
        <div className="absolute bottom-4 left-4 space-y-2">
          {activeNodes.filter(node => node.activity > 0.5).map(node => (
            <motion.div
              key={node.id}
              className="bg-black/80 backdrop-blur-sm rounded px-3 py-1 font-mono text-xs"
              style={{ color: node.color }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {node.tech}: {node.codeFragment}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Live Debugging Panel */}
      <AnimatePresence>
        {liveDebugging && (
          <motion.div
            className="mt-4 bg-black/80 backdrop-blur-sm rounded-lg border border-green-400 p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="text-green-400 font-mono text-lg mb-4">🐛 LIVE DEBUG CONSOLE</div>
            
            <div className="space-y-2 text-sm font-mono">
              <div className="text-green-300">
                &gt; Neural network initialized with {activeNodes.length} nodes
              </div>
              <div className="text-green-300">
                &gt; Active connections: {neuralConnections.filter(c => c.strength > 0.1).length}
              </div>
              <div className="text-green-300">
                &gt; Execution state: {executionState}
              </div>
              
              {activeNodes.filter(n => n.activity > 0.5).map(node => (
                <div key={node.id} className="text-cyan-400">
                  &gt; {node.tech}.{node.codeFragment} - activity: {Math.round(node.activity * 100)}%
                </div>
              ))}
              
              <div className="text-gray-400">
                &gt; System ready for code execution...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Technology Legend */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2">
        {Object.entries(codePatterns).map(([tech, config]) => {
          const activeCount = activeNodes.filter(n => n.tech === tech && n.activity > 0.1).length;
          
          return (
            <div
              key={tech}
              className="bg-black/30 backdrop-blur-sm rounded-lg p-3 border"
              style={{ borderColor: `${config.color}40` }}
            >
              <div 
                className="font-mono text-sm font-bold mb-1"
                style={{ color: config.color }}
              >
                {tech.toUpperCase()}
              </div>
              <div className="text-xs text-gray-400">
                Active: {activeCount}/{activeNodes.filter(n => n.tech === tech).length}
              </div>
              <div className="text-xs text-gray-400">
                Complexity: {config.complexity}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NeuralCodeVisualizer;
