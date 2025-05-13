"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type MuscleData = {
  [key: string]: {
    name: string;
    nameEn: string;
    load: number;
    recommendations: string[];
    description: string;
  };
};

const initialMuscleData: MuscleData = {
  deltoid: {
    name: '삼각근',
    nameEn: 'Deltoid',
    load: 75,
    recommendations: ['스트레칭', '마사지', '운동 강도 조절'],
    description: '어깨를 감싸고 있는 삼각형 모양의 근육으로, 팔을 들어올리고 회전시키는 역할을 합니다.'
  },
  biceps: {
    name: '이두근',
    nameEn: 'Biceps',
    load: 60,
    recommendations: ['스트레칭', '마사지', '휴식'],
    description: '팔꿈치를 구부리고 팔을 들어올리는 역할을 하는 근육입니다.'
  },
  triceps: {
    name: '삼두근',
    nameEn: 'Triceps',
    load: 45,
    recommendations: ['스트레칭', '근력 운동', '마사지'],
    description: '팔꿈치를 펴는 역할을 하는 근육으로, 팔 뒷부분에 위치합니다.'
  },
  brachialis: {
    name: '상완근',
    nameEn: 'Brachialis',
    load: 30,
    recommendations: ['가벼운 운동', '스트레칭'],
    description: '이두근 아래에 위치한 근육으로, 팔꿈치를 구부리는 데 도움을 줍니다.'
  },
  flexorCarpi: {
    name: '손목 굴근',
    nameEn: 'Flexor Carpi',
    load: 85,
    recommendations: ['손목 스트레칭', '휴식', '마사지'],
    description: '손목을 구부리는 역할을 하는 근육으로, 과사용 시 통증이 발생할 수 있습니다.'
  },
  neck: {
    name: '목 근육',
    nameEn: 'Neck Muscles',
    load: 70,
    recommendations: ['목 스트레칭', '자세 교정', '마사지'],
    description: '목을 지지하고 움직이는 역할을 하는 근육군으로, 장시간 같은 자세를 유지할 때 피로가 쌓이기 쉽습니다.'
  }
};

type AppContextType = {
  loading: boolean;
  setLoading: (value: boolean) => void;
  showTooltip: boolean;
  setShowTooltip: (value: boolean) => void;
  showNotification: boolean;
  setShowNotification: (value: boolean) => void;
  activeMuscle: string | null;
  setActiveMuscle: (value: string | null) => void;
  expandedSection: string | null;
  setExpandedSection: (value: string | null) => void;
  scanComplete: boolean;
  setScanComplete: (value: boolean) => void;
  activeTab: string;
  setActiveTab: (value: string) => void;
  selectedExercise: string | null;
  setSelectedExercise: (value: string | null) => void;
  currentStep: number;
  setCurrentStep: (value: number) => void;
  timerActive: boolean;
  setTimerActive: (value: boolean) => void;
  timerSeconds: number;
  setTimerSeconds: (value: number) => void;
  showAlarm: boolean;
  setShowAlarm: (value: boolean) => void;
  navigateTo: (path: string, muscleId?: string) => void;
  getLoadColor: (load: number) => string;
  getLoadText: (load: number) => string;
  handleMuscleClick: (muscleId: string) => void;
  handleSectionToggle: (section: string) => void;
  toggleTimer: () => void;
  formatTime: (seconds: number) => string;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  muscleData: MuscleData;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
  // 상태 관리
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [muscleData] = useState(initialMuscleData);

  // 함수들
  const handleMuscleClick = (muscleId: string) => {
    setActiveMuscle(muscleId);
  };

  const navigateTo = (path: string, muscleId?: string) => {
    if (path === '') {
      router.push('/');
    } else if (path === 'exercise' && muscleId) {
      router.push(`/exercise/${muscleId}`);
    } else if (path === 'result') {
      router.push('/result');
    } else if (path === 'settings') {
      router.push('/settings');
    } else if (path === 'scan') {
      router.push('/scan');
    }
  };

  const getLoadColor = (load: number) => {
    if (load >= 80) return 'text-red-600';
    if (load >= 60) return 'text-yellow-600';
    return 'text-blue-600';
  };

  const getLoadText = (load: number) => {
    if (load >= 80) return '매우 높음';
    if (load >= 60) return '높음';
    if (load >= 40) return '보통';
    return '양호';
  };

  const handleSectionToggle = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const toggleTimer = () => {
    setTimerActive(!timerActive);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNextStep = () => {
    if (selectedExercise && currentStep < initialMuscleData[selectedExercise as keyof typeof initialMuscleData].recommendations.length - 1) {
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
    let timer: NodeJS.Timeout | null = null;
    if (timerActive) {
      timer = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timerActive]);

  // 다크모드 설정을 로컬 스토리지에서 불러오기
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // 다크모드 변경 시 로컬 스토리지에 저장 및 HTML 클래스 업데이트
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const value = {
    loading,
    setLoading,
    showTooltip,
    setShowTooltip,
    showNotification,
    setShowNotification,
    activeMuscle,
    setActiveMuscle,
    expandedSection,
    setExpandedSection,
    scanComplete,
    setScanComplete,
    activeTab,
    setActiveTab,
    selectedExercise,
    setSelectedExercise,
    currentStep,
    setCurrentStep,
    timerActive,
    setTimerActive,
    timerSeconds,
    setTimerSeconds,
    showAlarm,
    setShowAlarm,
    navigateTo,
    getLoadColor,
    getLoadText,
    handleMuscleClick,
    handleSectionToggle,
    toggleTimer,
    formatTime,
    handleNextStep,
    handlePrevStep,
    muscleData,
    isDarkMode,
    toggleDarkMode,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppContext; 