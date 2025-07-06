'use client';

import React, { useRef, useState, useCallback } from 'react';
import { useResponsiveDesign } from './Timeline/hooks/useResponsiveDesign';
import { useReducedMotion } from './Timeline/hooks/useReducedMotion';
import { useIntersectionObserver } from './Timeline/hooks/useIntersectionObserver';
import { useBeeAnimation } from './Timeline/hooks/useBeeAnimation';
import { BeeComponent } from './Timeline/BeeComponent';
import { TimelinePaths } from './Timeline/TimelinePaths';
import { MilestoneCard } from './Timeline/MilestoneCard';
import { TIMELINE_CONSTANTS, JOURNEY_MILESTONES } from './Timeline/constants';

interface TimelineProps {
  darkMode: boolean;
}

export function Timeline({ darkMode }: TimelineProps) {
  const [activeMilestone, setActiveMilestone] = useState<string | null>(null);

  // Custom hooks
  const { isMobile } = useResponsiveDesign();
  const prefersReducedMotion = useReducedMotion();
  const { beeRef, animateBeeToMilestone, hideBee } = useBeeAnimation({
    isMobile,
    prefersReducedMotion,
  });

  // Refs for SVG paths
  const pathsRef = useRef<{
    desktopPath: SVGPathElement | null;
    mobilePath: SVGPathElement | null;
  }>({ desktopPath: null, mobilePath: null });

  // Intersection observer for timeline visibility
  const { elementRef: timelineRef } = useIntersectionObserver({
    onIntersect: useCallback(() => {
      if (beeRef.current) {
        beeRef.current.style.opacity = '0';
      }
    }, [beeRef]),
  });

  // Color configuration
  const cobaltColor = darkMode ? '#5A8FFF' : '#007AFF';
  const titleColor = darkMode ? '#FFFFFF' : '#1A1A1A';

  // Handle milestone interactions
  const handleMilestoneHover = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
      entering: boolean
    ) => {
      if (prefersReducedMotion) return;

      const note = e.currentTarget;
      const milestoneId = note.getAttribute('data-milestone-id');
      const index = JOURNEY_MILESTONES.findIndex((m) => m.id === milestoneId);

      if (entering && index !== -1) {
        setActiveMilestone(JOURNEY_MILESTONES[index].id);

        // Get current path based on screen size
        const currentPath = isMobile
          ? pathsRef.current.mobilePath
          : pathsRef.current.desktopPath;

        animateBeeToMilestone(index, currentPath);
      } else {
        setActiveMilestone(null);
      }
    },
    [prefersReducedMotion, isMobile, animateBeeToMilestone]
  );

  const handleTimelineLeave = useCallback(() => {
    if (!isMobile) {
      setActiveMilestone(null);
      hideBee();
    }
  }, [isMobile, hideBee]);

  return (
    <section
      id="journey"
      className={`section-container w-full ${TIMELINE_CONSTANTS.SPACING.PADDING.SECTION} overflow-hidden`}
    >
      <div
        className={`container mx-auto ${TIMELINE_CONSTANTS.SPACING.PADDING.CONTAINER}`}
      >
        <div
          ref={timelineRef}
          className="opacity-0 translate-y-10 transition-all duration-1000 ease-out"
        >
          {/* Section Title */}
          <h2
            className={`${TIMELINE_CONSTANTS.TYPOGRAPHY.TITLE} text-center`}
            style={{ color: titleColor }}
          >
            My Journey
          </h2>

          {/* Timeline Container */}
          <div
            className={`relative mx-auto ${
              isMobile
                ? TIMELINE_CONSTANTS.SPACING.CONTAINER_MAX_WIDTH.MOBILE
                : TIMELINE_CONSTANTS.SPACING.CONTAINER_MAX_WIDTH.DESKTOP
            }`}
            onMouseLeave={handleTimelineLeave}
          >
            {/* SVG Paths and Bee Animation */}
            <TimelinePaths
              ref={pathsRef}
              isMobile={isMobile}
              prefersReducedMotion={prefersReducedMotion}
              strokeColor={cobaltColor}
            />

            <BeeComponent ref={beeRef} />

            {/* Milestone Cards */}
            <div
              className={`relative z-10 ${
                TIMELINE_CONSTANTS.SPACING.PADDING.TOP
              } pb-8 ${
                isMobile
                  ? `flex flex-col ${TIMELINE_CONSTANTS.SPACING.GAPS.MOBILE}`
                  : `flex justify-between ${TIMELINE_CONSTANTS.SPACING.GAPS.DESKTOP} overflow-x-auto`
              }`}
            >
              {JOURNEY_MILESTONES.map((milestone, index) => (
                <MilestoneCard
                  key={milestone.id}
                  milestone={milestone}
                  index={index}
                  isActive={activeMilestone === milestone.id}
                  isMobile={isMobile}
                  darkMode={darkMode}
                  onInteractionStart={(e) => handleMilestoneHover(e, true)}
                  onInteractionEnd={(e) => handleMilestoneHover(e, false)}
                />
              ))}
            </div>
          </div>

          {/* Accessibility Note */}
          <div
            className={`mt-12 md:mt-16 text-center ${TIMELINE_CONSTANTS.TYPOGRAPHY.ACCESSIBILITY_NOTE}`}
          >
            <p>
              {isMobile ? 'Tap' : 'Hover over'} each milestone to interact •{' '}
              {prefersReducedMotion
                ? 'Animations reduced per your system preferences'
                : 'Watch the bee fly!'}
            </p>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }

        .active-milestone {
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15) !important;
          z-index: 10 !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .active-milestone {
            transform: none !important;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
          }
        }

        @media (max-width: 767px) {
          .milestone-card {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
