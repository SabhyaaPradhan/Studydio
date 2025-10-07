'use server';
/**
 * @fileOverview A study pack generation AI agent.
 *
 * - generateStudyPackFromContent - A function that handles the study pack generation process.
 * - GenerateStudyPackInput - The input type for the generateStudyPackFromContent function.
 * - GenerateStudyPackOutput - The return type for the generateStudyPackFromContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { generateQuiz } from './quiz-generation';

const GenerateStudyPackInputSchema = z.object({
  content: z.string().describe('The content to generate a study pack from.'),
});
export type GenerateStudyPackInput = z.infer<typeof GenerateStudyPackInputSchema>;

const FlashcardSchema = z.object({
  front: z.string().describe("The front of the flashcard (question or term)."),
  back: z.string().describe("The back of the flashcard (answer or definition).")
});

const QuizQuestionSchema = z.object({
  question: z.string().describe('The quiz question.'),
  options: z.array(z.string()).describe('The multiple choice options.'),
  correctAnswer: z.string().describe('The correct answer.'),
});

const QuizGenerationOutputSchema = z.object({
  quiz: z
    .array(QuizQuestionSchema)
    .describe('The generated quiz questions and answers.'),
});

const GenerateStudyPackOutputSchema = z.object({
  title: z.string().describe('A concise and relevant title for the study pack based on the content.'),
  flashcards: z.array(FlashcardSchema).describe('An array of generated flashcard objects.'),
  quiz: z.lazy(() => QuizGenerationOutputSchema).describe('A generated quiz with multiple choice questions.'),
  summary: z.string().describe('A concise summary of the provided content.'),
});
export type GenerateStudyPackOutput = z.infer<typeof GenerateStudyPackOutputSchema>;

export async function generateStudyPackFromContent(input: GenerateStudyPackInput): Promise<GenerateStudyPackOutput> {
  return generateStudyPackFromContentFlow(input);
}

const studyPackPrompt = ai.definePrompt({
  name: 'generateStudyPackFromContentPrompt',
  input: {schema: GenerateStudyPackInputSchema},
  output: {schema: z.object({
    title: z.string(),
    flashcards: z.array(FlashcardSchema),
    summary: z.string(),
  })},
  prompt: `You are an AI assistant that generates study materials from content.
  Based on the content provided below, please generate the following:
  1. A short, descriptive title for the study pack (e.g., "Quantum Superposition Principles").
  2. A set of flashcards with a clear 'front' (term/question) and 'back' (definition/answer).
  3. A concise summary of the key points.

  Content:
  {{{content}}}

  Please return your response in a valid JSON format.
  `,
});

const generateStudyPackFromContentFlow = ai.defineFlow(
  {
    name: 'generateStudyPackFromContentFlow',
    inputSchema: GenerateStudyPackInputSchema,
    outputSchema: GenerateStudyPackOutputSchema,
  },
  async input => {
    const [studyPackBase, quizResult] = await Promise.all([
        studyPackPrompt(input).then(res => res.output!),
        generateQuiz({ content: input.content, numberOfQuestions: 5 }),
    ]);

    return {
        ...studyPackBase,
        quiz: quizResult,
    };
  }
);

    