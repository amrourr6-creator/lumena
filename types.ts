export enum UserRole {
  STUDENT = 'Student',
  TEACHER = 'Teacher'
}

export type Language = 'en' | 'ar';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  isPremium: boolean;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  description?: string;
  image?: string;
  progress: number; // 0-100
  nextDeadline: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  courseId: string;
  dueDate: Date;
  completed: boolean;
  type: 'ASSIGNMENT' | 'EXAM' | 'STUDY_SESSION';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface AnalyticsData {
  day: string;
  hours: number;
  score: number;
}

export interface StudyTask {
  id: string;
  task: string;
  duration: string;
  status: 'To Do' | 'In Progress' | 'Done';
}

export interface StudyPlanResponse {
  title: string;
  overview: string;
  tasks: StudyTask[];
}
