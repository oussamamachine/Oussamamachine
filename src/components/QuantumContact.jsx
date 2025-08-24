import React, { useState, useEffect } from 'react';

const QuantumContact = ({ userPersonality, adaptiveTheme, userStats }) => {
  const [contactMode, setContactMode] = useState('quantum');
  const [messageState, setMessageState] = useState('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    dimension: 'professional'
  });
  const [quantumSignal, setQuantumSignal] = useState(0);

  // 🌊 QUANTUM SIGNAL GENERATOR
  useEffect(() => {
    const signalTimer = setInterval(() => {
      setQuantumSignal(Math.sin(Date.now() / 1000) * 50 + 50);
    }, 50);
    
    return () => clearInterval(signalTimer);
  }, []);

  // 🎭 PERSONALITY-BASED CONTACT PREFERENCES
  const contactPreferences = {
    'deep-researcher': {
      preferredMethod: 'detailed-email',
      tone: 'professional',
      suggestedTopics: ['AI Development', 'System Architecture', 'Technical Consultation']
    },
    'creative-enthusiast': {
      preferredMethod: 'collaborative',
      tone: 'creative',
      suggestedTopics: ['Creative Projects', 'Design Collaboration', 'Innovation Ideas']
    },
    'quick-professional': {
      preferredMethod: 'direct',
      tone: 'efficient',
      suggestedTopics: ['Business Inquiry', 'Project Timeline', 'Service Discussion']
    },
    'tech-explorer': {
      preferredMethod: 'technical',
      tone: 'innovative',
      suggestedTopics: ['Cutting-edge Tech', 'Open Source', 'Technology Discussion']
    },
    'explorer': {
      preferredMethod: 'open',
      tone: 'friendly',
      suggestedTopics: ['General Inquiry', 'Collaboration', 'Getting to Know You']
    }
  };

  const userPrefs = contactPreferences[userPersonality] || contactPreferences.explorer;

  // 🚀 CONTACT METHODS
  const contactMethods = [
    {
      id: 'quantum',
      label: 'Quantum Communication',
      icon: '⚛️',
      description: 'Instantaneous dimensional messaging',
      color: '#00ffff'
    },
    {
      id: 'neural',
      label: 'Neural Link',
      icon: '🧠',
      description: 'Direct consciousness interface',
      color: '#ff00ff'
    },
    {
      id: 'traditional',
      label: 'Traditional Email',
      icon: '📧',
      description: 'Standard electronic communication',
      color: '#00ff00'
    },
    {
      id: 'holographic',
      label: 'Holographic Conference',
      icon: '🔮',
      description: 'Virtual reality meeting space',
      color: '#ffff00'
    }
  ];

  // 📱 SOCIAL NETWORKS WITH QUANTUM ENHANCEMENT
  const socialNetworks = [
    {
      platform: 'GitHub',
      url: 'https://github.com/oussama-bouchikhi',
      icon: '💻',
      quantumFrequency: 42,
      description: 'Code repositories & collaborations'
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/oussama-bouchikhi',
      icon: '💼',
      quantumFrequency: 33,
      description: 'Professional networking dimension'
    },
    {
      platform: 'Twitter',
      url: 'https://twitter.com/oussama_tech',
      icon: '🐦',
      quantumFrequency: 55,
      description: 'Tech thoughts & innovations'
    },
    {
      platform: 'Portfolio',
      url: 'https://oussama-portfolio.com',
      icon: '🌐',
      quantumFrequency: 77,
      description: 'Complete digital presence'
    }
  ];

  // 📝 FORM SUBMISSION HANDLER
  const handleSubmission = async (e) => {
    e.preventDefault();
    setMessageState('transmitting');
    
    // Simulate quantum transmission
    setTimeout(() => {
      setMessageState('transmitted');
      setTimeout(() => {
        setMessageState('acknowledged');
        setTimeout(() => {
          setMessageState('idle');
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
            dimension: 'professional'
          });
        }, 2000);
      }, 1500);
    }, 3000);
  };

  // 🎨 THEME COLORS
  const themeColors = {
    'neural-deep': '#00ffff',
    'artistic-flow': '#ff00ff',
    'minimal-focus': '#ffffff',
    'quantum-tech': '#00ff00',
    'cosmic': '#4299ff'
  };

  const primaryColor = themeColors[adaptiveTheme] || themeColors.cosmic;

  return (
    <section className={`quantum-contact theme-${adaptiveTheme} mode-${contactMode}`}>
      
      {/* 🌌 QUANTUM HEADER */}
      <div className="contact-header">
        <div className="header-title">
          <span className="title-icon">🌐</span>
          <h2 className="title-text">Quantum Contact</h2>
          <div className="quantum-indicator">
            <div 
              className="signal-wave"
              style={{
                '--signal-strength': `${quantumSignal}%`,
                '--signal-color': primaryColor
              }}
            ></div>
            <span className="signal-label">Signal: {Math.floor(quantumSignal)}%</span>
          </div>
        </div>

        {/* 🎭 PERSONALITY INSIGHTS */}
        <div className="personality-insights">
          <div className="insight-header">
            <span className="insight-icon">🤖</span>
            <span className="insight-title">AI Analysis Complete</span>
          </div>
          <div className="insight-content">
            <div className="insight-item">
              <span className="insight-label">Detected Personality:</span>
              <span className="insight-value">{userPersonality}</span>
            </div>
            <div className="insight-item">
              <span className="insight-label">Preferred Communication:</span>
              <span className="insight-value">{userPrefs.preferredMethod}</span>
            </div>
            <div className="insight-item">
              <span className="insight-label">Engagement Level:</span>
              <span className="insight-value">
                {userStats.timeSpent > 60 ? 'High' : 
                 userStats.timeSpent > 30 ? 'Medium' : 'Initial'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 🚀 CONTACT METHOD SELECTOR */}
      <div className="contact-methods">
        <div className="methods-header">
          <h3 className="methods-title">Choose Your Communication Dimension</h3>
        </div>
        
        <div className="methods-grid">
          {contactMethods.map(method => (
            <button
              key={method.id}
              className={`method-card ${contactMode === method.id ? 'active' : ''}`}
              onClick={() => setContactMode(method.id)}
              style={{
                '--method-color': method.color
              }}
            >
              <div className="method-icon">{method.icon}</div>
              <div className="method-content">
                <div className="method-label">{method.label}</div>
                <div className="method-description">{method.description}</div>
              </div>
              <div className="method-signal">
                <div className="signal-ring"></div>
                <div className="signal-core"></div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 📝 QUANTUM COMMUNICATION FORM */}
      <div className="communication-interface">
        <form onSubmit={handleSubmission} className="quantum-form">
          <div className="form-header">
            <h3 className="form-title">
              Establish Communication Link
              <span className="form-mode">Mode: {contactMode}</span>
            </h3>
            <div className="transmission-status">
              <span className={`status-indicator status-${messageState}`}>
                {messageState === 'idle' && '🟢 Ready'}
                {messageState === 'transmitting' && '🟡 Transmitting...'}
                {messageState === 'transmitted' && '🔵 Signal Sent'}
                {messageState === 'acknowledged' && '✅ Acknowledged'}
              </span>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-section personal-data">
              <div className="form-group">
                <label htmlFor="name" className="quantum-label">
                  <span className="label-icon">👤</span>
                  <span className="label-text">Quantum Signature</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="quantum-input"
                  placeholder="Your name in this dimension"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="quantum-label">
                  <span className="label-icon">📡</span>
                  <span className="label-text">Quantum Address</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="quantum-input"
                  placeholder="your.quantum@address.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="dimension" className="quantum-label">
                  <span className="label-icon">🌀</span>
                  <span className="label-text">Communication Dimension</span>
                </label>
                <select
                  id="dimension"
                  value={formData.dimension}
                  onChange={(e) => setFormData({...formData, dimension: e.target.value})}
                  className="quantum-select"
                >
                  <option value="professional">Professional Inquiry</option>
                  <option value="collaboration">Project Collaboration</option>
                  <option value="technical">Technical Discussion</option>
                  <option value="creative">Creative Partnership</option>
                  <option value="casual">Casual Conversation</option>
                </select>
              </div>
            </div>

            <div className="form-section message-data">
              <div className="form-group">
                <label htmlFor="subject" className="quantum-label">
                  <span className="label-icon">⚡</span>
                  <span className="label-text">Transmission Subject</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="quantum-input"
                  placeholder="Subject of your quantum transmission"
                  required
                />
              </div>

              <div className="form-group message-group">
                <label htmlFor="message" className="quantum-label">
                  <span className="label-icon">💭</span>
                  <span className="label-text">Quantum Message</span>
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="quantum-textarea"
                  placeholder="Encode your message for transmission across dimensions..."
                  rows={6}
                  required
                ></textarea>
                <div className="message-metrics">
                  <span className="char-count">{formData.message.length}/500</span>
                  <span className="encryption-level">
                    Encryption: {formData.message.length > 0 ? '🔒 Quantum' : '🔓 None'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 🎯 SUGGESTED TOPICS */}
          <div className="suggested-topics">
            <div className="topics-header">
              <span className="topics-icon">💡</span>
              <span className="topics-title">AI-Suggested Topics for {userPersonality}:</span>
            </div>
            <div className="topics-list">
              {userPrefs.suggestedTopics.map(topic => (
                <button
                  key={topic}
                  type="button"
                  className="topic-tag"
                  onClick={() => setFormData({
                    ...formData,
                    subject: topic,
                    message: `I'm interested in discussing ${topic}. `
                  })}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            className={`quantum-submit ${messageState !== 'idle' ? 'transmitting' : ''}`}
            disabled={messageState !== 'idle'}
          >
            <span className="submit-icon">
              {messageState === 'idle' && '🚀'}
              {messageState === 'transmitting' && '⚡'}
              {messageState === 'transmitted' && '📡'}
              {messageState === 'acknowledged' && '✅'}
            </span>
            <span className="submit-text">
              {messageState === 'idle' && 'Transmit Quantum Message'}
              {messageState === 'transmitting' && 'Transmitting Across Dimensions...'}
              {messageState === 'transmitted' && 'Message Transmitted Successfully'}
              {messageState === 'acknowledged' && 'Quantum Link Established'}
            </span>
          </button>
        </form>
      </div>

      {/* 🌐 SOCIAL QUANTUM NETWORKS */}
      <div className="social-networks">
        <div className="networks-header">
          <h3 className="networks-title">Alternative Quantum Channels</h3>
          <div className="networks-subtitle">Connect across multiple dimensions</div>
        </div>

        <div className="networks-grid">
          {socialNetworks.map(network => (
            <a
              key={network.platform}
              href={network.url}
              target="_blank"
              rel="noopener noreferrer"
              className="network-link"
              style={{
                '--network-frequency': `${network.quantumFrequency}%`
              }}
            >
              <div className="network-icon">{network.icon}</div>
              <div className="network-content">
                <div className="network-name">{network.platform}</div>
                <div className="network-description">{network.description}</div>
                <div className="network-frequency">
                  Frequency: {network.quantumFrequency}Hz
                </div>
              </div>
              <div className="network-portal">
                <div className="portal-ring"></div>
                <div className="portal-energy"></div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* 🌊 QUANTUM EFFECTS */}
      <div className="quantum-effects">
        <div className="communication-waves">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="comm-wave"
              style={{
                '--wave-delay': `${i * 0.3}s`,
                '--wave-color': primaryColor,
                '--wave-intensity': quantumSignal / 100
              }}
            ></div>
          ))}
        </div>
        
        <div className="signal-particles">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="signal-particle"
              style={{
                '--particle-delay': `${i * 0.2}s`,
                '--particle-color': primaryColor,
                '--particle-x': `${Math.random() * 100}%`,
                '--particle-y': `${Math.random() * 100}%`
              }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuantumContact;
