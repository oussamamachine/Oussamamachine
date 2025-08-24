import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = ({ currentSection, isDarkMode, onThemeToggle, onSectionChange, onAITerminalToggle }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '🧠' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'experience', label: 'Experience', icon: '📈' },
    { id: 'contact', label: 'Contact', icon: '💬' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
            ? 'backdrop-blur-neural bg-black/20 border-b border-white/10'
            : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => onSectionChange('home')}
            >
              <div className={`w-8 h-8 rounded-full ${isDarkMode
                  ? 'bg-gradient-to-r from-cyber-blue to-cyber-purple'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600'
                }`} />
              <span className={`text-xl font-cyber font-bold ${isDarkMode ? 'text-cyber-blue' : 'text-purple-600'
                }`}>
                OUSSAMA.MIND
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSectionChange(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${currentSection === item.id
                      ? isDarkMode
                        ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30'
                        : 'bg-purple-600/20 text-purple-600 border border-purple-600/30'
                      : isDarkMode
                        ? 'text-gray-300 hover:text-cyber-blue hover:bg-white/5'
                        : 'text-gray-600 hover:text-purple-600 hover:bg-white/20'
                    }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="font-mono text-sm">{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* AI Terminal Toggle */}
              <motion.button
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={onAITerminalToggle}
                className={`p-2 rounded-full transition-all duration-300 ${isDarkMode
                    ? 'bg-cyber-purple/20 text-cyber-purple hover:bg-cyber-purple/30'
                    : 'bg-purple-600/20 text-purple-600 hover:bg-purple-600/30'
                  }`}
                title="AI Assistant"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.05, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                onClick={onThemeToggle}
                className={`p-2 rounded-full transition-all duration-300 ${isDarkMode
                    ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                    : 'bg-gray-800/20 text-gray-700 hover:bg-gray-800/30'
                  }`}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-16 left-0 right-0 z-40 bg-black/95 backdrop-blur-neural border-b border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${currentSection === item.id
                      ? isDarkMode
                        ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30'
                        : 'bg-purple-600/20 text-purple-600 border border-purple-600/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-mono">{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
