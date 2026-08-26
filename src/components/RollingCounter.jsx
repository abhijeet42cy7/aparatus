import React, { useState, useEffect, useRef } from 'react';

const RollingCounter = ({ endValue, duration = 2500, isVisible }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const frameRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    // Reset the animation state when visibility changes
    startTimeRef.current = null;
    setDisplayValue(0);
    
    if (!isVisible) {
      return;
    }

    const animate = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = (timestamp - startTimeRef.current) / duration;

      if (progress < 0.5) {
        // First half: 0 to 100
        const value = Math.min(100, Math.floor((progress * 2) * 100));
        setDisplayValue(value);
      } else if (progress < 1) {
        // Second half: 100 to 99
        const remainingProgress = (progress - 0.5) * 2;
        const value = Math.max(endValue, Math.floor(100 - remainingProgress));
        setDisplayValue(value);
      } else {
        setDisplayValue(endValue);
        return;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isVisible, endValue, duration]);

  return (
    <span className="rolling-counter">
      {displayValue}%
    </span>
  );
};

export default RollingCounter;
