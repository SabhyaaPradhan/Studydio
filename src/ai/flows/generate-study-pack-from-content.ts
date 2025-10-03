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

const GenerateStudyPackInputSchema = z.object({
  content: z.string().describe('The content to generate a study pack from.'),
});
export type GenerateStudyPackInput = z.infer<typeof GenerateStudyPackInputSchema>;

const GenerateStudyPackOutputSchema = z.object({
  flashcards: z.array(z.string()).describe('The generated flashcards.'),
  quizzes: z.array(z.string()).describe('The generated quizzes.'),
  summaries: z.array(z.string()).describe('The generated summaries.'),
});
export type GenerateStudyPackOutput = z.infer<typeof GenerateStudyPackOutputSchema>;

export async function generateStudyPackFromContent(input: GenerateStudyPackInput): Promise<GenerateStudyPackOutput> {
  return generateStudyPackFromContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStudyPackFromContentPrompt',
  input: {schema: GenerateStudyPackInputSchema},
  output: {schema: GenerateStudyPackOutputSchema},
  prompt: `You are an AI assistant that generates study packs from content.

  Given the following content:
  {{content}}

  Generate flashcards, quizzes, and summaries from the content.
  Return them in the following JSON format:
  {
    "flashcards": ["flashcard 1", "flashcard 2"],
    "quizzes": ["quiz 1", "quiz 2"],
    "summaries": ["summary 1", "summary 2"]
  }`,
});

const generateStudyPackFromContentFlow = ai.defineFlow(
  {
    name: 'generateStudyPackFromContentFlow',
    inputSchema: GenerateStudyPackInputSchema,
    outputSchema: GenerateStudyPackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
