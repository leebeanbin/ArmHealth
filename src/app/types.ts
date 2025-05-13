// src/app/types.ts
export interface MuscleData {
    [key: string]: {
      name: string;
      nameEn: string;
      load: number;
      recommendations: string[];
      description: string;
    };
  }
  
  export interface MassageGuides {
    [key: string]: {
      title: string;
      description: string;
      steps: {
        title: string;
        description: string;
        duration: number;
      }[];
    };
  }