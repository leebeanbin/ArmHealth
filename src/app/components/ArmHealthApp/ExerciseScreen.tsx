"use client";
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Play, Pause } from 'lucide-react';
import { massageGuides } from '../../data/massageGuides';
import { MassageGuides } from '../../types/types';
import { useApp } from '../../context/AppContext';
import Header from './common/Header';

interface ExerciseScreenProps {
  selectedExercise: keyof MassageGuides;
  onBack: () => void;
}

export const ExerciseScreen: React.FC<ExerciseScreenProps> = ({ selectedExercise, onBack }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const { isDarkMode } = useApp();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  if (!(selectedExercise in massageGuides)) {
    return <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}>운동 가이드를 찾을 수 없습니다.</div>;
  }

  const guide = massageGuides[selectedExercise];
  const currentStepData = guide.steps[currentStep];
  const isLastStep = currentStep === guide.steps.length - 1;

  const nextStep = () => {
    if (currentStep < guide.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setTimer(0);
      setIsTimerRunning(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setTimer(0);
      setIsTimerRunning(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Header
        title={guide.title}
        leftContent={
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center 
            hover:bg-white/30 transition-all duration-200 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        }
      >
        <div className="text-center text-white">
          <p className="text-sm opacity-90">진행 단계</p>
          <p className="text-lg font-medium mt-1">Step {currentStep + 1} of {guide.steps.length}</p>
        </div>
      </Header>

      <main className={`flex-1 overflow-y-auto -mt-6 rounded-t-[2.5rem] ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-2xl mx-auto p-4">
          <div className={`rounded-xl shadow-sm p-6 mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} border`}>
            <h2 className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {currentStepData.title}
            </h2>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {currentStepData.description}
            </p>
            
            <div className="text-center">
              <p className={`text-3xl font-semibold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                {formatTime(timer)}
              </p>
              <button
                onClick={() => {
                  if (!isTimerRunning) {
                    setTimer(currentStepData.duration);
                  }
                  setIsTimerRunning(!isTimerRunning);
                }}
                className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors mb-6"
              >
                {isTimerRunning ? (
                  <>
                    <Pause className="w-5 h-5 inline mr-2" />
                    일시정지
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 inline mr-2" />
                    시작하기
                  </>
                )}
              </button>
            </div>
          </div>

          <div className={`h-2 rounded-full mb-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${((currentStep + 1) / guide.steps.length) * 100}%` }}
            />
          </div>
        </div>
      </main>

      <div className={`border-t px-4 py-4 flex justify-between items-center ${
        isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-100 bg-white'
      }`}>
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            currentStep === 0
              ? isDarkMode ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-400'
              : isDarkMode ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          이전
        </button>
        <button
          onClick={nextStep}
          disabled={isLastStep}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            isLastStep
              ? isDarkMode ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-400'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          다음
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ExerciseScreen; 