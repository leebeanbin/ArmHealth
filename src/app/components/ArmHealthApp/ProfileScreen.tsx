"use client";

import React, { useState } from 'react';
import { ArrowLeft, User, Bell, Moon, Info, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import Header from './common/Header';

const ProfileScreen = () => {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useApp();
  const [notifications, setNotifications] = useState(true);

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      <Header
        title="프로필 설정"
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
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="text-white">
            <h3 className="text-xl font-semibold">사용자</h3>
            <p className="text-sm text-white/80 mt-1">프로필을 설정해주세요</p>
          </div>
        </div>
      </Header>

      <main className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} -mt-6 rounded-t-[2.5rem] overflow-hidden`}>
        <div className="max-w-lg mx-auto h-full">
          <div className="overflow-auto h-full pb-24 pt-8 px-5">
            <div className="space-y-6">
              {/* 기본 정보 섹션 */}
              <section>
                <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-3`}>
                  기본 정보
                </h3>
                <div className="space-y-2">
                  <button className={`w-full ${
                    isDarkMode ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' : 'bg-white hover:bg-gray-50 border-gray-100'
                  } rounded-2xl p-4 flex items-center justify-between transition-all duration-200 border`}>
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-blue-600" />
                      <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        이름 설정
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </button>
                </div>
              </section>

              {/* 알림 설정 섹션 */}
              <section>
                <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-3`}>
                  알림 설정
                </h3>
                <div className="space-y-2">
                  <div className={`w-full ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                  } rounded-2xl p-4 flex items-center justify-between border`}>
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-blue-600" />
                      <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        알림 받기
                      </span>
                    </div>
                    <button
                      onClick={() => setNotifications(!notifications)}
                      className={`w-12 h-6 rounded-full transition-colors duration-200 
                      ${notifications ? 'bg-blue-600' : isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200
                        ${notifications ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>
              </section>

              {/* 화면 설정 섹션 */}
              <section>
                <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-3`}>
                  화면 설정
                </h3>
                <div className="space-y-2">
                  <div className={`w-full ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                  } rounded-2xl p-4 flex items-center justify-between border`}>
                    <div className="flex items-center gap-3">
                      <Moon className="w-5 h-5 text-blue-600" />
                      <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        다크 모드
                      </span>
                    </div>
                    <button
                      onClick={toggleDarkMode}
                      className={`w-12 h-6 rounded-full transition-colors duration-200 
                      ${isDarkMode ? 'bg-blue-600' : 'bg-gray-200'}`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200
                        ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>
              </section>

              {/* 기타 섹션 */}
              <section>
                <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-3`}>
                  기타
                </h3>
                <div className="space-y-2">
                  <button className={`w-full ${
                    isDarkMode ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' : 'bg-white hover:bg-gray-50 border-gray-100'
                  } rounded-2xl p-4 flex items-center justify-between transition-all duration-200 border`}>
                    <div className="flex items-center gap-3">
                      <Info className="w-5 h-5 text-blue-600" />
                      <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        앱 정보
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileScreen; 