import { Suspense } from 'react';
import ExerciseScreen from '../components/ArmHealthApp/ExerciseScreen';

export default function ExercisePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">로딩 중...</div>}>
      <ExerciseScreen />
    </Suspense>
  );
} 