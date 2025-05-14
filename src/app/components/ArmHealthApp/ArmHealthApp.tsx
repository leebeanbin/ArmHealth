"use client";
import React, {useRef, useState} from 'react';
import HomeScreen from './HomeScreen';
import ScanScreen from './ScanScreen';
import ResultScreen from './ResultScreen';
import ExerciseScreen from './ExerciseScreen';
import './animation.css';

const ArmHealthApp = () => {
  // 상태 관리
  const [currentScreen, /* setter 현재 사용되지 않음 */] = useState('home');
  const [loading, /* setter 현재 사용되지 않음 */] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // 컨텐츠 렌더링
  const renderContent = () => {
    switch (currentScreen) {
      case 'scan':
        return <ScanScreen/>;
      case 'result':
        return <ResultScreen/>;
      case 'exercise':
        return <ExerciseScreen/>;
      default:
        return <HomeScreen/>;
    }
  };

  return (
      <div className="h-screen flex flex-col bg-gray-50 text-gray-800 overflow-hidden relative"
           ref={containerRef}>
        {loading && (
            <div
                className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
              <div
                  className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )}
        {renderContent()}
      </div>
  );
};

export default ArmHealthApp; 