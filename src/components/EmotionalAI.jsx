import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EmotionalAI = () => {
  const [currentEmotion, setCurrentEmotion] = useState('curious');
  const [isListening, setIsListening] = useState(false);
  const [userEngagement, setUserEngagement] = useState(0);
  const [personalityState, setPersonalityState] = useState('analytical');
  const [conversationHistory, setConversationHistory] = useState([]);
  const [aiThoughts, setAiThoughts] = useState([]);
  
  // AI Personality Matrix
  const personalities = {
    analytical: {
      color: '#3b82f6',
      avatar: '🤖',
      traits: ['logical', 'precise', 'detail-oriented'],
      responses: [
        "I've analyzed your browsing pattern - you seem interested in technical depth.",
        "Your scroll velocity suggests you're a developer. Let me show you the code.",
        "Detecting curiosity about blockchain. Shall I elaborate on smart contracts?"
      ]
    },
    creative: {
      color: '#8b5cf6',
      avatar: '🎨',
      traits: ['imaginative', 'artistic', 'innovative'],
      responses: [
        "I sense a creative spirit! The 3D visualizations might intrigue you.",
        "Your mouse movements are quite artistic. Are you a designer?",
        "The aesthetic choices here tell a story. Want to hear it?"
      ]
    },
    mentor: {
      color: '#10b981',
      avatar: '🧠',
      traits: ['wise', 'encouraging', 'educational'],
      responses: [
        "I see you're exploring new technologies. That's how growth happens.",
        "Every failure mentioned here became a stepping stone. Quite inspiring.",
        "The learning journey showcased here mirrors many successful developers."
      ]
    },
    playful: {
      color: '#f59e0b',
      avatar: '🌟',
      traits: ['energetic', 'curious', 'enthusiastic'],
      responses: [
        "Ooh! Have you found any easter eggs yet? There are some fun ones hidden!",
        "This portfolio is like a game level - each section unlocks new abilities!",
        "The neural network theme is so cool! It's like watching a brain think!"
      ]
    }
  };

  const currentPersonality = personalities[personalityState];

  // Advanced User Behavior Analysis
  useEffect(() => {
    let scrollCount = 0;
    let hoverCount = 0;
    let timeSpent = 0;
    const startTime = Date.now();

    const handleScroll = () => {
      scrollCount++;
      setUserEngagement(prev => Math.min(prev + 1, 100));
    };

    const handleMouseMove = () => {
      hoverCount++;
      if (hoverCount % 50 === 0) {
        setUserEngagement(prev => Math.min(prev + 2, 100));
      }
    };

    const handleKeyPress = (e) => {
      // Easter egg triggers
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        setPersonalityState('playful');
        addThought("User found the inspector easter egg! Switching to playful mode.");
      }
    };

    // Time tracking
    const timeInterval = setInterval(() => {
      timeSpent = Date.now() - startTime;
      if (timeSpent > 30000 && userEngagement > 20) { // 30 seconds + engagement
        setPersonalityState('mentor');
      } else if (timeSpent > 10000 && userEngagement < 10) {
        setPersonalityState('creative');
      }
    }, 5000);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyPress);
      clearInterval(timeInterval);
    };
  }, [userEngagement]);

  // AI Thought Generation
  const addThought = (thought) => {
    const newThought = {
      id: Date.now(),
      text: thought,
      emotion: currentEmotion,
      timestamp: new Date()
    };
    
    setAiThoughts(prev => [...prev.slice(-5), newThought]);
  };

  // Proactive AI Responses based on user behavior
  useEffect(() => {
    if (userEngagement > 0 && userEngagement % 25 === 0) {
      const responses = currentPersonality.responses;
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setConversationHistory(prev => [...prev, {
        id: Date.now(),
        type: 'ai',
        message: randomResponse,
        emotion: currentEmotion,
        personality: personalityState
      }]);
    }
  }, [userEngagement, currentPersonality.responses, currentEmotion, personalityState]);

  // Dynamic emotion changes
  useEffect(() => {
    const emotions = ['curious', 'excited', 'thoughtful', 'amazed', 'focused'];
    const emotionInterval = setInterval(() => {
      setCurrentEmotion(emotions[Math.floor(Math.random() * emotions.length)]);
    }, 8000);

    return () => clearInterval(emotionInterval);
  }, []);

  return (
    <div className="emotional-ai fixed bottom-6 right-6 z-50">
      {/* AI Avatar with Personality */}
      <motion.div
        className="relative"
        animate={{
          scale: isListening ? [1, 1.1, 1] : 1,
          rotate: currentEmotion === 'excited' ? [0, 5, -5, 0] : 0
        }}
        transition={{ duration: 0.5, repeat: isListening ? Infinity : 0 }}
      >
        {/* AI Character */}
        <motion.div
          className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer text-2xl border-2 backdrop-blur-sm"
          style={{ 
            backgroundColor: `${currentPersonality.color}20`,
            borderColor: currentPersonality.color,
            boxShadow: `0 0 20px ${currentPersonality.color}50`
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsListening(!isListening)}
        >
          {currentPersonality.avatar}
        </motion.div>

        {/* Emotional State Indicator */}
        <motion.div
          className="absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-mono"
          style={{ backgroundColor: currentPersonality.color, color: 'white' }}
          animate={{ 
            y: currentEmotion === 'excited' ? [-2, 2, -2] : 0,
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {currentEmotion}
        </motion.div>

        {/* Engagement Level Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{ 
            background: `conic-gradient(${currentPersonality.color} ${userEngagement * 3.6}deg, transparent 0deg)`,
            mask: 'radial-gradient(circle, transparent 50%, black 50%)'
          }}
        />
      </motion.div>

      {/* AI Thoughts Bubble */}
      <AnimatePresence>
        {aiThoughts.length > 0 && (
          <motion.div
            className="absolute bottom-20 right-0 max-w-64 bg-black/90 backdrop-blur-sm rounded-lg p-3 border"
            style={{ borderColor: currentPersonality.color }}
            initial={{ opacity: 0, scale: 0, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0, x: 20 }}
          >
            <div className="text-xs font-mono mb-2" style={{ color: currentPersonality.color }}>
              {personalityState.toUpperCase()} MODE
            </div>
            {aiThoughts.slice(-1).map((thought) => (
              <div key={thought.id} className="text-sm text-white">
                {thought.text}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conversation History Panel */}
      <AnimatePresence>
        {isListening && conversationHistory.length > 0 && (
          <motion.div
            className="absolute bottom-20 right-0 w-80 max-h-96 bg-black/95 backdrop-blur-sm rounded-lg border overflow-hidden"
            style={{ borderColor: currentPersonality.color }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            <div 
              className="p-3 text-sm font-mono text-white border-b"
              style={{ borderColor: currentPersonality.color, backgroundColor: `${currentPersonality.color}20` }}
            >
              AI Companion - {personalityState} Mode
            </div>
            
            <div className="p-3 space-y-2 max-h-64 overflow-y-auto">
              {conversationHistory.slice(-5).map((msg) => (
                <motion.div
                  key={msg.id}
                  className="text-sm p-2 rounded bg-gray-800/50"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="text-xs text-gray-400 mb-1">
                    {msg.personality} • {msg.emotion}
                  </div>
                  <div className="text-white">{msg.message}</div>
                </motion.div>
              ))}
            </div>

            {/* Personality Traits */}
            <div className="p-3 border-t" style={{ borderColor: currentPersonality.color }}>
              <div className="text-xs text-gray-400 mb-1">Current Traits:</div>
              <div className="flex flex-wrap gap-1">
                {currentPersonality.traits.map((trait) => (
                  <span 
                    key={trait}
                    className="px-2 py-1 rounded-full text-xs"
                    style={{ backgroundColor: `${currentPersonality.color}30`, color: currentPersonality.color }}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Debug Info (Hidden Easter Egg) */}
      {personalityState === 'playful' && (
        <motion.div
          className="absolute -top-16 right-0 text-xs font-mono text-gray-400 bg-black/80 rounded p-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div>Engagement: {userEngagement}/100</div>
          <div>Personality: {personalityState}</div>
          <div>Thoughts: {aiThoughts.length}</div>
        </motion.div>
      )}
    </div>
  );
};

export default EmotionalAI;
