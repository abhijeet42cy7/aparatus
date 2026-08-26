import { useState, useEffect, useRef } from 'react';
import RollingCounter from './RollingCounter';

const Percentage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Force a re-render by toggling isVisible to false first
          if (entry.isIntersecting) {
            setIsVisible(false);
            // Use setTimeout to ensure the false state is processed
            setTimeout(() => setIsVisible(true), 50);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <style>{`
        /* CSS Reset for component independence */
        .percentage-container,
        .percentage-container * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .percentage-container {
          display: flex;
          min-height: 400px;
          background: #0a0a0a;
          border: 1px solid #333;
          position: relative;
          font-family: "Alliance No.2", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          overflow: hidden;
        }

        .percentage-container .left-section1 {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          position: relative;
          overflow: hidden;
          
        }

        .percentage-container .right-section1 {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
padding-left: 80px;     
font-family: 'Source Code Pro';
   }

        .percentage-container .divider {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
          background-image: repeating-linear-gradient(
            to bottom,
            #333 0,
            #333 5px,
            transparent 5px,
            transparent 10px
          );
          z-index: 10;
        }

        .percentage-container .percentage-wrapper {
          position: relative;
          width: 400px;
          height: 300px;
        }

        .percentage-container .percentage-group {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
        }

        .percentage-container .percentage-row {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin: -29px 0;
          position: relative;
          background: black;
          padding-left: 20px;
        }

        .percentage-container .bar-box {
          width: 180px;
          height: 40px;
          margin-right: 30px;
          opacity: 0;
          transform: translateX(-50px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .percentage-container .animate-elements .bar-box {
          opacity: 1;
          transform: translateX(0);
        }

        .percentage-container .bar-blue {
          background: #0066ff;
        }

        .percentage-container .bar-gray {
          background: #333;
        }

        .percentage-container .percentage-text {
          font-size: 110px;
          font-weight: 300;
          letter-spacing: -4px;
          line-height: 0.8;
          opacity: 0;
        }

        .percentage-container .animate-elements .percentage-row:nth-child(1) .percentage-text {
          animation: revealText 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          animation-delay: 0.3s;
        }

        .percentage-container .animate-elements .percentage-row:nth-child(2) .percentage-text {
          animation: revealText 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards, pulse 2s ease-in-out infinite;
          animation-delay: 0.4s, 1.5s;
        }

        .percentage-container .animate-elements .percentage-row:nth-child(3) .percentage-text {
          animation: revealText 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          animation-delay: 0.5s;
        }

        /* Professional pulse animation for 99% */
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

        /* Bar slide animation */
        @keyframes slideBar {
          0% {
            transform: translateX(-100%) scaleX(0);
            opacity: 0;
          }
          50% {
            transform: translateX(0) scaleX(0.5);
            opacity: 0.5;
          }
          100% {
            transform: translateX(0) scaleX(1);
            opacity: 1;
          }
        }

        .percentage-container .animate-elements .bar-box {
          animation: slideBar 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .percentage-container .animate-elements .percentage-row:nth-child(1) .bar-box {
          animation-delay: 0.1s;
        }

        .percentage-container .animate-elements .percentage-row:nth-child(2) .bar-box {
          animation-delay: 0.2s;
        }

        .percentage-container .animate-elements .percentage-row:nth-child(3) .bar-box {
          animation-delay: 0.3s;
        }

        /* Black background behind 99% */
        .percentage-container .percentage-bg-black {
          position: absolute;
              top: -3px;
    left: 152px;
    width: 255px;
          height: 100px;
          background: #000;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.6s ease-out;
          transition-delay: 0.5s;
        }

        .percentage-container .animate-elements .percentage-bg-black {
          opacity: 1;
        }

        .percentage-container .percentage-row:nth-child(2) .percentage-text {
          position: relative;
          z-index: 2;
        }

        /* Professional reveal animation */
        @keyframes revealText {
          0% {
            opacity: 0;
            transform: translateY(40px);
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        .percentage-container .scalability-highlight {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 20px;
          border-radius: 4px;
        }

        .percentage-container .scalability-label {
          font-size: 11px;
          color: #999;
          text-transform: uppercase;
        }

        .percentage-container .number-display {
          font-size: 75px;
          font-weight: 300;
          color: #fff;
          letter-spacing: -3px;
          line-height: 1;
          padding: 0px;
          display: inline-block;
          position: relative;
          z-index: 1;
        }

        .percentage-container .description {
          font-size: 12px;
          line-height: normal;
          color: #fff;
          margin-top: 10px;
          font-weight: 400;
          text-transform: uppercase;
          max-width: 280px;
        }

        .percentage-container .p-features-list {
          display: flex;
          flex-direction: column;
          padding-left:20px
        }

        @media (max-width: 480px) {
          .percentage-container .p-features-list {
            display: none !important;
          }
          .percentage-container .right-section1{
            padding: 0px !important;
            display: block !important;
          }
          .percentage-container .left-section1{
            padding: 0px !important;
            display: block !important;
            width: 100% !important;
            justify-content: center !important;
          }
          .percentage-container .scalability-highlight{
            padding: 0px !important;
            padding: 40px !important;
            width: fit-content !important;
            margin-left: 0 !important;
            text-align: left !important;
          }
        }

        .percentage-container .p-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 5px;
          font-size: 10px;
          color: #999;
          font-weight: 400;
          text-transform: uppercase;
        }


        .percentage-container .scalability-svg {
          position: absolute;
          top: 110px;
          left: -80px;
          z-index: 1;
        }

        @media (max-width: 480px) {
          .percentage-container .scalability-svg {
            top: 59px;
            left: 0px;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .percentage-container .animate-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        @keyframes countUp {
          0% {
            opacity: 0;
            transform: scale(0.5) rotate(-5deg);
          }
          50% {
            transform: scale(1.1) rotate(2deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        .percentage-container .animate-count {
          animation: countUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .percentage-container .percentage-row:nth-child(1) .percentage-text {
          color: #444;
        }

        .percentage-container .percentage-row:nth-child(2) .percentage-text {
          color: white;
        }

        .percentage-container .percentage-row:nth-child(3) .percentage-text {
          color: #444;
        }        
      `}</style>

      <div ref={sectionRef} className="percentage-container">
        <div className="left-section1">
          <div className={`percentage-wrapper ${isVisible ? 'animate-elements' : ''}`}>
            <div className="percentage-group">
              <div className="percentage-row">
                <div className="bar-box bar-blue"></div>
                <div className="percentage-text">100%</div>
              </div>
              <div className="percentage-row">
                <div className="bar-box bar-blue"></div>
                <div className="percentage-bg-black"></div>
                <div className="percentage-text" style={{ marginBottom: '18px' }}>
                  <RollingCounter endValue={99} isVisible={isVisible} />
                </div>
              </div>
              <div className="percentage-row">
                <div className="bar-box bar-gray" style={{ marginRight: '65px' }}></div>
                <div className="percentage-text">98%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="divider" />

        <div className="right-section1">
          <div >
            <div className="scalability-highlight">
              <div className="scalability-label">Unmatched Accuracy</div>
              <div className="scalability-svg"><svg xmlns="http://www.w3.org/2000/svg" width="583" height="88" viewBox="0 0 583 88" fill="none">
                <path d="M545.414 -89.4141L768.415 133.586L767 135L544 -88L545.414 -89.4141ZM532.414 -89.4141L755.415 133.586L754 135L531 -88L532.414 -89.4141ZM519.414 -89.4141L742.415 133.586L741 135L518 -88L519.414 -89.4141ZM506.414 -89.4141L729.415 133.586L728 135L505 -88L506.414 -89.4141ZM493.414 -89.4141L716.415 133.586L715 135L492 -88L493.414 -89.4141ZM480.414 -89.4141L703.415 133.586L702 135L479 -88L480.414 -89.4141ZM467.414 -89.4141L690.415 133.586L689 135L466 -88L467.414 -89.4141ZM454.414 -89.4141L677.415 133.586L676 135L453 -88L454.414 -89.4141ZM441.414 -89.4141L664.415 133.586L663 135L440 -88L441.414 -89.4141ZM428.414 -89.4141L651.415 133.586L650 135L427 -88L428.414 -89.4141ZM415.414 -89.4141L638.415 133.586L637 135L414 -88L415.414 -89.4141ZM402.414 -89.4141L625.415 133.586L624 135L401 -88L402.414 -89.4141ZM389.414 -89.4141L612.415 133.586L611 135L388 -88L389.414 -89.4141ZM376.414 -89.4141L599.415 133.586L598 135L375 -88L376.414 -89.4141ZM363.414 -89.4141L586.415 133.586L585 135L362 -88L363.414 -89.4141ZM350.414 -89.4141L573.415 133.586L572 135L349 -88L350.414 -89.4141ZM337.414 -89.4141L560.415 133.586L559 135L336 -88L337.414 -89.4141ZM324.414 -89.4141L547.415 133.586L546 135L323 -88L324.414 -89.4141ZM311.414 -89.4141L534.415 133.586L533 135L310 -88L311.414 -89.4141ZM298.414 -89.4141L521.415 133.586L520 135L297 -88L298.414 -89.4141ZM285.414 -89.4141L508.415 133.586L507 135L284 -88L285.414 -89.4141ZM272.414 -89.4141L495.415 133.586L494 135L271 -88L272.414 -89.4141ZM259.414 -89.4141L482.415 133.586L481 135L258 -88L259.414 -89.4141ZM246.414 -89.4141L469.415 133.586L468 135L245 -88L246.414 -89.4141ZM233.414 -89.4141L456.415 133.586L455 135L232 -88L233.414 -89.4141ZM220.414 -89.4141L443.415 133.586L442 135L219 -88L220.414 -89.4141ZM207.414 -89.4141L430.415 133.586L429 135L206 -88L207.414 -89.4141ZM194.414 -89.4141L417.415 133.586L416 135L193 -88L194.414 -89.4141ZM181.414 -89.4141L404.415 133.586L403 135L180 -88L181.414 -89.4141ZM168.414 -89.4141L391.415 133.586L390 135L167 -88L168.414 -89.4141ZM155.414 -89.4141L378.415 133.586L377 135L154 -88L155.414 -89.4141ZM142.414 -89.4141L365.415 133.586L364 135L141 -88L142.414 -89.4141ZM129.414 -89.4141L352.415 133.586L351 135L128 -88L129.414 -89.4141ZM116.414 -89.4141L339.415 133.586L338 135L115 -88L116.414 -89.4141ZM103.414 -89.4141L326.415 133.586L325 135L102 -88L103.414 -89.4141ZM90.4141 -89.4141L313.415 133.586L312 135L89 -88L90.4141 -89.4141ZM77.4141 -89.4141L300.415 133.586L299 135L76 -88L77.4141 -89.4141ZM64.4141 -89.4141L287.415 133.586L286 135L63 -88L64.4141 -89.4141ZM51.4141 -89.4141L274.415 133.586L273 135L50 -88L51.4141 -89.4141ZM38.4141 -89.4141L261.415 133.586L260 135L37 -88L38.4141 -89.4141ZM25.4141 -89.4141L248.415 133.586L247 135L24 -88L25.4141 -89.4141ZM12.4141 -89.4141L235.415 133.586L234 135L11 -88L12.4141 -89.4141ZM-0.585947 -89.4141L222.415 133.586L221 135L-2.00001 -88L-0.585947 -89.4141ZM-13.5859 -89.4141L209.415 133.586L208 135L-15 -88L-13.5859 -89.4141ZM-26.5859 -89.4141L196.415 133.586L195 135L-28 -88L-26.5859 -89.4141ZM-39.5859 -89.4141L183.415 133.586L182 135L-41 -88L-39.5859 -89.4141ZM-52.5859 -89.4141L170.415 133.586L169 135L-54 -88L-52.5859 -89.4141ZM-65.5859 -89.4141L157.415 133.586L156 135L-67 -88L-65.5859 -89.4141ZM-78.5859 -89.4141L144.415 133.586L143 135L-80 -88L-78.5859 -89.4141ZM-91.5859 -89.4141L131.415 133.586L130 135L-93 -88L-91.5859 -89.4141ZM-104.586 -89.4141L118.415 133.586L117 135L-106 -88L-104.586 -89.4141ZM-117.586 -89.4141L105.415 133.586L104 135L-119 -88L-117.586 -89.4141ZM-130.586 -89.4141L92.415 133.586L91 135L-132 -88L-130.586 -89.4141ZM-143.586 -89.4141L79.415 133.586L78 135L-145 -88L-143.586 -89.4141ZM-156.586 -89.4141L66.415 133.586L65 135L-158 -88L-156.586 -89.4141ZM-169.586 -89.4141L53.415 133.586L52 135L-171 -88L-169.586 -89.4141ZM-182.586 -89.4141L40.415 133.586L39 135L-184 -88L-182.586 -89.4141ZM-195.586 -89.4141L27.415 133.586L26 135L-197 -88L-195.586 -89.4141ZM-208.586 -89.4141L14.415 133.586L13 135L-210 -88L-208.586 -89.4141Z" fill="url(#paint0_linear_758_7709)" fillOpacity="0.2" />
                <defs>
                  <linearGradient id="paint0_linear_758_7709" x1="-210" y1="22.793" x2="693.5" y2="22.7937" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" />
                    <stop offset="1" />
                  </linearGradient>
                </defs>
              </svg></div>
              <div className="number-display">99%+</div>
              <div className="description">
                Industry-leading precision that <br />
                outperforms traditional OCR <br />
                solutions by 15-20%
              </div>
            </div>

            <div className="p-features-list">
              <div className="p-feature-item">
                <span className="p-checkmark" style={{ color: '#4ade80' }}>✓</span>
                <span>Advanced AI-powered text recognition</span>
              </div>
              <div className="p-feature-item">
                <span className="p-checkmark" style={{ color: '#4ade80' }}>✓</span>
                <span>Handles low-quality and skewed documents</span>
              </div>
              <div className="p-feature-item">
                <span className="p-checkmark" style={{ color: '#4ade80' }}>✓</span>
                <span>Multi-language support with high precision</span>
              </div>
              <div className="p-feature-item">
                <span className="p-checkmark" style={{ color: '#4ade80' }}>✓</span>
                <span>Continuous model improvements</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Percentage;