'use client';

import React, { useEffect, useState, useRef } from 'react';

interface CursorEffectProps {
  darkMode: boolean;
}

export function CursorEffect({ darkMode }: CursorEffectProps) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState<
    {
      id: number;
      x: number;
      y: number;
    }[]
  >([]);

  // Track mouse position
  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const container = containerRef.current;
    if (!dot || !ring || !container) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let requestId: number;

    // Track mouse position for immediate dot following
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Update dot position immediately
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    // Check if hovering over interactive elements
    const handleElementHover = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, [role="button"]'
      );
      let isOverInteractive = false;

      interactiveElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (
          mouseX >= rect.left &&
          mouseX <= rect.right &&
          mouseY >= rect.top &&
          mouseY <= rect.bottom
        ) {
          isOverInteractive = true;
          // If it's a button or link, apply magnetic effect
          if (element.tagName === 'BUTTON' || element.tagName === 'A') {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            // Magnetic pull - adjust dot position
            dot.style.transform = `translate(${centerX}px, ${centerY}px)`;
          }
        }
      });

      setIsHovering(isOverInteractive);
    };

    // Handle click to create ripple effect
    const handleClick = (e: MouseEvent) => {
      setIsClicking(true);
      // Create ripple effect
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev, newRipple]);

      // Remove ripple after animation completes
      setTimeout(() => {
        setRipples((prev) =>
          prev.filter((ripple) => ripple.id !== newRipple.id)
        );
      }, 1000);

      setTimeout(() => {
        setIsClicking(false);
      }, 150);
    };

    // Animate ring with lerp (linear interpolation)
    const animateRing = () => {
      // Lerp factor (0.2 means the ring will move 20% of the distance to the target each frame)
      const lerpFactor = 0.15;

      // Calculate new position with lerp
      ringX += (mouseX - ringX) * lerpFactor;
      ringY += (mouseY - ringY) * lerpFactor;

      // Update ring position
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;

      // Check for interactive elements
      handleElementHover();

      requestId = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    requestId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <div ref={containerRef} className="cursor-effect-container">
      {/* Inner dot - follows cursor exactly */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-50 transition-transform duration-75 ${
          isClicking ? 'scale-150' : 'scale-100'
        } ${isHovering ? 'opacity-0' : 'opacity-100'}`}
        style={{
          backgroundColor: darkMode ? 'white' : '#007AFF',
          transform: 'translate(-50px, -50px)',
          marginLeft: '-4px',
          marginTop: '-4px',
          transition: 'opacity 0.2s, transform 0.1s',
        }}
      />

      {/* Outer ring - follows with lerp */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-50 transition-all duration-200 ${
          isHovering ? 'w-10 h-10 opacity-70' : 'w-8 h-8 opacity-40'
        }`}
        style={{
          border: `1.5px solid ${darkMode ? 'white' : '#007AFF'}`,
          borderRadius: '50%',
          transform: 'translate(-50px, -50px)',
          marginLeft: '-15px',
          marginTop: '-15px',
        }}
      />

      {/* Ripple effects on click */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none z-40 rounded-full opacity-70 animate-ripple"
          style={{
            width: '10px',
            height: '10px',
            border: `1.5px solid ${darkMode ? 'white' : '#007AFF'}`,
            left: ripple.x,
            top: ripple.y,
            marginLeft: '-5px',
            marginTop: '-5px',
            animation: 'ripple 1s cubic-bezier(0.2, 0.7, 0.4, 1) forwards',
          }}
        />
      ))}

      {/* Ripple animation keyframes */}
      <style jsx global>{`
        @keyframes ripple {
          0% {
            transform: scale(0.2);
            opacity: 0.8;
          }
          100% {
            transform: scale(15);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
