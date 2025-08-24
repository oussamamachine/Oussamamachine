import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FailureRoom = ({ failures = [] }) => {
  const [activeFailure, setActiveFailure] = useState(null);
  const [roomLighting, setRoomLighting] = useState('dim');
  const [glitchEffect, setGlitchEffect] = useState(false);

  // Ensure failures is always an array
  const safeFailures = Array.isArray(failures) ? failures : [];

  const triggerGlitch = () => {
    setGlitchEffect(true);
    setTimeout(() => setGlitchEffect(false), 300);
  };

  const roomMoods = {
    dim: { bg: 'from-red-900/20 to-black', light: 'red-400/10' },
    enlightened: { bg: 'from-blue-900/20 to-purple-900/20', light: 'cyan-400/20' },
    learning: { bg: 'from-green-900/20 to-black', light: 'green-400/15' }
  };

  const failureTypes = {
    technical: { icon: '⚠️', color: '#FF6B6B', bgColor: '#FF6B6B10' },
    personal: { icon: '💭', color: '#FFD700', bgColor: '#FFD70010' },
    business: { icon: '📈', color: '#8B5CF6', bgColor: '#8B5CF610' },
    creative: { icon: '🎨', color: '#00F5FF', bgColor: '#00F5FF10' }
  };

  const getFailureType = (failure) => {
    if (failure.title.toLowerCase().includes('app') || failure.title.toLowerCase().includes('code')) return 'technical';
    if (failure.title.toLowerCase().includes('perfectionist') || failure.title.toLowerCase().includes('solo')) return 'personal';
    return 'business';
  };

  return (
    <section className="py-4 px-4 relative overflow-hidden">
      {/* Dynamic Room Background */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${roomMoods[roomLighting].bg} transition-all duration-1000`}
        animate={{
          opacity: glitchEffect ? [1, 0.3, 1, 0.7, 1] : 1
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Room Lighting Effects */}
      <div className="absolute inset-0">
        <motion.div
          className={`absolute top-0 left-1/4 w-96 h-96 bg-${roomMoods[roomLighting].light} rounded-full blur-3xl`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className={`absolute bottom-0 right-1/4 w-96 h-96 bg-${roomMoods[roomLighting].light} rounded-full blur-3xl`}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Floating Debris (Lessons) */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-red-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.3, 0.8, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Room Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className={`text-6xl md:text-8xl font-cyber font-bold mb-8 ${glitchEffect ? 'glitch-text' : ''}`}
            animate={glitchEffect ? {
              x: [-2, 2, -2, 0],
              textShadow: [
                '0 0 0 #FF0000',
                '2px 0 0 #FF0000, -2px 0 0 #00FFFF',
                '0 0 0 #FF0000'
              ]
            } : {}}
          >
            <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
              Failure.room()
            </span>
          </motion.h2>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Welcome to the sacred space where mistakes transform into wisdom
            <br />
            <span className="text-red-400 font-mono">Every failure here is a teacher in disguise</span>
          </p>

          {/* Room Controls */}
          <div className="flex justify-center space-x-4 mt-8">
            {Object.keys(roomMoods).map((mood) => (
              <motion.button
                key={mood}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setRoomLighting(mood)}
                className={`px-4 py-2 rounded-lg border font-mono text-sm transition-all ${
                  roomLighting === mood 
                    ? 'border-cyan-400 text-cyan-400 bg-cyan-400/10' 
                    : 'border-gray-600 text-gray-400 hover:border-gray-400'
                }`}
              >
                {mood}.lighting()
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Failure Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {safeFailures.map((failure, index) => {
            const failureType = getFailureType(failure);
            const typeConfig = failureTypes[failureType];
            const isActive = activeFailure === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className="relative group cursor-pointer perspective-1000"
                onClick={() => {
                  setActiveFailure(isActive ? null : index);
                  triggerGlitch();
                }}
              >
                {/* Card Container */}
                <motion.div
                  className="relative h-64 rounded-xl border-2 border-red-400/30 overflow-hidden"
                  style={{ backgroundColor: typeConfig.bgColor }}
                  whileHover={{ 
                    scale: 1.02,
                    rotateY: 5,
                    borderColor: typeConfig.color,
                    boxShadow: `0 10px 30px ${typeConfig.color}40`
                  }}
                  animate={isActive ? {
                    scale: [1, 1.05, 1],
                    borderColor: [typeConfig.color, '#FFFFFF', typeConfig.color]
                  } : {}}
                  transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                >
                  {/* Failure Type Icon */}
                  <div className="absolute top-4 right-4 text-4xl">
                    {typeConfig.icon}
                  </div>

                  {/* Year Badge */}
                  <div 
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono border"
                    style={{ 
                      borderColor: typeConfig.color,
                      color: typeConfig.color,
                      backgroundColor: `${typeConfig.color}20`
                    }}
                  >
                    {failure.year}
                  </div>

                  {/* Content */}
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div>
                      <h3 
                        className="text-xl font-cyber font-bold mb-4"
                        style={{ color: typeConfig.color }}
                      >
                        {failure.title}
                      </h3>
                      
                      <div className="space-y-3">
                        <div>
                          <span className="text-gray-400 text-sm">Lesson:</span>
                          <p className="text-yellow-300 font-mono text-sm italic">
                            "{failure.lesson}"
                          </p>
                        </div>
                        
                        <div>
                          <span className="text-gray-400 text-sm">Impact:</span>
                          <p className="text-gray-300 text-sm">
                            {failure.impact}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Wisdom Level Indicator */}
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Wisdom Extracted</span>
                        <span>100%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="h-2 rounded-full bg-gradient-to-r from-red-400 to-green-400"
                          initial={{ width: 0 }}
                          whileInView={{ width: '100%' }}
                          transition={{ duration: 2, delay: index * 0.3 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Hover Effects */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ backgroundColor: typeConfig.color }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.05 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Glitch Lines */}
                  {isActive && (
                    <>
                      <motion.div
                        className="absolute top-1/4 left-0 w-full h-0.5 bg-white opacity-80"
                        animate={{
                          x: [-100, 100, -100],
                          opacity: [0, 1, 0]
                        }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute top-3/4 left-0 w-full h-0.5 bg-white opacity-80"
                        animate={{
                          x: [100, -100, 100],
                          opacity: [0, 1, 0]
                        }}
                        transition={{ duration: 0.7, repeat: Infinity }}
                      />
                    </>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Room Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="neural-card max-w-3xl mx-auto">
            <h4 className="font-cyber text-2xl text-red-400 mb-6">
              💡 Room Philosophy
            </h4>
            <motion.blockquote 
              className="text-xl text-gray-300 italic leading-relaxed mb-6"
              animate={{
                textShadow: glitchEffect ? [
                  '0 0 5px #FF0000',
                  '0 0 10px #00FFFF',
                  '0 0 5px #FF0000'
                ] : '0 0 0px transparent'
              }}
            >
              "In this room, every broken dream becomes a foundation stone. 
              Every mistake is a lesson disguised as pain. 
              We don't hide our failures—we celebrate them as proof of our courage to try."
            </motion.blockquote>
            <div className="text-sm text-gray-400 font-mono">
              — The Developer's Creed, from the Archives of Experience
            </div>

            {/* Failure Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 text-center">
              <div>
                <div className="text-2xl font-cyber text-red-400">{safeFailures.length}</div>
                <div className="text-sm text-gray-400">Failures Documented</div>
              </div>
              <div>
                <div className="text-2xl font-cyber text-yellow-400">{safeFailures.length}</div>
                <div className="text-sm text-gray-400">Lessons Learned</div>
              </div>
              <div>
                <div className="text-2xl font-cyber text-green-400">∞</div>
                <div className="text-sm text-gray-400">Growth Achieved</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FailureRoom;
