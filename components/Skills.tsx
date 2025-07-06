'use client';

import React, { useEffect, useRef } from 'react';
import { SkillIcon } from './ui/SkillIcon';

interface SkillsProps {
  darkMode: boolean;
}

export function Skills({ darkMode }: SkillsProps) {
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  const skills = [
    {
      name: 'Angular',
      icon: 'angular',
    },
    {
      name: 'React',
      icon: 'react',
    },
    {
      name: 'JavaScript',
      icon: 'javascript',
    },
    {
      name: 'TypeScript',
      icon: 'typescript',
    },
    {
      name: 'Node.js',
      icon: 'nodejs',
    },
    {
      name: 'Python/Flask',
      icon: 'python',
    },
    {
      name: 'PostgreSQL',
      icon: 'postgresql',
    },
    {
      name: 'AWS',
      icon: 'aws',
    },
    {
      name: 'Docker',
      icon: 'docker',
    },
    {
      name: 'Git',
      icon: 'git',
    },
    {
      name: 'RxJS',
      icon: 'rxjs',
    },
    {
      name: 'MongoDB',
      icon: 'mongodb',
    },
  ];

  return (
    <section id="skills" className="section-container w-full py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div
          ref={skillsRef}
          className="opacity-0 translate-y-10 transition-all duration-1000 ease-out"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-16 text-center capitalize">
            Technical Skills
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {skills.map((skill, index) => (
              <SkillIcon
                key={index}
                name={skill.name}
                icon={skill.icon}
                darkMode={darkMode}
                delay={index * 0.05}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
