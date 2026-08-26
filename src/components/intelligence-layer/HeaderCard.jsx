import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const HEADER_CARD_STYLES = `
  .intelligence-header-card {
    background-color: #0e3ba5;
    height: 450px;
    width: 100%;
    margin: 0 auto;
    padding: 32px;
    border: 1px solid #333333;
    transition: all 0.3s ease;
  }

  /* Mobile-specific styles */
  @media only screen and (max-width: 768px) {
    .intelligence-header-card {
      background-color: transparent;
      padding: 16px;
      height: auto;
      border: none;
    }

    .intelligence-header-label {
      margin-bottom: 10px;
      letter-spacing: 1.5px;
    }

    .intelligence-header-title {
      margin-bottom: 12px !important;
      line-height: 1.05;
    }

    .intelligence-header-description {
      line-height: 1.3;
    }
  }

  .intelligence-header-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 20px;
    transition: color 0.3s ease;
  }

  .intelligence-header-card:hover .intelligence-header-label {
    color: rgba(255, 255, 255, 0.9);
  }

  .intelligence-header-title {
    font-size: 32px;
    font-weight: 300;
    line-height: 1.1;
    margin-bottom: 194px;
    color: #fff;
    transition: all 0.3s ease;
  }

  .intelligence-header-card:hover .intelligence-header-title {
    transform: scale(1.01);
  }

  .intelligence-header-description {
    font-size: 14px;
    line-height: 1.4;
    color: rgba(255, 255, 255, 0.60);
    font-weight: 400;
    transition: color 0.3s ease;
  }
`;

export default function HeaderCard() {
  const wordRefs = {
    Intelligence: useRef(null),
    Layer: useRef(null),
    for: useRef(null),
    Documents: useRef(null)
  };

  useEffect(() => {
    const allElements = Object.values(wordRefs).map(ref => ref.current);
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
      textShadow: "0 0 0 rgba(255,255,255,0)"
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
      // Intelligence blinks first
      blinkElement(wordRefs.Intelligence.current, 1.7, 4);
    });

    // Layer with delay
    mainTimeline.add(() => {
      blinkElement(wordRefs.Layer.current, 1.5, 5);
    }, "+=0.15");

    // "for" with more delay
    mainTimeline.add(() => {
      blinkElement(wordRefs.for.current, 1.3, 4);
    }, "+=0.15");

    // Documents with most delay
    mainTimeline.add(() => {
      blinkElement(wordRefs.Documents.current, 1.2, 4);
    }, "+=0.15");

    // Set final state for all elements
    mainTimeline.to(allElements, {
      opacity: 1,
      filter: "brightness(1)",
      duration: 0.05
    }, "+=0.1");
  };

  return (
    <div className="intelligence-header-card">
      <style>{HEADER_CARD_STYLES}</style>
      <div className="intelligence-header-label">[WHAT WE DO]</div>
      <h1 className="intelligence-header-title">
        <span ref={wordRefs.Intelligence}>Intelligence </span>
        <span ref={wordRefs.Layer}>Layer </span>
        <span ref={wordRefs.for}>for </span>
        <span ref={wordRefs.Documents}>Documents</span>
      </h1>
      <p className="intelligence-header-description">
        AI-powered OCR that doesn't just read text—it understands <span style={{ color: '#FFF' }}>layouts, context, and entities</span>. Transform any document into <span style={{ color: '#FFF' }}>structured, analytics-ready data</span> with unprecedented accuracy and intelligence.
      </p>
    </div>
  );
} 