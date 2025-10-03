import type { StudyPack, User } from './types';

export const mockUser: User = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  avatarUrl: 'https://picsum.photos/seed/user/100/100',
};

export const mockStudyPacks: StudyPack[] = [
  {
    id: '1',
    title: 'The Science of Well-Being',
    contentType: 'youtube',
    contentSnippet: 'A lecture series by Dr. Laurie Santos from Yale University...',
    progress: 75,
    createdAt: '2024-07-20T10:00:00Z',
    flashcards: [
      { id: 'fc1-1', front: 'What is the G.I. Joe Fallacy?', back: 'Knowing is not half the battle. Just because you know something doesn\'t mean you will act on it.', lastReviewed: '2024-07-22T10:00:00Z', nextReviewDate: '2024-07-25T10:00:00Z', easinessFactor: 2.5, repetitions: 3, interval: 3, isLearned: false },
      { id: 'fc1-2', front: 'What is "miswanting"?', back: 'The act of being mistaken about what and how much you will like something in the future.', lastReviewed: '2024-07-21T10:00:00Z', nextReviewDate: '2024-07-24T10:00:00Z', easinessFactor: 2.6, repetitions: 2, interval: 2, isLearned: false },
    ],
    quiz: [
      { id: 'q1-1', question: 'Which concept describes the mistake of believing that knowing is half the battle?', options: ['The Dunning-Kruger Effect', 'The G.I. Joe Fallacy', 'Imposter Syndrome', 'Cognitive Dissonance'], correctAnswer: 'The G.I. Joe Fallacy' },
    ],
    summary: 'This course delves into the psychological aspects of happiness and provides practical advice on how to improve one\'s well-being. Key concepts include miswanting, the G.I. Joe Fallacy, and the importance of social connection.',
  },
  {
    id: '2',
    title: 'Introduction to Quantum Computing',
    contentType: 'pdf',
    contentSnippet: 'A comprehensive guide to the principles of quantum mechanics...',
    progress: 40,
    createdAt: '2024-07-18T14:30:00Z',
    flashcards: [
      { id: 'fc2-1', front: 'What is a qubit?', back: 'A quantum bit, the basic unit of quantum information. It can be in a superposition of 0 and 1.', lastReviewed: '2024-07-20T10:00:00Z', nextReviewDate: '2024-07-23T10:00:00Z', easinessFactor: 2.3, repetitions: 1, interval: 1, isLearned: false },
    ],
    quiz: [],
    summary: 'This document provides a foundational understanding of quantum computing, covering topics such as qubits, superposition, and entanglement.',
  },
  {
    id: '3',
    title: 'The History of Ancient Rome',
    contentType: 'article',
    contentSnippet: 'From its mythical founding to the fall of the Western Empire...',
    progress: 95,
    createdAt: '2024-07-15T09:00:00Z',
    flashcards: [],
    quiz: [],
    summary: 'A detailed timeline and analysis of the major events and figures in the history of Ancient Rome.',
  },
    {
    id: '4',
    title: 'Mastering React Hooks',
    contentType: 'text',
    contentSnippet: 'A block of text explaining useState, useEffect, and useContext...',
    progress: 10,
    createdAt: '2024-07-22T11:00:00Z',
    flashcards: [],
    quiz: [],
    summary: '',
  },
];
