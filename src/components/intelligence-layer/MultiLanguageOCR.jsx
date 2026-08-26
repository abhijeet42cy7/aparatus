import React from 'react';

const MULTI_LANGUAGE_OCR_STYLES = `
  .multi-language-ocr-card {
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

  .multi-language-ocr-card:hover {
    border-top: 2px solid #fff;
    background: linear-gradient(135deg, #000 0%, #0a0a0a 100%);
  }

  .multi-language-ocr-number {
    font-family: "Source Code Pro", monospace;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 400;
    position: absolute;
    top: 16px;
    left: 16px;
    transition: color 0.3s ease;
  }

  .multi-language-ocr-card:hover .multi-language-ocr-number {
    color: rgba(255, 255, 255, 0.9);
  }

  .multi-language-ocr-icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 32px 0 16px 0;
  }

  .multi-language-ocr-svg-container {
    width: 100%;
    height: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .multi-language-ocr-svg {
  border: 1px solid rgba(255, 255, 255, 0.50);
    width: 40%;
    height: 40%;
    padding: 10px;
    object-fit: contain;
    stroke: #fff;
    stroke-width: 1.5;
    fill: none;
    filter: drop-shadow(0 0 0 rgba(255, 255, 255, 0));
    transition: all 0.5s ease;
  }

  .multi-language-ocr-svg path {
    transition: stroke 0.3s ease;
  }

  .multi-language-ocr-card:hover .multi-language-ocr-svg {
    background-color: #fff;
  }

  .multi-language-ocr-card:hover .multi-language-ocr-svg path {
    stroke: #000;
  }


  .multi-language-ocr-title {
    font-family: "Source Code Pro", monospace;
    font-size: 11px;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 12px;
    font-weight: 500;
    line-height: 1.3;
    transition: all 0.3s ease;
  }

  .multi-language-ocr-description {
    font-family: "Source Code Pro", monospace;
    font-size: 9px;
    line-height: 1.4;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    font-weight: 200;
    transition: color 0.3s ease;
  }

  .multi-language-ocr-card:hover .multi-language-ocr-description {
    color: rgba(255, 255, 255, 0.9);
  }
`;

export default function MultiLanguageOCR() {
  return (
    <div className="multi-language-ocr-card">
      <style>{MULTI_LANGUAGE_OCR_STYLES}</style>
      <div className="multi-language-ocr-number">[03]</div>
      <div className="multi-language-ocr-icon">
        <div className="multi-language-ocr-svg-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="117" height="32" viewBox="0 0 117 32" fill="none" className="multi-language-ocr-svg">
            <path d="M15.7422 16.7209C15.7422 16.0068 15.1337 14.5722 14.4637 13.3394C14.2988 13.0359 14.1072 12.7252 13.8506 12.5174C13.3526 12.1142 11.962 12.1034 10.2732 12.1542C8.58167 12.2051 7.39827 13.0072 6.0629 14.2909C4.75832 15.5449 3.51823 17.6628 2.98575 19.206C2.13775 21.6635 1.78028 23.9597 2.13801 26.0871C2.27863 26.9234 3.67388 28.0462 4.59127 28.1509C7.01653 28.4276 8.88524 27.9711 9.49837 27.5616C10.778 26.7072 11.7407 24.934 12.6658 23.8058C12.9014 23.5185 13.0745 23.1917 13.2805 22.8823C13.4864 22.5729 13.6892 22.2682 13.6416 22.7207C13.4627 24.4196 12.8748 26.5625 12.8732 28.1509C12.8726 28.8325 13.2774 29.2314 13.637 29.5423C14.4022 30.0564 15.3273 30.1642 16.2985 29.9595C16.7626 29.8563 17.1682 29.7547 17.5862 29.6501" stroke="white" stroke-opacity="0.5" stroke-width="3" stroke-linecap="round" />
            <path d="M25.3794 27.7168C25.4807 27.7168 25.582 27.7168 28.6735 27.7168C31.765 27.7168 37.8436 27.7168 41.1777 27.5882C44.5117 27.4596 44.917 27.2025 45.6415 26.9375" stroke="white" stroke-opacity="0.5" stroke-width="3" stroke-linecap="round" />
            <path d="M67.6921 2.82918C65.0996 1.83301 63.3116 1.33614 59.9406 3.69408C57.9888 5.05933 55.1345 9.38006 54.304 14.4858C53.5298 19.2451 52.8141 21.2499 54.3033 24.7176C55.2133 26.8367 57.141 27.8346 58.3501 28.1991C59.5197 28.5518 61.432 28.6374 62.6893 28.1991C64.5278 27.5584 65.5438 26.9671 67.0277 25.2142C70.3971 21.2342 71.0055 18.1482 71.0055 15.9611C71.0055 12.7768 70.5556 12.0648 69.902 10.8169C69.2695 9.60937 68.5449 8.53142 67.6921 7.90825C67.2851 7.61092 66.7395 7.69637 66.4331 7.85061V7.85061C65.9381 8.09977 66.4061 8.71425 66.9357 8.8775C68.2827 9.29269 69.7733 9.3927 70.3971 9.56431C70.7519 9.66869 71.0508 9.77152 71.3587 9.87746" stroke="white" stroke-opacity="0.5" stroke-width="3" stroke-linecap="round" />
            <path d="M95.5174 7.23282C95.0235 5.75154 94.9984 5.25777 92.0152 3.82869C90.5912 3.14655 88.9009 2.89474 87.6158 2.78959C84.9901 2.57477 82.3735 6.53465 80.2084 11.6759C77.3992 18.3465 80.9645 23.6296 82.0046 24.7446C83.1711 25.995 84.3708 26.3944 85.7147 26.9124C86.9664 27.3949 88.8 27.8417 90.8089 27.6886C91.593 27.5355 91.8992 27.2294 92.21 26.7655C92.5209 26.3016 93.542 25.502 93.542 24.0207" stroke="white" stroke-opacity="0.5" stroke-width="3" stroke-linecap="round" />
            <path d="M104.09 5.11719C104.09 5.42353 104.09 5.72986 104.09 9.15528C104.09 12.5807 104.09 19.1159 103.311 26.1586" stroke="white" stroke-opacity="0.5" stroke-width="3" stroke-linecap="round" />
            <path d="M101.752 5.54549C101.752 5.4378 101.752 5.33011 101.752 5.05924C101.752 4.78838 101.752 4.3576 102.515 3.86646C106.503 1.29984 109.92 1.95572 112.104 2.49582C114.115 2.99317 114.775 6.35525 114.968 8.53359C115.161 10.7252 114.506 12.181 112.66 14.2652C111.378 15.7131 108.984 16.5302 106.579 17.5614C105.988 17.8149 105.614 18.051 105.56 18.2158C105.214 19.2818 108.165 21.3862 110.159 22.8621C110.719 23.2758 111.317 23.677 112.007 23.7652V23.7652C112.441 23.8207 113.013 23.8207 113.603 23.8207" stroke="white" stroke-opacity="0.5" stroke-width="3" stroke-linecap="round" />
          </svg>
        </div>
      </div>
      <h3 className="multi-language-ocr-title">Handwritten Text Recognition</h3>
      <p className="multi-language-ocr-description">
        Extracts both <span style={{ color: '#FFF' }}>printed and handwritten </span>content from forms, notes, and receipts with industry-leading accuracy.      </p>
    </div>
  );
} 