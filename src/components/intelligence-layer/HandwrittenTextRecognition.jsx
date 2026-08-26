import React from 'react';

const SMART_DOC_CLASSIFICATION_STYLES = `
  .smart-doc-classification-card {
    background-color: #000;
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 24px;
    position: relative;
    transition: all 0.3s ease;
    max-width: 100%;
  }

  .smart-doc-classification-card:hover {
    border-top: 2px solid #fff;
    background: linear-gradient(135deg, #000 0%, #0a0a0a 100%);
  }

  .smart-doc-classification-number {
    font-family: "Source Code Pro", monospace;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 400;
    position: absolute;
    top: 16px;
    left: 16px;
    transition: color 0.3s ease;
  }

  .smart-doc-classification-card:hover .smart-doc-classification-number {
    color: rgba(255, 255, 255, 0.9);
  }

  .smart-doc-classification-icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 75%;
      margin: 32px 0 16px 0;
  }

  .smart-doc-classification-icon-container svg g {
    transition: all 0.3s ease;
  }

  .smart-doc-classification-card:hover .smart-doc-classification-icon-container svg g:first-child {
    transform: translate(42px, 7px) !important;
  }

  .smart-doc-classification-card:hover .smart-doc-classification-icon-container svg g:last-child {
    transform: translate(78px, 33px) !important;
  }

  .smart-doc-classification-title {
    font-family: "Source Code Pro", monospace;
    font-size: 12px;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 12px;
    font-weight: 500;
    line-height: 1.3;
    transition: all 0.3s ease;
  }



  .smart-doc-classification-description {
    font-family: "Source Code Pro", monospace;
    font-size: 9px;
    line-height: 1.4;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    font-weight: 200;
    transition: color 0.3s ease;
  }

  .smart-doc-classification-card:hover .smart-doc-classification-description {
    color: rgba(255, 255, 255, 0.9);
  }
`;

export default function HandwrittenTextRecognition() {
  return (
    <div className="smart-doc-classification-card">
      <style>{SMART_DOC_CLASSIFICATION_STYLES}</style>
      <div className="smart-doc-classification-number">[04]</div>

      <div className="smart-doc-classification-icon-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120" fill="none">
          {/* Bottom layer */}
          <g transform="translate(45, 10)">
            <path d="M60 70V0H16.8L0 16.5V70H60Z" fill="black" />
            <path d="M59.5 0.5V69.5H0.5V16.7L16.9 0.5H59.5Z" stroke="white" strokeOpacity="0.4" />
            <rect x="19" y="5" width="24" height="5" stroke="white" strokeOpacity="0.4" strokeWidth="0.5" />
            <rect x="5" y="19" width="50" height="13" stroke="white" strokeOpacity="0.4" strokeWidth="0.5" />
            <rect x="5" y="35" width="50" height="12" stroke="white" strokeOpacity="0.4" strokeWidth="0.5" />
            <rect x="5" y="60" width="20" height="5" stroke="white" strokeOpacity="0.4" strokeWidth="0.5" />
          </g>

          {/* Middle layer */}
          <g transform="translate(60, 20)">
            <path d="M60 70V0H16.8L0 16.5V70H60Z" fill="black" />
            <path d="M59.5 0.5V69.5H0.5V16.7L16.9 0.5H59.5Z" stroke="white" strokeOpacity="0.6" />
            <rect x="19" y="5" width="24" height="5" stroke="white" strokeOpacity="0.6" strokeWidth="0.5" />
            <rect x="5" y="19" width="50" height="13" stroke="white" strokeOpacity="0.6" strokeWidth="0.5" />
            <rect x="5" y="35" width="50" height="12" stroke="white" strokeOpacity="0.6" strokeWidth="0.5" />
            <rect x="5" y="60" width="20" height="5" stroke="white" strokeOpacity="0.6" strokeWidth="0.5" />
          </g>

          {/* Top layer */}
          <g transform="translate(75, 30)">
            <path d="M60 70V0H16.8L0 16.5V70H60Z" fill="black" />
            <path d="M59.5 0.5V69.5H0.5V16.7L16.9 0.5H59.5Z" stroke="white" strokeOpacity="0.8" />
            <rect x="19" y="5" width="24" height="5" stroke="white" strokeOpacity="0.8" strokeWidth="0.5" />
            <rect x="5" y="19" width="50" height="13" stroke="white" strokeOpacity="0.8" strokeWidth="0.5" />
            <rect x="5" y="35" width="50" height="12" stroke="white" strokeOpacity="0.8" strokeWidth="0.5" />
            <rect x="5" y="60" width="20" height="5" stroke="white" strokeOpacity="0.8" strokeWidth="0.5" />
          </g>
        </svg>
      </div>

      <h3 className="smart-doc-classification-title">SMART DOCUMENT CLASSIFICATION</h3>
      <p className="smart-doc-classification-description">
        Automatically detects and classifies <span style={{ color: '#FFF' }}>invoices, IDs, contracts, POs</span> with built-in document type recognition.      </p>
    </div>
  );
}