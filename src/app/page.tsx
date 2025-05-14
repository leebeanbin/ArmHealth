import { Suspense } from 'react';
import HomeScreen from './components/ArmHealthApp/HomeScreen';

export default function Home() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">로딩 중...</div>}>
      <HomeScreen />
    </Suspense>
  );
}
