import React from 'react';

const SMART_DOCUMENT_CLASSIFICATION_STYLES = `
  .smart-document-classification-card {
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

  .smart-document-classification-card:hover {
    border-top: 2px solid #fff;
    background: linear-gradient(135deg, #000 0%, #0a0a0a 100%);
  }

  .smart-document-classification-number {
    font-family: "Source Code Pro", monospace;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 400;
    position: absolute;
    top: 16px;
    left: 16px;
    transition: color 0.3s ease;
  }

  .smart-document-classification-card:hover .smart-document-classification-number {
    color: rgba(255, 255, 255, 0.9);
  }

  .smart-document-classification-icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 32px 0 16px 0;
  }

 



  @keyframes classify {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  .smart-document-classification-title {
    font-family: "Source Code Pro", monospace;
    font-size: 11px;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 12px;
    font-weight: 500;
    line-height: 1.3;
    transition: all 0.3s ease;
  }


  .smart-document-classification-description {
    font-family: "Source Code Pro", monospace;
    font-size: 9px;
    line-height: 1.4;
    color: rgb(255 255 255 / 45%);
    text-transform: uppercase;
    font-weight: 400;
    transition: color 0.3s ease;
  }
.smart-document-classification-card:hover .smart-document-classification-svg .top-rect,
.smart-document-classification-card:hover .smart-document-classification-svg .bottom-rect {
  fill: white;
  transition: fill 0.3s ease;
}
  .smart-document-classification-card:hover .smart-document-classification-description {
    color: rgba(255, 255, 255, 0.6);
  }
`;

export default function SmartDocumentClassification() {
  return (
    <div className="smart-document-classification-card">
      <style>{SMART_DOCUMENT_CLASSIFICATION_STYLES}</style>
      <div className="smart-document-classification-number">[05]</div>
      <div className="smart-document-classification-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="118" height="85" viewBox="0 0 118 85" fill="none" className="smart-document-classification-svg">
          <rect x="0.5" y="0.5" width="117" height="84" stroke="white" />
          <rect x="1" y="1" width="116" height="12" fill="none" className="top-rect" />
          <rect x="1" y="72" width="116" height="12" fill="none" className="bottom-rect" />
          <line x1="1" y1="12.75" x2="118" y2="12.75" stroke="white" stroke-width="0.5" />
          <line x1="13" y1="24.75" x2="117" y2="24.75" stroke="white" stroke-width="0.5" />
          <line x1="58.75" y1="72" x2="58.75" y2="25" stroke="white" stroke-width="0.5" />
          <line x1="12.75" y1="72" x2="12.75" y2="13" stroke="white" stroke-width="0.5" />
          <line x1="117" y1="37.25" x2="59" y2="37.25" stroke="white" stroke-width="0.5" />
          <line x1="117" y1="48.25" x2="59" y2="48.25" stroke="white" stroke-width="0.5" />
          <line x1="117" y1="60.25" x2="59" y2="60.25" stroke="white" stroke-width="0.5" />
          <line x1="117" y1="72.25" x2="1" y2="72.25" stroke="white" stroke-width="0.5" />
        </svg>
      </div>
      <h3 className="smart-document-classification-title">Advanced Table Processing</h3>
      <p className="smart-document-classification-description">
        Structure-aware parsing of <span style={{ color: ' #fff', opacity: 0.7 }}>complex, nested, and borderless tables</span> with export to Excel, CSV, or JSON.
      </p>
    </div>
  );
} 