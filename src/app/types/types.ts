export interface Step {
  title: string;
  description: string;
  duration: number;
}

export interface MassageGuide {
  title: string;
  description: string;
  steps: Step[];
}

export interface MassageGuides {
  deltoid: MassageGuide;
  biceps: MassageGuide;
  triceps: MassageGuide;
  brachialis: MassageGuide;
  flexorCarpi: MassageGuide;
  neck: MassageGuide;
  [key: string]: MassageGuide;
}

export interface Muscle {
  name: string;
  nameEn: string;
  load: number;
  recommendations: string[];
  description: string;
}

export interface MuscleData {
  deltoid: Muscle;
  biceps: Muscle;
  triceps: Muscle;
  brachialis: Muscle;
  flexorCarpi: Muscle;
  neck: Muscle;
  [key: string]: Muscle;
}

export interface TabNavigationProps {
  currentScreen?: string;
}

export type ScanScreenProps = Record<string, unknown>;

export type ResultScreenProps = Record<string, unknown>;

export type ExerciseScreenProps = Record<string, unknown>;

export type HomeScreenProps = Record<string, unknown>; 