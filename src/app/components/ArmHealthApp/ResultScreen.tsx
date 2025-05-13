"use client";
import React, { useEffect } from 'react';
import { ArrowLeft, ChevronRight, AlertCircle, Activity } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from './common/Header';

const ResultScreen = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    muscleData,
    getLoadColor,
    getLoadText,
    isDarkMode
  } = useApp();

  const fromScan = searchParams.get('from') === 'scan';

  useEffect(() => {
    // 스캔 화면에서 오지 않았다면 홈으로 리다이렉트
    if (!fromScan && !muscleData) {
      router.push('/');
    }
  }, [fromScan, muscleData, router]);

  const averageLoad = Math.round(
    Object.values(muscleData || {}).reduce((acc, curr) => acc + curr.load, 0) /
    Object.values(muscleData || {}).length || 0
  );

  if (!muscleData) return null;

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Header
        title="측정 결과"
        leftContent={
          <button 
            onClick={() => router.push('/')}
            className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center 
            hover:bg-white/30 transition-all duration-200 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        }
      >
        <div className="flex items-center justify-between text-white">
          <div>
            <p className="text-sm opacity-90">종합 부하 지수</p>
            <p className="text-4xl font-bold mt-2">{averageLoad}%</p>
            <div className="mt-3 bg-white/20 backdrop-blur-sm text-sm px-5 py-2 rounded-2xl inline-block">
              {getLoadText(averageLoad)}
            </div>
          </div>
          <div className="w-28 h-28 rounded-3xl border-4 border-white/30 flex items-center justify-center 
          bg-white/10 backdrop-blur-sm">
            <AlertCircle className="w-12 h-12 text-white" />
          </div>
        </div>
      </Header>

      <main className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} -mt-6 rounded-t-[2.5rem] overflow-hidden`}>
        <div className="max-w-lg mx-auto h-full">
          <div className="overflow-auto h-full pb-24 pt-8 px-5">
            <h3 className={`text-base font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'} mb-6 flex items-center gap-2`}>
              <Activity className="w-5 h-5 text-blue-600" />
              상세 분석
            </h3>
            
            <div className="space-y-4">
              {Object.entries(muscleData).map(([key, muscle]) => (
                <button
                  key={key}
                  onClick={() => router.push(`/exercise/${key}`)}
                  className={`w-full ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700/80' : 'bg-white hover:bg-gray-50/80'} rounded-2xl p-4 
                  transition-all duration-200 border ${isDarkMode ? 'border-gray-700' : 'border-gray-100'} group`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                          {muscle.name}
                        </h4>
                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          ({muscle.nameEn})
                        </span>
                      </div>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-2`}>
                        {muscle.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-right">
                        <p className={`text-base font-semibold ${getLoadColor(muscle.load)}`}>
                          {muscle.load}%
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {getLoadText(muscle.load)}
                        </p>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} transition-transform duration-200 
                      group-hover:translate-x-0.5`} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResultScreen; 