'use client';

import React from 'react';
import { LinkedinIcon, GithubIcon, MailIcon } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

export function Footer({ darkMode }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`w-full py-12 ${
        darkMode ? 'bg-gray-900' : 'bg-white'
      } border-t ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-6">
            <a
              href="https://linkedin.com/in/katyeh"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:text-accent transition-colors duration-200 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
              aria-label="LinkedIn"
            >
              <LinkedinIcon
                size={20}
                strokeWidth={1.5}
                className="hover:scale-110 transition-transform duration-200"
              />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:text-accent transition-colors duration-200 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
              aria-label="GitHub"
            >
              <GithubIcon
                size={20}
                strokeWidth={1.5}
                className="hover:scale-110 transition-transform duration-200"
              />
            </a>
            <a
              href="mailto:kathleenyeh1@gmail.com"
              className={`hover:text-accent transition-colors duration-200 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
              aria-label="Email"
            >
              <MailIcon
                size={20}
                strokeWidth={1.5}
                className="hover:scale-110 transition-transform duration-200"
              />
            </a>
          </div>
          <p className={`${darkMode ? 'text-gray-400' : 'text-[#5A5F6A]'}`}>
            Built with ❤️ by Kathleen Yeh
          </p>
        </div>
      </div>
    </footer>
  );
}
