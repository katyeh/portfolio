import React from 'react';

interface AnimatedUnderlineProps {
  href: string;
  label: string;
  darkMode: boolean;
}

export function AnimatedUnderline({
  href,
  label,
  darkMode,
}: AnimatedUnderlineProps) {
  return (
    <a
      href={href}
      className={`text-sm relative overflow-hidden group ${
        darkMode
          ? 'text-gray-300 hover:text-white'
          : 'text-gray-600 hover:text-accent'
      }`}
    >
      {label}
      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 group-hover:w-full transition-all duration-300 transform group-hover:-translate-x-1/2 rounded-full bg-accent"></span>
    </a>
  );
}
