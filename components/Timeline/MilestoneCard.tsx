import React from 'react';
import { TIMELINE_CONSTANTS, TIMELINE_COLORS } from './constants';

interface MilestoneCardProps {
  milestone: {
    id: string;
    year: string;
    title: string;
    subtitle: string;
    description: string;
  };
  index: number;
  isActive: boolean;
  isMobile: boolean;
  darkMode: boolean;
  onInteractionStart: (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => void;
  onInteractionEnd: (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => void;
}

export function MilestoneCard({
  milestone,
  index,
  isActive,
  isMobile,
  darkMode,
  onInteractionStart,
  onInteractionEnd,
}: MilestoneCardProps) {
  const { POST_IT, TYPOGRAPHY } = TIMELINE_CONSTANTS;
  const { POST_IT_BACKGROUNDS, BADGE_OPACITY, SHADOWS } = TIMELINE_COLORS;

  const cobaltColor = darkMode ? '#5A8FFF' : '#007AFF';
  const mintColor = darkMode ? '#3EB489' : '#3EB489';
  const textColor = '#5A5F6A';
  const textDarkColor = darkMode ? '#FFFFFF' : '#333333';

  const cardStyles = {
    backgroundColor: POST_IT_BACKGROUNDS[index % POST_IT_BACKGROUNDS.length],
    boxShadow: isActive ? SHADOWS.ACTIVE : SHADOWS.DEFAULT,
    transform: isMobile
      ? 'none'
      : `translateY(${POST_IT.STAGGER_POSITIONS[index] || 0}px)`,
    zIndex: isActive
      ? POST_IT.HOVER_EFFECTS.Z_INDEX_ACTIVE
      : POST_IT.HOVER_EFFECTS.Z_INDEX_INACTIVE,
  };

  const badgeStyles = {
    backgroundColor: darkMode ? BADGE_OPACITY.DARK : BADGE_OPACITY.LIGHT,
    color: cobaltColor,
  };

  const beeLandingSpotStyles = {
    backgroundColor: 'white',
    border: `2px solid ${mintColor}`,
    opacity: isActive ? 1 : 0.6,
    transform: `${isMobile ? 'translateX(-50%)' : ''} ${
      isActive ? 'scale(1.2)' : 'scale(1)'
    }`,
    transition: 'all 0.3s ease',
  };

  // Handle post-it note hover with tilt effect
  const handleNoteHover = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    entering: boolean
  ) => {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const note = e.currentTarget;
    const randomTilt = entering ? Math.random() * 6 - 3 : 0;
    const shadow = entering
      ? '0 6px 12px rgba(0, 0, 0, 0.1)'
      : '0 2px 4px rgba(0, 0, 0, 0.1)';

    // Calculate base position and apply tilt
    if (isMobile) {
      const lift = entering ? 'translateY(-4px)' : 'translateY(0px)';
      note.style.transform = `${lift} rotate(${randomTilt}deg)`;
    } else {
      const baseY = POST_IT.STAGGER_POSITIONS[index] || 0;
      const liftY = entering ? baseY - 4 : baseY;
      note.style.transform = `translateY(${liftY}px) rotate(${randomTilt}deg)`;
    }

    note.style.boxShadow = shadow;
    note.style.zIndex = entering ? '10' : '1';

    // Call the original interaction handler
    if (entering) {
      onInteractionStart(e);
    } else {
      onInteractionEnd(e);
    }
  };

  return (
    <div
      id={`milestone-${milestone.id}`}
      className={`relative transition-all duration-300 ease-out ${
        TIMELINE_CONSTANTS.SPACING.PADDING.CARD
      } rounded-lg milestone-card ${
        isMobile
          ? POST_IT.WIDTHS.MOBILE
          : `flex-shrink-0 ${POST_IT.WIDTHS.DESKTOP}`
      } ${isActive ? 'active-milestone' : ''}`}
      style={cardStyles}
      onMouseEnter={!isMobile ? (e) => handleNoteHover(e, true) : undefined}
      onMouseLeave={!isMobile ? (e) => handleNoteHover(e, false) : undefined}
      onTouchStart={isMobile ? (e) => handleNoteHover(e, true) : undefined}
      onTouchEnd={isMobile ? (e) => handleNoteHover(e, false) : undefined}
      data-milestone-id={milestone.id}
    >
      {/* Year Badge */}
      <div
        className="inline-block px-3 py-1.5 rounded-full text-xs font-medium mb-4"
        style={badgeStyles}
      >
        {milestone.year}
      </div>

      {/* Title */}
      <h3 className={TYPOGRAPHY.CARD_TITLE} style={{ color: textDarkColor }}>
        {milestone.title}
      </h3>

      {/* Subtitle */}
      <p className={TYPOGRAPHY.CARD_SUBTITLE} style={{ color: cobaltColor }}>
        {milestone.subtitle}
      </p>

      {/* Description */}
      <p className={TYPOGRAPHY.CARD_DESCRIPTION} style={{ color: textColor }}>
        {milestone.description}
      </p>

      {/* Bee landing spot */}
      <div
        className={`absolute w-6 h-6 rounded-full flex items-center justify-center ${
          isMobile
            ? '-top-3 left-1/2 transform -translate-x-1/2'
            : '-top-3 -right-3'
        }`}
        style={beeLandingSpotStyles}
      >
        <span
          className="block w-2 h-2 rounded-full"
          style={{ backgroundColor: mintColor }}
        />
      </div>
    </div>
  );
}
