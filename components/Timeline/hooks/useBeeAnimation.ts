import { useRef, useCallback } from 'react';
import { TIMELINE_CONSTANTS, JOURNEY_MILESTONES } from '../constants';

interface UseBeeAnimationProps {
  isMobile: boolean;
  prefersReducedMotion: boolean;
}

export function useBeeAnimation({
  isMobile,
  prefersReducedMotion,
}: UseBeeAnimationProps) {
  const beeRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const currentBeePositionRef = useRef(0);

  const getRotationAngle = useCallback(
    (path: SVGPathElement, distance: number): number => {
      const point1 = path.getPointAtLength(Math.max(0, distance - 1));
      const point2 = path.getPointAtLength(
        Math.min(path.getTotalLength(), distance + 1)
      );
      return (
        (Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180) / Math.PI
      );
    },
    []
  );

  const calculateTargetProgress = useCallback(
    (milestoneIndex: number): number => {
      const baseProgress = milestoneIndex / (JOURNEY_MILESTONES.length - 1);
      const { START_OFFSET, END_OFFSET, DESKTOP_MILESTONE_2_OFFSET } =
        TIMELINE_CONSTANTS.BEE_ANIMATION.PROGRESS_ADJUSTMENTS;

      if (isMobile) {
        if (milestoneIndex === 0) return START_OFFSET;
        if (milestoneIndex === JOURNEY_MILESTONES.length - 1) return END_OFFSET;
        return baseProgress;
      }

      // Desktop adjustments
      if (milestoneIndex === 0) return baseProgress + START_OFFSET;
      if (milestoneIndex === 2)
        return baseProgress + DESKTOP_MILESTONE_2_OFFSET;
      return baseProgress;
    },
    [isMobile]
  );

  const animateBeeToMilestone = useCallback(
    (milestoneIndex: number, currentPath: SVGPathElement | null) => {
      if (prefersReducedMotion || !currentPath || !beeRef.current) return;

      const bee = beeRef.current;
      const pathLength = currentPath.getTotalLength();
      const targetProgress = calculateTargetProgress(milestoneIndex);
      const targetDistance = targetProgress * pathLength;
      const startDistance = currentBeePositionRef.current;

      // Early return if already at target
      if (
        Math.abs(targetDistance - startDistance) <
        TIMELINE_CONSTANTS.BEE_ANIMATION.POSITION_TOLERANCE
      ) {
        return;
      }

      // Cancel any ongoing animation
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      // Show bee and prepare for animation
      bee.style.opacity = '1';
      bee.style.transition = 'none';

      // Calculate dynamic duration
      const duration = Math.max(
        Math.abs(targetDistance - startDistance) *
          TIMELINE_CONSTANTS.ANIMATION_DURATION.MULTIPLIER,
        TIMELINE_CONSTANTS.ANIMATION_DURATION.MINIMUM
      );

      let start: number | null = null;

      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);

        const currentDistance =
          startDistance + (targetDistance - startDistance) * progress;
        const boundedDistance = Math.max(
          0,
          Math.min(pathLength, currentDistance)
        );
        const point = currentPath.getPointAtLength(boundedDistance);

        bee.style.transform = `translate(${point.x}px, ${
          point.y
        }px) rotate(${getRotationAngle(currentPath, boundedDistance)}deg)`;

        currentBeePositionRef.current = boundedDistance;

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          animationFrameRef.current = null;
          currentBeePositionRef.current = targetDistance;
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    },
    [prefersReducedMotion, calculateTargetProgress, getRotationAngle]
  );

  const hideBee = useCallback(() => {
    if (prefersReducedMotion || !beeRef.current) return;

    // Cancel any ongoing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    const bee = beeRef.current;
    bee.style.opacity = '0';
    bee.style.transition = `opacity ${TIMELINE_CONSTANTS.ANIMATION_DURATION.FADE_TRANSITION}s ease`;

    // Reset position
    currentBeePositionRef.current = 0;
  }, [prefersReducedMotion]);

  return {
    beeRef,
    animateBeeToMilestone,
    hideBee,
  };
}
