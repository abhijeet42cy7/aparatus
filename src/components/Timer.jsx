import React, { useState, useEffect, useRef } from 'react';

const LightningSpeedTimer = () => {
  const [time, setTime] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.8 }
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

  useEffect(() => {
    if (isVisible) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime >= 10) {
            clearInterval(intervalRef.current);
            return 10;
          }
          return prevTime + 0.1;
        });
      }, 15);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setTime(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isVisible]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <style>{`
        .lightning-container {
          display: flex;
          background: #000;
          border: 1px solid #333;
          position: relative;
          font-family: "Alliance No.2", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          overflow: hidden;
          padding: 24px 32px;
        }

        .left-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 40px;
          min-height: 100%;
        }

        .right-section1 {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding-left: 80px;     
          font-family: 'Source Code Pro';
        }

        .divider {
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

        .timer-container {
          position: relative;
          width: 350px;
          height: 350px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .timer-ticks {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .tick {
          position: absolute;
          width: 3px;
          height: 20px;
          background: #0061e0;
          left: 50%;
          top: 10px;
          transform-origin: center 165px;
          transform: translateX(-50%);
        }

        .timer-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .timer-value {
          font-size: 72px;
          font-weight: 300;
          letter-spacing: 3px;
          line-height: 1;
        }

        .timer-unit {
          font-size: 18px;
          margin-top: 12px;
          opacity: 0.9;
          letter-spacing: 2px;
        }

        .scalability-highlight {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 20px;
          border-radius: 4px;
        }

        .scalability-label1 {
          font-size: 11px;
          color: #999;
          text-transform: uppercase;
              margin-top: 25px;

        }

        .number-display {
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

        .description {
          font-size: 12px;
          line-height: normal;
          color: #fff;
          margin-top: 10px;
          font-weight: 400;
          text-transform: uppercase;
          max-width: 280px;
        }

        
        .features-list {
          display: flex;
          flex-direction: column;
          padding-left:20px
        }

        @media (max-width: 480px) {
          .features-list {
            display: none !important;
          }
          .right-section1{
            padding: 0px !important;
            display: block !important;
          }
          .left-section{
            padding: 0px !important;
            display: block !important;
            width: 100% !important;
            justify-content: center !important;
          }
          .scalability-highlight{
            padding: 0px !important;
            padding: 40px !important;
            width: fit-content !important;
            margin-left: 0 !important;
            text-align: left !important;
          }
             .lightning-container{
          padding: 0px !important;
        }

        }

        .lightning-container .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 5px;
          font-size: 10px;
          color: #999;
          font-weight: 400;
          text-transform: uppercase;
          margin: 0;
          padding: 0;
          line-height: 1.2;
        }

        .scalability-svg {
          position: absolute;
          top: 140px;
          left: 0px;
          z-index: 1;
        }

        @media (max-width: 480px) {
          .scalability-svg {
            top: 80px;
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

        .animate-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        @keyframes tickGlow {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 4px #9acd32;
          }
          50% {
            opacity: 0.6;
            box-shadow: none;
          }
        }

        .tick.active {
          animation: tickGlow 1s ease-in-out infinite;
        }
      `}</style>

      <div ref={sectionRef} className="lightning-container">
        <div className="left-section">
          <div className="timer-container">
            <div className="timer-ticks">
              {[...Array(60)].map((_, i) => (
                <div
                  key={i}
                  className={`tick ${i < (time / 10) * 60 ? 'active' : ''}`}
                  style={{
                    transform: `translateX(-50%) rotate(${i * 6}deg)`,
                  }}
                />
              ))}
            </div>

            <div className="timer-display">
              <div className="timer-value">{formatTime(time)}</div>
              <div className="timer-unit">SEC</div>
            </div>
          </div>
        </div>

        <div className="divider" />

        <div className="right-section1">
          <div >
            <div className="scalability-highlight">
              <div className="scalability-label1">LIGHTING SPEED</div>
              <div className="scalability-svg"><svg xmlns="http://www.w3.org/2000/svg" width="583" height="88" viewBox="0 0 583 88" fill="none">
                <path d="M545.414 -89.4141L768.415 133.586L767 135L544 -88L545.414 -89.4141ZM532.414 -89.4141L755.415 133.586L754 135L531 -88L532.414 -89.4141ZM519.414 -89.4141L742.415 133.586L741 135L518 -88L519.414 -89.4141ZM506.414 -89.4141L729.415 133.586L728 135L505 -88L506.414 -89.4141ZM493.414 -89.4141L716.415 133.586L715 135L492 -88L493.414 -89.4141ZM480.414 -89.4141L703.415 133.586L702 135L479 -88L480.414 -89.4141ZM467.414 -89.4141L690.415 133.586L689 135L466 -88L467.414 -89.4141ZM454.414 -89.4141L677.415 133.586L676 135L453 -88L454.414 -89.4141ZM441.414 -89.4141L664.415 133.586L663 135L440 -88L441.414 -89.4141ZM428.414 -89.4141L651.415 133.586L650 135L427 -88L428.414 -89.4141ZM415.414 -89.4141L638.415 133.586L637 135L414 -88L415.414 -89.4141ZM402.414 -89.4141L625.415 133.586L624 135L401 -88L402.414 -89.4141ZM389.414 -89.4141L612.415 133.586L611 135L388 -88L389.414 -89.4141ZM376.414 -89.4141L599.415 133.586L598 135L375 -88L376.414 -89.4141ZM363.414 -89.4141L586.415 133.586L585 135L362 -88L363.414 -89.4141ZM350.414 -89.4141L573.415 133.586L572 135L349 -88L350.414 -89.4141ZM337.414 -89.4141L560.415 133.586L559 135L336 -88L337.414 -89.4141ZM324.414 -89.4141L547.415 133.586L546 135L323 -88L324.414 -89.4141ZM311.414 -89.4141L534.415 133.586L533 135L310 -88L311.414 -89.4141ZM298.414 -89.4141L521.415 133.586L520 135L297 -88L298.414 -89.4141ZM285.414 -89.4141L508.415 133.586L507 135L284 -88L285.414 -89.4141ZM272.414 -89.4141L495.415 133.586L494 135L271 -88L272.414 -89.4141ZM259.414 -89.4141L482.415 133.586L481 135L258 -88L259.414 -89.4141ZM246.414 -89.4141L469.415 133.586L468 135L245 -88L246.414 -89.4141ZM233.414 -89.4141L456.415 133.586L455 135L232 -88L233.414 -89.4141ZM220.414 -89.4141L443.415 133.586L442 135L219 -88L220.414 -89.4141ZM207.414 -89.4141L430.415 133.586L429 135L206 -88L207.414 -89.4141ZM194.414 -89.4141L417.415 133.586L416 135L193 -88L194.414 -89.4141ZM181.414 -89.4141L404.415 133.586L403 135L180 -88L181.414 -89.4141ZM168.414 -89.4141L391.415 133.586L390 135L167 -88L168.414 -89.4141ZM155.414 -89.4141L378.415 133.586L377 135L154 -88L155.414 -89.4141ZM142.414 -89.4141L365.415 133.586L364 135L141 -88L142.414 -89.4141ZM129.414 -89.4141L352.415 133.586L351 135L128 -88L129.414 -89.4141ZM116.414 -89.4141L339.415 133.586L338 135L115 -88L116.414 -89.4141ZM103.414 -89.4141L326.415 133.586L325 135L102 -88L103.414 -89.4141ZM90.4141 -89.4141L313.415 133.586L312 135L89 -88L90.4141 -89.4141ZM77.4141 -89.4141L300.415 133.586L299 135L76 -88L77.4141 -89.4141ZM64.4141 -89.4141L287.415 133.586L286 135L63 -88L64.4141 -89.4141ZM51.4141 -89.4141L274.415 133.586L273 135L50 -88L51.4141 -89.4141ZM38.4141 -89.4141L261.415 133.586L260 135L37 -88L38.4141 -89.4141ZM25.4141 -89.4141L248.415 133.586L247 135L24 -88L25.4141 -89.4141ZM12.4141 -89.4141L235.415 133.586L234 135L11 -88L12.4141 -89.4141ZM-0.585938 -89.4141L222.415 133.586L221 135L-2 -88L-0.585938 -89.4141ZM-13.5859 -89.4141L209.415 133.586L208 135L-15 -88L-13.5859 -89.4141ZM-26.5859 -89.4141L196.415 133.586L195 135L-28 -88L-26.5859 -89.4141ZM-39.5859 -89.4141L183.415 133.586L182 135L-41 -88L-39.5859 -89.4141ZM-52.5859 -89.4141L170.415 133.586L169 135L-54 -88L-52.5859 -89.4141ZM-65.5859 -89.4141L157.415 133.586L156 135L-67 -88L-65.5859 -89.4141ZM-78.5859 -89.4141L144.415 133.586L143 135L-80 -88L-78.5859 -89.4141ZM-91.5859 -89.4141L131.415 133.586L130 135L-93 -88L-91.5859 -89.4141ZM-104.586 -89.4141L118.415 133.586L117 135L-106 -88L-104.586 -89.4141ZM-117.586 -89.4141L105.415 133.586L104 135L-119 -88L-117.586 -89.4141ZM-130.586 -89.4141L92.4146 133.586L91 135L-132 -88L-130.586 -89.4141ZM-143.586 -89.4141L79.4146 133.586L78 135L-145 -88L-143.586 -89.4141ZM-156.586 -89.4141L66.4146 133.586L65 135L-158 -88L-156.586 -89.4141ZM-169.586 -89.4141L53.4146 133.586L52 135L-171 -88L-169.586 -89.4141ZM-182.586 -89.4141L40.4146 133.586L39 135L-184 -88L-182.586 -89.4141ZM-195.586 -89.4141L27.4146 133.586L26 135L-197 -88L-195.586 -89.4141ZM-208.586 -89.4141L14.4146 133.586L13 135L-210 -88L-208.586 -89.4141Z" fill="url(#paint0_linear_758_7709)" fill-opacity="0.2"></path>
                <defs>
                  <linearGradient id="paint0_linear_758_7709" x1="-210" y1="22.793" x2="693.5" y2="22.7937" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"></stop>
                    <stop offset="1"></stop>
                  </linearGradient>
                </defs>
              </svg></div>
              <div className="number-display">&lt;10 sec</div>
              <div className="description">
              Average processing time that's <br /> 5x faster than traditional <br /> solutions
              </div>
            </div>

            <div className="features-list">
              <div className="feature-item">
                <span className="checkmark" style={{ color: '#4ade80' }}>✓</span>
                <span>Real-time document processing</span>
              </div>
              <div className="feature-item">
                <span className="checkmark" style={{ color: '#4ade80' }}>✓</span>
                <span>Batch processing capabilities
                </span>
              </div>
              <div className="feature-item">
                <span className="checkmark" style={{ color: '#4ade80' }}>✓</span>
                <span>Optimized for high-volume workflows
                </span>
              </div>
              <div className="feature-item">
                <span className="checkmark" style={{ color: '#4ade80' }}>✓</span>
                <span>Minimal latency for API calls</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LightningSpeedTimer;