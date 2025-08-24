import React, { useState, useEffect, useRef } from 'react';

const VisionCortex = ({ vision, isActive }) => {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef();

  const brandPillars = [
    {
      id: 1,
      title: "DIGITAL ARCHITECT",
      subtitle: "Building Tomorrow's Infrastructure",
      description: "I don't just code—I architect digital ecosystems that scale infinitely. From React frontends to Node.js backends, from MongoDB databases to blockchain networks, I create the foundation for digital transformation.",
      icon: "🏗️",
      color: "#00ffff",
      skills: ["System Design", "Scalable Architecture", "Full-Stack Mastery", "Cloud Infrastructure"]
    },
    {
      id: 2,
      title: "INNOVATION CATALYST",
      subtitle: "Where Creativity Meets Technology",
      description: "As Oussama Machine, I merge artistic vision with technical precision. Blender 3D models, Figma designs, Three.js experiences—I transform imagination into interactive reality that captivates and converts.",
      icon: "⚡",
      color: "#ff00ff",
      skills: ["Creative Technology", "3D Design", "Interactive Experiences", "UI/UX Innovation"]
    },
    {
      id: 3,
      title: "BLOCKCHAIN PIONEER",
      subtitle: "Decentralizing the Future",
      description: "In the Web3 revolution, I'm not just a participant—I'm a builder. Solidity smart contracts, DeFi protocols, NFT ecosystems. I create the decentralized infrastructure that empowers global communities.",
      icon: "🔗",
      color: "#00ff88",
      skills: ["Smart Contracts", "DeFi Development", "Web3 Integration", "Tokenomics"]
    },
    {
      id: 4,
      title: "CONSCIOUS CODER",
      subtitle: "Purpose-Driven Development",
      description: "Every line of code I write serves a greater purpose. From Morocco to the world, I develop solutions that bridge cultures, empower businesses, and create positive impact through technology.",
      icon: "🧠",
      color: "#ffff00",
      skills: ["Social Impact", "Cultural Bridge", "Business Transformation", "Global Mindset"]
    }
  ];

  const achievements = [
    { metric: "6+", label: "Years of Code", color: "#00ffff" },
    { metric: "20+", label: "Technologies", color: "#ff00ff" },
    { metric: "∞", label: "Possibilities", color: "#00ff88" },
    { metric: "100%", label: "Passion", color: "#ffff00" }
  ];

  // Intersection Observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-cycle through brand pillars
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveSection((prev) => (prev + 1) % brandPillars.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isVisible, brandPillars.length]);

  return (
    <section 
      ref={containerRef}
      className="min-h-screen bg-black relative overflow-hidden py-20"
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Brand Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-6xl md:text-8xl font-mono font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              VISION CORTEX
            </span>
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto font-mono">
            The Neural Architecture of <span className="text-cyan-400 font-bold">OUSSAMA.MACHINE</span>
          </p>
          <div className="mt-8 text-lg text-gray-400">
            🇲🇦 Fullstack Developer • Digital Architect • Blockchain Pioneer • From Morocco to the World
          </div>
        </div>

        {/* Brand Pillars Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {brandPillars.map((pillar, index) => (
            <div
              key={pillar.id}
              className={`relative cursor-pointer transition-all duration-500 ${
                activeSection === index ? 'scale-105' : 'scale-100'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onClick={() => setActiveSection(index)}
            >
              <div 
                className={`bg-black/60 backdrop-blur-md border-2 rounded-xl p-6 h-full transition-all duration-300 ${
                  activeSection === index 
                    ? 'border-opacity-80 shadow-2xl' 
                    : 'border-opacity-30 hover:border-opacity-50'
                }`}
                style={{
                  borderColor: pillar.color,
                  boxShadow: activeSection === index 
                    ? `0 0 40px ${pillar.color}40, inset 0 0 20px ${pillar.color}20`
                    : `0 0 20px ${pillar.color}20`
                }}
              >
                {/* Pillar Header */}
                <div className="flex items-center mb-4">
                  <div 
                    className="text-4xl mr-4 animate-pulse"
                    style={{ filter: `drop-shadow(0 0 10px ${pillar.color})` }}
                  >
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 
                      className="text-xl font-bold font-mono"
                      style={{ color: pillar.color }}
                    >
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-gray-400">{pillar.subtitle}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {pillar.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {pillar.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 text-xs font-mono rounded-full bg-black/50 border"
                      style={{
                        borderColor: `${pillar.color}60`,
                        color: pillar.color
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Active Indicator */}
                {activeSection === index && (
                  <div 
                    className="absolute top-4 right-4 w-3 h-3 rounded-full animate-ping"
                    style={{ backgroundColor: pillar.color }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Achievement Metrics */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="text-center p-6 bg-black/40 backdrop-blur-md border border-gray-700 rounded-lg hover:border-cyan-400/50 transition-all duration-300"
              style={{ 
                boxShadow: `0 0 20px ${achievement.color}20`,
                animationDelay: `${index * 100}ms`
              }}
            >
              <div 
                className="text-4xl font-bold font-mono mb-2"
                style={{ color: achievement.color }}
              >
                {achievement.metric}
              </div>
              <div className="text-gray-400 text-sm font-mono">{achievement.label}</div>
            </div>
          ))}
        </div>

        {/* Brand Statement */}
        <div className={`text-center max-w-4xl mx-auto transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-black/60 backdrop-blur-md border border-cyan-400/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4 font-mono">MY DIGITAL MANIFESTO</h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              "I am <span className="text-cyan-400 font-bold">Oussama Machine</span>—where human creativity meets digital precision. 
              Every project is a canvas, every codebase a masterpiece, every solution a bridge between 
              what is and what could be. From the vibrant markets of Morocco to the infinite possibilities 
              of the metaverse, I craft digital experiences that don't just function—they inspire."
            </p>
            <div className="flex justify-center space-x-4">
              <span className="px-4 py-2 bg-cyan-400/20 text-cyan-400 rounded-full text-sm font-mono">
                #DigitalArchitect
              </span>
              <span className="px-4 py-2 bg-purple-400/20 text-purple-400 rounded-full text-sm font-mono">
                #InnovationCatalyst
              </span>
              <span className="px-4 py-2 bg-green-400/20 text-green-400 rounded-full text-sm font-mono">
                #BlockchainPioneer
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Navigation */}
        <div className="flex justify-center mt-12">
          <div className="flex space-x-3">
            {brandPillars.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeSection === index ? 'scale-125' : 'scale-100 opacity-50'
                }`}
                style={{
                  backgroundColor: brandPillars[index].color,
                  boxShadow: activeSection === index 
                    ? `0 0 15px ${brandPillars[index].color}` 
                    : 'none'
                }}
                onClick={() => setActiveSection(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Brand Elements */}
      <div className="absolute top-20 right-20 opacity-10">
        <div className="text-9xl font-bold text-cyan-400 font-mono animate-pulse">
          OM
        </div>
      </div>
      <div className="absolute bottom-20 left-20 opacity-10">
        <div className="text-6xl font-bold text-purple-400 font-mono animate-pulse">
          .MACHINE
        </div>
      </div>
    </section>
  );
};

export default VisionCortex;
