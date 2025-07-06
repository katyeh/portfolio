'use client';

import React, { useEffect, useState, useRef } from 'react';

interface TimelineProps {
  darkMode: boolean;
}

interface JourneyMilestone {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
}

export function Timeline({ darkMode }: TimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const beeRef = useRef<HTMLDivElement>(null);
  const [activeMilestone, setActiveMilestone] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentBeePosition, setCurrentBeePosition] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const currentBeePositionRef = useRef(0);

  // Check for reduced motion preference
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = () => {
      setPrefersReducedMotion(motionQuery.matches);
    };
    motionQuery.addEventListener('change', handleMotionChange);

    return () => motionQuery.removeEventListener('change', handleMotionChange);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');

          // Initialize bee as hidden when timeline becomes visible
          if (beeRef.current) {
            beeRef.current.style.opacity = '0';
            currentBeePositionRef.current = 0;
          }
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, [prefersReducedMotion]);

  // Calculate rotation angle for bee based on path direction
  const getRotationAngle = (path: SVGPathElement, distance: number) => {
    const point1 = path.getPointAtLength(Math.max(0, distance - 1));
    const point2 = path.getPointAtLength(
      Math.min(path.getTotalLength(), distance + 1)
    );
    return (
      (Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180) / Math.PI
    );
  };

  // Animate bee along the curved path to specific milestone
  const animateBeeToMilestone = (milestoneIndex: number) => {
    if (!pathRef.current || !beeRef.current || prefersReducedMotion) return;

    const path = pathRef.current;
    const bee = beeRef.current;
    const pathLength = path.getTotalLength();

    // Calculate target position along path for this milestone (0 to 1)
    let targetProgress = milestoneIndex / (journeyMilestones.length - 1);

    // Adjust positions to keep bee visible in front of post-it notes
    if (milestoneIndex === 0) {
      targetProgress = targetProgress + 0.05; // Move a bit forward from start
    } else if (milestoneIndex === 2) {
      targetProgress = targetProgress - 0.08; // Stop a bit earlier
    }

    const targetDistance = targetProgress * pathLength;

    // Cancel any ongoing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // Get starting position (use ref for immediate access, not state which might be stale)
    const startDistance = currentBeePositionRef.current;

    // If we're already at the target, don't animate
    if (Math.abs(targetDistance - startDistance) < 5) {
      setCurrentBeePosition(targetDistance);
      return;
    }

    // Show bee and animate along path
    bee.style.opacity = '1';
    bee.style.transition = 'none'; // Remove CSS transition for smooth animation

    // Animate along path using requestAnimationFrame
    let start: number | null = null;
    const duration = Math.max(
      Math.abs(targetDistance - startDistance) * 3,
      600
    ); // Dynamic duration based on distance, minimum 600ms

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);

      // Calculate current position along path (interpolate between start and target)
      const currentDistance =
        startDistance + (targetDistance - startDistance) * progress;

      // Ensure we stay within path bounds
      const boundedDistance = Math.max(
        0,
        Math.min(pathLength, currentDistance)
      );
      const point = path.getPointAtLength(boundedDistance);

      // Update bee position and rotation
      bee.style.transform = `translate(${point.x}px, ${
        point.y
      }px) rotate(${getRotationAngle(path, boundedDistance)}deg)`;

      // Update current position during animation for smooth transitions
      currentBeePositionRef.current = boundedDistance;
      setCurrentBeePosition(boundedDistance);

      // Continue animation until we reach the target
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete
        animationFrameRef.current = null;
        currentBeePositionRef.current = targetDistance;
        setCurrentBeePosition(targetDistance);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // Hide bee when no milestone is hovered
  const hideBee = () => {
    if (!beeRef.current || prefersReducedMotion) return;

    // Cancel any ongoing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    const bee = beeRef.current;
    bee.style.opacity = '0';
    bee.style.transition = 'opacity 0.3s ease';

    // Reset bee position for next animation
    currentBeePositionRef.current = 0;
    setCurrentBeePosition(0);
  };

  // Handle post-it note hover
  const handleNoteHover = (
    e: React.MouseEvent<HTMLDivElement>,
    entering: boolean
  ) => {
    if (prefersReducedMotion) return;

    const note = e.currentTarget;
    const milestoneId = note.getAttribute('data-milestone-id');
    const index = journeyMilestones.findIndex((m) => m.id === milestoneId);
    const baseStagger = [0, 120, 30, 80][index] || 0;

    const randomTilt = entering ? Math.random() * 6 - 3 : 0;
    const shadow = entering
      ? '0 6px 12px rgba(0, 0, 0, 0.1)'
      : '0 2px 4px rgba(0, 0, 0, 0.1)';
    const lift = entering ? baseStagger - 4 : baseStagger;

    note.style.transform = `translateY(${lift}px) rotate(${randomTilt}deg)`;
    note.style.boxShadow = shadow;
    note.style.zIndex = entering ? '10' : '1';

    // Animate bee to this milestone or hide it
    if (entering && index !== -1) {
      setActiveMilestone(journeyMilestones[index].id);
      animateBeeToMilestone(index);
    } else {
      setActiveMilestone(null);
      // Don't immediately hide bee - let it stay visible for smooth transitions
    }
  };

  // Journey milestones data
  const journeyMilestones: JourneyMilestone[] = [
    {
      id: 'university',
      year: '2015 – 2019',
      title: 'BA in Business Management & Marketing',
      subtitle: 'University of Washington',
      description:
        'Graduated with a BA in Business Management & Marketing, where I honed product sense and strategic thinking before pivoting into tech.',
    },
    {
      id: 'sales',
      year: '2019 - 2020',
      title: 'Account Executive',
      subtitle: 'ADP',
      description:
        'Gained a user-focused perspective and strong business acumen while discovering my passion for technology solutions.',
    },
    {
      id: 'bootcamp',
      year: '2020 - 2021',
      title: 'Full-Stack Engineering Fellow',
      subtitle: 'App Academy',
      description:
        'Completed a 1,000-hour intensive bootcamp, building full-stack projects with JavaScript, React, and Python.',
    },
    {
      id: 'engineer',
      year: '2021 – Present',
      title: 'Software Engineer',
      subtitle: 'DroneDeploy (Growth Team)',
      description:
        'Intern to full-time engineer on the Growth team focused on activation and expansion. In 2023, I joined the Walkthroughs team to support post-acquisition unification. Now back on Growth, I bring a product-led, user-focused approach to building scalable UI.',
    },
  ];

  // Color tokens
  const colors = {
    cobalt: darkMode ? '#5A8FFF' : '#007AFF',
    mint: darkMode ? '#3EB489' : '#3EB489',
    beeYellow: '#FFD700',
    beeOrange: '#FFA500',
    postItColors: [
      'rgba(255, 242, 204, 0.95)',
      'rgba(217, 234, 211, 0.95)',
      'rgba(208, 224, 227, 0.95)',
      'rgba(234, 209, 220, 0.95)', // Pastel Pink
    ],
    text: '#5A5F6A',
    textDark: darkMode ? '#FFFFFF' : '#333333',
    background: darkMode ? '#1A1A1A' : '#FFFFFF',
    badge: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
  };

  return (
    <section
      id="journey"
      className="section-container w-full py-24 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div
          ref={timelineRef}
          className="opacity-0 translate-y-10 transition-all duration-1000 ease-out"
        >
          <h2
            className="text-3xl md:text-4xl font-semibold mb-16 text-center"
            style={{
              color: darkMode ? '#FFFFFF' : '#1A1A1A',
            }}
          >
            My Journey
          </h2>

          {/* Journey Timeline Container */}
          <div
            className="relative max-w-[1200px] mx-auto"
            onMouseLeave={() => {
              setActiveMilestone(null);
              hideBee();
            }}
          >
            {/* SVG for bee flight path - UPDATED coordinates */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 1200 400"
                preserveAspectRatio="none"
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  overflow: 'visible',
                }}
              >
                {/* Updated curved path connecting to each staggered milestone */}
                <path
                  ref={pathRef}
                  d="M120,20 C200,20 220,50 300,140 C380,230 420,90 600,50 C780,10 820,70 900,100 C980,130 1020,110 1080,100 C1120,90 1140,80 1180,70"
                  fill="none"
                  stroke={colors.cobalt}
                  strokeWidth="2"
                  strokeDasharray="5 8"
                  strokeLinecap="round"
                  className={`${prefersReducedMotion ? '' : 'path-animation'}`}
                  style={{
                    strokeDasharray: '5 8',
                    strokeDashoffset: prefersReducedMotion ? '0' : '2000',
                    animation: prefersReducedMotion
                      ? 'none'
                      : 'dash 2s ease-out forwards',
                  }}
                />
              </svg>

              {/* Animated Bee - MOVED outside SVG */}
              <div
                ref={beeRef}
                className="absolute bee"
                style={{
                  width: '30px',
                  height: '30px',
                  transformOrigin: 'center',
                  transition: 'opacity 0.3s ease',
                  willChange: 'transform',
                  position: 'absolute',
                  left: '0',
                  top: '0',
                  zIndex: 5,
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
                  {/* Fat bee body */}
                  <ellipse
                    cx="16"
                    cy="16"
                    rx="8"
                    ry="6"
                    fill={colors.beeYellow}
                    stroke="#000000"
                    strokeWidth="0.5"
                  />

                  {/* Black stripes */}
                  <path
                    d="M8,13 Q16,11 24,13 Q16,15 8,13 Z"
                    fill="#000000"
                    opacity="0.8"
                  />
                  <path
                    d="M8,16 Q16,14 24,16 Q16,18 8,16 Z"
                    fill="#000000"
                    opacity="0.8"
                  />
                  <path
                    d="M8,19 Q16,17 24,19 Q16,21 8,19 Z"
                    fill="#000000"
                    opacity="0.8"
                  />

                  {/* Wings */}
                  <ellipse
                    cx="11"
                    cy="10"
                    rx="4"
                    ry="6"
                    fill="rgba(255,255,255,0.7)"
                    stroke="#000000"
                    strokeWidth="0.5"
                    transform="rotate(-20 11 10)"
                  />
                  <ellipse
                    cx="21"
                    cy="10"
                    rx="4"
                    ry="6"
                    fill="rgba(255,255,255,0.7)"
                    stroke="#000000"
                    strokeWidth="0.5"
                    transform="rotate(20 21 10)"
                  />

                  {/* Antennae */}
                  <path
                    d="M13,8 Q12,5 10,4 M19,8 Q20,5 22,4"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <circle cx="10" cy="4" r="1" fill="#000000" />
                  <circle cx="22" cy="4" r="1" fill="#000000" />

                  {/* Eyes */}
                  <circle cx="12" cy="13" r="1.5" fill="#000000" />
                  <circle cx="20" cy="13" r="1.5" fill="#000000" />
                  <circle cx="12.5" cy="12.5" r="0.5" fill="#FFFFFF" />
                  <circle cx="20.5" cy="12.5" r="0.5" fill="#FFFFFF" />

                  {/* Stinger */}
                  <path d="M16,22 L16,25 L15,24 L17,24 Z" fill="#000000" />
                </svg>
              </div>
            </div>

            {/* Post-it Notes Container - UPDATED positioning */}
            <div className="relative flex justify-between gap-2 md:gap-4 z-10 pt-16 pb-8 overflow-x-auto">
              {journeyMilestones.map((milestone, index) => (
                <div
                  key={milestone.id}
                  id={`milestone-${milestone.id}`}
                  className={`relative transition-all duration-300 ease-out p-4 md:p-6 rounded-lg milestone-card flex-shrink-0 w-[240px] md:w-[260px] ${
                    activeMilestone === milestone.id ? 'active-milestone' : ''
                  }`}
                  style={{
                    backgroundColor:
                      colors.postItColors[index % colors.postItColors.length],
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    transform: `translateY(${[0, 120, 30, 80][index] || 0}px)`,
                    zIndex: 1,
                  }}
                  onMouseEnter={(e) => handleNoteHover(e, true)}
                  onMouseLeave={(e) => handleNoteHover(e, false)}
                  data-milestone-id={milestone.id}
                >
                  {/* Year Badge - Updated styling */}
                  <div
                    className="inline-block px-3 py-1.5 rounded-full text-xs font-medium mb-4"
                    style={{
                      backgroundColor: colors.badge,
                      color: colors.cobalt,
                    }}
                  >
                    {milestone.year}
                  </div>

                  {/* Title - Updated font size and weight */}
                  <h3
                    className="text-xl font-bold mb-2 leading-tight"
                    style={{
                      color: colors.textDark,
                    }}
                  >
                    {milestone.title}
                  </h3>

                  {/* Subtitle - Updated styling */}
                  <p
                    className="text-sm font-medium mb-3"
                    style={{
                      color: colors.cobalt,
                    }}
                  >
                    {milestone.subtitle}
                  </p>

                  {/* Description - Updated styling */}
                  <p
                    className="text-base leading-relaxed"
                    style={{
                      color: colors.text,
                    }}
                  >
                    {milestone.description}
                  </p>

                  {/* Bee landing spot - keeping existing implementation */}
                  <div
                    className="absolute -top-3 -right-3 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: 'white',
                      border: `2px solid ${colors.mint}`,
                      opacity: activeMilestone === milestone.id ? 1 : 0.6,
                      transform:
                        activeMilestone === milestone.id
                          ? 'scale(1.2)'
                          : 'scale(1)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <span
                      className="block w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: colors.mint,
                      }}
                    ></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accessibility note - keeping existing implementation */}
          <div className="mt-16 text-center text-sm opacity-60">
            <p>
              Hover over each milestone to interact •{' '}
              {prefersReducedMotion
                ? 'Animations reduced per your system preferences'
                : 'Watch the bee fly!'}
            </p>
          </div>
        </div>
      </div>

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
      `}</style>
    </section>
  );
}
