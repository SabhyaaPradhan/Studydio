export type StudyPack = {
  id: string;
  title: string;
  contentType: 'youtube' | 'pdf' | 'text' | 'article';
  contentSnippet: string;
  progress: number;
  createdAt: string;
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
  summary: string;
};

export type Flashcard = {
  id: string;
  front: string;
  back: string;
  lastReviewed?: string | null;
  nextReviewDate?: string;
  easinessFactor?: number;
  repetitions?: number;
  interval?: number;
  isLearned?: boolean;
};

export type QuizQuestion = {
  id:string;
  question: string;
  options: string[];
  correctAnswer: string;
};

export type User = {
    name: string;
    email: string;
    avatarUrl: string;
}
