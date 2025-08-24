import React, { useState, useEffect } from 'react';

const AdaptiveTimeline = ({ userPersonality, consciousnessLevel, adaptiveTheme }) => {
  const [activeItem, setActiveItem] = useState(0);
  const [viewMode, setViewMode] = useState('neural');

  // 🎯 TIMELINE DATA - ADAPTIVE BASED ON PERSONALITY
  const timelineData = [
    {
      year: '2018',
      title: 'The Genesis',
      description: 'Started the journey into web development',
      skills: ['HTML', 'CSS', 'JavaScript'],
      achievement: 'First responsive website',
      complexity: 1,
      impact: 'Foundation built'
    },
    {
      year: '2019',
      title: 'Framework Evolution',
      description: 'Mastered modern frameworks and tools',
      skills: ['React', 'Node.js', 'MongoDB'],
      achievement: 'First full-stack application',
      complexity: 3,
      impact: 'Skills expanded'
    },
    {
      year: '2020',
      title: 'Advanced Architecture',
      description: 'Developed complex systems and architectures',
      skills: ['TypeScript', 'GraphQL', 'Docker'],
      achievement: 'Microservices architecture',
      complexity: 5,
      impact: 'System thinking'
    },
    {
      year: '2021',
      title: 'AI Integration',
      description: 'Integrated AI and machine learning into projects',
      skills: ['Python', 'TensorFlow', 'API Design'],
      achievement: 'AI-powered applications',
      complexity: 7,
      impact: 'Intelligence added'
    },
    {
      year: '2022',
      title: 'Full Stack Mastery',
      description: 'Achieved mastery across the entire technology stack',
      skills: ['DevOps', 'Cloud Architecture', 'Team Leadership'],
      achievement: 'Led development teams',
      complexity: 8,
      impact: 'Leadership developed'
    },
    {
      year: '2023',
      title: 'Innovation Pioneer',
      description: 'Creating next-generation applications',
      skills: ['AI/ML', 'Blockchain', 'Quantum Computing'],
      achievement: 'Breakthrough innovations',
      complexity: 10,
      impact: 'Future shaped'
    },
    {
      year: '2024',
      title: 'Consciousness Architect',
      description: 'Building intelligent, adaptive systems',
      skills: ['Neural Networks', 'Consciousness AI', 'Quantum Algorithms'],
      achievement: 'This portfolio experience',
      complexity: 12,
      impact: 'Reality transcended'
    }
  ];

  // 🎭 PERSONALITY-BASED FILTERING
  const getPersonalizedTimeline = () => {
    if (userPersonality === 'tech-explorer') {
      return timelineData.filter(item => item.complexity >= 5);
    } else if (userPersonality === 'quick-professional') {
      return timelineData.filter(item => item.impact.includes('Leadership') || item.impact.includes('System'));
    } else if (userPersonality === 'creative-enthusiast') {
      return timelineData.map(item => ({
        ...item,
        visualStyle: 'artistic',
        description: item.description + ' with creative innovation'
      }));
    }
    return timelineData;
  };

  const personalizedTimeline = getPersonalizedTimeline();

  // 🌀 AUTO PROGRESSION BASED ON CONSCIOUSNESS
  useEffect(() => {
    const progressIndex = Math.floor((consciousnessLevel / 100) * personalizedTimeline.length);
    setActiveItem(Math.max(0, Math.min(progressIndex, personalizedTimeline.length - 1)));
  }, [consciousnessLevel, personalizedTimeline.length]);

  // 🎯 VIEW MODE SELECTOR
  const viewModes = [
    { id: 'neural', label: 'Neural View', icon: '🧠' },
    { id: 'quantum', label: 'Quantum Flow', icon: '⚛️' },
    { id: 'matrix', label: 'Matrix Code', icon: '🟢' },
    { id: 'cosmic', label: 'Cosmic Journey', icon: '🌌' }
  ];

  return (
    <section className={`adaptive-timeline theme-${adaptiveTheme} view-${viewMode}`}>
      
      {/* 🎮 VIEW MODE CONTROLS */}
      <div className="timeline-controls">
        <div className="controls-header">
          <h2 className="section-title">
            <span className="title-icon">⚡</span>
            <span className="title-text">Evolution Timeline</span>
          </h2>
          <div className="personality-indicator">
            <span className="indicator-label">Optimized for:</span>
            <span className="indicator-value">{userPersonality}</span>
          </div>
        </div>

        <div className="view-modes">
          {viewModes.map(mode => (
            <button
              key={mode.id}
              className={`view-mode-button ${viewMode === mode.id ? 'active' : ''}`}
              onClick={() => setViewMode(mode.id)}
            >
              <span className="mode-icon">{mode.icon}</span>
              <span className="mode-label">{mode.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 🌟 CONSCIOUSNESS PROGRESS BAR */}
      <div className="consciousness-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${consciousnessLevel}%` }}
          ></div>
          <div className="progress-markers">
            {personalizedTimeline.map((_, index) => {
              const markerPosition = (index / (personalizedTimeline.length - 1)) * 100;
              const isActive = activeItem >= index;
              return (
                <div
                  key={index}
                  className={`progress-marker ${isActive ? 'active' : ''}`}
                  style={{ left: `${markerPosition}%` }}
                ></div>
              );
            })}
          </div>
        </div>
        <div className="progress-label">
          Consciousness Evolution: {Math.floor(consciousnessLevel)}%
        </div>
      </div>

      {/* 🎯 TIMELINE VISUALIZATION */}
      <div className="timeline-visualization">
        
        {/* 🌊 NEURAL PATHWAY */}
        <div className="neural-pathway">
          <svg className="pathway-svg" viewBox="0 0 1000 400">
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00ffff" />
                <stop offset="50%" stopColor="#ff00ff" />
                <stop offset="100%" stopColor="#ffff00" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            <path
              d="M50,200 Q250,100 450,200 T850,200"
              stroke="url(#pathGradient)"
              strokeWidth="3"
              fill="none"
              filter="url(#glow)"
              className="main-pathway"
            />
            
            {/* 🎯 TIMELINE NODES */}
            {personalizedTimeline.map((item, index) => {
              const x = 50 + (index * (900 / (personalizedTimeline.length - 1)));
              const y = 200 + Math.sin(index * 0.5) * 50;
              const isActive = activeItem >= index;
              
              return (
                <g key={index} className={`timeline-node ${isActive ? 'active' : ''}`}>
                  <circle
                    cx={x}
                    cy={y}
                    r={isActive ? "12" : "8"}
                    fill={isActive ? "#00ffff" : "#333"}
                    stroke={isActive ? "#ffffff" : "#666"}
                    strokeWidth="2"
                    filter={isActive ? "url(#glow)" : "none"}
                    onClick={() => setActiveItem(index)}
                    style={{ cursor: 'pointer' }}
                  />
                  <text
                    x={x}
                    y={y - 20}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    {item.year}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* 📊 TIMELINE ITEMS */}
        <div className="timeline-items">
          {personalizedTimeline.map((item, index) => (
            <div
              key={index}
              className={`timeline-item ${activeItem === index ? 'active' : ''} ${activeItem > index ? 'completed' : ''}`}
              onClick={() => setActiveItem(index)}
            >
              <div className="item-header">
                <div className="item-year">{item.year}</div>
                <div className="item-title">{item.title}</div>
                <div className="item-complexity">
                  <span className="complexity-label">Complexity:</span>
                  <div className="complexity-bars">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className={`complexity-bar ${i < item.complexity ? 'active' : ''}`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="item-content">
                <p className="item-description">{item.description}</p>
                <div className="item-achievement">
                  <strong>Key Achievement:</strong> {item.achievement}
                </div>
                <div className="item-impact">
                  <strong>Impact:</strong> {item.impact}
                </div>
              </div>

              <div className="item-skills">
                {item.skills.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>

              <div className="item-portal">
                <div className="portal-ring"></div>
                <div className="portal-core"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🌌 QUANTUM PARTICLES BACKGROUND */}
      <div className="quantum-particles">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="quantum-particle"
            style={{
              '--particle-delay': `${i * 0.2}s`,
              '--particle-duration': `${5 + (i % 10)}s`,
              '--particle-x': `${Math.random() * 100}%`,
              '--particle-y': `${Math.random() * 100}%`
            }}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default AdaptiveTimeline;
