import { Suspense } from 'react';
import ResultScreen from '../components/ArmHealthApp/ResultScreen';

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">로딩 중...</div>}>
      <ResultScreen />
    </Suspense>
  );
} 