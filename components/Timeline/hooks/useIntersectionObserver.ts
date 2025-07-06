import { useEffect, useRef, useState } from 'react';
import { TIMELINE_CONSTANTS } from '../constants';

interface UseIntersectionObserverProps {
  onIntersect?: () => void;
  onExit?: () => void;
}

export function useIntersectionObserver({
  onIntersect,
  onExit,
}: UseIntersectionObserverProps = {}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsVisible(isIntersecting);

        if (isIntersecting) {
          // Add visibility classes
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');

          // Call custom intersection callback
          onIntersect?.();
        } else {
          // Call custom exit callback
          onExit?.();
        }
      },
      {
        threshold: TIMELINE_CONSTANTS.INTERSECTION_OBSERVER.THRESHOLD,
        rootMargin: TIMELINE_CONSTANTS.INTERSECTION_OBSERVER.ROOT_MARGIN,
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [onIntersect, onExit]);

  return {
    elementRef,
    isVisible,
  };
}
