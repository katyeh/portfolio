import React, { forwardRef } from 'react';
import { TIMELINE_CONSTANTS, TIMELINE_COLORS } from './constants';

interface BeeComponentProps {
  className?: string;
}

export const BeeComponent = forwardRef<HTMLDivElement, BeeComponentProps>(
  ({ className = '' }, ref) => {
    const { SIZE, Z_INDEX } = TIMELINE_CONSTANTS.BEE_ANIMATION;
    const { BODY, STRIPE, WING, STROKE } = TIMELINE_COLORS.BEE;

    return (
      <div
        ref={ref}
        className={`absolute bee ${className}`}
        style={{
          width: `${SIZE}px`,
          height: `${SIZE}px`,
          transformOrigin: 'center',
          transition: `opacity ${TIMELINE_CONSTANTS.ANIMATION_DURATION.FADE_TRANSITION}s ease`,
          willChange: 'transform',
          position: 'absolute',
          left: '0',
          top: '0',
          zIndex: Z_INDEX,
          opacity: 0,
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Bee body */}
          <ellipse
            cx="16"
            cy="16"
            rx="8"
            ry="6"
            fill={BODY}
            stroke={STROKE}
            strokeWidth="0.5"
          />

          {/* Black stripes */}
          <path
            d="M8,13 Q16,11 24,13 Q16,15 8,13 Z"
            fill={STRIPE}
            opacity="0.8"
          />
          <path
            d="M8,16 Q16,14 24,16 Q16,18 8,16 Z"
            fill={STRIPE}
            opacity="0.8"
          />
          <path
            d="M8,19 Q16,17 24,19 Q16,21 8,19 Z"
            fill={STRIPE}
            opacity="0.8"
          />

          {/* Wings */}
          <ellipse
            cx="11"
            cy="10"
            rx="4"
            ry="6"
            fill={WING}
            stroke={STROKE}
            strokeWidth="0.5"
            transform="rotate(-20 11 10)"
          />
          <ellipse
            cx="21"
            cy="10"
            rx="4"
            ry="6"
            fill={WING}
            stroke={STROKE}
            strokeWidth="0.5"
            transform="rotate(20 21 10)"
          />

          {/* Antennae */}
          <path
            d="M13,8 Q12,5 10,4 M19,8 Q20,5 22,4"
            stroke={STROKE}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="10" cy="4" r="1" fill={STROKE} />
          <circle cx="22" cy="4" r="1" fill={STROKE} />

          {/* Eyes */}
          <circle cx="12" cy="13" r="1.5" fill={STROKE} />
          <circle cx="20" cy="13" r="1.5" fill={STROKE} />
          <circle cx="12.5" cy="12.5" r="0.5" fill="#FFFFFF" />
          <circle cx="20.5" cy="12.5" r="0.5" fill="#FFFFFF" />

          {/* Stinger */}
          <path d="M16,22 L16,25 L15,24 L17,24 Z" fill={STROKE} />
        </svg>
      </div>
    );
  }
);

BeeComponent.displayName = 'BeeComponent';
