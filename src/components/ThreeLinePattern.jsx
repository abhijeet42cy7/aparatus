import React from 'react';

const ThreeLinePattern = ({ 
  spacing = 0, 
  style = {}, 
  lineColor = '#000', 
  lineWidth = 1,
  line1Start = { x: 13.5, y: 0 },
  line1End = { x: 13.5, y: 13 },
  line2Start = { x: 13.5, y: 13 },
  line2End = { x: 27, y: 14 },
  line3Start = { x: 13.5, y: 13 },
  line3End = { x: 9, y: 19 }
}) => {
  const svgStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    ...style
  };

  return (
    <svg style={svgStyle} viewBox="0 0 27 26" xmlns="http://www.w3.org/2000/svg">
      <line
        x1={line1Start.x}
        y1={line1Start.y}
        x2={line1End.x}
        y2={line1End.y}
        stroke={lineColor}
        strokeWidth={lineWidth}
        fill="none"
      />
      <line
        x1={line2Start.x}
        y1={line2Start.y}
        x2={line2End.x}
        y2={line2End.y}
        stroke={lineColor}
        strokeWidth={lineWidth}
        fill="none"
      />
      <line
        x1={line3Start.x}
        y1={line3Start.y}
        x2={line3End.x}
        y2={line3End.y}
        stroke={lineColor}
        strokeWidth={lineWidth}
        fill="none"
      />
    </svg>
  );
};

export default ThreeLinePattern;
