import React from 'react';
import { motion } from 'framer-motion';

const FailureNeurons = ({ failures, isActive }) => {
  return (
    <section className="min-h-screen bg-black relative overflow-hidden py-20">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-6xl md:text-7xl font-cyber font-bold mb-6">
            <span className="bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              FAILURE NEURONS
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Learning pathways - Where mistakes become mastery
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FailureNeurons;
