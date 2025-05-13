"use client";
import React from 'react';
import { ArrowLeft, Bell, Moon, Smartphone, Shield, HelpCircle, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Header from './common/Header';

const SettingsScreen = () => {
  const { navigateTo } = useApp();

  const settingsSections = [
    {
      title: '알림',
      items: [
        {
          icon: <Bell className="w-5 h-5" />,
          title: '알림 설정',
          description: '알림 시간 및 종류 설정',
          onClick: () => console.log('알림 설정')
        },
        {
          icon: <Moon className="w-5 h-5" />,
          title: '방해 금지 모드',
          description: '특정 시간대 알림 차단',
          onClick: () => console.log('방해 금지 모드')
        }
      ]
    },
    {
      title: '일반',
      items: [
        {
          icon: <Smartphone className="w-5 h-5" />,
          title: '기기 연결',
          description: '측정 기기 관리',
          onClick: () => console.log('기기 연결')
        },
        {
          icon: <Shield className="w-5 h-5" />,
          title: '개인정보 보호',
          description: '데이터 및 프라이버시 설정',
          onClick: () => console.log('개인정보 보호')
        },
        {
          icon: <HelpCircle className="w-5 h-5" />,
          title: '도움말',
          description: '자주 묻는 질문 및 가이드',
          onClick: () => console.log('도움말')
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header
        title="설정"
        leftContent={
          <button 
            onClick={() => navigateTo('')}
            className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center 
            hover:bg-white/30 transition-all duration-200 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        }
      />

      <main className="flex-1 bg-white -mt-6 rounded-t-[2.5rem] overflow-hidden">
        <div className="max-w-lg mx-auto h-full">
          <div className="overflow-auto h-full pb-24 pt-8">
            {settingsSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-8 px-5">
                <h3 className="text-sm font-medium text-gray-500 mb-4">{section.title}</h3>
                <div className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <button
                      key={itemIndex}
                      onClick={item.onClick}
                      className="w-full bg-white hover:bg-gray-50/80 rounded-2xl p-4 
                      transition-all duration-200 border border-gray-100 flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                          {React.cloneElement(item.icon, { className: 'w-5 h-5 text-blue-600' })}
                        </div>
                        <div className="text-left">
                          <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                          <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 transition-transform duration-200 
                      group-hover:translate-x-0.5" />
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="px-5 mt-8">
              <div className="text-center">
                <p className="text-xs text-gray-500">버전 1.0.0</p>
                <button className="mt-2 text-xs text-blue-600 hover:text-blue-700">
                  업데이트 확인
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsScreen; 