import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DigitalConsciousnessScanner = () => {
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [detectedPatterns, setDetectedPatterns] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [scanResults, setScanResults] = useState(null);
  const [eyeTrackingActive, setEyeTrackingActive] = useState(false);
  const scannerRef = useRef(null);

  // Neural pattern detection
  const neuralPatterns = {
    developer: {
      triggers: ['fast_scroll', 'code_inspection', 'technical_hover'],
      confidence: 0,
      traits: ['analytical', 'detail-oriented', 'problem-solver'],
      message: "Detected: Experienced Developer Mindset",
      color: '#10b981'
    },
    designer: {
      triggers: ['visual_focus', 'aesthetic_hover', 'color_appreciation'],
      confidence: 0,
      traits: ['creative', 'visual-oriented', 'aesthetic-aware'],
      message: "Detected: Creative Designer Patterns",
      color: '#8b5cf6'
    },
    recruiter: {
      triggers: ['quick_scan', 'contact_focus', 'resume_pattern'],
      confidence: 0,
      traits: ['efficiency-focused', 'goal-oriented', 'time-conscious'],
      message: "Detected: Talent Acquisition Specialist",
      color: '#f59e0b'
    },
    entrepreneur: {
      triggers: ['vision_focus', 'innovation_interest', 'business_mindset'],
      confidence: 0,
      traits: ['visionary', 'opportunity-seeker', 'risk-taker'],
      message: "Detected: Entrepreneurial Vision",
      color: '#ef4444'
    },
    curious: {
      triggers: ['easter_egg_hunt', 'exploration', 'detailed_reading'],
      confidence: 0,
      traits: ['inquisitive', 'thorough', 'discovery-oriented'],
      message: "Detected: Curious Explorer Mind",
      color: '#3b82f6'
    }
  };

  // Advanced behavioral analysis
  useEffect(() => {
    let behaviorData = {
      mouseVelocity: [],
      scrollPatterns: [],
      clickPatterns: [],
      timeSpent: Date.now(),
      focusAreas: new Map()
    };

    // Mouse velocity tracking
    const handleMouseMove = (e) => {
      const velocity = Math.sqrt(e.movementX ** 2 + e.movementY ** 2);
      behaviorData.mouseVelocity.push(velocity);
      
      // Keep only last 50 measurements
      if (behaviorData.mouseVelocity.length > 50) {
        behaviorData.mouseVelocity.shift();
      }

      // Fast, precise movements = developer
      const avgVelocity = behaviorData.mouseVelocity.reduce((a, b) => a + b, 0) / behaviorData.mouseVelocity.length;
      if (avgVelocity > 15 && avgVelocity < 30) {
        updatePatternConfidence('developer', 0.1);
      }

      // Slow, aesthetic appreciation = designer
      if (avgVelocity < 10) {
        updatePatternConfidence('designer', 0.05);
      }
    };

    // Scroll pattern analysis
    const handleScroll = () => {
      const scrollSpeed = Math.abs(window.scrollY - (behaviorData.lastScrollY || 0));
      behaviorData.lastScrollY = window.scrollY;
      behaviorData.scrollPatterns.push(scrollSpeed);

      if (behaviorData.scrollPatterns.length > 20) {
        behaviorData.scrollPatterns.shift();
      }

      // Quick scanning = recruiter
      if (scrollSpeed > 100) {
        updatePatternConfidence('recruiter', 0.1);
      }

      // Steady exploration = curious
      if (scrollSpeed > 5 && scrollSpeed < 20) {
        updatePatternConfidence('curious', 0.05);
      }
    };

    // Click pattern analysis
    const handleClick = (e) => {
      const element = e.target;
      const elementType = element.tagName.toLowerCase();
      const hasCode = element.closest('code, pre, .font-mono');
      const isVisual = element.closest('canvas, svg, img');

      behaviorData.clickPatterns.push({
        element: elementType,
        hasCode: !!hasCode,
        isVisual: !!isVisual,
        timestamp: Date.now()
      });

      // Code interaction = developer
      if (hasCode) {
        updatePatternConfidence('developer', 0.2);
      }

      // Visual interaction = designer
      if (isVisual) {
        updatePatternConfidence('designer', 0.15);
      }
    };

    // Focus area tracking
    const handleMouseEnter = (e) => {
      const section = e.target.dataset?.section || 'unknown';
      const currentCount = behaviorData.focusAreas.get(section) || 0;
      behaviorData.focusAreas.set(section, currentCount + 1);

      // Business/vision focus = entrepreneur
      if (section === 'vision' || section === 'projects') {
        updatePatternConfidence('entrepreneur', 0.1);
      }
    };

    // Pattern confidence updater
    const updatePatternConfidence = (patternName, increment) => {
      setDetectedPatterns(prev => {
        const updated = { ...prev };
        updated[patternName] = Math.min((updated[patternName] || 0) + increment, 1);
        return updated;
      });
    };

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });
    document.querySelectorAll('[data-section]').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
    });

    // Analysis interval
    const analysisInterval = setInterval(() => {
      // Find dominant pattern
      const dominantPattern = Object.entries(detectedPatterns)
        .sort(([,a], [,b]) => b - a)[0];

      if (dominantPattern && dominantPattern[1] > 0.3) {
        const [patternName, confidence] = dominantPattern;
        const pattern = neuralPatterns[patternName];
        
        setScanResults({
          type: patternName,
          confidence: Math.round(confidence * 100),
          traits: pattern.traits,
          message: pattern.message,
          color: pattern.color,
          timeSpent: Date.now() - behaviorData.timeSpent,
          interactions: behaviorData.clickPatterns.length,
          avgMouseSpeed: behaviorData.mouseVelocity.length ? 
            Math.round(behaviorData.mouseVelocity.reduce((a, b) => a + b, 0) / behaviorData.mouseVelocity.length) : 0
        });
      }
    }, 5000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
      clearInterval(analysisInterval);
    };
  }, [detectedPatterns]);

  // Auto-trigger scan after 10 seconds of activity
  useEffect(() => {
    const autoScanTimer = setTimeout(() => {
      if (!isScanning && Object.keys(detectedPatterns).length > 0) {
        startScan();
      }
    }, 10000);

    return () => clearTimeout(autoScanTimer);
  }, [detectedPatterns, isScanning]);

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);

    // Progressive scan animation
    const scanInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(scanInterval);
          setIsScanning(false);
          return 100;
        }
        return prev + Math.random() * 5 + 2; // Variable speed for realism
      });
    }, 100);
  };

  // Eye tracking simulation (future-ready)
  const simulateEyeTracking = () => {
    setEyeTrackingActive(true);
    
    // Mock eye tracking data
    setTimeout(() => {
      setUserProfile({
        readingPattern: 'F-pattern', // Typical web reading pattern
        interestAreas: ['technical-skills', 'projects', 'contact'],
        attentionSpan: 'high',
        visualPreference: 'detailed'
      });
      setEyeTrackingActive(false);
    }, 3000);
  };

  return (
    <div className="consciousness-scanner fixed bottom-6 left-6 z-40 max-w-sm">
      {/* Scanner Trigger Button */}
      <AnimatePresence>
        {!isScanning && !scanResults && (
          <motion.button
            className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-2 rounded-lg font-mono text-sm shadow-lg hover:shadow-xl transition-shadow backdrop-blur-sm border border-white/20"
            onClick={startScan}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🧠 Scan Consciousness
          </motion.button>
        )}
      </AnimatePresence>

      {/* Active Scanner Interface */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            className="bg-black/90 backdrop-blur-sm rounded-lg p-4 border border-cyan-400 min-w-80"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
          >
            <div className="text-center mb-4">
              <motion.div
                className="text-2xl mb-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                🔬
              </motion.div>
              <div className="text-cyan-400 font-mono text-lg mb-2">
                CONSCIOUSNESS ANALYSIS
              </div>
              <div className="text-gray-300 text-sm">
                Scanning neural patterns...
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
                animate={{ width: `${scanProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Real-time Pattern Detection */}
            <div className="space-y-2">
              {Object.entries(detectedPatterns).map(([pattern, confidence]) => (
                <div key={pattern} className="flex justify-between text-xs font-mono">
                  <span className="text-gray-400">{pattern}:</span>
                  <span 
                    className="text-right"
                    style={{ color: neuralPatterns[pattern]?.color }}
                  >
                    {Math.round(confidence * 100)}%
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center mt-4 text-xs text-gray-400 font-mono">
              Progress: {Math.round(scanProgress)}%
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scan Results Display */}
      <AnimatePresence>
        {scanResults && (
          <motion.div
            className="bg-black/95 backdrop-blur-sm rounded-lg p-6 border-2 shadow-2xl max-w-96"
            style={{ borderColor: scanResults.color }}
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            transition={{ type: "spring", damping: 15 }}
          >
            {/* Results Header */}
            <div className="text-center mb-4">
              <motion.div
                className="text-4xl mb-2"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎯
              </motion.div>
              <div 
                className="text-xl font-bold mb-2"
                style={{ color: scanResults.color }}
              >
                ANALYSIS COMPLETE
              </div>
              <div className="text-lg text-white">
                {scanResults.message}
              </div>
            </div>

            {/* Confidence Meter */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Confidence:</span>
                <span style={{ color: scanResults.color }}>
                  {scanResults.confidence}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: scanResults.color }}
                  animate={{ width: `${scanResults.confidence}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>

            {/* Detected Traits */}
            <div className="mb-4">
              <div className="text-sm text-gray-400 mb-2">Detected Traits:</div>
              <div className="flex flex-wrap gap-2">
                {scanResults.traits.map((trait, i) => (
                  <motion.span
                    key={trait}
                    className="px-2 py-1 rounded-full text-xs font-mono"
                    style={{ 
                      backgroundColor: `${scanResults.color}20`,
                      color: scanResults.color,
                      border: `1px solid ${scanResults.color}40`
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {trait}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Analytics */}
            <div className="space-y-2 text-xs font-mono text-gray-400">
              <div className="flex justify-between">
                <span>Time Engaged:</span>
                <span>{Math.round(scanResults.timeSpent / 1000)}s</span>
              </div>
              <div className="flex justify-between">
                <span>Interactions:</span>
                <span>{scanResults.interactions}</span>
              </div>
              <div className="flex justify-between">
                <span>Avg Mouse Speed:</span>
                <span>{scanResults.avgMouseSpeed}px/s</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-6">
              <motion.button
                className="flex-1 py-2 px-3 rounded bg-white/10 hover:bg-white/20 transition-colors text-sm font-mono"
                onClick={() => setScanResults(null)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close
              </motion.button>
              <motion.button
                className="flex-1 py-2 px-3 rounded text-sm font-mono"
                style={{ 
                  backgroundColor: `${scanResults.color}20`,
                  color: scanResults.color,
                  border: `1px solid ${scanResults.color}40`
                }}
                onClick={() => {
                  navigator.clipboard.writeText(`Consciousness Scan Result: ${scanResults.message} (${scanResults.confidence}% confidence)`);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Share Result
              </motion.button>
            </div>

            {/* Future Tech Teaser */}
            <motion.button
              className="w-full mt-4 py-2 px-3 rounded bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-400/30 text-sm font-mono text-purple-300 hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-cyan-600/30 transition-all"
              onClick={simulateEyeTracking}
              disabled={eyeTrackingActive}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {eyeTrackingActive ? '👁️ Tracking Eyes...' : '👁️ Enable Eye Tracking (Beta)'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Eye Tracking Interface */}
      <AnimatePresence>
        {eyeTrackingActive && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-black/90 backdrop-blur-sm rounded-lg p-8 border border-purple-400 text-center">
              <motion.div
                className="text-6xl mb-4"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                👁️
              </motion.div>
              <div className="text-purple-400 font-mono text-lg mb-2">
                EYE TRACKING ACTIVE
              </div>
              <div className="text-gray-300 text-sm">
                Analyzing visual attention patterns...
              </div>
              <div className="text-xs text-gray-400 mt-4 font-mono">
                This is a simulation of future eye-tracking technology
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Profile Results */}
      <AnimatePresence>
        {userProfile && (
          <motion.div
            className="mt-4 bg-black/90 backdrop-blur-sm rounded-lg p-4 border border-purple-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="text-purple-400 font-mono text-sm mb-2">
              👁️ EYE TRACKING ANALYSIS
            </div>
            <div className="space-y-1 text-xs font-mono text-gray-300">
              <div>Pattern: {userProfile.readingPattern}</div>
              <div>Attention: {userProfile.attentionSpan}</div>
              <div>Visual Style: {userProfile.visualPreference}</div>
            </div>
            <button
              className="mt-2 text-xs text-purple-400 hover:text-purple-300 font-mono"
              onClick={() => setUserProfile(null)}
            >
              [Close]
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DigitalConsciousnessScanner;
