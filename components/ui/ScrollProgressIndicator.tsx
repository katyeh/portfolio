import React from 'react';

interface ScrollProgressIndicatorProps {
  progress: number;
  darkMode: boolean;
}

export function ScrollProgressIndicator({
  progress,
  darkMode,
}: ScrollProgressIndicatorProps) {
  return (
    <div className="fixed bottom-8 right-8 z-50 w-12 h-12 pointer-events-none">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle */}
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke={darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'}
          strokeWidth="2"
        />
        {/* Progress circle */}
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke={darkMode ? '#3EB489' : '#007AFF'}
          strokeWidth="2"
          strokeDasharray={`${progress * 125.6} 125.6`}
          strokeDashoffset="0"
          transform="rotate(-90 24 24)"
          className="transition-all duration-300 ease-out"
        />
        {/* Center dot */}
        <circle
          cx="24"
          cy="24"
          r="4"
          fill={darkMode ? '#3EB489' : '#007AFF'}
          className="pulse-animation"
        />
      </svg>
    </div>
  );
}
