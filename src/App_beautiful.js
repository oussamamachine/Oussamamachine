import React, { useState, useEffect } from 'react';
import './App_beautiful.css';

// Refined Neural Genesis Components
import NeuralHero from './components/NeuralHero.jsx';
import NeuralTimeline from './components/NeuralTimeline.jsx';
import ProjectsGallery from './components/ProjectsGallery.jsx';
import ConsciousnessAbout from './components/ConsciousnessAbout.jsx';
import ConnectionNexus from './components/ConnectionNexus.jsx';
import NeuralNavigation from './components/NeuralNavigation.jsx';
import ConsciousnessProgress from './components/ConsciousnessProgress.jsx';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sectionsViewed, setSectionsViewed] = useState(new Set());

  // Neural-optimized scroll tracking
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          
          // Refined section detection for neural navigation
          const sections = ['home', 'journey', 'projects', 'about', 'contact'];
          const offset = window.innerHeight * 0.4; // Optimal trigger point
          
          for (let i = sections.length - 1; i >= 0; i--) {
            const element = document.getElementById(sections[i]);
            if (element && element.offsetTop <= window.scrollY + offset) {
              setCurrentSection(sections[i]);
              setSectionsViewed(prev => new Set([...prev, sections[i]]));
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Subtle neural cursor tracking
  useEffect(() => {
    let animationFrame;
    
    const handleMouseMove = (e) => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      
      animationFrame = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="neural-genesis-app" data-theme="consciousness">
      {/* Neural background system - refined and elegant */}
      <div 
        className="neural-background"
        style={{
          '--mouse-x': `${mousePosition.x}%`,
          '--mouse-y': `${mousePosition.y}%`,
          '--scroll-progress': `${(scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`
        }}
      >
        {/* Subtle neural network background */}
        <div className="neural-network-bg">
          <svg className="neural-svg" viewBox="0 0 1000 1000">
            {/* Neural nodes */}
            {[...Array(12)].map((_, i) => (
              <g key={i} className={`neural-node node-${i}`}>
                <circle 
                  cx={50 + (i * 80) % 900} 
                  cy={100 + (i * 150) % 800} 
                  r="2" 
                  className="node-core"
                />
                <circle 
                  cx={50 + (i * 80) % 900} 
                  cy={100 + (i * 150) % 800} 
                  r="8" 
                  className="node-glow"
                />
              </g>
            ))}
            
            {/* Neural connections */}
            {[...Array(8)].map((_, i) => (
              <line
                key={i}
                x1={50 + (i * 80) % 900}
                y1={100 + (i * 150) % 800}
                x2={50 + ((i + 1) * 80) % 900}
                y2={100 + ((i + 1) * 150) % 800}
                className="neural-connection"
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Neural Navigation */}
      <NeuralNavigation currentSection={currentSection} />

      {/* Consciousness Progress Indicator */}
      <ConsciousnessProgress sectionsViewed={sectionsViewed} />

      {/* Main neural content flow */}
      <main className="neural-content">
        <section id="home" className="neural-section">
          <NeuralHero mousePosition={mousePosition} />
        </section>

        <section id="journey" className="neural-section">
          <NeuralTimeline />
        </section>

        <section id="projects" className="neural-section">
          <ProjectsGallery />
        </section>

        <section id="about" className="neural-section">
          <ConsciousnessAbout />
        </section>

        <section id="contact" className="neural-section">
          <ConnectionNexus />
        </section>
      </main>

      {/* Neural cursor enhancement */}
      <div className="neural-cursor-trail"></div>
    </div>
  );
}

export default App;
