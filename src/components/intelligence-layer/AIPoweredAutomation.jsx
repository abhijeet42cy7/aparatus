import React from 'react';

const AI_POWERED_AUTOMATION_STYLES = `
  .ai-powered-automation-card {
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
    font-weight: 200;
  }

  .ai-powered-automation-card:hover {
    border-top: 2px solid #fff;
    background: linear-gradient(135deg, #000 0%, #0a0a0a 100%);
  }

  .ai-powered-automation-number {
    font-family: "Source Code Pro", monospace;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 400;
    position: absolute;
    top: 16px;
    left: 16px;
    transition: color 0.3s ease;
  }

  .ai-powered-automation-card:hover .ai-powered-automation-number {
    color: rgba(255, 255, 255, 0.9);
  }

  .ai-powered-automation-icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 32px 0 16px 0;
  }


  .ai-powered-automation-title {
    font-family: "Source Code Pro", monospace;
    font-size: 11px;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 12px;
    font-weight: 500;
    line-height: 1.3;
    transition: all 0.3s ease;
  }


  .ai-powered-automation-description {
    font-family: "Source Code Pro", monospace;
    font-size: 9px;
    line-height: 1.4;
    color: rgba(255, 255, 255, 0.4);
    text-transform: uppercase;
    font-weight: 400;
    transition: color 0.3s ease;
  }


    .ai-powered-automation-card:hover .ai-powered-automation-svg .inner-rect {
  fill: white;
  transition: fill 0.3s ease;
}

.ai-powered-automation-card:hover .ai-powered-automation-svg .main-circle {
  fill: white;
  transition: fill 0.3s ease;

}
`;

export default function AIPoweredAutomation() {
  return (
    <div className="ai-powered-automation-card">
      <style>{AI_POWERED_AUTOMATION_STYLES}</style>
      <div className="ai-powered-automation-number">[08]</div>
      <div className="ai-powered-automation-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="126" viewBox="0 0 132 126" fill="none" className="ai-powered-automation-svg">
          <rect x="6.25" y="11.25" width="40.5" height="9.5" stroke="white" stroke-opacity="0.5" stroke-width="0.5" className="inner-rect" />
          <rect x="85.25" y="11.25" width="40.5" height="9.5" stroke="white" stroke-opacity="0.5" stroke-width="0.5" className="inner-rect" />
          <rect x="6.25" y="25.25" width="40.5" height="9.5" stroke="white" stroke-opacity="0.5" stroke-width="0.5" className="inner-rect" />
          <rect x="85.25" y="25.25" width="40.5" height="9.5" stroke="white" stroke-opacity="0.5" stroke-width="0.5" className="inner-rect" />
          <rect x="0.5" y="0.5" width="52" height="49" stroke="white" stroke-opacity="0.5" className="main-box" />
          <rect x="79.5" y="0.5" width="52" height="49" stroke="white" stroke-opacity="0.5" className="main-box" />
          <rect x="41.5" y="76.5" width="52" height="49" stroke="white" stroke-opacity="0.5" className="main-box" />
          <path d="M102.5 63V63.5H103V63H102.5ZM68 63V62.5H67.5V63H68ZM67.6464 76.8536C67.8417 77.0488 68.1583 77.0488 68.3536 76.8536L71.5355 73.6716C71.7308 73.4763 71.7308 73.1597 71.5355 72.9645C71.3403 72.7692 71.0237 72.7692 70.8284 72.9645L68 75.7929L65.1716 72.9645C64.9763 72.7692 64.6597 72.7692 64.4645 72.9645C64.2692 73.1597 64.2692 73.4763 64.4645 73.6716L67.6464 76.8536ZM102.5 50H102V63H102.5H103V50H102.5ZM102.5 63V62.5H68V63V63.5H102.5V63ZM68 63H67.5V76.5H68H68.5V63H68Z" fill="white" fill-opacity="0.5" />
          <path d="M25 63.2453V63.7453H24.5V63.2453H25ZM68 63.2453V62.7453H68.5V63.2453H68ZM68.3536 77.3536C68.1583 77.5488 67.8417 77.5488 67.6464 77.3536L64.4645 74.1716C64.2692 73.9763 64.2692 73.6597 64.4645 73.4645C64.6597 73.2692 64.9763 73.2692 65.1716 73.4645L68 76.2929L70.8284 73.4645C71.0237 73.2692 71.3403 73.2692 71.5355 73.4645C71.7308 73.6597 71.7308 73.9763 71.5355 74.1716L68.3536 77.3536ZM25 50H25.5V63.2453H25H24.5V50H25ZM25 63.2453V62.7453H68V63.2453V63.7453H25V63.2453ZM68 63.2453H68.5V77H68H67.5V63.2453H68Z" fill="white" fill-opacity="0.5" />
          <circle cx="68" cy="101" r="11.5" stroke="white" stroke-opacity="0.5" className="main-circle" />
        </svg>
      </div>
      <h3 className="ai-powered-automation-title">AI-POWERED AUTOMATION</h3>
      <p className="ai-powered-automation-description">
        LEVERAGE <span style={{ color: '#FFF', opacity: 0.8 }}>INTELLIGENT AI AGENTS</span> TO AUTOMATE COMPLEX DOCUMENT WORKFLOWS ACROSS YOUR ENTIRE ORGANIZATION.
      </p>
    </div>
  );
} 