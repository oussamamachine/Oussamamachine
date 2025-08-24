import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Text3D, Center, Html } from '@react-three/drei';
import { AnimatePresence } from 'framer-motion';

const Contact = ({ isDarkMode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 2000);
  };

  // 3D Contact Portal
  const ContactPortal = () => {
    return (
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group position={[0, 0, 0]}>
          {/* Portal Ring */}
          <mesh position={[0, 0, 0]}>
            <torusGeometry args={[2, 0.3, 16, 100]} />
            <meshStandardMaterial
              color={isDarkMode ? "#00F5FF" : "#8B5CF6"}
              emissive={isDarkMode ? "#00F5FF" : "#8B5CF6"}
              emissiveIntensity={0.5}
              transparent
              opacity={0.8}
            />
          </mesh>

          {/* Inner Portal */}
          <mesh position={[0, 0, 0]}>
            <ringGeometry args={[1.5, 2, 32]} />
            <meshStandardMaterial
              color={isDarkMode ? "#8B5CF6" : "#00F5FF"}
              emissive={isDarkMode ? "#8B5CF6" : "#00F5FF"}
              emissiveIntensity={0.3}
              transparent
              opacity={0.6}
            />
          </mesh>

          {/* Floating Particles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh
              key={i}
              position={[
                Math.sin(i * Math.PI * 2 / 8) * 1.8,
                Math.cos(i * Math.PI * 2 / 8) * 1.8,
                0
              ]}
            >
              <sphereGeometry args={[0.1, 8, 6]} />
              <meshStandardMaterial
                color={isDarkMode ? "#00FF00" : "#FF6B6B"}
                emissive={isDarkMode ? "#00FF00" : "#FF6B6B"}
                emissiveIntensity={0.8}
              />
            </mesh>
          ))}

          {/* Portal Text */}
          <Html position={[0, 3, 0]} center>
            <div className={`text-lg font-cyber font-bold px-3 py-1 rounded ${isDarkMode ? 'bg-black/80 text-white' : 'bg-white/80 text-black'
              }`}>
              CONTACT
            </div>
          </Html>
        </group>
      </Float>
    );
  };

  return (
    <section ref={ref} className="relative min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-4xl md:text-6xl font-cyber font-bold mb-6 ${isDarkMode
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-purple to-matrix-green'
              : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
              }`}
          >
            Let's Connect
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
          >
            Ready to bring your ideas to life? Let's discuss how we can collaborate
            to create something extraordinary together.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Contact Portal */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-96 lg:h-[500px] relative"
          >
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={0.8} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              <ContactPortal />
            </Canvas>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="relative">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg font-mono text-lg transition-all duration-300 ${isDarkMode
                    ? 'bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:border-cyber-blue focus:bg-gray-800/80'
                    : 'bg-white/50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-purple-600 focus:bg-white/80'
                    } focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-cyber-blue/50' : 'focus:ring-purple-600/50'
                    }`}
                  placeholder="Your Name"
                />
                <div className={`absolute inset-0 rounded-lg pointer-events-none transition-all duration-300 ${formData.name ? 'opacity-100' : 'opacity-0'
                  } ${isDarkMode
                    ? 'shadow-lg shadow-cyber-blue/25'
                    : 'shadow-lg shadow-purple-600/25'
                  }`} />
              </div>

              {/* Email Input */}
              <div className="relative">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg font-mono text-lg transition-all duration-300 ${isDarkMode
                    ? 'bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:border-cyber-blue focus:bg-gray-800/80'
                    : 'bg-white/50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-purple-600 focus:bg-white/80'
                    } focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-cyber-blue/50' : 'focus:ring-purple-600/50'
                    }`}
                  placeholder="Your Email"
                />
                <div className={`absolute inset-0 rounded-lg pointer-events-none transition-all duration-300 ${formData.email ? 'opacity-100' : 'opacity-0'
                  } ${isDarkMode
                    ? 'shadow-lg shadow-cyber-blue/25'
                    : 'shadow-lg shadow-purple-600/25'
                  }`} />
              </div>

              {/* Subject Input */}
              <div className="relative">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg font-mono text-lg transition-all duration-300 ${isDarkMode
                    ? 'bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:border-cyber-blue focus:bg-gray-800/80'
                    : 'bg-white/50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-purple-600 focus:bg-white/80'
                    } focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-cyber-blue/50' : 'focus:ring-purple-600/50'
                    }`}
                  placeholder="Subject"
                />
                <div className={`absolute inset-0 rounded-lg pointer-events-none transition-all duration-300 ${formData.subject ? 'opacity-100' : 'opacity-0'
                  } ${isDarkMode
                    ? 'shadow-lg shadow-cyber-blue/25'
                    : 'shadow-lg shadow-purple-600/25'
                  }`} />
              </div>

              {/* Message Input */}
              <div className="relative">
                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg font-mono text-lg transition-all duration-300 resize-none ${isDarkMode
                    ? 'bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:border-cyber-blue focus:bg-gray-800/80'
                    : 'bg-white/50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-purple-600 focus:bg-white/80'
                    } focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-cyber-blue/50' : 'focus:ring-purple-600/50'
                    }`}
                  placeholder="Your Message"
                />
                <div className={`absolute inset-0 rounded-lg pointer-events-none transition-all duration-300 ${formData.message ? 'opacity-100' : 'opacity-0'
                  } ${isDarkMode
                    ? 'shadow-lg shadow-cyber-blue/25'
                    : 'shadow-lg shadow-purple-600/25'
                  }`} />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
                type="submit"
                className={`w-full px-8 py-4 rounded-lg font-cyber font-semibold text-lg transition-all duration-300 ${isSubmitting
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:shadow-xl'
                  } ${isDarkMode
                    ? 'bg-gradient-to-r from-cyber-blue to-cyber-purple text-white shadow-lg shadow-cyber-blue/25 hover:shadow-cyber-blue/40'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-purple-600/40'
                  }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending Message...</span>
                  </div>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </form>

            {/* Success Message */}
            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.8 }}
                  className={`p-4 rounded-lg text-center ${isDarkMode
                    ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                    : 'bg-green-100 border border-green-300 text-green-700'
                    }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Message sent successfully! I'll get back to you soon.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Contact Information */}
            <div className={`mt-8 p-6 rounded-2xl border ${isDarkMode
              ? 'bg-gray-800/30 border-gray-700'
              : 'bg-white/30 border-gray-200'
              }`}>
              <h3 className={`text-xl font-cyber font-bold mb-4 ${isDarkMode ? 'text-cyber-blue' : 'text-purple-600'
                }`}>
                Other Ways to Connect
              </h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-cyber-blue/20' : 'bg-purple-600/20'
                    }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className={`font-mono ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    hello@oussama.dev
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-cyber-purple/20' : 'bg-blue-600/20'
                    }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className={`font-mono ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Available for freelance & full-time opportunities
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
