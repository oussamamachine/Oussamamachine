import React, { useState, useEffect } from 'react';

const PerformanceAnalytics = () => {
  const [metrics, setMetrics] = useState({
    fps: 60,
    loadTime: 0,
    memoryUsage: 0,
    networkSpeed: 'Fast',
    interactions: 0
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Calculate initial load time
    const loadTime = performance.now();
    setMetrics(prev => ({ ...prev, loadTime: Math.round(loadTime) }));

    // FPS monitoring
    let frames = 0;
    let lastTime = performance.now();
    
    const countFPS = () => {
      frames++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        setMetrics(prev => ({ 
          ...prev, 
          fps: Math.round((frames * 1000) / (currentTime - lastTime))
        }));
        frames = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(countFPS);
    };
    
    countFPS();

    // Memory usage (if available)
    if (performance.memory) {
      const updateMemory = () => {
        const memoryMB = Math.round(performance.memory.usedJSHeapSize / 1048576);
        setMetrics(prev => ({ ...prev, memoryUsage: memoryMB }));
      };
      
      updateMemory();
      const memoryInterval = setInterval(updateMemory, 5000);
      return () => clearInterval(memoryInterval);
    }

    // Network speed estimation
    if (navigator.connection) {
      const connection = navigator.connection;
      const speed = connection.effectiveType;
      setMetrics(prev => ({ 
        ...prev, 
        networkSpeed: speed === '4g' ? 'Excellent' : speed === '3g' ? 'Good' : 'Fair'
      }));
    }
  }, []);

  const toggleVisibility = () => setIsVisible(!isVisible);

  if (!isVisible) {
    return (
      <button
        onClick={toggleVisibility}
        className="fixed bottom-6 left-6 w-12 h-12 bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 backdrop-blur-sm border border-cyan-500/30 rounded-lg text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 flex items-center justify-center group"
        title="Show Performance Metrics"
      >
        <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 bg-black/80 backdrop-blur-lg border border-cyan-500/30 rounded-xl p-4 text-xs font-mono text-gray-300 min-w-64 z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-cyan-400 font-semibold flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
          Performance Analytics
        </h3>
        <button
          onClick={toggleVisibility}
          className="text-gray-500 hover:text-cyan-400 transition-colors duration-300"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">FPS:</span>
          <span className={`font-semibold ${
            metrics.fps >= 55 ? 'text-green-400' : 
            metrics.fps >= 30 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {metrics.fps}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Load Time:</span>
          <span className={`font-semibold ${
            metrics.loadTime <= 1000 ? 'text-green-400' : 
            metrics.loadTime <= 3000 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {metrics.loadTime}ms
          </span>
        </div>

        {metrics.memoryUsage > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Memory:</span>
            <span className={`font-semibold ${
              metrics.memoryUsage <= 50 ? 'text-green-400' : 
              metrics.memoryUsage <= 100 ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {metrics.memoryUsage}MB
            </span>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Network:</span>
          <span className={`font-semibold ${
            metrics.networkSpeed === 'Excellent' ? 'text-green-400' : 
            metrics.networkSpeed === 'Good' ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {metrics.networkSpeed}
          </span>
        </div>

        <div className="pt-2 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Status:</span>
            <span className="text-green-400 font-semibold">Optimized</span>
          </div>
        </div>
      </div>
      
      <div className="mt-3 pt-2 border-t border-gray-700 text-center">
        <span className="text-cyan-400 font-semibold">🚀 Ultra Performance Mode</span>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;
