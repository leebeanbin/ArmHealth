"use client";
import React, { useState, useEffect } from 'react';
import { Activity, ChevronRight } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import Header from './common/Header';
import './animation.css';
import { HomeScreenProps } from '../../types/types';
import TabNavigation from './TabNavigation';

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { 
    isDarkMode, 
    muscleData,
    activeMuscle,
    handleMuscleClick,
    getLoadColor,
    getLoadText,
    navigateTo
  } = useApp();
  const [showSplash, setShowSplash] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    // localStorage는 클라이언트 사이드에서만 실행
    if (typeof window !== 'undefined') {
      // 첫 방문 여부 확인
      const hasVisited = localStorage.getItem('hasVisitedHome');
      if (!hasVisited) {
        setShowSplash(true);
        setIsFirstVisit(true);
        localStorage.setItem('hasVisitedHome', 'true');
        
        const timer = setTimeout(() => {
          setShowSplash(false);
        }, 2300);
        
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const averageLoad = muscleData ? Math.round(
    Object.values(muscleData).reduce((acc, curr) => acc + curr.load, 0) /
    Object.values(muscleData).length
  ) : 0;

  // pathname에서 현재 화면 이름 추출
  const currentScreen = pathname.split('/').pop() || 'home';

  return (
    <>
      {showSplash && (
        <div className={`splash-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="logo-animation flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              ArmHealth
            </span>
          </div>
        </div>
      )}
      
      <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className={isFirstVisit ? "header-animation" : ""}>
          <Header
            title="내 근육 상태"
            showProfile
            onProfileClick={() => router.push('/profile')}
            rightContent={
              <button
                onClick={() => navigateTo('scan')}
                className="px-5 py-2.5 bg-white/20 backdrop-blur-sm text-white text-sm rounded-2xl font-medium 
                hover:bg-white/30 transition-all duration-200 active:scale-95"
              >
                측정하기
              </button>
            }
          >
            <div className="flex items-center justify-between text-white">
              <div>
                <p className="text-sm opacity-90">평균 부하</p>
                <p className="text-4xl font-bold mt-2">{averageLoad}%</p>
                <div className="mt-3 bg-white/20 backdrop-blur-sm text-sm px-5 py-2 rounded-2xl inline-block">
                  전주 대비 +5%
                </div>
              </div>
              <div className="w-28 h-28 rounded-3xl border-4 border-white/30 flex items-center justify-center 
              bg-white/10 backdrop-blur-sm">
                <Activity className="w-12 h-12 text-white" />
              </div>
            </div>
          </Header>
        </div>

        <main className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} -mt-6 rounded-t-[2.5rem] overflow-hidden`}>
          <div className="max-w-lg mx-auto h-full">
            <div className="overflow-auto h-full pb-24 pt-8 px-5">
              <div className={isFirstVisit ? "main-content-animation" : ""}>
                <h3 className={`text-base font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'} mb-6 flex items-center gap-2`}>
                  <Activity className="w-5 h-5 text-blue-600" />
                  근육 부하 현황
                </h3>
                
                <div className="space-y-4">
                  {muscleData && Object.entries(muscleData).map(([key, muscle]) => (
                    <div
                      key={key}
                      className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl transition-all duration-300 overflow-hidden
                        ${activeMuscle === key 
                          ? isDarkMode ? 'border-2 border-blue-500/30' : 'border-2 border-blue-100'
                          : isDarkMode ? 'border border-gray-700' : 'border border-gray-100'
                        }`}
                    >
                      <button
                        onClick={() => {
                          if (activeMuscle === key) {
                            handleMuscleClick('');
                          } else {
                            handleMuscleClick(key);
                          }
                        }}
                        className="w-full text-left p-4 flex items-center justify-between"
                      >
                        <div className="flex-1 min-w-0 pr-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                                {muscle.name}
                              </h3>
                              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {muscle.nameEn}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className={`text-base font-semibold ${getLoadColor(muscle.load)}`}>
                                {muscle.load}%
                              </div>
                              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {getLoadText(muscle.load)}
                              </p>
                            </div>
                          </div>
                          <div className={`h-1.5 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'} rounded-full overflow-hidden`}>
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                muscle.load >= 80 ? 'bg-red-500' :
                                muscle.load >= 60 ? 'bg-yellow-500' : 'bg-blue-600'
                              }`}
                              style={{ width: `${muscle.load}%` }}
                            />
                          </div>
                        </div>
                        <ChevronRight className={`w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} ml-3 transition-transform duration-300 ${
                          activeMuscle === key ? 'rotate-90' : ''
                        }`} />
                      </button>

                      {activeMuscle === key && (
                        <div className={`px-4 pb-4 animate-expandDown ${isDarkMode ? 'bg-gray-800/50' : 'bg-blue-50/30'}`}>
                          <div className="pt-3">
                            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 leading-relaxed`}>
                              {muscle.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {muscle.recommendations.map((rec, index) => (
                                <span
                                  key={index}
                                  className={`px-3 py-1.5 ${
                                    isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-white text-blue-700'
                                  } rounded-full text-xs font-medium`}
                                >
                                  {rec}
                                </span>
                              ))}
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigateTo('exercise', key);
                              }}
                              className="w-full py-3 bg-blue-600 text-white rounded-full text-sm font-medium 
                              hover:bg-blue-700 transition-all duration-200 active:scale-95"
                            >
                              마사지 가이드 보기
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        <div className={isFirstVisit ? "footer-animation" : ""}>
          <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-800">
            <TabNavigation currentScreen={currentScreen} />
          </nav>
        </div>
      </div>
    </>
  );
};

export default HomeScreen; 