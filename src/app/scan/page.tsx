import { Suspense } from 'react';
import ScanScreen from '@/app/components/ArmHealthApp/ScanScreen';

export default function ScanPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">로딩 중...</div>}>
      <ScanScreen />
    </Suspense>
  );
} 