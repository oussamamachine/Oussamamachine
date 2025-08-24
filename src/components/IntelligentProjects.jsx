import React, { useState, useEffect, useMemo } from 'react';

const IntelligentProjects = ({ userPersonality, adaptiveTheme, userInteractions }) => {
  const [selectedProject, setSelectedProject] = useState(0);
  const [filterType, setFilterType] = useState('all');
  const [intelligentSort, setIntelligentSort] = useState(false);

  // 🚀 REVOLUTIONARY PROJECT DATA
  const projectsData = [
    {
      id: 1,
      title: 'AI-Powered E-Commerce Platform',
      description: 'Revolutionary shopping experience with machine learning recommendations',
      technologies: ['React', 'Node.js', 'TensorFlow', 'MongoDB', 'GraphQL'],
      category: 'ai',
      complexity: 9,
      impact: 'high',
      personalityFit: ['tech-explorer', 'deep-researcher'],
      features: ['Real-time ML recommendations', 'Predictive analytics', 'Voice commerce'],
      github: 'https://github.com/oussama',
      demo: 'https://ai-ecommerce.demo',
      year: 2024,
      status: 'completed',
      metrics: {
        performance: 95,
        innovation: 98,
        usability: 92
      }
    },
    {
      id: 2,
      title: 'Quantum Task Management System',
      description: 'Next-gen productivity app with quantum computing algorithms',
      technologies: ['Vue.js', 'Quantum.js', 'Docker', 'Redis', 'WebGL'],
      category: 'productivity',
      complexity: 10,
      impact: 'revolutionary',
      personalityFit: ['creative-enthusiast', 'tech-explorer'],
      features: ['Quantum optimization', 'Neural priority sorting', '3D visualization'],
      github: 'https://github.com/oussama',
      demo: 'https://quantum-tasks.demo',
      year: 2024,
      status: 'active',
      metrics: {
        performance: 98,
        innovation: 100,
        usability: 89
      }
    },
    {
      id: 3,
      title: 'Neural Network Portfolio',
      description: 'This very portfolio - consciousness-driven adaptive interface',
      technologies: ['React', 'Three.js', 'AI Algorithms', 'CSS3', 'WebGL'],
      category: 'portfolio',
      complexity: 12,
      impact: 'transcendent',
      personalityFit: ['all'],
      features: ['AI personality detection', 'Adaptive UI', 'Consciousness tracking'],
      github: 'https://github.com/oussama',
      demo: 'You\'re experiencing it now!',
      year: 2024,
      status: 'evolving',
      metrics: {
        performance: 96,
        innovation: 100,
        usability: 94
      }
    },
    {
      id: 4,
      title: 'Blockchain Healthcare Platform',
      description: 'Secure medical data management with blockchain technology',
      technologies: ['React', 'Solidity', 'IPFS', 'Node.js', 'PostgreSQL'],
      category: 'blockchain',
      complexity: 8,
      impact: 'high',
      personalityFit: ['quick-professional', 'deep-researcher'],
      features: ['Decentralized storage', 'Smart contracts', 'HIPAA compliance'],
      github: 'https://github.com/oussama',
      demo: 'https://healthchain.demo',
      year: 2023,
      status: 'completed',
      metrics: {
        performance: 93,
        innovation: 91,
        usability: 96
      }
    },
    {
      id: 5,
      title: 'Real-time Collaboration Suite',
      description: 'Advanced team collaboration with live editing and AI assistance',
      technologies: ['Next.js', 'Socket.io', 'OpenAI API', 'Prisma', 'Tailwind'],
      category: 'collaboration',
      complexity: 7,
      impact: 'medium',
      personalityFit: ['creative-enthusiast', 'quick-professional'],
      features: ['Live collaboration', 'AI writing assistant', 'Video integration'],
      github: 'https://github.com/oussama',
      demo: 'https://collab-suite.demo',
      year: 2023,
      status: 'completed',
      metrics: {
        performance: 91,
        innovation: 87,
        usability: 97
      }
    }
  ];

  // 🤖 INTELLIGENT PROJECT FILTERING BASED ON USER
  const intelligentProjects = useMemo(() => {
    let filtered = projectsData;

    // Filter by category
    if (filterType !== 'all') {
      filtered = filtered.filter(project => project.category === filterType);
    }

    // Personality-based filtering
    if (userPersonality !== 'analyzing...') {
      filtered = filtered.filter(project => 
        project.personalityFit.includes('all') || 
        project.personalityFit.includes(userPersonality)
      );
    }

    // Intelligent sorting based on user interactions
    if (intelligentSort) {
      const interactionScore = userInteractions.length;
      filtered = filtered.sort((a, b) => {
        if (interactionScore > 50) {
          // Active users prefer complex projects
          return b.complexity - a.complexity;
        } else if (interactionScore > 20) {
          // Moderate users prefer innovation
          return b.metrics.innovation - a.metrics.innovation;
        } else {
          // New users prefer usability
          return b.metrics.usability - a.metrics.usability;
        }
      });
    }

    return filtered;
  }, [filterType, userPersonality, userInteractions, intelligentSort]);

  // 🎯 CATEGORIES FOR FILTERING
  const categories = [
    { id: 'all', label: 'All Projects', icon: '🌐', count: projectsData.length },
    { id: 'ai', label: 'AI & ML', icon: '🤖', count: projectsData.filter(p => p.category === 'ai').length },
    { id: 'blockchain', label: 'Blockchain', icon: '⛓️', count: projectsData.filter(p => p.category === 'blockchain').length },
    { id: 'productivity', label: 'Productivity', icon: '⚡', count: projectsData.filter(p => p.category === 'productivity').length },
    { id: 'portfolio', label: 'Portfolio', icon: '🎨', count: projectsData.filter(p => p.category === 'portfolio').length },
    { id: 'collaboration', label: 'Collaboration', icon: '👥', count: projectsData.filter(p => p.category === 'collaboration').length }
  ];

  return (
    <section className={`intelligent-projects theme-${adaptiveTheme}`}>
      
      {/* 🎮 PROJECT CONTROL PANEL */}
      <div className="project-controls">
        <div className="controls-header">
          <h2 className="section-title">
            <span className="title-icon">🚀</span>
            <span className="title-text">Intelligent Projects</span>
          </h2>
          
          {/* 🤖 AI INSIGHTS */}
          <div className="ai-insights">
            <div className="insight-item">
              <span className="insight-label">Showing projects for:</span>
              <span className="insight-value">{userPersonality}</span>
            </div>
            <div className="insight-item">
              <span className="insight-label">Total interactions:</span>
              <span className="insight-value">{userInteractions.length}</span>
            </div>
          </div>
        </div>

        {/* 🎯 FILTER CATEGORIES */}
        <div className="filter-categories">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-button ${filterType === category.id ? 'active' : ''}`}
              onClick={() => setFilterType(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-label">{category.label}</span>
              <span className="category-count">({category.count})</span>
            </button>
          ))}
        </div>

        {/* 🧠 INTELLIGENT SORTING */}
        <div className="intelligent-controls">
          <button
            className={`intelligent-sort-button ${intelligentSort ? 'active' : ''}`}
            onClick={() => setIntelligentSort(!intelligentSort)}
          >
            <span className="sort-icon">🧠</span>
            <span className="sort-label">AI Sort</span>
            <span className="sort-status">{intelligentSort ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* 🌟 PROJECT SHOWCASE */}
      <div className="project-showcase">
        
        {/* 📱 PROJECT CARDS */}
        <div className="project-grid">
          {intelligentProjects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card ${selectedProject === index ? 'selected' : ''}`}
              onClick={() => setSelectedProject(index)}
              style={{
                '--card-delay': `${index * 0.1}s`
              }}
            >
              <div className="card-header">
                <div className="project-status">
                  <span className={`status-badge status-${project.status}`}>
                    {project.status}
                  </span>
                  <span className="project-year">{project.year}</span>
                </div>
                <div className="project-category">
                  <span className="category-icon">
                    {categories.find(c => c.id === project.category)?.icon}
                  </span>
                </div>
              </div>

              <div className="card-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                {/* 📊 PROJECT METRICS */}
                <div className="project-metrics">
                  <div className="metric">
                    <span className="metric-label">Performance</span>
                    <div className="metric-bar">
                      <div 
                        className="metric-fill"
                        style={{ width: `${project.metrics.performance}%` }}
                      ></div>
                    </div>
                    <span className="metric-value">{project.metrics.performance}%</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Innovation</span>
                    <div className="metric-bar">
                      <div 
                        className="metric-fill"
                        style={{ width: `${project.metrics.innovation}%` }}
                      ></div>
                    </div>
                    <span className="metric-value">{project.metrics.innovation}%</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Usability</span>
                    <div className="metric-bar">
                      <div 
                        className="metric-fill"
                        style={{ width: `${project.metrics.usability}%` }}
                      ></div>
                    </div>
                    <span className="metric-value">{project.metrics.usability}%</span>
                  </div>
                </div>

                {/* 🛠️ TECHNOLOGIES */}
                <div className="project-technologies">
                  {project.technologies.slice(0, 3).map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="tech-more">+{project.technologies.length - 3}</span>
                  )}
                </div>
              </div>

              <div className="card-footer">
                <div className="project-actions">
                  <button className="action-button primary">
                    <span className="button-icon">👁️</span>
                    <span className="button-label">View</span>
                  </button>
                  <button className="action-button secondary">
                    <span className="button-icon">📱</span>
                    <span className="button-label">Demo</span>
                  </button>
                  <button className="action-button tertiary">
                    <span className="button-icon">💻</span>
                    <span className="button-label">Code</span>
                  </button>
                </div>
                
                <div className="complexity-indicator">
                  <span className="complexity-label">Complexity:</span>
                  <div className="complexity-stars">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`complexity-star ${i < Math.ceil(project.complexity / 2) ? 'active' : ''}`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 🌀 CARD EFFECTS */}
              <div className="card-effects">
                <div className="holographic-border"></div>
                <div className="energy-particles">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className="energy-particle"
                      style={{
                        '--particle-delay': `${i * 0.2}s`,
                        '--particle-x': `${Math.random() * 100}%`,
                        '--particle-y': `${Math.random() * 100}%`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 🎯 SELECTED PROJECT DETAILS */}
        {intelligentProjects[selectedProject] && (
          <div className="project-details">
            <div className="details-header">
              <h3 className="details-title">
                {intelligentProjects[selectedProject].title}
              </h3>
              <div className="details-badges">
                <span className="impact-badge">
                  Impact: {intelligentProjects[selectedProject].impact}
                </span>
                <span className="complexity-badge">
                  Complexity: {intelligentProjects[selectedProject].complexity}/12
                </span>
              </div>
            </div>

            <div className="details-content">
              <div className="features-list">
                <h4 className="features-title">Key Features:</h4>
                {intelligentProjects[selectedProject].features.map(feature => (
                  <div key={feature} className="feature-item">
                    <span className="feature-icon">✨</span>
                    <span className="feature-text">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="technologies-full">
                <h4 className="tech-title">Technology Stack:</h4>
                <div className="tech-grid">
                  {intelligentProjects[selectedProject].technologies.map(tech => (
                    <span key={tech} className="tech-item">{tech}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="details-actions">
              <a 
                href={intelligentProjects[selectedProject].github}
                className="detail-action github"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="action-icon">💻</span>
                <span className="action-text">View Code</span>
              </a>
              <a 
                href={intelligentProjects[selectedProject].demo}
                className="detail-action demo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="action-icon">🚀</span>
                <span className="action-text">Live Demo</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* 🌌 QUANTUM BACKGROUND */}
      <div className="quantum-background">
        <div className="quantum-grid"></div>
        <div className="energy-streams">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="energy-stream"
              style={{
                '--stream-delay': `${i * 0.5}s`,
                '--stream-duration': `${5 + (i % 5)}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntelligentProjects;
