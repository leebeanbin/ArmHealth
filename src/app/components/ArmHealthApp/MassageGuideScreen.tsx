"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, Bot } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Header from './common/Header';

interface MassageGuideScreenProps {
  muscleId: string;
}

const MassageGuideScreen = ({ muscleId }: MassageGuideScreenProps) => {
  const { navigateTo, muscleData, handleMuscleClick, isDarkMode } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showAIChat, setShowAIChat] = useState(false);

  const muscle = muscleId ? muscleData[muscleId as keyof typeof muscleData] : null;

  useEffect(() => {
    if (muscleId) {
      handleMuscleClick(muscleId);
    }
  }, [muscleId, handleMuscleClick]);

  if (!muscle) {
    return (
      <div className={`flex flex-col min-h-screen items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>해당 근육을 찾을 수 없습니다.</p>
        <button
          onClick={() => navigateTo('')}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
          transition-all duration-200"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  const massageSteps = [
    {
      title: '준비 자세',
      description: '편안한 자세로 앉거나 서서 목 근육을 이완시킵니다.',
      duration: 30,
    },
    {
      title: '목 스트레칭',
      description: '천천히 목을 좌우로 돌리면서 근육을 풀어줍니다.',
      duration: 60,
    },
    {
      title: '마사지',
      description: '손가락을 사용하여 목 근육을 부드럽게 마사지합니다.',
      duration: 90,
    },
    {
      title: '심호흡',
      description: '깊은 호흡을 하며 목 근육을 이완시킵니다.',
      duration: 30,
    }
  ];

  const aiChatMessages = [
    {
      role: 'assistant',
      content: '안녕하세요! 목 마사지 가이드를 도와드릴 AI 어시스턴트입니다. 어떤 도움이 필요하신가요?'
    },
    {
      role: 'user',
      content: '목이 많이 뻐근한데 어떻게 하면 좋을까요?'
    },
    {
      role: 'assistant',
      content: `현재 측정된 목 근육의 부하는 ${muscle?.load}%로, 다소 높은 상태입니다. 다음과 같은 방법을 추천드립니다:

1. 목을 천천히 좌우로 돌리는 스트레칭
2. 승모근 부위 지압
3. 목 근육 이완 운동

구체적인 방법을 알려드릴까요?`
    }
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Header
        title="마사지 가이드"
        leftContent={
          <button 
            onClick={() => navigateTo('')}
            className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center 
            hover:bg-white/30 transition-all duration-200 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        }
        rightContent={
          <button
            onClick={() => setShowAIChat(!showAIChat)}
            className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center 
            hover:bg-white/30 transition-all duration-200 active:scale-95"
          >
            <Bot className="w-5 h-5 text-white" />
          </button>
        }
      >
        <div className="text-white">
          <h3 className="text-xl font-semibold mb-2">{muscle?.name} 마사지</h3>
          <p className="text-white/80">{muscle?.description}</p>
        </div>
      </Header>

      <main className={`flex-1 -mt-6 rounded-t-[2.5rem] overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-lg mx-auto h-full">
          <div className="overflow-auto h-full pb-24 pt-8 px-5">
            {!showAIChat ? (
              <div className="space-y-6">
                {/* 비디오 플레이어 영역 */}
                <div className={`aspect-video rounded-2xl overflow-hidden relative ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>AI 생성 마사지 가이드 영상</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-center gap-4">
                    <button
                      onClick={handleReset}
                      className={`w-12 h-12 rounded-full ${isDarkMode ? 'bg-gray-700/80' : 'bg-white/80'} backdrop-blur-sm flex items-center justify-center
                      hover:bg-white transition-all duration-200`}
                    >
                      <RotateCcw className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} />
                    </button>
                    <button
                      onClick={handlePlayPause}
                      className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center
                      hover:bg-blue-700 transition-all duration-200"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white" />
                      )}
                    </button>
                  </div>
                </div>

                {/* 단계별 가이드 */}
                <div className="space-y-4">
                  {massageSteps.map((step, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-2xl border transition-all duration-300 ${
                        currentStep === index
                          ? isDarkMode 
                            ? 'border-blue-500/30 bg-blue-500/10' 
                            : 'border-blue-200 bg-blue-50'
                          : isDarkMode
                            ? 'border-gray-700 bg-gray-800'
                            : 'border-gray-100 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                          {step.title}
                        </h4>
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {step.duration}초
                        </span>
                      </div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {aiChatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === 'assistant' ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        message.role === 'assistant'
                          ? isDarkMode 
                            ? 'bg-gray-800 text-gray-100' 
                            : 'bg-gray-100 text-gray-900'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                  </div>
                ))}

                {/* 메시지 입력 영역 */}
                <div className={`fixed bottom-0 left-0 right-0 p-4 border-t ${
                  isDarkMode 
                    ? 'bg-gray-900 border-gray-800' 
                    : 'bg-white border-gray-200'
                }`}>
                  <div className="max-w-lg mx-auto flex gap-2">
                    <input
                      type="text"
                      placeholder="AI 어시스턴트에게 질문하기..."
                      className={`flex-1 px-4 py-3 rounded-xl border focus:outline-none ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500' 
                          : 'bg-white border-gray-200 text-gray-900 focus:border-blue-400'
                      }`}
                    />
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
                    transition-all duration-200">
                      전송
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MassageGuideScreen; 