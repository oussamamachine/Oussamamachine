import React from 'react';
import { motion } from 'framer-motion';

const CodeDNA = ({ timeline }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-matrix-green border-matrix-green';
      case 'active': return 'text-cyber-blue border-cyber-blue';
      case 'future': return 'text-cyber-purple border-cyber-purple';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✓';
      case 'active': return '⚡';
      case 'future': return '🚀';
      default: return '○';
    }
  };

  return (
    <section className="py-4 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center mb-4"
      >
        <h2 className="text-5xl md:text-6xl font-cyber font-bold mb-6">
          <span className="bg-gradient-to-r from-cyber-blue to-matrix-green bg-clip-text text-transparent">
            CodeDNA()
          </span>
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          The evolutionary timeline of a developer's genome - from first HTML tag to AI architect
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Central DNA Helix Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-matrix-green via-cyber-blue to-cyber-purple opacity-30"></div>

        {/* Timeline Items */}
        <div className="space-y-8">
          {timeline.map((phase, index) => (
            <motion.div
              key={phase.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex items-center ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Content Card */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="neural-card group cursor-pointer"
                >
                  <div className={`text-2xl font-cyber font-bold mb-2 ${getStatusColor(phase.status)}`}>
                    {phase.year}
                  </div>
                  <h3 className="text-xl font-mono font-semibold text-white mb-3">
                    {phase.phase}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {phase.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 justify-start">
                    {phase.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: techIndex * 0.1 }}
                        className="px-3 py-1 text-xs font-mono bg-neural-glow/30 border border-cyber-blue/20 rounded-full text-cyber-blue"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Central Node */}
              <div className="w-2/12 flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`w-16 h-16 rounded-full border-4 ${getStatusColor(phase.status)} bg-neural-darker flex items-center justify-center relative z-10`}
                >
                  <span className="text-2xl">{getStatusIcon(phase.status)}</span>
                  
                  {/* Pulsing Ring */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className={`absolute inset-0 rounded-full border-2 ${getStatusColor(phase.status)}`}
                  />
                </motion.div>
              </div>

              {/* Spacer */}
              <div className="w-5/12"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* DNA Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        <div className="neural-card max-w-md mx-auto">
          <h4 className="font-cyber text-xl text-cyber-blue mb-4">Developer DNA Sequence</h4>
          <div className="font-mono text-sm text-gray-300 leading-relaxed">
            <span className="text-matrix-green">HTML</span>
            <span className="text-cyber-blue">→</span>
            <span className="text-yellow-400">CSS</span>
            <span className="text-cyber-blue">→</span>
            <span className="text-red-400">JavaScript</span>
            <span className="text-cyber-blue">→</span>
            <span className="text-blue-400">React</span>
            <span className="text-cyber-blue">→</span>
            <span className="text-purple-400">Node.js</span>
            <span className="text-cyber-blue">→</span>
            <span className="text-green-400">Python</span>
            <span className="text-cyber-blue">→</span>
            <span className="text-cyber-purple">AI/ML</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CodeDNA;
