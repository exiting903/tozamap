
export type Language = 'ru' | 'uz' | 'en';

export enum PollutionCategory {
  TRASH = 'TRASH',
  AIR = 'AIR',
  WATER = 'WATER',
  NOISE = 'NOISE',
  CONSTRUCTION = 'CONSTRUCTION',
  OTHER = 'OTHER'
}

export enum ReportStatus {
  NEW = 'NEW',
  VERIFIED = 'VERIFIED',
  RESOLVED = 'RESOLVED',
  IN_PROGRESS = 'IN_PROGRESS'
}

export interface GeoLocation {
  lat: number;
  lng: number;
  addressName?: string;
}

export interface AnalysisResult {
  severity: number; // 1-10
  healthImpact: string;
  recommendation: string;
}

export interface Report {
  id: string;
  userId: string;
  category: PollutionCategory;
  description: string;
  imageUrl?: string;
  location: GeoLocation;
  timestamp: number;
  status: ReportStatus;
  likes: number;
  aiAnalysis?: AnalysisResult;
}

export interface User {
  id: string;
  name: string;
  nickname: string; 
  rank: string;
  points: number;
  avatarUrl: string;
}

export enum EcoPointType {
  RECYCLING = 'RECYCLING',
  VOLUNTEER = 'VOLUNTEER'
}

export interface EcoPoint {
  id: string;
  type: EcoPointType;
  name: string;
  description: string;
  location: GeoLocation;
  workingHours?: string;
  contact?: string;
  acceptedItems?: string[];
}

export type ViewState = 'AUTH' | 'MAP' | 'FEED' | 'ADD' | 'PROFILE' | 'REPORT_DETAILS' | 'GUIDE';
