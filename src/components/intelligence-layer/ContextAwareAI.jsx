import React from 'react';

const CONTEXT_AWARE_AI_STYLES = `
  .context-aware-ai-card {
    background-color: #000;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .context-aware-ai-card:hover {
    border-top: 2px solid #fff;
    background: linear-gradient(135deg, #000 0%, #0a0a0a 100%);
  }

  .context-aware-ai-number {
    font-family: "Source Code Pro", monospace;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 400;
    position: absolute;
    top: 16px;
    left: 16px;
    transition: color 0.3s ease;
  }

  .context-aware-ai-card:hover .context-aware-ai-number {
    color: rgba(255, 255, 255, 0.9);
  }

  .context-aware-ai-icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 32px 0 16px 0;
  }

  .context-aware-ai-svg {
    width: 40%;
    height: 50%;
    object-fit: cover;
    stroke: #fff;
    stroke-width: 1.5;
    fill: none;
    filter: drop-shadow(0 0 0 rgba(255, 255, 255, 0));
    transition: all 0.5s ease;
  }

  .context-aware-ai-svg circle {
    transition: all 0.5s ease;
  }

  .context-aware-ai-svg line {
    transition: all 0.5s ease;
  }

  .context-aware-ai-card:hover .context-aware-ai-svg {
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.4));
    transform: scale(1.1);
  }

  .context-aware-ai-card:hover .context-aware-ai-svg circle {
    stroke: #fff;
    stroke-opacity: 1;
    stroke-width: 2;
    animation: pulse 2s infinite;
  }

  .context-aware-ai-card:hover .context-aware-ai-svg line {
    stroke: #fff;
    stroke-opacity: 1;
    stroke-width: 1;
    animation: flow 3s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  @keyframes flow {
    0%, 100% { stroke-dasharray: 1; }
    50% { stroke-dasharray: 3; }
  }

  .context-aware-ai-title {
    font-family: "Source Code Pro", monospace;
    font-size: 11px;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 12px;
    font-weight: 500;
    line-height: 1.3;
    transition: all 0.3s ease;
  }



  .context-aware-ai-description {
    font-family: "Source Code Pro", monospace;
    font-size: 9px;
    line-height: 1.4;
    color: rgba(255, 255, 255, 0.4);
    text-transform: uppercase;
    font-weight: 400;
    transition: color 0.3s ease;
  }
`;

export default function ContextAwareAI() {
  return (
    <div className="context-aware-ai-card">
      <style>{CONTEXT_AWARE_AI_STYLES}</style>
      <div className="context-aware-ai-number">[06]</div>
      <div className="context-aware-ai-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none" className="context-aware-ai-svg">
          <circle cx="20" cy="20" r="3" stroke="white" stroke-opacity="0.5" stroke-width="1" />
          <circle cx="40" cy="20" r="3" stroke="white" stroke-opacity="0.5" stroke-width="1" />
          <circle cx="60" cy="20" r="3" stroke="white" stroke-opacity="0.5" stroke-width="1" />
          <circle cx="80" cy="20" r="3" stroke="white" stroke-opacity="0.5" stroke-width="1" />
          <circle cx="20" cy="40" r="3" stroke="white" stroke-opacity="0.5" stroke-width="1" />
          <circle cx="40" cy="40" r="3" stroke="white" stroke-opacity="0.5" stroke-width="1" />
          <circle cx="60" cy="40" r="3" stroke="white" stroke-opacity="0.5" stroke-width="1" />
          <circle cx="80" cy="40" r="3" stroke="white" stroke-opacity="0.5" stroke-width="1" />
          <circle cx="20" cy="60" r="3" stroke="white" stroke-opacity="0.5" stroke-width="1" />
          <circle cx="40" cy="60" r="3" stroke="white" stroke-opacity="0.5" stroke-width="1" />
          <circle cx="60" cy="60" r="3" stroke="white" stroke-opacity="0.5" stroke-width="1" />
          <circle cx="80" cy="60" r="3" stroke="white" stroke-opacity="0.5" stroke-width="1" />
          <circle cx="20" cy="80" r="3" stroke="white" stroke-opacity="0.5" stroke-width="1" />
          <circle cx="40" cy="80" r="3" stroke="white" stroke-opacity="0.5" stroke-width="1" />
          <circle cx="60" cy="80" r="3" stroke="white" stroke-opacity="0.5" stroke-width="1" />
          <circle cx="80" cy="80" r="3" stroke="white" stroke-opacity="0.5" stroke-width="1" />
          <line x1="20" y1="20" x2="40" y2="40" stroke="white" stroke-opacity="0.5" stroke-width="1" />
          <line x1="40" y1="20" x2="60" y2="40" stroke="white" stroke-opacity="0.5" stroke-width="1" />
          <line x1="60" y1="20" x2="80" y2="40" stroke="white" stroke-opacity="0.5" stroke-width="1" />
          <line x1="20" y1="40" x2="40" y2="60" stroke="white" stroke-opacity="0.5" stroke-width="1" />
          <line x1="40" y1="40" x2="60" y2="60" stroke="white" stroke-opacity="0.5" stroke-width="1" />
          <line x1="60" y1="40" x2="80" y2="60" stroke="white" stroke-opacity="0.5" stroke-width="1" />
          <line x1="20" y1="60" x2="40" y2="80" stroke="white" stroke-opacity="0.5" stroke-width="1" />
          <line x1="40" y1="60" x2="60" y2="80" stroke="white" stroke-opacity="0.5" stroke-width="1" />
          <line x1="60" y1="60" x2="80" y2="80" stroke="white" stroke-opacity="0.5" stroke-width="1" />
        </svg>
      </div>
      <h3 className="context-aware-ai-title">CONTEXT-AWARE AI</h3>
      <p className="context-aware-ai-description">
        POSITION AWARE ENTITY <span style={{ color: ' #fff', opacity: 0.8 }}>DETECTION WITH CONTEXTUAL UNDERSTANDING </span>FOR PRECISE DATA EXTRACTION AND VALIDATION.
      </p>
    </div>
  );
} 