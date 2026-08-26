import React, { useState, useEffect, useRef } from 'react';

// Rolling Counter Component
const RollingCounter = ({ isVisible }) => {
  const [displayValue, setDisplayValue] = useState('0,000,000');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isVisible || isAnimating) return;

    setIsAnimating(true);
    let animationFrame = 0;
    const totalFrames = 60; // Slower overall animation (~2x duration)
    const randomPhaseFrames = 60; // Slightly longer random phase for smoother lead-in

    const animate = () => {
      if (animationFrame < randomPhaseFrames) {
        // Generate random 7-digit number
        const randomNum = Math.floor(Math.random() * 9000000) + 1000000;
        const formattedNum = randomNum.toLocaleString();
        setDisplayValue(formattedNum);
      } else if (animationFrame === randomPhaseFrames) {
        // Final value
        setDisplayValue('1,000,000');
      }

      animationFrame++;

      if (animationFrame <= totalFrames) {
        // Run at native rAF speed for faster animation
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    // Start immediately for a quicker experience
    requestAnimationFrame(animate);
  }, [isVisible]);

  return displayValue;
};

const MassiveScalability = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(false);
            setTimeout(() => setIsVisible(true), 0);
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
                 .ms-scalability-container {
           display: flex;
           min-height: 400px;
           background: #0a0a0a;
           border: 1px solid #333;
           position: relative;
           font-family: "Alliance No.2", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
           overflow: hidden;
         }

         .ms-left-section {
           display: flex;
           align-items: center;
           justify-content: center;
           position: relative;
           background: #0a0a0a;
           padding: 40px;
           flex: 1;
           min-width: 0;
         }

         .ms-number-container {
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: center;
           position: relative;
           padding: 40px 0;
           width: 100%;
         }

         .ms-number-display-large {
           font-size: 72px;
           font-weight: 300;
           color: #fff;
           letter-spacing: -2px;
           line-height: 1;
           position: relative;
           opacity: 0;
           transform: translateY(30px);
           transition: all 1s ease-out;
           transition-delay: 0.5s;
           text-align: center;
           padding: 30px 0;
           width: 100%;
           max-width: 380px;
         }

         .ms-animate-elements .ms-number-display-large {
           opacity: 1;
           transform: translateY(0);
         }

         .ms-blue-lines {
           position: absolute;
           top: -40px;
           left: 50%;
           transform: translateX(-50%);
           width: 100%;
           max-width: 400px;
           height: calc(100% + 80px);
           pointer-events: none;
         }

         .ms-blue-line {
           background: #0066ff;
           width: 100%;
           position: absolute;
           transform: scaleX(0);
           transform-origin: left;
           transition: transform 0.8s ease-out;
         }

         .ms-blue-line.ms-top-1 {
           height: 1px;
           top: 30px;
         }

         .ms-blue-line.ms-top-2 {
           height: 2px;
           top: 38px;
         }

         .ms-blue-line.ms-bottom-1 {
           height: 2px;
           bottom: 38px;
         }

         .ms-blue-line.ms-bottom-2 {
           height: 1px;
           bottom: 30px;
         }

         .ms-animate-elements .ms-blue-line {
           transform: scaleX(1);
         }

         .ms-animate-elements .ms-blue-line.ms-top-1 {
           transition-delay: 0.1s;
         }

         .ms-animate-elements .ms-blue-line.ms-top-2 {
           transition-delay: 0.2s;
         }

         .ms-animate-elements .ms-blue-line.ms-bottom-1 {
           transition-delay: 0.3s;
         }

         .ms-animate-elements .ms-blue-line.ms-bottom-2 {
           transition-delay: 0.4s;
         }

         .ms-divider {
           width: 1px;
           background-image: repeating-linear-gradient(
             to bottom,
             #333 0,
             #333 5px,
             transparent 5px,
             transparent 10px
           );
           flex-shrink: 0;
         }

         .ms-right-section {
           display: flex;
           flex-direction: column;
           justify-content: center;
           padding: 40px 40px 70px 40px;
           position: relative;
           flex: 1;
           min-width: 0;
         }

        .ms-scalability-highlight {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-family: "source code pro", monospace;
          padding: 20px 0;
          padding-left: 60px;
        }

        .ms-scalability-label {
          font-size: 11px;
          color: #999;
          text-transform: uppercase;
        }

        .ms-scalability-svg {
          position: absolute;
          top: 97px;
          left: 0px;
          z-index: 1;
        }

        .ms-number-display {
          font-size: 75px;
          font-weight: 300;
          color: #fff;
          letter-spacing: -3px;
          line-height: 1;
          position: relative;
          z-index: 1;
        }

        .ms-description {
          font-size: 12px;
          line-height: 1.4;
          color: #fff;
          font-weight: 400;
          text-transform: uppercase;
          max-width: 280px;
        }

        .ms-features-list {
        font-family :source code pro, monospace;
          display: flex;
          flex-direction: column;
          gap: 0px;
          line-height: 1;
          margin-top: 0px;
          padding-left: 60px;
        }

        .ms-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 10px;
          color: #999;
          font-weight: 400;
          text-transform: uppercase;
        }

        .ms-checkmark {
          color: #4ade80;
          font-size: 12px;
          flex-shrink: 0;
        }

        .ms-diagonal-lines {
          position: absolute;
          top: 0;
          right: 0;
          width: 200px;
          height: 100%;
          opacity: 0.1;
          overflow: hidden;
          pointer-events: none;
        }

        .ms-diagonal-line {
          position: absolute;
          width: 2px;
          height: 200px;
          background: linear-gradient(to bottom, transparent, #333, transparent);
          transform: rotate(45deg);
          animation: ms-float 8s ease-in-out infinite;
        }

        @keyframes ms-float {
          0%, 100% { transform: rotate(45deg) translateY(0px); }
          50% { transform: rotate(45deg) translateY(-20px); }
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .ms-features-list {
            display: none !important;
          }

          .ms-scalability-container {
            flex-direction: column;
          }

          .ms-divider {
            display: none;
          }

          .ms-left-section {
            padding: 30px 20px;
          }

          .ms-right-section {
            padding: 30px 20px;
            border-top: 1px solid #333;
          }

          .ms-number-display-large {
            font-size: 56px;
          }

          .ms-number-display {
            font-size: 45px;
          }
        }

        @media (max-width: 480px) {
          .ms-left-section {
            padding: 20px 15px;
          }
          .ms-scalability-highlight{
            margin-top: 25px;
            padding-left: 20px;
            gap: 20px;
          }
          .ms-right-section {
            padding: 20px 15px;
          }

          .ms-number-display-large {
            font-size: 48px;
          }

          .ms-number-display {
            font-size: 38px;
          }

          .ms-description {
            font-size: 11px;
            margin-top: 20px;
          }
          .ms-scalability-svg{
            left: 0px;
          }
        .ms-scalability-svg{
          top: 80px;
        }
          .ms-feature-item {
            font-size: 9px;
          }
        }
      `}</style>

      <div ref={sectionRef} className={`ms-scalability-container ${isVisible ? 'ms-animate-elements' : ''}`}>
        <div className="ms-left-section">
          <div className="ms-number-container">
            <div className="ms-number-display-large">
              <div className="ms-blue-lines">
                <div className="ms-blue-line ms-top-1"></div>
                <div className="ms-blue-line ms-top-2"></div>
                <div className="ms-blue-line ms-bottom-1"></div>
                <div className="ms-blue-line ms-bottom-2"></div>
              </div>
              <RollingCounter isVisible={isVisible} />
            </div>
          </div>
        </div>

        <div className="ms-divider" />

        <div className="ms-right-section">
          <div >
            <div className="ms-scalability-highlight">
              <div className="ms-scalability-label">Massive Scalability</div>
              <div className="ms-scalability-svg"><svg xmlns="http://www.w3.org/2000/svg" width="583" height="88" viewBox="0 0 583 88" fill="none">
                <path d="M545.414 -89.4141L768.415 133.586L767 135L544 -88L545.414 -89.4141ZM532.414 -89.4141L755.415 133.586L754 135L531 -88L532.414 -89.4141ZM519.414 -89.4141L742.415 133.586L741 135L518 -88L519.414 -89.4141ZM506.414 -89.4141L729.415 133.586L728 135L505 -88L506.414 -89.4141ZM493.414 -89.4141L716.415 133.586L715 135L492 -88L493.414 -89.4141ZM480.414 -89.4141L703.415 133.586L702 135L479 -88L480.414 -89.4141ZM467.414 -89.4141L690.415 133.586L689 135L466 -88L467.414 -89.4141ZM454.414 -89.4141L677.415 133.586L676 135L453 -88L454.414 -89.4141ZM441.414 -89.4141L664.415 133.586L663 135L440 -88L441.414 -89.4141ZM428.414 -89.4141L651.415 133.586L650 135L427 -88L428.414 -89.4141ZM415.414 -89.4141L638.415 133.586L637 135L414 -88L415.414 -89.4141ZM402.414 -89.4141L625.415 133.586L624 135L401 -88L402.414 -89.4141ZM389.414 -89.4141L612.415 133.586L611 135L388 -88L389.414 -89.4141ZM376.414 -89.4141L599.415 133.586L598 135L375 -88L376.414 -89.4141ZM363.414 -89.4141L586.415 133.586L585 135L362 -88L363.414 -89.4141ZM350.414 -89.4141L573.415 133.586L572 135L349 -88L350.414 -89.4141ZM337.414 -89.4141L560.415 133.586L559 135L336 -88L337.414 -89.4141ZM324.414 -89.4141L547.415 133.586L546 135L323 -88L324.414 -89.4141ZM311.414 -89.4141L534.415 133.586L533 135L310 -88L311.414 -89.4141ZM298.414 -89.4141L521.415 133.586L520 135L297 -88L298.414 -89.4141ZM285.414 -89.4141L508.415 133.586L507 135L284 -88L285.414 -89.4141ZM272.414 -89.4141L495.415 133.586L494 135L271 -88L272.414 -89.4141ZM259.414 -89.4141L482.415 133.586L481 135L258 -88L259.414 -89.4141ZM246.414 -89.4141L469.415 133.586L468 135L245 -88L246.414 -89.4141ZM233.414 -89.4141L456.415 133.586L455 135L232 -88L233.414 -89.4141ZM220.414 -89.4141L443.415 133.586L442 135L219 -88L220.414 -89.4141ZM207.414 -89.4141L430.415 133.586L429 135L206 -88L207.414 -89.4141ZM194.414 -89.4141L417.415 133.586L416 135L193 -88L194.414 -89.4141ZM181.414 -89.4141L404.415 133.586L403 135L180 -88L181.414 -89.4141ZM168.414 -89.4141L391.415 133.586L390 135L167 -88L168.414 -89.4141ZM155.414 -89.4141L378.415 133.586L377 135L154 -88L155.414 -89.4141ZM142.414 -89.4141L365.415 133.586L364 135L141 -88L142.414 -89.4141ZM129.414 -89.4141L352.415 133.586L351 135L128 -88L129.414 -89.4141ZM116.414 -89.4141L339.415 133.586L338 135L115 -88L116.414 -89.4141ZM103.414 -89.4141L326.415 133.586L325 135L102 -88L103.414 -89.4141ZM90.4141 -89.4141L313.415 133.586L312 135L89 -88L90.4141 -89.4141ZM77.4141 -89.4141L300.415 133.586L299 135L76 -88L77.4141 -89.4141ZM64.4141 -89.4141L287.415 133.586L286 135L63 -88L64.4141 -89.4141ZM51.4141 -89.4141L274.415 133.586L273 135L50 -88L51.4141 -89.4141ZM38.4141 -89.4141L261.415 133.586L260 135L37 -88L38.4141 -89.4141ZM25.4141 -89.4141L248.415 133.586L247 135L24 -88L25.4141 -89.4141ZM12.4141 -89.4141L235.415 133.586L234 135L11 -88L12.4141 -89.4141ZM-0.585947 -89.4141L222.415 133.586L221 135L-2.00001 -88L-0.585947 -89.4141ZM-13.5859 -89.4141L209.415 133.586L208 135L-15 -88L-13.5859 -89.4141ZM-26.5859 -89.4141L196.415 133.586L195 135L-28 -88L-26.5859 -89.4141ZM-39.5859 -89.4141L183.415 133.586L182 135L-41 -88L-39.5859 -89.4141ZM-52.5859 -89.4141L170.415 133.586L169 135L-54 -88L-52.5859 -89.4141ZM-65.5859 -89.4141L157.415 133.586L156 135L-67 -88L-65.5859 -89.4141ZM-78.5859 -89.4141L144.415 133.586L143 135L-80 -88L-78.5859 -89.4141ZM-91.5859 -89.4141L131.415 133.586L130 135L-93 -88L-91.5859 -89.4141ZM-104.586 -89.4141L118.415 133.586L117 135L-106 -88L-104.586 -89.4141ZM-117.586 -89.4141L105.415 133.586L104 135L-119 -88L-117.586 -89.4141ZM-130.586 -89.4141L92.415 133.586L91 135L-132 -88L-130.586 -89.4141ZM-143.586 -89.4141L79.415 133.586L78 135L-145 -88L-143.586 -89.4141ZM-156.586 -89.4141L66.415 133.586L65 135L-158 -88L-156.586 -89.4141ZM-169.586 -89.4141L53.415 133.586L52 135L-171 -88L-169.586 -89.4141ZM-182.586 -89.4141L40.415 133.586L39 135L-184 -88L-182.586 -89.4141ZM-195.586 -89.4141L27.415 133.586L26 135L-197 -88L-195.586 -89.4141ZM-208.586 -89.4141L14.415 133.586L13 135L-210 -88L-208.586 -89.4141Z" fill="url(#paint0_linear_758_7709)" fillOpacity="0.2" />
                <defs>
                  <linearGradient id="paint0_linear_758_7709" x1="-210" y1="22.793" x2="693.5" y2="22.7937" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" />
                    <stop offset="1" />
                  </linearGradient>
                </defs>
              </svg></div>
              <div className="ms-number-display">1000000+</div>
              <div className="ms-description">
              Process millions of pages <br /> monthly with auto-scaling <br />infrastructure
              </div>
            </div>

            <div className="ms-features-list">
              <div className="ms-feature-item">
                <span className="ms-checkmark">✓</span>
                <span>Auto-scaling based on demand</span>
              </div>
              <div className="ms-feature-item">
                <span className="ms-checkmark">✓</span>
                <span>99.9% uptime guarantee</span>
              </div>
              <div className="ms-feature-item">
                <span className="ms-checkmark">✓</span>
                <span>Load balancing for peak performance</span>
              </div>
              <div className="ms-feature-item">
                <span className="ms-checkmark">✓</span>
                <span>Global CDN for reduced latency</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MassiveScalability;