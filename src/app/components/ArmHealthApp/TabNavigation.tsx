"use client";
import React from 'react';
import { Home, Activity, Heart, Settings } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { usePathname } from 'next/navigation';

interface TabNavigationProps {
  currentScreen?: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ currentScreen: propCurrentScreen }) => {
  const { isDarkMode, navigateTo } = useApp();
  const pathname = usePathname();
  
  // prop으로 전달받은 currentScreen이 없으면 pathname에서 추출
  const currentScreen = propCurrentScreen || pathname.split('/').pop() || 'home';

  const tabs = [
    { id: 'home', icon: Home, label: '홈' },
    { id: 'result', icon: Activity, label: '결과' },
    { id: 'exercise', icon: Heart, label: '마사지' },
    { id: 'profile', icon: Settings, label: '프로필' },
  ];

  return (
    <nav className={`fixed bottom-0 left-0 right-0 ${
      isDarkMode 
        ? 'bg-gray-900 border-gray-800' 
        : 'bg-white border-gray-100'
    } border-t backdrop-blur-lg backdrop-saturate-150`}>
      <div className="max-w-lg mx-auto px-6">
        <div className="flex justify-between items-center">
          {tabs.map((tab) => {
            const isActive = currentScreen === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => navigateTo(tab.id)}
                className="flex flex-col items-center py-3 transition-all duration-200 relative"
              >
                <div className={`p-2.5 rounded-full transition-all duration-200 ${
                  isActive 
                    ? isDarkMode 
                      ? 'bg-blue-500/20' 
                      : 'bg-blue-50'
                    : ''
                }`}>
                  <Icon 
                    className={`w-5 h-5 transition-all duration-200 ${
                      isActive 
                        ? 'text-blue-600 scale-110' 
                        : isDarkMode 
                          ? 'text-gray-500' 
                          : 'text-gray-400'
                    }`} 
                  />
                </div>
                <span className={`text-[10px] font-medium transition-all duration-200 mt-1 ${
                  isActive 
                    ? 'text-blue-600' 
                    : isDarkMode 
                      ? 'text-gray-500' 
                      : 'text-gray-400'
                }`}>
                  {tab.label}
                </span>
                {isActive && (
                  <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default TabNavigation; 