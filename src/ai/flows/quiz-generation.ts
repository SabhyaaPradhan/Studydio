'use server';
/**
 * @fileOverview Generates quizzes from user-provided content.
 *
 * - generateQuiz - A function that generates a quiz based on input content.
 * - QuizGenerationInput - The input type for the generateQuiz function.
 * - QuizGenerationOutput - The return type for the generateQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QuizGenerationInputSchema = z.object({
  content: z
    .string()
    .describe(
      'The content to generate a quiz from, which could be a YouTube link, PDF, article, or text.'
    ),
  numberOfQuestions: z.number().describe('The number of questions to generate.'),
});
export type QuizGenerationInput = z.infer<typeof QuizGenerationInputSchema>;

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
export type QuizGenerationOutput = z.infer<typeof QuizGenerationOutputSchema>;

export async function generateQuiz(
  input: QuizGenerationInput
): Promise<QuizGenerationOutput> {
  return quizGenerationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'quizGenerationPrompt',
  input: {schema: QuizGenerationInputSchema},
  output: {schema: QuizGenerationOutputSchema},
  prompt: `You are an expert quiz generator. Given the following content, generate a quiz with {{numberOfQuestions}} multiple-choice questions.  Provide four answer options for each question. Please indicate the correct answer for each question.

Content: {{{content}}}

Output the quiz as a JSON object containing a "quiz" array of question objects. Each question object should contain the question text, an array of answer options, and the correct answer text.

Example output format:
{
  "quiz": [
    {
      "question": "What is the capital of France?",
      "options": ["Berlin", "Paris", "Rome", "Madrid"],
      "correctAnswer": "Paris"
    },
    {
      "question": "What is the highest mountain in the world?",
      "options": ["K2", "Kangchenjunga", "Matterhorn", "Mount Everest"],
      "correctAnswer": "Mount Everest"
    }
  ]
}
`,
});

const quizGenerationFlow = ai.defineFlow(
  {
    name: 'quizGenerationFlow',
    inputSchema: QuizGenerationInputSchema,
    outputSchema: QuizGenerationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

    