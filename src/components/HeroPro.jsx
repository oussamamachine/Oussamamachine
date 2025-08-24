import React from 'react';

const HeroPro = () => {
  return (
    <div className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-name">Oussama</span>
            <span className="hero-accent">Mind</span>
          </h1>
          <p className="hero-subtitle">
            Full-Stack Developer & Digital Architect
          </p>
          <p className="hero-description">
            Crafting intelligent solutions with modern technologies. 
            Specialized in React, Node.js, and scalable cloud architectures.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View Work
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get In Touch
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-avatar">
            <div className="avatar-circle">
              <span className="avatar-icon">🧠</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPro;
