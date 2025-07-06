'use client';

import React, { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Timeline } from '@/components/Timeline';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Footer } from '@/components/Footer';
import { CursorEffect } from '@/components/cursor/CursorEffect';
import { ScrollProgressIndicator } from '@/components/ui/ScrollProgressIndicator';

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Check user preference
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    setDarkMode(prefersDark);

    // Add cursor blob class to body
    document.body.classList.add('cursor-effect-active');

    // Handle magnetic effect for buttons
    const handleMagneticElements = () => {
      document.querySelectorAll('[data-magnetic]').forEach((element) => {
        element.addEventListener('mousemove', (e: any) => {
          const rect = element.getBoundingClientRect();
          const relX = e.clientX - rect.left - rect.width / 2;
          const relY = e.clientY - rect.top - rect.height / 2;
          const strength = 10; // Adjust the magnetic pull strength
          (element as HTMLElement).style.transform = `translate(${
            relX / strength
          }px, ${relY / strength}px) scale(1.05)`;
        });
        element.addEventListener('mouseleave', () => {
          (element as HTMLElement).style.transform = 'translate(0, 0) scale(1)';
        });
      });
    };

    // Handle scroll progress
    const handleScroll = () => {
      const windowHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = Math.min(scrolled / windowHeight, 1);
      setScrollProgress(progress);
    };

    handleMagneticElements();
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.body.classList.remove('cursor-effect-active');
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <CursorEffect darkMode={darkMode} />
      <ScrollProgressIndicator progress={scrollProgress} darkMode={darkMode} />
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="w-full">
        <Hero darkMode={darkMode} />
        <Timeline darkMode={darkMode} />
        <Skills darkMode={darkMode} />
        <Projects darkMode={darkMode} />
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
}
