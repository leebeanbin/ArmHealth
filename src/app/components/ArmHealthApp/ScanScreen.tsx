"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Smartphone, Wifi, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Header from './common/Header';
import { ScanScreenProps } from '../../types/types';

const ScanScreen: React.FC<ScanScreenProps> = () => {
  const { isDarkMode, navigateTo, setScanComplete } = useApp();
  const [scanStep, setScanStep] = useState(0);
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [showError, setShowError] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const scanSteps = [
    {
      title: '기기 연결',
      description: '측정 기기의 전원을 켜고 블루투스를 활성화해주세요.',
      icon: <Smartphone className="w-6 h-6" />,
      action: '기기 검색'
    },
    {
      title: '신호 확인',
      description: '기기와의 연결 상태를 확인하고 있습니다.',
      icon: <Wifi className="w-6 h-6" />,
      action: '다시 시도'
    },
    {
      title: '측정 진행',
      description: '움직이지 말고 잠시만 기다려주세요.',
      icon: <AlertCircle className="w-6 h-6" />,
      action: '측정 중단'
    }
  ];

  useEffect(() => {
    if (scanStep === 1 && !deviceConnected) {
      const timer = setTimeout(() => {
        setDeviceConnected(true);
        setScanStep(2);
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (scanStep === 2 && deviceConnected) {
      const timer = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setIsComplete(true);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [scanStep, deviceConnected]);

  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        setScanComplete(true);
        navigateTo('result');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isComplete, navigateTo, setScanComplete]);

  const handleStepAction = () => {
    if (scanStep === 0) {
      setScanStep(1);
    } else if (scanStep === 1 && !deviceConnected) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } else if (scanStep === 2) {
      setScanStep(0);
      setScanProgress(0);
      setDeviceConnected(false);
      setIsComplete(false);
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Header
        title="근육 부하 측정"
        leftContent={
          <button 
            onClick={() => navigateTo('home')}
            className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center 
            hover:bg-white/30 transition-all duration-200 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        }
      >
        <div className="text-white text-center">
          <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm mx-auto mb-4 
          flex items-center justify-center">
            {scanSteps[scanStep].icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">{scanSteps[scanStep].title}</h3>
          <p className="text-white/80">{scanSteps[scanStep].description}</p>
        </div>
      </Header>

      <main className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} -mt-6 rounded-t-[2.5rem] overflow-hidden`}>
        <div className="max-w-lg mx-auto h-full">
          <div className="overflow-auto h-full pb-24 pt-8 px-5">
            <div className="space-y-6">
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-2xl p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${deviceConnected ? 'bg-green-500' : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`} />
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                      {deviceConnected ? '기기 연결됨' : '기기 연결 대기 중'}
                    </span>
                  </div>
                  {deviceConnected && (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  )}
                </div>
                {showError && (
                  <div className="bg-red-500/10 text-red-600 text-sm p-3 rounded-xl mt-3">
                    기기를 찾을 수 없습니다. 기기의 전원과 블루투스 상태를 확인해주세요.
                  </div>
                )}
              </div>

              {scanStep === 2 && (
                <div className="space-y-4">
                  <div className={`h-2 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-full overflow-hidden`}>
                    <div 
                      className="h-full bg-blue-600 rounded-full transition-all duration-200"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span className={isDarkMode ? 'text-gray-400' : ''}>측정 진행률</span>
                    <span className={isDarkMode ? 'text-gray-400' : ''}>{scanProgress}%</span>
                  </div>
                </div>
              )}

              <button
                onClick={handleStepAction}
                className={`w-full py-4 rounded-2xl text-white font-medium transition-all duration-200
                ${scanStep === 2 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {scanSteps[scanStep].action}
              </button>

              <div className={`${isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50'} rounded-2xl p-4`}>
                <h4 className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-900'} mb-2`}>
                  측정 시 주의사항
                </h4>
                <ul className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-700'} space-y-1`}>
                  <li>• 편안한 자세로 앉아주세요.</li>
                  <li>• 측정 중에는 움직이지 말아주세요.</li>
                  <li>• 기기를 피부에 밀착시켜주세요.</li>
                  <li>• 측정은 약 1분 정도 소요됩니다.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScanScreen; 