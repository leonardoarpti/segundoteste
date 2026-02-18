
export interface Article {
  id: string;
  number: number;
  content: string;
  topic: string;
  details?: string[];
}

export interface Topic {
  id: string;
  title: string;
  articles: Article[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  image?: string;
}

export enum ViewMode {
  READING = 'reading',
  ANALYSIS = 'analysis',
  QUIZ = 'quiz'
}
