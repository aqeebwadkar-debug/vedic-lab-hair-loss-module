export interface Question {
  id: string;
  text: string;
  description?: string;
  type: 'single' | 'multiple' | 'rating';
  options: {
    value: string;
    label: string;
    sublabel?: string;
    points?: number;
  }[];
}

export interface HairProfile {
  dosha: 'Vata' | 'Pitta' | 'Kapha' | 'Vata-Pitta' | 'Pitta-Kapha';
  scalpType: string;
  thinningGrade: string;
  rootCauses: string[];
  vitalityScore: number;
}

export interface Recommendation {
  id: string;
  category: 'diet' | 'botanical' | 'lifestyle' | 'routine';
  title: string;
  subtitle: string;
  description: string;
  doshaBenefit: string;
  timeOfDay: string;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  category: 'Oil' | 'Shampoo' | 'Supplement' | 'Serum' | 'Kit';
  description: string;
  ingredients: string[];
  benefits: string[];
}

export interface RoutineTask {
  id: string;
  title: string;
  description: string;
  time: string;
  duration: string;
  completed: boolean;
  category: 'Morning' | 'Afternoon' | 'Evening';
  points: number;
  icon: string;
}

export interface ProgressMilestone {
  id: string;
  week: number;
  title: string;
  description: string;
  completed: boolean;
  active: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  timestamp: string;
}

export interface EducationalArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  snippet: string;
  content: string;
  image: string;
  doshaTopic?: string;
}
