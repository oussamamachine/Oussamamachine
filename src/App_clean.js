import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import portfolioData from './data/portfolio.json';

// Clean, focused components only
const SimpleGenesisHero = React.lazy(() => import('./components/SimpleGenesisHero'));
const NeuralNavigation = React.lazy(() => import('./components/NeuralNavigation'));
const NeuralTimeline = React.lazy(() => import('./components/NeuralTimeline'));
const CSSNeuralSkillMap = React.lazy(() => import('./components/CSSNeuralSkillMap'));
const GeneticProjects = React.lazy(() => import('./components/GeneticProjects'));
const VisionCortex = React.lazy(() => import('./components/VisionCortex'));
const ContactNexus = React.lazy(() => import('./components/ContactNexus'));

function App() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Simple mouse tracking for subtle effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Clean scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'skills', 'timeline', 'projects', 'vision', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (let section of sections) {
        const element = document.querySelector(`[data-section="${section}"]`);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;
          
          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Clean Navigation */}
      <Suspense fallback={null}>
        <NeuralNavigation currentSection={currentSection} />
      </Suspense>

      {/* Subtle parallax background */}
      <div 
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(0,255,136,0.1) 0%, transparent 50%)`
        }}
      />

      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-4xl mb-4">⚡</div>
            <div className="text-cyan-400 text-xl font-mono">Loading Portfolio...</div>
          </motion.div>
        </div>
      }>
        {/* Hero Section */}
        <section data-section="hero">
          <SimpleGenesisHero data={portfolioData} />
        </section>

        {/* Skills Section */}
        <section data-section="skills" className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Neural Skills
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A sophisticated visualization of technical expertise and creative capabilities
              </p>
            </motion.div>
            <CSSNeuralSkillMap skills={portfolioData.skills} />
          </div>
        </section>

        {/* Timeline Section */}
        <section data-section="timeline" className="py-20">
          <NeuralTimeline timeline={portfolioData.timeline} />
        </section>

        {/* Projects Section */}
        <section data-section="projects" className="py-20">
          <GeneticProjects projects={portfolioData.projects || []} />
        </section>

        {/* Vision Section */}
        <section data-section="vision" className="py-20">
          <VisionCortex vision={portfolioData.vision || {}} />
        </section>

        {/* Contact Section */}
        <section data-section="contact">
          <ContactNexus />
        </section>
      </Suspense>

      {/* Subtle floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
