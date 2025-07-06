'use client';

import React, { useEffect, useRef } from 'react';

interface ProjectsProps {
  darkMode: boolean;
}

export function Projects({ darkMode }: ProjectsProps) {
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');

          // Animate project cards sequentially
          const cards = entry.target.querySelectorAll('.project-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('card-visible');
            }, 200 * index);
          });
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
    };
  }, []);

  return (
    <section id="projects" className="section-container w-full py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div
          ref={projectsRef}
          className="opacity-0 translate-y-10 transition-all duration-1000 ease-out"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-16 text-center capitalize">
            Projects
          </h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            {[1, 2].map((_, index) => (
              <div
                key={index}
                className={`project-card rounded-lg overflow-hidden ${
                  darkMode ? 'bg-gray-800 shadow-lg' : 'bg-white shadow-md'
                } transition-all duration-500 opacity-0 translate-y-8`}
              >
                <div
                  className={`h-56 ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  } flex items-center justify-center overflow-hidden relative`}
                >
                  <span className="text-lg font-medium text-gray-400 animate-float">
                    Project Image Coming Soon
                  </span>
                  {/* Project type indicator */}
                  <div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                      darkMode
                        ? 'bg-gray-900 text-gray-300'
                        : 'bg-white text-gray-700'
                    }`}
                  >
                    {index === 0 ? 'Web App' : 'API Service'}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-semibold mb-3 tracking-tight capitalize">
                    Case Study {index + 1}
                  </h3>
                  <p
                    className={`mb-6 leading-relaxed text-[#5A5F6A] dark:text-gray-300`}
                  >
                    Coming soon! A detailed breakdown of my work process,
                    challenges, and solutions.
                  </p>
                  <div className="flex gap-3">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        darkMode
                          ? 'bg-gray-700 text-gray-300 border border-gray-600'
                          : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}
                    >
                      React
                    </span>
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        darkMode
                          ? 'bg-gray-700 text-gray-300 border border-gray-600'
                          : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}
                    >
                      TypeScript
                    </span>
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        darkMode
                          ? 'bg-gray-700 text-gray-300 border border-gray-600'
                          : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}
                    >
                      Node.js
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
