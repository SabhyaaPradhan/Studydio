

export type StudyPack = {
  id: string;
  userId: string;
  title: string;
  contentType: 'youtube' | 'pdf' | 'text' | 'article';
  contentUrl: string;
  contentSnippet: string;
  progress: number;
  createdAt: string; // Will be a server timestamp
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

export type ReviewSession = {
    id: string;
    userId: string;
    flashcardId: string;
    reviewDate: string; // ISO String
    difficultyRating: 'easy' | 'medium' | 'hard';
};

    