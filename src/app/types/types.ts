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
} 