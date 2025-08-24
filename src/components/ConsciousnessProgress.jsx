import React from 'react';

const ConsciousnessProgress = ({ sectionsViewed }) => {
  const sections = ['home', 'journey', 'projects', 'about', 'contact'];
  const progress = sectionsViewed ? (sectionsViewed.size / sections.length) * 100 : 0;

  return (
    <div className="consciousness-progress">
      <div className="progress-container">
        {sections.map((section, index) => (
          <div 
            key={section}
            className={`progress-node ${sectionsViewed?.has(section) ? 'viewed' : ''}`}
          >
            <div className="node-core"></div>
            {index < sections.length - 1 && (
              <div className={`connection-line ${sectionsViewed?.has(sections[index + 1]) ? 'active' : ''}`}></div>
            )}
          </div>
        ))}
      </div>

      {progress === 100 && (
        <div className="completion-pulse">
          <span>Neural Sync Complete</span>
        </div>
      )}

      <style jsx>{`
        .consciousness-progress {
          position: fixed;
          right: 2rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 999;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .progress-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
        }

        .progress-node {
          position: relative;
          width: 12px;
          height: 12px;
        }

        .node-core {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(102, 126, 234, 0.2);
          border: 2px solid rgba(102, 126, 234, 0.3);
          transition: all 0.5s ease;
        }

        .progress-node.viewed .node-core {
          background: var(--neural-blue);
          border-color: var(--neural-blue);
          box-shadow: 0 0 10px rgba(102, 126, 234, 0.6);
          animation: neuralPulse 2s ease-in-out infinite;
        }

        .connection-line {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 1rem;
          background: rgba(102, 126, 234, 0.2);
          transition: all 0.5s ease;
        }

        .connection-line.active {
          background: linear-gradient(to bottom, var(--neural-blue), var(--synapse-gold));
          box-shadow: 0 0 5px rgba(102, 126, 234, 0.4);
        }

        .completion-pulse {
          background: rgba(246, 211, 101, 0.1);
          border: 1px solid var(--synapse-gold);
          border-radius: 20px;
          padding: 0.5rem 1rem;
          font-size: 0.8rem;
          color: var(--synapse-gold);
          font-weight: 500;
          animation: completionGlow 2s ease-in-out infinite;
          backdrop-filter: blur(10px);
        }

        @keyframes neuralPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        @keyframes completionGlow {
          0%, 100% { 
            box-shadow: 0 0 10px rgba(246, 211, 101, 0.3);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 20px rgba(246, 211, 101, 0.6);
            transform: scale(1.05);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .consciousness-progress {
            right: 1rem;
            transform: translateY(-50%) scale(0.8);
          }

          .completion-pulse {
            font-size: 0.7rem;
            padding: 0.4rem 0.8rem;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .progress-node.viewed .node-core,
          .completion-pulse {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ConsciousnessProgress;
