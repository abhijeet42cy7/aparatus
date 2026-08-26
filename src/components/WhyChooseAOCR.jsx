import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import Timer from './Timer';
import MassiveScalability from './MassiveScalability';
import Percentage from './Percentage';
import Dots from './Dots';

const styles = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Alliance No.2", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

.stats-page-container {
  min-height: 100vh;
  background-color: #000;
  padding: 90px 95px 48px 95px;
  display: flex;
  flex-direction: column;
}

.stats-header-section {
  background-color: #0e3ba5;
  padding: 20px 24px;
  margin-bottom: 24px;
  border-radius: 4px;
}

.stats-section-label {
  font-size: 10px;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 5px;
}

.stats-main-title {
  font-size: 52px;
  font-weight: 300;
  color: #fff;
  line-height: 1.1;
}

@media (max-width: 480px) {
  .stats-header-section {
    background-color: #000 !important;
  }
  
  .stats-main-title {
    font-size: 32px !important;
  }
}

.stats-content-wrapper {
  display: flex;
  gap: 0;
  align-items: stretch;
  flex: 1;
  position: relative;
  border: 1px solid #333;
}

.stats-left-section {
  flex: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.stats-right-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
}

.stats-divider {
  width: 1px;
  background: repeating-linear-gradient(
    to bottom,
    transparent,
    transparent 8px,
    #666 8px,
    #666 12px
  );
  margin: 0 20px;
}

`;

export default function WhyChooseAOCR() {
  const [percentages, setPercentages] = useState({ primary: 0, secondary: 0, tertiary: 0 });

  // Refs for title animation
  const titleWordRefs = {
    Why: useRef(null),
    Choose: useRef(null),
    A_paratus: useRef(null)
  };

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Animate percentages
    const animatePercentages = () => {
      let current = { primary: 0, secondary: 0, tertiary: 0 };
      const targets = { primary: 99, secondary: 100, tertiary: 98 };
      const duration = 2000; // 2 seconds
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        current.primary = Math.floor(targets.primary * easeOutQuart);
        current.secondary = Math.floor(targets.secondary * easeOutQuart);
        current.tertiary = Math.floor(targets.tertiary * easeOutQuart);

        setPercentages({ ...current });

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      // Start animation after a short delay
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, 500);
    };

    animatePercentages();

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Title animation effect
  useEffect(() => {
    const allElements = Object.values(titleWordRefs).map(ref => ref.current);
    if (!allElements.every(el => el)) return;

    // Create intersection observer to trigger animation when element comes into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Start the blinking animation
          startBlinkAnimation(allElements);
          observer.unobserve(entry.target); // Only trigger once
        }
      });
    }, { threshold: 0.5 });

    // Observe the first element to trigger the animation
    observer.observe(allElements[0]);

    return () => observer.disconnect();
  }, []);

  const startBlinkAnimation = (allElements) => {
    // Initial setup - all invisible
    gsap.set(allElements, {
      opacity: 0,
      filter: "brightness(1)",
      textShadow: "0 0 0 rgba(0,0,0,0)"
    });

    // Main timeline
    const mainTimeline = gsap.timeline();

    // Quick initial blinks for each element
    const blinkElement = (target, intensity, numBlinks) => {
      const sequence = gsap.timeline();
      for (let i = 0; i < numBlinks; i++) {
        sequence
          .to(target, {
            opacity: 0,
            duration: 0.09,
            ease: "steps(1)"
          })
          .to(target, {
            opacity: 1,
            filter: `brightness(${intensity})`,
            duration: 0.02,
            ease: "steps(1)"
          });
      }
      return sequence;
    };

    // All elements start hidden
    gsap.set(allElements, { opacity: 0 });

    // Create parallel animations for each word at different times
    mainTimeline.add(() => {
      // Why blinks first
      blinkElement(titleWordRefs.Why.current, 1.7, 4);
    });

    // Choose with delay
    mainTimeline.add(() => {
      blinkElement(titleWordRefs.Choose.current, 1.5, 5);
    }, "+=0.15");

    mainTimeline.add(() => {
      blinkElement(titleWordRefs.A_paratus.current, 1.3, 4);
    }, "+=0.15");

    // Set final state for all elements
    mainTimeline.to(allElements, {
      opacity: 1,
      filter: "brightness(1)",
      duration: 0.05
    }, "+=0.1");
  };

  return (
    <div className="stats-page-container">
      <div className="stats-header-section">
        <div className="stats-section-label">[ STATS ]</div>
        <h1 className="stats-main-title"><span ref={titleWordRefs.Why}>Why</span> <span ref={titleWordRefs.Choose}>Choose</span> <span ref={titleWordRefs.A_paratus}>A_paratus</span></h1>
      </div>

      <div className="stats-grid">
        <Percentage />
        <Timer />
        <MassiveScalability />
        <Dots />
      </div>
    </div>
  );
} 