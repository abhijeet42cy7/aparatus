import React from 'react';

const NATURAL_LANGUAGE_QUERIES_STYLES = `
  .natural-language-queries-card {
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

  .natural-language-queries-card:hover {
    border-top: 2px solid #fff;
    background: linear-gradient(135deg, #000 0%, #0a0a0a 100%);
  }

  .natural-language-queries-number {
    font-family: "Source Code Pro", monospace;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 400;
    position: absolute;
    top: 16px;
    left: 16px;
    transition: color 0.3s ease;
  }

  .natural-language-queries-card:hover .natural-language-queries-number {
    color: rgba(255, 255, 255, 0.9);
  }

  .natural-language-queries-icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 32px 0 16px 0;
  }

  .natural-language-queries-title {
    font-family: "Source Code Pro", monospace;
    font-size: 11px;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 12px;
    font-weight: 500;
    line-height: 1.3;
    transition: all 0.3s ease;
  }

  .natural-language-queries-description {
    font-family: "Source Code Pro", monospace;
    font-size: 9px;
    line-height: 1.4;
    color: rgba(255, 255, 255, 0.4);
    text-transform: uppercase;
    font-weight: 400;
    transition: color 0.3s ease;
  }



  .natural-language-queries-svg {
    transition: all 0.3s ease;
  }

  .natural-language-queries-card:hover .natural-language-queries-svg .highlight-rect {
    fill: white;
    transition: fill 0.3s ease;
  }
`;

export default function NaturalLanguageQueries() {
  return (
    <div className="natural-language-queries-card">
      <style>{NATURAL_LANGUAGE_QUERIES_STYLES}</style>
      <div className="natural-language-queries-number">[07]</div>
      <div className="natural-language-queries-icon">
        <svg width="133" height="94" viewBox="0 0 133 94" fill="none" xmlns="http://www.w3.org/2000/svg" className="natural-language-queries-svg">
          <rect x="10.25" y="50.25" width="37.5" height="9.5" stroke="white" stroke-opacity="0.5" stroke-width="0.5" className="highlight-rect" />
          <rect x="10.25" y="33.25" width="37.5" height="9.5" stroke="white" stroke-opacity="0.5" stroke-width="0.5" />
          <rect x="55.25" y="50.25" width="67.5" height="9.5" stroke="white" stroke-opacity="0.5" stroke-width="0.5" />
          <rect x="10.25" y="16.25" width="70.5" height="9.5" stroke="white" stroke-opacity="0.5" stroke-width="0.5" className="highlight-rect" />
          <rect x="86.25" y="16.25" width="36.5" height="9.5" stroke="white" stroke-opacity="0.5" stroke-width="0.5" />
          <rect x="55.25" y="33.25" width="67.5" height="9.5" stroke="white" stroke-opacity="0.5" stroke-width="0.5" className="highlight-rect" />
          <path d="M0.5 76V1H132.5V76H84.5L67.5 93L50.5 76H0.5Z" stroke="white" stroke-opacity="0.5" />

        </svg>
      </div>
      <h3 className="natural-language-queries-title">NATURAL LANGUAGE QUERIES</h3>
      <p className="natural-language-queries-description">
        QUERY YOUR DOCUMENTS USING <span style={{ color: ' #fff', opacity: 0.8 }}>EVERYDAY LANGUAGE</span> AND GET INSTANT INSIGHTS FROM STRUCTURED OR UNSTRUCTURED DATA.
      </p>
    </div>
  );
}