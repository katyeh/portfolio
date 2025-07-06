import React, { forwardRef } from 'react';
import { TIMELINE_CONSTANTS } from './constants';

interface TimelinePathsProps {
  isMobile: boolean;
  prefersReducedMotion: boolean;
  strokeColor: string;
}

export const TimelinePaths = forwardRef<
  { desktopPath: SVGPathElement | null; mobilePath: SVGPathElement | null },
  TimelinePathsProps
>(({ isMobile, prefersReducedMotion, strokeColor }, ref) => {
  const desktopPathRef = React.useRef<SVGPathElement>(null);
  const mobilePathRef = React.useRef<SVGPathElement>(null);

  React.useImperativeHandle(ref, () => ({
    desktopPath: desktopPathRef.current,
    mobilePath: mobilePathRef.current,
  }));

  const pathStyles = {
    strokeDasharray: '5 8',
    strokeDashoffset: prefersReducedMotion ? '0' : '2000',
    animation: prefersReducedMotion
      ? 'none'
      : `dash ${TIMELINE_CONSTANTS.ANIMATION_DURATION.PATH_ANIMATION}s ease-out forwards`,
  };

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <svg
        width="100%"
        height="100%"
        viewBox={
          isMobile
            ? TIMELINE_CONSTANTS.SVG_VIEWBOX.MOBILE
            : TIMELINE_CONSTANTS.SVG_VIEWBOX.DESKTOP
        }
        preserveAspectRatio="none"
        className="absolute top-0 left-0 w-full h-full"
        style={{ overflow: 'visible' }}
      >
        {/* Desktop horizontal path */}
        <path
          ref={desktopPathRef}
          d={TIMELINE_CONSTANTS.SVG_PATHS.DESKTOP}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          className={`${prefersReducedMotion ? '' : 'path-animation'} ${
            isMobile ? 'hidden' : 'block'
          }`}
          style={pathStyles}
        />

        {/* Mobile vertical path */}
        <path
          ref={mobilePathRef}
          d={TIMELINE_CONSTANTS.SVG_PATHS.MOBILE}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          className={`${prefersReducedMotion ? '' : 'path-animation'} ${
            isMobile ? 'block' : 'hidden'
          }`}
          style={pathStyles}
        />
      </svg>
    </div>
  );
});

TimelinePaths.displayName = 'TimelinePaths';
