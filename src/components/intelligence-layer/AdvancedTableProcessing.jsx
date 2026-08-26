import React from 'react';

const ADVANCED_TABLE_PROCESSING_STYLES = `
  .advanced-table-processing-card {
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

  .advanced-table-processing-card:hover {
    border-top: 2px solid #fff;
    background: linear-gradient(135deg, #000 0%, #0a0a0a 100%);
  }

  .advanced-table-processing-number {
    font-family: "Source Code Pro", monospace;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 400;
    position: absolute;
    top: 16px;
    left: 16px;
    transition: color 0.3s ease;
  }

  .advanced-table-processing-card:hover .advanced-table-processing-number {
    color: rgba(255, 255, 255, 0.9);
  }

  .advanced-table-processing-icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 31px;
    opacity: 0.5;
    font-weight: 200;
    font-family: "Anek Devanagari";
    justify-content: center;
  }

.advanced-table-processing-card:hover .advanced-table-processing-icon {
  opacity: 1;
  text-decoration: underline;
  text-decoration-color: #999;
  text-decoration-thickness: 0.6px;
  text-underline-offset: 0.8px;
}

  .advanced-table-processing-title {
    font-family: "Source Code Pro", monospace;
    font-size: 11px;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 12px;
    font-weight: 500;
    line-height: 1.3;
    transition: all 0.3s ease;
  }

    .advanced-table-processing-description {
    font-family: "Source Code Pro", monospace;
    font-size: 9px;
    line-height: 1.4;
    color: rgb(255 255 255 / 45%);
    text-transform: uppercase;
    font-weight: 400;
    transition: color 0.3s ease;
  }

  .advanced-table-processing-card:hover .advanced-table-processing-description {
    color: rgba(255, 255, 255, 0.6);
  }
`;

export default function AdvancedTableProcessing() {
  return (
    <div className="advanced-table-processing-card">
      <style>{ADVANCED_TABLE_PROCESSING_STYLES}</style>
      <div className="advanced-table-processing-number">[02]</div>
      <div className="advanced-table-processing-icon">
        बहु-भाषा
      </div>
      <h3 className="advanced-table-processing-title">Multi-Language OCR</h3>
      <p className="advanced-table-processing-description">
        Supports <span style={{ color: ' #fff', opacity: 0.7 }}>100+ languages</span>  with automatic translation capabilities for global document processing.      </p>
    </div>
  );
} 