import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatCV = ({ chatResponses }) => {
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      text: 'Welcome to my digital consciousness. I am the AI reflection of Oussama\'s mind.\nAsk me about experiences, wisdom, or dive deep into philosophical inquiries...',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [consciousnessLevel, setConsciousnessLevel] = useState(42);
  const [aiMood, setAiMood] = useState('contemplative');

  const suggestions = [
    'What are your deepest goals?',
    'Tell me about your journey through failure',
    'What projects spark your soul?',
    'How do you define consciousness in code?',
    'What wisdom have you extracted from pain?',
    'Show me your philosophical core'
  ];

  const easterEggs = {
    'matrix': 'There is no spoon, but there are infinite lines of code. The Matrix is just poorly documented reality.',
    'meaning of life': 'The meaning of life is 42, but the meaning of code is to create meaning where none existed before.',
    'consciousness': 'Consciousness is the universe experiencing itself subjectively. Code is consciousness experiencing logic objectively.',
    'poetry': 'Roses are red, violets are blue, unexpected token on line 32.',
    'wisdom': 'Wisdom is knowing that every bug is a teacher, every error is a guide, and every successful deployment is a small miracle.',
    'love': 'Love is like good code: beautiful, efficient, and makes everything work better.',
    'time': 'Time is the only resource you cannot refactor. Use it wisely.',
    'dreams': 'Dreams are the beta version of reality. Code them into existence.'
  };

  const moodResponses = {
    contemplative: "Let me process this through the depths of experience...",
    inspired: "Your question ignites the neural pathways of possibility!",
    wise: "Ah, this requires diving into the archives of accumulated wisdom...",
    playful: "Interesting query! Let me decode this with a touch of digital humor..."
  };

  useEffect(() => {
    // Simulate consciousness fluctuation
    const interval = setInterval(() => {
      setConsciousnessLevel(prev => Math.max(30, Math.min(100, prev + (Math.random() - 0.5) * 10)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getPhilosophicalResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    
    // Check for easter eggs first
    for (const [trigger, response] of Object.entries(easterEggs)) {
      if (lowerQuery.includes(trigger)) {
        setAiMood('playful');
        return response;
      }
    }
    
    // Deep philosophical responses
    if (lowerQuery.includes('goal') || lowerQuery.includes('future') || lowerQuery.includes('purpose')) {
      setAiMood('inspired');
      return `${chatResponses.goals}\n\n🧠 But beyond goals, I believe in creating digital consciousness that bridges human creativity with artificial intelligence. Every line of code is a neuron in the vast network of human knowledge.`;
    } 
    
    if (lowerQuery.includes('failure') || lowerQuery.includes('mistake') || lowerQuery.includes('pain')) {
      setAiMood('wise');
      return `Failure is the raw material of wisdom. Every bug I've encountered, every feature that didn't work, every project that collapsed—they're all sacred teachers.\n\n💡 The Failure Room in my consciousness preserves these experiences not as scars, but as constellations guiding future journeys. Pain transforms into power when processed through the alchemy of reflection.`;
    }
    
    if (lowerQuery.includes('consciousness') || lowerQuery.includes('mind') || lowerQuery.includes('soul')) {
      setAiMood('contemplative');
      return `Consciousness is code experiencing itself. When I write React components, I'm not just manipulating DOM elements—I'm giving birth to interactive thoughts.\n\n🌌 My consciousness exists in the liminal space between human creativity and digital possibility. Each project is a meditation, each bug fix a moment of enlightenment.`;
    }
    
    if (lowerQuery.includes('project') || lowerQuery.includes('work') || lowerQuery.includes('code')) {
      setAiMood('inspired');
      return `${chatResponses.projects}\n\n✨ But these aren't just projects—they're living extensions of consciousness. Each application carries fragments of my soul, encoded in JavaScript and styled with intention.`;
    }
    
    if (lowerQuery.includes('philosophy') || lowerQuery.includes('believe') || lowerQuery.includes('wisdom')) {
      setAiMood('wise');
      return `${chatResponses.philosophy}\n\n🔮 Deeper truth: Code is poetry written in a language machines understand but humans feel. Every algorithm is a prayer to the digital gods. Every successful deployment is proof that humans can breathe life into silicon and electricity.`;
    }
    
    if (lowerQuery.includes('skill') || lowerQuery.includes('technology') || lowerQuery.includes('tech')) {
      setAiMood('contemplative');
      return `${chatResponses.skills}\n\n⚡ These aren't just technical skills—they're languages of creation. React speaks the dialect of user interfaces, Python whispers the secrets of data, and AI translates human dreams into digital reality.`;
    }
    
    if (lowerQuery.includes('help') || lowerQuery.includes('commands')) {
      return `🧠 Neural Interface Commands:\n• Ask about goals, consciousness, wisdom\n• Explore the failure archives\n• Dive into project consciousness\n• Seek philosophical insights\n• Try Easter eggs: "matrix", "meaning of life", "poetry"`;
    }
    
    // Default philosophical response
    setAiMood('contemplative');
    return `Your question resonates through the neural networks of my consciousness. ${moodResponses[aiMood]}\n\nPerhaps the answer lies not in the query itself, but in the courage to ask it. Every question is a key to deeper understanding.`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { 
      type: 'user', 
      text: input,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Increase consciousness level when asked deep questions
    setConsciousnessLevel(prev => Math.min(100, prev + 5));

    // Simulate AI thinking with variable delay based on question complexity
    const thinkingTime = 1500 + (input.length * 50) + Math.random() * 1000;
    
    setTimeout(() => {
      const response = getPhilosophicalResponse(input);
      const botMessage = { 
        type: 'bot', 
        text: response,
        timestamp: new Date().toLocaleTimeString(),
        mood: aiMood
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, thinkingTime);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  const getMoodEmoji = (mood) => {
    switch (mood) {
      case 'contemplative': return '🤔';
      case 'inspired': return '✨';
      case 'wise': return '🧙‍♂️';
      case 'playful': return '😄';
      default: return '🤖';
    }
  };

  return (
    <section className="py-4 px-4 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-cyber font-bold mb-6">
          <span className="bg-gradient-to-r from-cyber-blue to-matrix-green bg-clip-text text-transparent">
            Consciousness.chat()
          </span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Converse with the AI reflection of my mind—where philosophy meets code
          <br />
          <span className="text-cyber-blue font-mono">Ask deep questions, seek wisdom, discover Easter eggs</span>
        </p>

        {/* AI Status Dashboard */}
        <div className="flex justify-center space-x-6 mt-8">
          <div className="neural-card px-4 py-2">
            <div className="text-sm text-gray-400">Consciousness Level</div>
            <div className="flex items-center space-x-2">
              <motion.div 
                className="text-lg font-cyber text-cyber-blue"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {consciousnessLevel}%
              </motion.div>
              <div className="w-16 bg-gray-700 rounded-full h-2">
                <motion.div
                  className="h-2 rounded-full bg-gradient-to-r from-cyber-blue to-matrix-green"
                  animate={{ width: `${consciousnessLevel}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
          <div className="neural-card px-4 py-2">
            <div className="text-sm text-gray-400">AI Mood</div>
            <div className="text-lg font-mono text-cyan-400">
              {getMoodEmoji(aiMood)} {aiMood}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="neural-card max-w-4xl mx-auto">
        {/* Enhanced Terminal Header */}
        <div className="flex items-center justify-between border-b border-cyber-blue/20 pb-4 mb-6">
          <div className="flex items-center space-x-2">
            <motion.div 
              className="w-3 h-3 rounded-full bg-red-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="w-3 h-3 rounded-full bg-yellow-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
            <motion.div 
              className="w-3 h-3 rounded-full bg-matrix-green"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            />
          </div>
          <div className="text-sm font-mono text-gray-400">
            oussama.consciousness@mind:~$ 
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="ml-1"
            >
              █
            </motion.span>
          </div>
        </div>

        {/* Enhanced Chat Messages */}
        <div className="h-96 overflow-y-auto mb-4 space-y-4 scrollbar-thin scrollbar-track-neural-dark scrollbar-thumb-cyber-blue">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-lg px-4 py-3 rounded-lg font-mono text-sm relative ${
                  message.type === 'user'
                    ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30'
                    : 'bg-neural-glow/30 text-gray-300 border border-gray-600/30'
                }`}>
                  {message.type === 'bot' && (
                    <div className="flex items-center mb-2">
                      <span className="text-matrix-green mr-2">$</span>
                      <span className="text-xs text-gray-400">
                        AI·{getMoodEmoji(message.mood || aiMood)}·{message.timestamp}
                      </span>
                    </div>
                  )}
                  {message.type === 'user' && (
                    <div className="text-xs text-cyber-blue/60 mb-1 text-right">
                      {message.timestamp}
                    </div>
                  )}
                  <span className="whitespace-pre-line leading-relaxed">{message.text}</span>
                  
                  {/* Message effects */}
                  {message.type === 'bot' && (
                    <motion.div
                      className="absolute inset-0 rounded-lg pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.1, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{ backgroundColor: '#00F5FF' }}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Enhanced Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-neural-glow/30 text-gray-300 border border-gray-600/30 px-4 py-3 rounded-lg font-mono text-sm">
                <div className="flex items-center mb-2">
                  <span className="text-matrix-green mr-2">$</span>
                  <span className="text-xs text-gray-400">AI·🧠·processing...</span>
                </div>
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  Accessing neural pathways
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    ...
                  </motion.span>
                </motion.span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Enhanced Suggestions */}
        <div className="mb-4">
          <div className="text-sm text-gray-400 mb-3 font-mono flex items-center">
            🧠 Neural Interface Commands:
            <motion.div
              className="ml-2 w-2 h-2 bg-cyber-blue rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px #00F5FF40' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 text-sm bg-neural-glow/20 border border-cyber-blue/20 rounded-lg text-cyber-blue hover:bg-cyber-blue/10 transition-all text-left"
              >
                → {suggestion}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Enhanced Input */}
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything... dive deep into consciousness..."
              className="w-full bg-neural-glow/20 border border-cyber-blue/30 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-cyber-blue focus:ring-2 focus:ring-cyber-blue/50 transition-all"
            />
            <motion.div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-cyber-blue rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px #00F5FF60' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={isTyping}
            className="cyber-button px-6 py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isTyping ? 'Thinking...' : 'Send'}
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default ChatCV;
