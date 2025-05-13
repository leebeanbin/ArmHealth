"use client";

import React from 'react';
import { User } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

interface HeaderProps {
  title?: string;
  rightContent?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  leftContent?: React.ReactNode;
  showProfile?: boolean;
  onProfileClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  rightContent,
  children,
  className = '',
  leftContent,
  showProfile = false,
  onProfileClick
}) => {
  const { isDarkMode } = useApp();

  return (
    <header className={`${isDarkMode ? 'bg-gradient-to-br from-blue-600 to-blue-700' : 'bg-gradient-to-br from-blue-500 to-blue-600'} pt-12 pb-14 ${className}`}>
      <div className="max-w-lg mx-auto px-5">
        {(showProfile || leftContent || title) && (
          <div className="flex items-center justify-between mb-8">
            {showProfile ? (
              <div className="flex items-center gap-3">
                <button 
                  onClick={onProfileClick}
                  className={`w-11 h-11 rounded-2xl ${isDarkMode ? 'bg-white/10' : 'bg-white/20'} backdrop-blur-sm flex items-center justify-center
                  hover:bg-white/30 transition-all duration-200 active:scale-95`}
                >
                  <User className="w-5 h-5 text-white" />
                </button>
                <div>
                  <h1 className="text-lg font-semibold text-white">{title}</h1>
                  <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-white/80'}`}>오늘의 상태를 확인하세요</p>
                </div>
              </div>
            ) : leftContent ? (
              leftContent
            ) : (
              <h2 className="text-lg font-semibold text-white">{title}</h2>
            )}
            {rightContent}
          </div>
        )}
        {children}
      </div>
    </header>
  );
};

export default Header; 