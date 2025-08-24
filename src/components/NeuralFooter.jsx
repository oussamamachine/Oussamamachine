import React from 'react';
import { motion } from 'framer-motion';

const NeuralFooter = () => {
  return (
    <footer className="relative bg-black border-t border-cyan-400/20 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="mb-8">
            <h3 className="text-3xl font-cyber font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
              OUSSAMA.MIND
            </h3>
            <p className="text-gray-400 font-mono">
              Neural pathways: ACTIVE | Innovation status: CONTINUOUS | Dreams: COMPILING
            </p>
          </div>
          
          <div className="flex justify-center space-x-8 mb-8">
            <motion.a
              href="#"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              GitHub
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              LinkedIn
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              Email
            </motion.a>
          </div>
          
          <div className="text-gray-500 font-mono text-sm">
            © 2024 OUSSAMA.MIND - Consciousness Level: MAXIMUM
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default NeuralFooter;
