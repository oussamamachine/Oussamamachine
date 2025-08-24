import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DigitalDNASequencer = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [dnaSequence, setDnaSequence] = useState([]);
  const [visitorProfile, setVisitorProfile] = useState(null);
  const [sequenceAnimation, setSequenceAnimation] = useState(false);
  const canvasRef = useRef(null);

  // Digital DNA bases representing different visitor traits
  const dnaBases = {
    A: { 
      name: 'Architect', 
      color: '#ff6b6b', 
      trait: 'Systematic thinker, builds structured solutions',
      probability: 0.25
    },
    T: { 
      name: 'Technologist', 
      color: '#4ecdc4', 
      trait: 'Innovation-driven, embraces cutting-edge tech',
      probability: 0.25
    },
    C: { 
      name: 'Creator', 
      color: '#45b7d1', 
      trait: 'Artistic vision, designs beautiful experiences',
      probability: 0.25
    },
    G: { 
      name: 'Guardian', 
      color: '#f9ca24', 
      trait: 'Detail-oriented, ensures quality and security',
      probability: 0.25
    }
  };

  const visitorTypes = {
    'ATCG': 'Full-Stack Visionary',
    'AATT': 'System Architect',
    'CCGG': 'Creative Technologist', 
    'TGCA': 'Innovation Leader',
    'ACGT': 'Digital Pioneer',
    'GATC': 'Tech Guardian',
    'CTAG': 'Creative Architect',
    'TAGC': 'Adaptive Innovator'
  };

  // Analyze visitor behavior to determine DNA sequence
  const analyzeVisitorDNA = () => {
    const browserInfo = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      cookiesEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine
    };

    const timeInfo = {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      hour: new Date().getHours(),
      day: new Date().getDay()
    };

    const screenInfo = {
      width: window.screen.width,
      height: window.screen.height,
      colorDepth: window.screen.colorDepth,
      pixelRatio: window.devicePixelRatio || 1
    };

    // Generate DNA sequence based on visitor characteristics
    let sequence = [];
    
    // Browser-based DNA
    if (browserInfo.userAgent.includes('Chrome')) sequence.push('C');
    else if (browserInfo.userAgent.includes('Firefox')) sequence.push('T');
    else if (browserInfo.userAgent.includes('Safari')) sequence.push('A');
    else sequence.push('G');

    // Time-based DNA
    if (timeInfo.hour >= 9 && timeInfo.hour <= 17) sequence.push('A'); // Work hours = Architect
    else if (timeInfo.hour >= 22 || timeInfo.hour <= 6) sequence.push('T'); // Night owl = Technologist
    else sequence.push('C'); // Creative hours

    // Screen resolution DNA
    if (screenInfo.width >= 1920) sequence.push('G'); // High res = Guardian of quality
    else if (screenInfo.width >= 1366) sequence.push('C'); // Standard = Creator
    else sequence.push('T'); // Mobile = Technologist

    // Platform DNA
    if (browserInfo.platform.includes('Mac')) sequence.push('C'); // Mac = Creator
    else if (browserInfo.platform.includes('Linux')) sequence.push('T'); // Linux = Technologist
    else if (browserInfo.platform.includes('Win')) sequence.push('A'); // Windows = Architect
    else sequence.push('G'); // Other = Guardian

    return sequence;
  };

  // Start DNA scanning process
  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setSequenceAnimation(true);

    // Simulate progressive scanning
    const scanInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(scanInterval);
          completeScan();
          return 100;
        }
        return prev + Math.random() * 5 + 2;
      });
    }, 150);
  };

  const completeScan = () => {
    const sequence = analyzeVisitorDNA();
    setDnaSequence(sequence);

    // Determine visitor type
    const sequenceStr = sequence.join('');
    const type = visitorTypes[sequenceStr] || 'Unique Digital Entity';
    
    // Create visitor profile
    const profile = {
      type,
      sequence: sequenceStr,
      traits: sequence.map(base => dnaBases[base]),
      compatibility: calculateCompatibility(sequence),
      rarity: calculateRarity(sequenceStr),
      recommendations: generateRecommendations(sequence)
    };

    setVisitorProfile(profile);

    // Stop scanning after showing results
    setTimeout(() => {
      setIsScanning(false);
      setSequenceAnimation(false);
    }, 3000);
  };

  const calculateCompatibility = (sequence) => {
    // Mock compatibility calculation based on sequence diversity
    const uniqueBases = new Set(sequence).size;
    return Math.floor((uniqueBases / 4) * 100);
  };

  const calculateRarity = (sequenceStr) => {
    // Mock rarity calculation
    const rarityMap = {
      'ATCG': 'Ultra Rare (1 in 10,000)',
      'AATT': 'Rare (1 in 1,000)', 
      'CCGG': 'Uncommon (1 in 500)',
      'TGCA': 'Common (1 in 100)'
    };
    return rarityMap[sequenceStr] || 'Legendary (1 in 100,000)';
  };

  const generateRecommendations = (sequence) => {
    const recommendations = [];
    
    if (sequence.includes('A')) {
      recommendations.push('Check out the Neural Timeline - your systematic approach will appreciate the structured journey');
    }
    if (sequence.includes('T')) {
      recommendations.push('Explore the Consciousness Core - cutting-edge AI concepts await your innovative mind');
    }
    if (sequence.includes('C')) {
      recommendations.push('Visit the Vision Cortex - immerse yourself in the creative design philosophy');
    }
    if (sequence.includes('G')) {
      recommendations.push('Examine the Neural Code Visualizer - your attention to detail will love the technical precision');
    }

    return recommendations;
  };

  // Canvas DNA visualization
  useEffect(() => {
    if (sequenceAnimation && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = 400;
      canvas.height = 200;

      const drawDNAHelix = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const time = Date.now() * 0.001;
        const amplitude = 50;
        const frequency = 0.02;
        
        // Draw DNA double helix
        for (let i = 0; i < canvas.width; i += 2) {
          const y1 = canvas.height / 2 + Math.sin((i * frequency) + time) * amplitude;
          const y2 = canvas.height / 2 - Math.sin((i * frequency) + time) * amplitude;
          
          // First strand
          ctx.fillStyle = '#ff6b6b';
          ctx.fillRect(i, y1 - 1, 2, 2);
          
          // Second strand  
          ctx.fillStyle = '#4ecdc4';
          ctx.fillRect(i, y2 - 1, 2, 2);
          
          // Connecting bars
          if (i % 20 === 0) {
            ctx.strokeStyle = '#ffffff40';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(i, y1);
            ctx.lineTo(i, y2);
            ctx.stroke();
            
            // Add base labels
            const base = Object.keys(dnaBases)[Math.floor(Math.random() * 4)];
            ctx.fillStyle = dnaBases[base].color;
            ctx.font = '12px monospace';
            ctx.fillText(base, i - 6, (y1 + y2) / 2 + 4);
          }
        }
        
        if (sequenceAnimation) {
          requestAnimationFrame(drawDNAHelix);
        }
      };
      
      drawDNAHelix();
    }
  }, [sequenceAnimation]);

  return (
    <div className="fixed top-4 right-4 z-40 w-80 max-w-sm">
      {/* DNA Sequencer Interface */}
      <motion.div
        className="bg-black/90 backdrop-blur-sm border border-green-400/50 rounded-lg p-4"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-4">
          <h3 className="text-green-400 font-mono text-lg font-bold">
            🧬 DIGITAL DNA SEQUENCER
          </h3>
          <p className="text-gray-400 text-xs mt-1">
            Analyzing your digital genetic code...
          </p>
        </div>

        {/* Scan Button */}
        {!isScanning && !visitorProfile && (
          <motion.button
            onClick={startScan}
            className="w-full bg-green-400/20 hover:bg-green-400/30 border border-green-400 text-green-400 py-2 px-4 rounded font-mono text-sm transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            INITIATE DNA SCAN
          </motion.button>
        )}

        {/* Scanning Progress */}
        {isScanning && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-green-400 font-mono text-sm mb-2">
                Scanning Progress: {Math.floor(scanProgress)}%
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <motion.div
                  className="bg-green-400 h-2 rounded-full"
                  animate={{ width: `${scanProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* DNA Helix Visualization */}
            <div className="flex justify-center">
              <canvas
                ref={canvasRef}
                className="w-full max-w-xs h-24 border border-green-400/30 rounded bg-black/50"
              />
            </div>

            <div className="text-xs text-gray-400 text-center space-y-1">
              <div>🔍 Analyzing browser characteristics...</div>
              <div>⏰ Processing temporal patterns...</div>
              <div>📱 Evaluating device DNA...</div>
              <div>🧠 Decoding behavioral genome...</div>
            </div>
          </div>
        )}

        {/* Results Display */}
        <AnimatePresence>
          {visitorProfile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {/* Profile Type */}
              <div className="text-center">
                <div className="text-green-400 font-bold text-lg">
                  {visitorProfile.type}
                </div>
                <div className="text-xs text-gray-400">
                  Rarity: {visitorProfile.rarity}
                </div>
              </div>

              {/* DNA Sequence */}
              <div className="flex justify-center space-x-2 mb-4">
                {dnaSequence.map((base, index) => (
                  <motion.div
                    key={index}
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                    style={{ backgroundColor: dnaBases[base].color }}
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                  >
                    {base}
                  </motion.div>
                ))}
              </div>

              {/* Compatibility Score */}
              <div className="bg-gray-900/50 rounded p-3">
                <div className="text-sm text-gray-300 mb-2">
                  Portfolio Compatibility
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-800 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${visitorProfile.compatibility}%` }}
                      transition={{ delay: 1, duration: 1 }}
                    />
                  </div>
                  <span className="text-green-400 font-mono text-sm">
                    {visitorProfile.compatibility}%
                  </span>
                </div>
              </div>

              {/* Trait Breakdown */}
              <div className="space-y-2">
                <div className="text-sm text-gray-300">Your Digital Traits:</div>
                {visitorProfile.traits.map((trait, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-900/50 rounded p-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 + index * 0.2 }}
                  >
                    <div 
                      className="text-xs font-bold"
                      style={{ color: trait.color }}
                    >
                      {trait.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {trait.trait}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recommendations */}
              <div className="bg-blue-900/20 border border-blue-400/50 rounded p-3">
                <div className="text-sm text-blue-400 mb-2">
                  🎯 Personalized Recommendations:
                </div>
                <div className="space-y-1">
                  {visitorProfile.recommendations.map((rec, index) => (
                    <div key={index} className="text-xs text-gray-300">
                      • {rec}
                    </div>
                  ))}
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={() => {
                  setVisitorProfile(null);
                  setScanProgress(0);
                  setDnaSequence([]);
                }}
                className="w-full bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 py-1 px-3 rounded text-xs font-mono transition-colors"
              >
                SCAN AGAIN
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DigitalDNASequencer;
