'use client';

import React, { useEffect, useState, useRef } from 'react';
import { LinkedinIcon, GithubIcon, ChevronDownIcon } from 'lucide-react';
import { LineDrawIcon } from './ui/LineDrawIcon';
import Image from 'next/image';

interface HeroProps {
  darkMode: boolean;
}

export function Hero({ darkMode }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const helloRef = useRef<SVGSVGElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = () => {
      setPrefersReducedMotion(motionQuery.matches);
    };
    motionQuery.addEventListener('change', handleMotionChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');

          // Start text animations when in view
          if (!prefersReducedMotion) {
            // Animate HELLO text fill
            if (helloRef.current) {
              const letters =
                helloRef.current.querySelectorAll('.hello-letter');
              letters.forEach((letter, index) => {
                // Skip animation for the O (index 4) to preserve gradient
                if (index !== 4) {
                  letter.classList.add('animate-stroke-fill');
                  (letter as HTMLElement).style.animationDelay = `${
                    index * 0.3
                  }s`;
                }
              });
            }

            // Animate name text
            if (nameRef.current) {
              setTimeout(() => {
                nameRef.current?.classList.add('animate-fade-scale-in');
              }, 2000); // Increased delay to wait for HELLO animation
            }

            // Animate bio lines
            if (bioRef.current) {
              const lines = bioRef.current.querySelectorAll('.bio-line');
              lines.forEach((line, index) => {
                setTimeout(() => {
                  line.classList.add('animate-slide-in');
                }, 2200 + index * 200);
              });
            }
          } else {
            // For reduced motion, just show everything immediately
            if (helloRef.current) {
              const letters =
                helloRef.current.querySelectorAll('.hello-letter');
              letters.forEach((letter, i) => {
                const paths = letter.querySelectorAll('path');
                paths.forEach((path) => {
                  // Apply same color to all letters except O (index 4)
                  if (i !== 4) {
                    (path as SVGPathElement).style.fill = letterColor;
                  }
                  // O keeps its gradient from SVG fill attribute
                });
              });
            }
            if (nameRef.current) {
              nameRef.current.style.opacity = '1';
            }
            if (bioRef.current) {
              const lines = bioRef.current.querySelectorAll('.bio-line');
              lines.forEach((line) => {
                line.classList.add('opacity-100');
              });
            }
          }
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, [darkMode, prefersReducedMotion]);

  const handleImageClick = () => {
    const now = Date.now();
    if (now - lastClickTime < 300) {
      // Double click detected
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 5000);
    }
    setLastClickTime(now);
  };

  const handleImageHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Apply tilt effect
    card.style.transform = `
      perspective(1000px) 
      rotateY(${x * 8}deg) 
      rotateX(${-y * 8}deg) 
      scale3d(1.05, 1.05, 1.05)
    `;
  };

  const handleImageLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    e.currentTarget.style.transform =
      'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
  };

  // Color for H, E, L, L letters (O has its own gradient)
  const letterColor = darkMode ? '#E6E6FA' : '#E6E6FA';

  return (
    <section
      className="section-container w-full py-20 md:py-28 lg:py-32 relative overflow-hidden"
      id="home"
    >
      {/* Animated background blob */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div
          className={`blob-container ${
            prefersReducedMotion ? '' : 'animate-drift'
          }`}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '0',
            left: '0',
            zIndex: 0,
          }}
        >
          <svg
            viewBox="0 0 800 500"
            preserveAspectRatio="none"
            className="w-full h-full"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: 0.3,
            }}
          >
            <path
              d="M435.7,145.1C481.1,199.7,541.9,258.3,525.8,312.3C509.7,366.3,416.7,415.7,324.9,425.8C233.1,435.9,142.5,406.7,83.3,351.8C24.1,296.9,-3.6,216.4,1.9,155.4C7.4,94.4,46.1,52.8,108.2,29.2C170.4,5.5,255.9,-0.2,319.9,22.7C384,45.7,426.6,97.2,435.7,145.1Z"
              fill={
                darkMode ? 'url(#blobGradientDark)' : 'url(#blobGradientLight)'
              }
              className={`${prefersReducedMotion ? '' : 'animate-morph'}`}
            />
            <defs>
              <linearGradient
                id="blobGradientDark"
                gradientTransform="rotate(45)"
              >
                <stop offset="0%" stopColor="#C1F0C1" />
                <stop offset="50%" stopColor="#B0E0E6" />
                <stop offset="100%" stopColor="#E6E6FA" />
              </linearGradient>
              <linearGradient
                id="blobGradientLight"
                gradientTransform="rotate(45)"
              >
                <stop offset="0%" stopColor="#C1F0C1" />
                <stop offset="50%" stopColor="#B0E0E6" />
                <stop offset="100%" stopColor="#007AFF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div
          ref={heroRef}
          className="flex flex-col items-center opacity-0 translate-y-10 transition-all duration-1000 ease-out"
        >
          {/* HELLO text with SVG for outline animation */}
          <div className="w-full text-center mb-4 relative">
            <svg
              ref={helloRef}
              width="100%"
              viewBox="0 0 600 120"
              className="max-w-4xl mx-auto"
            >
              <defs>
                {/* Gradient for the O */}
                <radialGradient id="oGradient" cx="50%" cy="40%" r="80%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="30%" stopColor="#FFFFFF" />
                  <stop offset="70%" stopColor="#FFB6C1" />
                  <stop offset="100%" stopColor="#FF69B4" />
                </radialGradient>

                {/* Animated mask for painting effect - only affects fill */}
                <mask id="oPaintMask">
                  <rect width="100%" height="100%" fill="black" />
                  <circle
                    cx="320"
                    cy="60"
                    r="0"
                    fill="white"
                    className="paint-reveal"
                  />
                </mask>
              </defs>
              {/* H */}
              <g className="hello-letter">
                <path
                  d="M50,20 L50,100 M50,60 L90,60 M90,20 L90,100"
                  stroke={darkMode ? '#E6E6FA' : '#007AFF'}
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="transparent"
                  style={{
                    fill: letterColor,
                  }}
                  className="hello-path"
                />
              </g>
              {/* E */}
              <g className="hello-letter">
                <path
                  d="M120,20 L120,100 M120,20 L160,20 M120,60 L150,60 M120,100 L160,100"
                  stroke={darkMode ? '#E6E6FA' : '#007AFF'}
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="transparent"
                  style={{
                    fill: letterColor,
                  }}
                  className="hello-path"
                />
              </g>
              {/* L */}
              <g className="hello-letter">
                <path
                  d="M190,20 L190,100 M190,100 L230,100"
                  stroke={darkMode ? '#E6E6FA' : '#007AFF'}
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="transparent"
                  style={{
                    fill: letterColor,
                  }}
                  className="hello-path"
                />
              </g>
              {/* L */}
              <g className="hello-letter">
                <path
                  d="M260,20 L260,100 M260,100 L300,100"
                  stroke={darkMode ? '#E6E6FA' : '#007AFF'}
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="transparent"
                  style={{
                    fill: letterColor,
                  }}
                  className="hello-path"
                />
              </g>
              {/* O */}
              <g>
                {/* O stroke - always visible immediately */}
                <path
                  d="M360,60 C360,36.8 343.2,20 320,20 C296.8,20 280,36.8 280,60 C280,83.2 296.8,100 320,100 C343.2,100 360,83.2 360,60 Z"
                  stroke={darkMode ? '#E6E6FA' : '#007AFF'}
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="transparent"
                />
                {/* O fill - animated paint-in */}
                <path
                  d="M360,60 C360,36.8 343.2,20 320,20 C296.8,20 280,36.8 280,60 C280,83.2 296.8,100 320,100 C343.2,100 360,83.2 360,60 Z"
                  stroke="transparent"
                  fill="url(#oGradient)"
                  mask="url(#oPaintMask)"
                  className="hello-letter"
                />
              </g>
              {/* Comma */}
              <g>
                <path
                  d="M380,60 Q385,80 375,100"
                  stroke={darkMode ? '#E6E6FA' : '#007AFF'}
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="transparent"
                  style={{
                    fill: letterColor,
                  }}
                  className="hello-path"
                />
              </g>
            </svg>
          </div>

          {/* "I'm Kathleen" text with different font sizes */}
          <div
            ref={nameRef}
            className="flex flex-col items-center mb-10 opacity-0"
          >
            <span className="text-xl md:text-2xl font-medium tracking-tight mb-1">
              I'm
            </span>
            <span className="text-4xl md:text-6xl font-bold tracking-tight">
              Kathleen
            </span>
          </div>

          {/* Two column layout for bio and image */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 w-full">
            <div className="w-full md:w-1/2">
              <div ref={bioRef} className="space-y-6">
                {/* Bio line 1 with icon */}
                <div className="bio-line opacity-0 flex items-center gap-4">
                  <LineDrawIcon
                    type="code"
                    darkMode={darkMode}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                  <p
                    className="text-lg font-normal"
                    style={{ color: darkMode ? '#d1d5db' : '#000000' }}
                  >
                    Full Stack Software Engineer at DroneDeploy
                  </p>
                </div>

                {/* Bio line 2 with icon */}
                <div className="bio-line opacity-0 flex items-center gap-4">
                  <LineDrawIcon
                    type="lightbulb"
                    darkMode={darkMode}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                  <p
                    className="text-lg font-normal"
                    style={{ color: darkMode ? '#d1d5db' : '#000000' }}
                  >
                    I blend product sense from my marketing background with deep
                    technical skills
                  </p>
                </div>

                {/* Bio line 3 with icon */}
                <div className="bio-line opacity-0 flex items-center gap-4">
                  <LineDrawIcon
                    type="target"
                    darkMode={darkMode}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                  <p
                    className="text-lg font-normal"
                    style={{ color: darkMode ? '#d1d5db' : '#000000' }}
                  >
                    Passionate about building high-impact web products
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-5 mt-8 bio-line opacity-0">
                  <a
                    href="https://linkedin.com/in/katyeh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 relative overflow-hidden ${
                      darkMode
                        ? 'bg-gray-800 hover:bg-gray-700 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                    data-magnetic
                  >
                    <LinkedinIcon size={18} className="mr-2" />
                    LinkedIn
                  </a>

                  <a
                    href="https://github.com/katyeh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 relative overflow-hidden ${
                      darkMode
                        ? 'bg-gray-800 hover:bg-gray-700 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                    data-magnetic
                  >
                    <GithubIcon size={18} className="mr-2" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            {/* Image column */}
            <div className="w-full md:w-1/2">
              <div
                ref={imageRef}
                className="relative w-full aspect-[3/4] overflow-hidden rounded-lg cursor-pointer transform transition-all duration-500 ease-out"
                onClick={handleImageClick}
                onMouseMove={handleImageHover}
                onMouseLeave={handleImageLeave}
                style={{
                  borderRadius: '8px',
                  boxShadow: darkMode
                    ? '0 20px 40px rgba(0, 0, 0, 0.3)'
                    : '0 20px 40px rgba(0, 0, 0, 0.1)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <Image
                  src="/images/profile-pic.png"
                  alt="Kathleen Yeh"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Easter egg overlay */}
                {showEasterEgg && (
                  <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center p-6 animate-fadeIn">
                    <h3 className="text-white text-xl font-bold mb-4">
                      Fun Fact!
                    </h3>
                    <p className="text-white text-center mb-4">
                      I built my first website at age 12 - it was a fan site for
                      my favorite band using HTML tables and animated GIFs!
                    </p>
                    <div className="bg-gray-800 p-4 rounded-md w-full max-w-xs overflow-auto">
                      <pre className="text-green-400 text-xs">
                        <code>
                          {`// My first JavaScript code
function sayHello() {
  alert("Hello World!");
}
sayHello();`}
                        </code>
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Scroll down indicator */}
          <div
            className={`mt-16 flex justify-center ${
              prefersReducedMotion ? 'opacity-70' : 'animate-bounce-subtle'
            }`}
          >
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Scroll Down
              </span>
              <ChevronDownIcon
                size={24}
                className={`text-${darkMode ? 'gray-400' : 'gray-600'}`}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes paintReveal {
          0% {
            r: 0;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            r: 50;
            opacity: 1;
          }
        }

        .paint-reveal {
          animation: paintReveal 1.8s ease-out forwards;
          animation-delay: 1.2s; /* Start after the 4th letter begins */
        }

        @media (prefers-reduced-motion: reduce) {
          .paint-reveal {
            animation: none;
            r: 50;
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
