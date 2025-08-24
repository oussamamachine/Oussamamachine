import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SynapticSkills = ({ skills, isActive }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [skillConnections, setSkillConnections] = useState([]);

  const categories = {
    all: { color: '#FFFFFF', icon: '🧠' },
    frontend: { color: '#00F5FF', icon: '🎨' },
    backend: { color: '#8B5CF6', icon: '⚙️' },
    ai: { color: '#00FF88', icon: '🤖' },
    devops: { color: '#FF6B6B', icon: '🚀' }
  };

  useEffect(() => {
    // Generate random connections between skills
    const connections = [];
    if (skills) {
      const allSkills = [];
      Object.values(skills).forEach(category => {
        if (typeof category === 'object') {
          Object.values(category).flat().forEach(skill => allSkills.push(skill));
        }
      });
      
      allSkills.forEach((skill, index) => {
        const connectionCount = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < connectionCount; i++) {
          const targetIndex = Math.floor(Math.random() * allSkills.length);
          if (targetIndex !== index) {
            connections.push({ from: index, to: targetIndex });
          }
        }
      });
    }
    setSkillConnections(connections);
  }, [skills]);

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : { [selectedCategory]: skills[selectedCategory] };

  const generateNeuronGrid = () => {
    const neurons = [];
    for (let i = 0; i < 100; i++) {
      neurons.push(
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [0.5, 1.5, 0.5]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      );
    }
    return neurons;
  };

  const SkillNeuron = ({ skill, category, index }) => {
    const categoryData = categories[category] || categories.all;
    
    return (
      <motion.div
        className="relative group cursor-pointer"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        onHoverStart={() => setHoveredSkill(skill)}
        onHoverEnd={() => setHoveredSkill(null)}
        whileHover={{ scale: 1.1, zIndex: 10 }}
      >
        {/* Skill Core */}
        <motion.div
          className="relative w-20 h-20 rounded-full border-2 flex items-center justify-center backdrop-blur-sm"
          style={{ 
            borderColor: categoryData.color,
            backgroundColor: `${categoryData.color}15`,
            boxShadow: `0 0 20px ${categoryData.color}40`
          }}
          animate={{
            boxShadow: hoveredSkill === skill 
              ? `0 0 40px ${categoryData.color}80` 
              : `0 0 20px ${categoryData.color}40`
          }}
        >
          <span className="text-white font-cyber font-bold text-xs text-center leading-tight">
            {skill.name || skill}
          </span>

          {/* Pulsing Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border"
            style={{ borderColor: categoryData.color }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 0, 0.6]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Neural Spikes */}
          {hoveredSkill === skill && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-8"
                  style={{
                    backgroundColor: categoryData.color,
                    left: '50%',
                    top: '50%',
                    transformOrigin: 'bottom center',
                    transform: `translate(-50%, -100%) rotate(${i * 45}deg)`
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  exit={{ scaleY: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                />
              ))}
            </>
          )}
        </motion.div>

        {/* Skill Info Panel */}
        {hoveredSkill === skill && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="absolute top-24 left-1/2 transform -translate-x-1/2 w-64 bg-black/90 backdrop-blur-sm border rounded-lg p-4 z-20"
            style={{ borderColor: categoryData.color }}
          >
            <h4 className="font-cyber font-bold text-white mb-2">
              {skill.name || skill}
            </h4>
            {skill.level && (
              <div className="mb-2">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Proficiency</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: categoryData.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            )}
            {skill.description && (
              <p className="text-gray-300 text-xs leading-relaxed">
                {skill.description}
              </p>
            )}
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <section className="min-h-screen bg-black relative overflow-hidden py-20">
      {/* Neural Background */}
      <div className="absolute inset-0 opacity-20">
        {generateNeuronGrid()}
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
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              SYNAPTIC SKILLS
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Neural pathways of expertise - where knowledge becomes instinct
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-16"
        >
          <div className="flex space-x-4 bg-black/30 backdrop-blur-sm rounded-full p-2 border border-cyan-400/30">
            {Object.entries(categories).map(([key, data]) => (
              <motion.button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-6 py-3 rounded-full font-cyber font-bold text-sm transition-all duration-300 ${
                  selectedCategory === key 
                    ? 'bg-cyan-400 text-black' 
                    : 'text-white hover:text-cyan-400'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">{data.icon}</span>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Skills Matrix */}
        <div className="space-y-16">
          {filteredSkills && Object.entries(filteredSkills).map(([category, skillCategory]) => {
            // Flatten the skill category object into an array
            const skillList = [];
            if (skillCategory && typeof skillCategory === 'object') {
              Object.values(skillCategory).forEach(skillGroup => {
                if (Array.isArray(skillGroup)) {
                  skillList.push(...skillGroup);
                }
              });
            }
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h3 className="text-3xl font-cyber font-bold mb-4" style={{ color: categories[category]?.color || '#FFFFFF' }}>
                    {categories[category]?.icon} {category.charAt(0).toUpperCase() + category.slice(1)} Neural Network
                  </h3>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-items-center">
                  {skillList && skillList.map((skill, index) => (
                    <SkillNeuron 
                      key={skill.name || skill} 
                      skill={skill} 
                      category={category} 
                      index={index} 
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Neural Code Display */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-black/50 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-8"
        >
          <h3 className="text-2xl font-cyber font-bold text-cyan-400 mb-6">
            {"// Synaptic Network Architecture"}
          </h3>
          <div className="font-mono text-sm text-gray-300 leading-relaxed">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-purple-400">class</span> <span className="text-cyan-400">SynapticSkill</span> {"{"}
              <br />
              <span className="ml-4 text-green-400">constructor</span>(<span className="text-yellow-400">knowledge, experience</span>) {"{"}
              <br />
              <span className="ml-8 text-purple-400">this</span>.<span className="text-cyan-400">neural_pathways</span> = <span className="text-yellow-400">knowledge</span> * <span className="text-yellow-400">experience</span>;
              <br />
              <span className="ml-8 text-purple-400">this</span>.<span className="text-cyan-400">innovation_capacity</span> = <span className="text-yellow-400">Math.pow</span>(<span className="text-yellow-400">curiosity</span>, <span className="text-orange-400">2</span>);
              <br />
              <span className="ml-4">{"}"}</span>
              <br />
              {"}"}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SynapticSkills;
