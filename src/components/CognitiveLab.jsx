import React from 'react';
import { motion } from 'framer-motion';

const CognitiveLab = ({ experiments, isActive }) => {
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
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              COGNITIVE LAB
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experimental neural pathways - Innovation in progress
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CognitiveLab;
