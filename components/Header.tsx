'use client';

import React from 'react';
import { SunIcon, MoonIcon } from 'lucide-react';
import { AnimatedUnderline } from './ui/AnimatedUnderline';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export function Header({ darkMode, setDarkMode }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-opacity-70 transition-colors duration-300"
      style={{
        backgroundColor: darkMode
          ? 'rgba(18, 18, 18, 0.8)'
          : 'rgba(255, 255, 255, 0.8)',
      }}
    >
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        <div className="font-medium text-lg tracking-tight">
          <a
            href="#"
            className={`hover:text-accent transition-colors duration-200 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            kathleenyeh
          </a>
        </div>
        <nav>
          <ul className="flex items-center space-x-6">
            <li>
              <AnimatedUnderline
                href="#journey"
                label="Journey"
                darkMode={darkMode}
              />
            </li>
            <li>
              <AnimatedUnderline
                href="#skills"
                label="Skills"
                darkMode={darkMode}
              />
            </li>
            <li>
              <AnimatedUnderline
                href="#projects"
                label="Projects"
                darkMode={darkMode}
              />
            </li>
            <li>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  darkMode
                    ? 'text-gray-300 hover:bg-gray-800'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
                aria-label={
                  darkMode ? 'Switch to light mode' : 'Switch to dark mode'
                }
              >
                {darkMode ? <SunIcon size={18} /> : <MoonIcon size={18} />}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
