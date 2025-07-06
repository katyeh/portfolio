'use client';

import React, { useState } from 'react';
import {
  AtomIcon,
  CodeIcon,
  ServerIcon,
  DatabaseIcon,
  GitBranchIcon,
  CloudIcon,
  BoxIcon,
  TerminalIcon,
  FileCodeIcon,
  SquareCodeIcon,
  GlobeIcon,
  LayoutIcon,
} from 'lucide-react';

interface SkillIconProps {
  name: string;
  icon: string;
  darkMode: boolean;
  delay: number;
}

export function SkillIcon({ name, icon, darkMode, delay }: SkillIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = () => {
    switch (icon) {
      case 'react':
        return <AtomIcon size={24} />;
      case 'redux':
        return <BoxIcon size={24} />;
      case 'javascript':
        return <FileCodeIcon size={24} />;
      case 'typescript':
        return <SquareCodeIcon size={24} />;
      case 'nodejs':
        return <ServerIcon size={24} />;
      case 'python':
        return <TerminalIcon size={24} />;
      case 'postgresql':
        return <DatabaseIcon size={24} />;
      case 'aws':
        return <CloudIcon size={24} />;
      case 'docker':
        return <BoxIcon size={24} />;
      case 'git':
        return <GitBranchIcon size={24} />;
      case 'cicd':
        return <ServerIcon size={24} />;
      case 'html':
        return <GlobeIcon size={24} />;
      default:
        return <CodeIcon size={24} />;
    }
  };

  const primaryColor = darkMode ? '#3EB489' : '#007AFF';
  const secondaryColor = darkMode ? '#E6E6FA' : '#3EB489';

  // Alternate accent colors based on position
  const accentColor =
    icon === 'react' ||
    icon === 'javascript' ||
    icon === 'nodejs' ||
    icon === 'aws' ||
    icon === 'git' ||
    icon === 'html'
      ? primaryColor
      : secondaryColor;

  return (
    <div
      className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-300 transform ${
        isHovered ? 'scale-110 shadow-lg' : ''
      } ${
        darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${delay}s`,
        animation: 'fadeInUp 0.5s ease-out forwards',
        opacity: 0,
        transform: 'translateY(20px)',
      }}
    >
      <div
        className={`flex items-center justify-center w-12 h-12 mb-3 rounded-full transition-all duration-300 ${
          isHovered
            ? `text-white`
            : `text-${darkMode ? 'gray-300' : 'gray-600'}`
        }`}
        style={{
          backgroundColor: isHovered
            ? accentColor
            : darkMode
            ? 'rgba(255,255,255,0.05)'
            : 'rgba(0,0,0,0.05)',
        }}
      >
        {getIcon()}
      </div>
      <span
        className={`text-sm font-medium ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}
      >
        {name}
      </span>
    </div>
  );
}
