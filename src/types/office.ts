export type SceneId = 
  | 'entrance'
  | 'reception'
  | 'skills'
  | 'career'
  | 'education'
  | 'feedback'
  | 'ceo'
  | 'surprise';

export interface CameraViewpoint {
  position: [number, number, number];
  target: [number, number, number];
  fov?: number;
}

export interface Department {
  id: string;
  name: string;
  shortName: string;
  description: string;
  iconName: string;
  color: string;
  gridPos: [number, number, number];
  isReady?: boolean;
}

export interface MajorProject {
  id: string;
  name: string;
  shelfTier: 'top';
  trophyType: 'gold' | 'platinum' | 'crystal';
  overview: string;
  role: string;
  responsibilities: string;
  problem: string;
  outcome: string;
  technologies: string[];
}

export interface OtherProject {
  id: string;
  name: string;
  shelfTier: 'middle';
  role: string;
  description: string;
  status: string;
  category: string;
}

export interface Certificate {
  id: string;
  name: string;
  shelfTier: 'bottom';
  issuingOrg: string;
  issueDate?: string;
  credentialUrl?: string;
  skillsCovered: string[];
}

export interface CareerKPIs {
  totalProjectsCompleted: string | number;
  totalYearsExperience: string | number;
  projectsLabel: string;
  experienceLabel: string;
}

export interface EducationItem {
  id: string;
  qualification: string;
  institution: string;
  year: string;
  category: 'school' | 'college' | 'certification' | 'training';
  description?: string;
  credentialUrl?: string;
}

export interface FeedbackItem {
  id: string;
  reviewerName: string;
  reviewerRole: string;
  starRating: number;
  shortReview: string;
  fullReview: string;
  date?: string;
}

export interface ContactConfig {
  email: string;
  phone: string;
  instagram: string;
  whatsapp: string;
  linkedin: string;
  cvUrl: string;
}

export interface SurpriseConfig {
  title: string;
  description: string;
  externalPortfolioUrl: string;
  buttonLabel: string;
}
