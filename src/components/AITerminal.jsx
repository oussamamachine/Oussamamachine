import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AITerminal = ({ isOpen, onClose, isDarkMode }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I\'m your AI portfolio assistant. I can help you learn more about Oussama\'s skills, projects, and experience. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // AI Response Generator
  const generateAIResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    // Skills related
    if (lowerInput.includes('skill') || lowerInput.includes('technology') || lowerInput.includes('tech')) {
      return {
        content: `Oussama has expertise in:\n\n🟦 Frontend: React, Vue.js, Angular, TypeScript, Tailwind CSS\n🟩 Backend: Node.js, Python, Java, PostgreSQL, MongoDB\n🟨 3D & Graphics: Three.js, WebGL, Blender, Unity\n🟥 AI & ML: TensorFlow, PyTorch, OpenAI API, Computer Vision\n\nHe's constantly learning and expanding his skill set!`,
        type: 'ai'
      };
    }

    // Projects related
    if (lowerInput.includes('project') || lowerInput.includes('work') || lowerInput.includes('portfolio')) {
      return {
        content: `Here are some of Oussama's featured projects:\n\n🚀 Neural Network Visualizer - 3D AI visualization tool\n🌌 Quantum Portfolio - This immersive portfolio website\n🤖 AI Code Assistant - Intelligent code completion system\n🎮 3D Game Engine - Custom game engine built from scratch\n🔗 Blockchain Explorer - Real-time blockchain analytics\n🎭 VR Experience - Immersive architectural visualization\n\nEach project showcases different aspects of his technical skills!`,
        type: 'ai'
      };
    }

    // Experience related
    if (lowerInput.includes('experience') || lowerInput.includes('job') || lowerInput.includes('career')) {
      return {
        content: `Oussama's professional journey:\n\n2024: Senior Full-Stack Developer at TechCorp Innovations\n2023: AI Research Engineer at Neural Dynamics Lab\n2022: Frontend Developer at Digital Creations Studio\n2021: Software Engineer Intern at Startup Ventures\n\nHe's worked on cutting-edge AI applications, 3D graphics, and scalable web solutions.`,
        type: 'ai'
      };
    }

    // Contact related
    if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('reach')) {
      return {
        content: `You can reach Oussama through:\n\n📧 Email: hello@oussama.dev\n💼 LinkedIn: linkedin.com/in/oussama\n🔗 GitHub: github.com/oussama\n\nHe's available for freelance projects and full-time opportunities. Feel free to reach out!`,
        type: 'ai'
      };
    }

    // General questions
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return {
        content: 'Hello! 👋 I\'m here to help you learn more about Oussama\'s portfolio. You can ask me about his skills, projects, experience, or how to get in touch!',
        type: 'ai'
      };
    }

    // Default response
    return {
      content: `I'm not sure I understood that question. Try asking about:\n\n• Skills and technologies\n• Projects and work\n• Professional experience\n• How to contact Oussama\n\nOr just say hello! 👋`,
      type: 'ai'
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Terminal */}
          <motion.div
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative w-full max-w-4xl h-[600px] rounded-2xl border overflow-hidden ${isDarkMode
                ? 'bg-gray-900/95 border-cyber-blue/50 shadow-2xl shadow-cyber-blue/25'
                : 'bg-white/95 border-purple-600/50 shadow-2xl shadow-purple-600/25'
              }`}
          >
            {/* Terminal Header */}
            <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50/50'
              }`}>
              <div className="flex items-center space-x-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className={`font-cyber font-bold ${isDarkMode ? 'text-cyber-blue' : 'text-purple-600'
                  }`}>
                  AI Portfolio Assistant
                </span>
              </div>

              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-all duration-300 ${isDarkMode
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Terminal Content */}
            <div className="flex-1 h-full flex flex-col">
              {/* Messages Area */}
              <div className={`flex-1 p-4 overflow-y-auto ${isDarkMode ? 'bg-gray-900' : 'bg-white'
                }`}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-4 rounded-2xl ${message.type === 'user'
                          ? isDarkMode
                            ? 'bg-cyber-blue text-white'
                            : 'bg-purple-600 text-white'
                          : isDarkMode
                            ? 'bg-gray-800 border border-gray-700 text-gray-200'
                            : 'bg-gray-100 border border-gray-200 text-gray-800'
                        }`}>
                        <div className="whitespace-pre-line font-mono text-sm">
                          {message.content}
                        </div>
                        <div className={`text-xs mt-2 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className={`max-w-[80%] p-4 rounded-2xl ${isDarkMode
                          ? 'bg-gray-800 border border-gray-700 text-gray-200'
                          : 'bg-gray-100 border border-gray-200 text-gray-800'
                        }`}>
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-sm text-gray-500">AI is thinking...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50/50'
                }`}>
                <form onSubmit={handleSubmit} className="flex space-x-3">
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me about Oussama's portfolio..."
                      className={`w-full px-4 py-3 rounded-lg font-mono text-sm transition-all duration-300 ${isDarkMode
                          ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-cyber-blue focus:bg-gray-700/80'
                          : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-600 focus:bg-white/80'
                        } focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-cyber-blue/50' : 'focus:ring-purple-600/50'
                        }`}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className={`px-6 py-3 rounded-lg font-cyber font-semibold transition-all duration-300 ${!input.trim() || isTyping
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:shadow-lg'
                      } ${isDarkMode
                        ? 'bg-cyber-blue text-white hover:bg-cyber-blue/80'
                        : 'bg-purple-600 text-white hover:bg-purple-600/80'
                      }`}
                  >
                    Send
                  </motion.button>
                </form>

                {/* Quick Actions */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {['Skills', 'Projects', 'Experience', 'Contact'].map((action) => (
                    <motion.button
                      key={action}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setInput(`Tell me about ${action.toLowerCase()}`)}
                      className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 ${isDarkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                      {action}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AITerminal;
