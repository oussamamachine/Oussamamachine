import React, { useState, useEffect } from 'react';
import './App_pro.css';

// Ultra-lightweight, professional components
import HeroPro from './components/HeroPro';
import Navigation from './components/Navigation';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Efficient scroll tracking
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app">
      <Navigation activeSection={activeSection} />
      
      <main>
        <section id="home">
          <HeroPro />
        </section>
        
        <section id="skills">
          <Skills />
        </section>
        
        <section id="experience">
          <Experience />
        </section>
        
        <section id="projects">
          <Projects />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
      </main>
    </div>
  );
}

export default App;
