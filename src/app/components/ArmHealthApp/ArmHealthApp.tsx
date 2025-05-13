"use client";
import React, { useState, useRef, useEffect } from 'react';
import { muscleData } from '../../data/muscleData';
import { massageGuides } from '../../data/massageGuides';
import HomeScreen from './HomeScreen';
import ScanScreen from './ScanScreen';
import ResultScreen from './ResultScreen';
import ExerciseScreen from './ExerciseScreen';
import TabNavigation from './TabNavigation';
import './animation.css';

const ArmHealthApp = () => {
  // 상태 관리
  const [currentScreen, setCurrentScreen] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [activeMuscle, setActiveMuscle] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [scanComplete, setScanComplete] = useState(false);
  const [activeTab, setActiveTab] = useState('left');
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [showAlarm, setShowAlarm] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 타이머 관련 함수
  const toggleTimer = () => {
    setTimerActive(!timerActive);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // 화면 전환 함수
  const navigateTo = (screen: string, param: string | null = null) => {
    setCurrentScreen(screen);
    if (param && screen === 'exercise') {
      setSelectedExercise(param);
    }
  };

  // 부하 상태 관련 함수
  const getLoadColor = (load: number): string => {
    if (load >= 80) return 'text-red-500';
    if (load >= 60) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getLoadText = (load: number): string => {
    if (load >= 80) return '매우 높음';
    if (load >= 60) return '높음';
    if (load >= 40) return '보통';
    return '양호';
  };

  // 이벤트 핸들러
  const handleMuscleClick = (key: string) => {
    setActiveMuscle(key);
    setShowTooltip(true);
  };

  const handleSectionToggle = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleNextStep = () => {
    if (selectedExercise && currentStep < massageGuides[selectedExercise].steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 타이머 효과
  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timerActive]);

  // 탭 네비게이션 렌더링
  const renderTabNavigation = () => (
    <TabNavigation
      currentScreen={currentScreen}
      navigateTo={navigateTo}
    />
  );

  // 컨텐츠 렌더링
  const renderContent = () => {
    switch(currentScreen) {
      case 'scan':
        return (
          <ScanScreen
            scanComplete={scanComplete}
            setScanComplete={setScanComplete}
            loading={loading}
            setLoading={setLoading}
            navigateTo={navigateTo}
          />
        );
      case 'result':
        return (
          <ResultScreen
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            activeMuscle={activeMuscle}
            setActiveMuscle={setActiveMuscle}
            expandedSection={expandedSection}
            setExpandedSection={setExpandedSection}
            muscleData={muscleData}
            getLoadColor={getLoadColor}
            getLoadText={getLoadText}
            navigateTo={navigateTo}
            handleSectionToggle={handleSectionToggle}
            handleMuscleClick={handleMuscleClick}
            renderTabNavigation={renderTabNavigation}
          />
        );
      case 'exercise':
        return (
          <ExerciseScreen
            selectedExercise={selectedExercise}
            setSelectedExercise={setSelectedExercise}
            massageGuides={massageGuides}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            timerActive={timerActive}
            setTimerActive={setTimerActive}
            timerSeconds={timerSeconds}
            setTimerSeconds={setTimerSeconds}
            showAlarm={showAlarm}
            setShowAlarm={setShowAlarm}
            navigateTo={navigateTo}
            toggleTimer={toggleTimer}
            formatTime={formatTime}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
            renderTabNavigation={renderTabNavigation}
          />
        );
      default:
        return (
          <HomeScreen
            showTooltip={showTooltip}
            setShowTooltip={setShowTooltip}
            showNotification={showNotification}
            setShowNotification={setShowNotification}
            muscleData={muscleData}
            activeMuscle={activeMuscle}
            setActiveMuscle={setActiveMuscle}
            getLoadColor={getLoadColor}
            getLoadText={getLoadText}
            navigateTo={navigateTo}
            handleMuscleClick={handleMuscleClick}
            renderTabNavigation={renderTabNavigation}
          />
        );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 text-gray-800 overflow-hidden relative" ref={containerRef}>
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {renderContent()}
    </div>
  );
};

export default ArmHealthApp; 