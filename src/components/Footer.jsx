import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/oussama', icon: '🐙' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/oussama', icon: '💼' },
    { name: 'Notion', url: 'https://notion.so/oussama', icon: '📝' },
    { name: 'TikTok', url: 'https://tiktok.com/@oussama', icon: '📱' },
  ];

  return (
    <footer className="py-8 px-4 border-t border-cyber-blue/20">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="text-2xl font-cyber font-bold text-cyber-blue mb-4">
              OUSSAMA.MIND
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Building the future, one line of code at a time. 
              The journey of a developer who learns through failure and grows through challenges.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h4 className="text-lg font-mono font-semibold text-white mb-4">
              Navigation
            </h4>
            <nav className="space-y-2">
              {['CodeDNA', 'MindMap', 'Projects', 'Skills', 'Chat'].map((item) => (
                <div key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-cyber-blue transition-colors text-sm font-mono"
                  >
                    {item}
                  </a>
                </div>
              ))}
            </nav>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center md:text-right"
          >
            <h4 className="text-lg font-mono font-semibold text-white mb-4">
              Connect
            </h4>
            <div className="flex justify-center md:justify-end space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full border-2 border-cyber-blue/30 flex items-center justify-center hover:border-cyber-blue hover:bg-cyber-blue/10 transition-all duration-300"
                >
                  <span className="text-xl">{link.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mini Documentary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="neural-card max-w-md mx-auto">
            <h4 className="font-cyber text-xl text-cyber-blue mb-4">
              📼 Watch My Dev Story
            </h4>
            <p className="text-gray-300 text-sm mb-4">
              5-minute documentary about my journey from first HTML tag to AI architect
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cyber-button"
            >
              Coming Soon
            </motion.button>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <blockquote className="text-xl md:text-2xl font-mono text-cyber-blue italic">
            "The most powerful IDE is the mind."
          </blockquote>
          <p className="text-gray-400 text-sm mt-2">- Oussama, Développeur Génome</p>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          viewport={{ once: true }}
          className="border-t border-cyber-blue/20 pt-8 text-center"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400 font-mono">
              © 2025 OUSSAMA.MIND - Built with React, Tailwind CSS & Framer Motion
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Made with</span>
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                  color: ['#ef4444', '#f59e0b', '#ef4444']
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-red-400"
              >
                ❤️
              </motion.span>
              <span>and lots of coffee</span>
              <span>☕</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
