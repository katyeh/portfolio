'use client';

import React, { useEffect, useRef } from 'react';
import { UserIcon, BriefcaseIcon, HeartIcon, CodeIcon } from 'lucide-react';

interface AboutProps {
  darkMode: boolean;
}

export function About({ darkMode }: AboutProps) {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');

          // Animate paragraphs sequentially
          const paragraphs = entry.target.querySelectorAll('.about-paragraph');
          paragraphs.forEach((paragraph, index) => {
            setTimeout(() => {
              paragraph.classList.add('opacity-100');
              paragraph.classList.remove('opacity-0', 'translate-y-4');
            }, 200 * index);
          });
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about"
      className="section-container w-full py-20 md:py-28 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-pastel-sky opacity-10 pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <div
          ref={aboutRef}
          className="opacity-0 translate-y-10 transition-all duration-1000 ease-out"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
            About Me
          </h2>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="about-paragraph opacity-0 translate-y-4 transition-all duration-500 ease-out flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      darkMode ? 'bg-gray-800' : 'bg-gray-100'
                    }`}
                  >
                    <UserIcon
                      size={18}
                      className={darkMode ? 'text-pastel-mint' : 'text-accent'}
                    />
                  </div>
                </div>
                <p className="text-lg leading-relaxed text-[#5A5F6A] dark:text-gray-300">
                  Hi! I'm a software engineer based in Seattle with a background
                  in business and marketing — a blend that shapes how I approach
                  building products: with intention, empathy, and a strong focus
                  on the user.
                </p>
              </div>

              <div className="about-paragraph opacity-0 translate-y-4 transition-all duration-500 ease-out flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      darkMode ? 'bg-gray-800' : 'bg-gray-100'
                    }`}
                  >
                    <BriefcaseIcon
                      size={18}
                      className={darkMode ? 'text-pastel-mint' : 'text-accent'}
                    />
                  </div>
                </div>
                <p className="text-lg leading-relaxed text-[#5A5F6A] dark:text-gray-300">
                  I first discovered my interest in coding while working in
                  sales. I found myself increasingly curious about the tools we
                  were using and started learning to code in my free time. That
                  curiosity quickly turned into a full career pivot.
                </p>
              </div>

              <div className="about-paragraph opacity-0 translate-y-4 transition-all duration-500 ease-out flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      darkMode ? 'bg-gray-800' : 'bg-gray-100'
                    }`}
                  >
                    <CodeIcon
                      size={18}
                      className={darkMode ? 'text-pastel-mint' : 'text-accent'}
                    />
                  </div>
                </div>
                <p className="text-lg leading-relaxed text-[#5A5F6A] dark:text-gray-300">
                  I started my engineering journey on the Growth team at
                  DroneDeploy, building features that support user onboarding,
                  engagement, and retention. In 2023, I joined the Walkthroughs
                  team to support the integration of StructureSite after the
                  acquisition, contributing to in-app unification work like
                  overlay alignment and sidebar redesign. Now back on Growth, I
                  bring a broader product perspective — combining my experience
                  across teams with a mindset rooted in problem-solving and
                  thoughtful UX.
                </p>
              </div>

              <div className="about-paragraph opacity-0 translate-y-4 transition-all duration-500 ease-out flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      darkMode ? 'bg-gray-800' : 'bg-gray-100'
                    }`}
                  >
                    <HeartIcon
                      size={18}
                      className={darkMode ? 'text-pastel-mint' : 'text-accent'}
                    />
                  </div>
                </div>
                <p className="text-lg leading-relaxed text-[#5A5F6A] dark:text-gray-300">
                  As a first-generation Asian-American woman in tech, I care
                  deeply about representation, lifelong learning, and building
                  work that feels as intentional as it is impactful. I’m always
                  seeking ways to grow — as an engineer, as a teammate, and as a
                  creative thinker.
                </p>
              </div>
            </div>

            {/* Visual divider */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    darkMode ? 'bg-pastel-mint' : 'bg-accent'
                  }`}
                ></div>
                <div
                  className={`w-12 h-0.5 ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}
                ></div>
                <div
                  className={`w-3 h-3 rounded-full ${
                    darkMode ? 'bg-pastel-sky' : 'bg-accent opacity-70'
                  }`}
                ></div>
                <div
                  className={`w-12 h-0.5 ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}
                ></div>
                <div
                  className={`w-2 h-2 rounded-full ${
                    darkMode ? 'bg-pastel-mint' : 'bg-accent'
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
