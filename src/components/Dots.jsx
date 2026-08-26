import React, { useState, useRef } from 'react';
import './Dots.css';

const CloudDeploymentVisualization = () => {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState('idle'); // 'idle', 'active', 'returning'
  const containerRef = useRef(null);

  // Grid configuration
  const cols = 17;
  const rows = 10;
  const dotSpacing = 30;
  const baseDotRadius = 6;
  const blueDotRadius = 10;

  // Original blue dot pattern (cloud shape) - moved one dot above and one dot right
  const originalBlueDots = [
    // Row 2
    { row: 2, col: 8 }, { row: 2, col: 9 }, { row: 2, col: 10 },
    // Row 3
    { row: 3, col: 7 }, { row: 3, col: 8 }, { row: 3, col: 9 }, { row: 3, col: 10 }, { row: 3, col: 11 },
    // Row 4
    { row: 4, col: 5 }, { row: 4, col: 6 }, { row: 4, col: 7 }, { row: 4, col: 8 }, { row: 4, col: 9 }, { row: 4, col: 10 }, { row: 4, col: 11 }, { row: 4, col: 12 },
    // Row 5
    { row: 5, col: 4 }, { row: 5, col: 5 }, { row: 5, col: 6 }, { row: 5, col: 7 }, { row: 5, col: 8 }, { row: 5, col: 9 }, { row: 5, col: 10 }, { row: 5, col: 11 }, { row: 5, col: 12 }, { row: 5, col: 13 },
    // Row 6
    { row: 6, col: 4 }, { row: 6, col: 5 }, { row: 6, col: 6 }, { row: 6, col: 7 }, { row: 6, col: 8 }, { row: 6, col: 9 }, { row: 6, col: 10 }, { row: 6, col: 11 }, { row: 6, col: 12 }, { row: 6, col: 13 },
    // Row 7
    { row: 7, col: 5 }, { row: 7, col: 6 }, { row: 7, col: 7 }, { row: 7, col: 8 }, { row: 7, col: 9 }, { row: 7, col: 10 }, { row: 7, col: 11 }, { row: 7, col: 12 }
  ];

  // Handle mouse movement
  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseEnter = (e) => {
    // Immediately update mouse position on enter
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
    setIsMouseOver(true);
    setTransitionPhase('active');
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
    setTransitionPhase('returning');

    // Reset to idle after animation completes
    setTimeout(() => {
      setTransitionPhase('idle');
      setMousePosition({ x: -1000, y: -1000 });
    }, 2000);
  };

  // Calculate distance between two points
  const getDistance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  // Check if a dot is in the original blue pattern
  const isInOriginalPattern = (row, col) => {
    return originalBlueDots.some(d => d.row === row && d.col === col);
  };

  // Get the center of the cloud pattern
  const getCloudCenter = () => {
    const avgCol = originalBlueDots.reduce((sum, dot) => sum + dot.col, 0) / originalBlueDots.length;
    const avgRow = originalBlueDots.reduce((sum, dot) => sum + dot.row, 0) / originalBlueDots.length;
    return {
      x: avgCol * dotSpacing + 20,
      y: avgRow * dotSpacing + 20
    };
  };

  const cloudCenter = getCloudCenter();

  // Determine dot properties based on position and mouse
  const getDotProperties = (row, col) => {
    const dotX = col * dotSpacing + 20;
    const dotY = row * dotSpacing + 20;
    const distanceFromMouse = getDistance(dotX, dotY, mousePosition.x, mousePosition.y);
    const distanceFromCloudCenter = getDistance(dotX, dotY, cloudCenter.x, cloudCenter.y);
    const isOriginalBlue = isInOriginalPattern(row, col);

    let color = '#1f2937'; // Default dark grey
    let scale = 1;
    let opacity = 1;
    let translateX = 0;
    let translateY = 0;

    if (transitionPhase === 'active' && isMouseOver) {
      // Active state - create a blue cluster around mouse
      // Similar size to original cloud pattern (about 40-45 dots)
      if (distanceFromMouse < 70) {
        color = '#2563eb';
        scale = 1.1;
      } else if (distanceFromMouse < 100) {
        color = '#3b82f6';
        scale = 1.05;
      } else if (distanceFromMouse < 130) {
        color = '#60a5fa';
        scale = 1;
      }
    } else if (transitionPhase === 'returning') {
      // Returning state - dots flow back to form the cloud
      if (isOriginalBlue) {
        // Original cloud dots always become blue
        color = '#2563eb';
        scale = 1.02;

        // Add a subtle "coming home" effect
        const time = Date.now() / 1000;
        const wave = Math.sin(time * 2 + row + col) * 0.02;
        scale = scale + wave;
      } else {
        // Non-original dots fade out if they were blue
        const distToOriginal = Math.min(
          ...originalBlueDots.map(d =>
            getDistance(col * dotSpacing + 20, row * dotSpacing + 20,
              d.col * dotSpacing + 20, d.row * dotSpacing + 20)
          )
        );

        if (distToOriginal < 100) {
          opacity = Math.max(0.3, distToOriginal / 100);
        }
      }
    } else {
      // Idle state - show cloud pattern
      if (isOriginalBlue) {
        color = '#2563eb';
        // Add subtle floating animation
        const time = Date.now() / 1000;
        const floatOffset = Math.sin(time + row + col) * 0.5;
        translateY = floatOffset;
      }
    }

    return { color, scale, opacity, translateX, translateY };
  };

  // Generate dots
  const dots = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const dotX = col * dotSpacing + 20;
      const dotY = row * dotSpacing + 20;
      const { color, scale, opacity, translateX, translateY } = getDotProperties(row, col);

      // Calculate staggered delay for return animation
      const distanceFromCenter = getDistance(dotX, dotY, cloudCenter.x, cloudCenter.y);
      const delay = transitionPhase === 'returning'
        ? Math.random() * 0.3
        : 0;

      // Determine radius based on whether it's blue (either original or near mouse)
      const isBlue = color === '#2563eb' || color === '#3b82f6' || color === '#60a5fa';
      const radius = isBlue || isInOriginalPattern(row, col) ? blueDotRadius : baseDotRadius;

      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={dotX}
          cy={dotY}
          r={radius}
          fill={color}
          opacity={opacity}
          transform={`translate(${translateX}, ${translateY}) scale(${scale})`}
          style={{
            transformOrigin: `${dotX}px ${dotY}px`,
            transition: transitionPhase === 'returning'
              ? `all 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`
              : transitionPhase === 'active'
                ? `all 0.3s ease-out`
                : `all 0.4s ease-out`,
          }}
        />
      );
    }
  }

  return (
    <div className="cloud-container">
      <div className="dot-left-section">
        <div
          ref={containerRef}
          className="dots-wrapper"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <svg className="dots-svg" viewBox="0 0 510 300" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="transparent"
              style={{ pointerEvents: 'all' }}
            />
            <g filter={transitionPhase === 'idle' ? "url(#glow)" : ""}>
              {dots}
            </g>
          </svg>
        </div>
      </div>

      <div className="divider"></div>

      <div className="right-section1">
        <div >
          <div className="scalability-highlight" style={{paddingLeft:"60px",position:"relative"}}>
            <div className="scalability-label">FLEXIBLE DEPLOYMENT</div>
            <div className="scalability-svg" style={{top: "35px", left: "-40px"}}><svg xmlns="http://www.w3.org/2000/svg" width="583" height="88" viewBox="0 0 583 88" fill="none">
                <path d="M545.414 -89.4141L768.415 133.586L767 135L544 -88L545.414 -89.4141ZM532.414 -89.4141L755.415 133.586L754 135L531 -88L532.414 -89.4141ZM519.414 -89.4141L742.415 133.586L741 135L518 -88L519.414 -89.4141ZM506.414 -89.4141L729.415 133.586L728 135L505 -88L506.414 -89.4141ZM493.414 -89.4141L716.415 133.586L715 135L492 -88L493.414 -89.4141ZM480.414 -89.4141L703.415 133.586L702 135L479 -88L480.414 -89.4141ZM467.414 -89.4141L690.415 133.586L689 135L466 -88L467.414 -89.4141ZM454.414 -89.4141L677.415 133.586L676 135L453 -88L454.414 -89.4141ZM441.414 -89.4141L664.415 133.586L663 135L440 -88L441.414 -89.4141ZM428.414 -89.4141L651.415 133.586L650 135L427 -88L428.414 -89.4141ZM415.414 -89.4141L638.415 133.586L637 135L414 -88L415.414 -89.4141ZM402.414 -89.4141L625.415 133.586L624 135L401 -88L402.414 -89.4141ZM389.414 -89.4141L612.415 133.586L611 135L388 -88L389.414 -89.4141ZM376.414 -89.4141L599.415 133.586L598 135L375 -88L376.414 -89.4141ZM363.414 -89.4141L586.415 133.586L585 135L362 -88L363.414 -89.4141ZM350.414 -89.4141L573.415 133.586L572 135L349 -88L350.414 -89.4141ZM337.414 -89.4141L560.415 133.586L559 135L336 -88L337.414 -89.4141ZM324.414 -89.4141L547.415 133.586L546 135L323 -88L324.414 -89.4141ZM311.414 -89.4141L534.415 133.586L533 135L310 -88L311.414 -89.4141ZM298.414 -89.4141L521.415 133.586L520 135L297 -88L298.414 -89.4141ZM285.414 -89.4141L508.415 133.586L507 135L284 -88L285.414 -89.4141ZM272.414 -89.4141L495.415 133.586L494 135L271 -88L272.414 -89.4141ZM259.414 -89.4141L482.415 133.586L481 135L258 -88L259.414 -89.4141ZM246.414 -89.4141L469.415 133.586L468 135L245 -88L246.414 -89.4141ZM233.414 -89.4141L456.415 133.586L455 135L232 -88L233.414 -89.4141ZM220.414 -89.4141L443.415 133.586L442 135L219 -88L220.414 -89.4141ZM207.414 -89.4141L430.415 133.586L429 135L206 -88L207.414 -89.4141ZM194.414 -89.4141L417.415 133.586L416 135L193 -88L194.414 -89.4141ZM181.414 -89.4141L404.415 133.586L403 135L180 -88L181.414 -89.4141ZM168.414 -89.4141L391.415 133.586L390 135L167 -88L168.414 -89.4141ZM155.414 -89.4141L378.415 133.586L377 135L154 -88L155.414 -89.4141ZM142.414 -89.4141L365.415 133.586L364 135L141 -88L142.414 -89.4141ZM129.414 -89.4141L352.415 133.586L351 135L128 -88L129.414 -89.4141ZM116.414 -89.4141L339.415 133.586L338 135L115 -88L116.414 -89.4141ZM103.414 -89.4141L326.415 133.586L325 135L102 -88L103.414 -89.4141ZM90.4141 -89.4141L313.415 133.586L312 135L89 -88L90.4141 -89.4141ZM77.4141 -89.4141L300.415 133.586L299 135L76 -88L77.4141 -89.4141ZM64.4141 -89.4141L287.415 133.586L286 135L63 -88L64.4141 -89.4141ZM51.4141 -89.4141L274.415 133.586L273 135L50 -88L51.4141 -89.4141ZM38.4141 -89.4141L261.415 133.586L260 135L37 -88L38.4141 -89.4141ZM25.4141 -89.4141L248.415 133.586L247 135L24 -88L25.4141 -89.4141ZM12.4141 -89.4141L235.415 133.586L234 135L11 -88L12.4141 -89.4141ZM-0.585947 -89.4141L222.415 133.586L221 135L-2.00001 -88L-0.585947 -89.4141ZM-13.5859 -89.4141L209.415 133.586L208 135L-15 -88L-13.5859 -89.4141ZM-26.5859 -89.4141L196.415 133.586L195 135L-28 -88L-26.5859 -89.4141ZM-39.5859 -89.4141L183.415 133.586L182 135L-41 -88L-39.5859 -89.4141ZM-52.5859 -89.4141L170.415 133.586L169 135L-54 -88L-52.5859 -89.4141ZM-65.5859 -89.4141L157.415 133.586L156 135L-67 -88L-65.5859 -89.4141ZM-78.5859 -89.4141L144.415 133.586L143 135L-80 -88L-78.5859 -89.4141ZM-91.5859 -89.4141L131.415 133.586L130 135L-93 -88L-91.5859 -89.4141ZM-104.586 -89.4141L118.415 133.586L117 135L-106 -88L-104.586 -89.4141ZM-117.586 -89.4141L105.415 133.586L104 135L-119 -88L-117.586 -89.4141ZM-130.586 -89.4141L92.415 133.586L91 135L-132 -88L-130.586 -89.4141ZM-143.586 -89.4141L79.415 133.586L78 135L-145 -88L-143.586 -89.4141ZM-156.586 -89.4141L66.415 133.586L65 135L-158 -88L-156.586 -89.4141ZM-169.586 -89.4141L53.415 133.586L52 135L-171 -88L-169.586 -89.4141ZM-182.586 -89.4141L40.415 133.586L39 135L-184 -88L-182.586 -89.4141ZM-195.586 -89.4141L27.415 133.586L26 135L-197 -88L-195.586 -89.4141ZM-208.586 -89.4141L14.415 133.586L13 135L-210 -88L-208.586 -89.4141Z" fill="url(#paint0_linear_758_7709)" fillOpacity="0.2" />
                <defs>
                  <linearGradient id="paint0_linear_758_7709" x1="-210" y1="22.793" x2="693.5" y2="22.7937" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" />
                    <stop offset="1" />
                  </linearGradient>
                </defs>
              </svg></div>
            <div className="number-display" style={{fontFamily:"source code pro !important"}}>Cloud</div>
            <div className="description">
            Deploy anywhere - cloud, on-<br />premises or hybrid,<br /> infrastructure
            </div>
          </div>

          <div className="p-features-list">
            <div className="p-feature-item">
              <span className="p-checkmark" style={{ color: '#4ade80' }}>✓</span>
              <span>Multi-cloud support (AWS, Azure, GCP)</span>
            </div>
            <div className="p-feature-item">
              <span className="p-checkmark" style={{ color: '#4ade80' }}>✓</span>
              <span>On-premises deployment options
              </span>
            </div>
            <div className="p-feature-item">
              <span className="p-checkmark" style={{ color: '#4ade80' }}>✓</span>
              <span>Hybrid cloud configurations</span>
            </div>
            <div className="p-feature-item">
              <span className="p-checkmark" style={{ color: '#4ade80' }}>✓</span>
              <span>Docker containerization</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloudDeploymentVisualization;