'use client';

import React, { useEffect, useRef } from 'react';

interface LineDrawIconProps {
  type: 'code' | 'lightbulb' | 'target';
  darkMode: boolean;
  prefersReducedMotion: boolean;
}

export function LineDrawIcon({
  type,
  darkMode,
  prefersReducedMotion,
}: LineDrawIconProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (prefersReducedMotion || !svgRef.current) return;

    const paths = svgRef.current.querySelectorAll('path');
    paths.forEach((path) => {
      // Get the length of the path
      const length = path.getTotalLength();
      // Set up the starting position
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      // Trigger the animation
      path.style.animation = 'line-draw 1.5s ease-out forwards';
    });
  }, [prefersReducedMotion]);

  const getIconPath = () => {
    switch (type) {
      case 'code':
        return (
          <path
            d="M10,15 L2,8 L10,1 M20,15 L28,8 L20,1 M12,18 L18,0"
            stroke={darkMode ? '#E6E6FA' : '#007AFF'}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      case 'lightbulb':
        return (
          <path
            d="M15,1 C9.5,1 5,5.5 5,11 C5,14.5 7,17.5 9,19 L9,22 C9,23.5 10.5,25 12,25 L18,25 C19.5,25 21,23.5 21,22 L21,19 C23,17.5 25,14.5 25,11 C25,5.5 20.5,1 15,1 Z M12,22 L18,22 M12,19 L18,19"
            stroke={darkMode ? '#E6E6FA' : '#007AFF'}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      case 'target':
        return (
          <path
            d="M15,15 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0 M15,15 m-6,0 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0 M15,15 m-2,0 a2,2 0 1,0 4,0 a2,2 0 1,0 -4,0 M15,1 L15,5 M15,25 L15,29 M1,15 L5,15 M25,15 L29,15"
            stroke={darkMode ? '#E6E6FA' : '#007AFF'}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="line-draw-icon">
      <svg
        ref={svgRef}
        width="30"
        height="30"
        viewBox="0 0 30 30"
        xmlns="http://www.w3.org/2000/svg"
        className={prefersReducedMotion ? 'reduced-motion' : ''}
      >
        {getIconPath()}
      </svg>
    </div>
  );
}
