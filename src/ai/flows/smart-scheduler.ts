// src/ai/flows/smart-scheduler.ts
'use server';
/**
 * @fileOverview A smart scheduler AI agent that recommends review times for flashcards to optimize memory retention.
 *
 * - smartScheduler - A function that handles the scheduling process.
 * - SmartSchedulerInput - The input type for the smartScheduler function.
 * - SmartSchedulerOutput - The return type for the smartScheduler function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartSchedulerInputSchema = z.object({
  flashcardContent: z.string().describe('The content of the flashcard.'),
  lastReviewed: z.string().optional().describe('The date the flashcard was last reviewed in ISO format (YYYY-MM-DD).'),
  easinessFactor: z.number().optional().describe('The easiness factor from the spaced repetition algorithm.'),
  repetitions: z.number().optional().describe('The number of times the flashcard has been reviewed.'),
  interval: z.number().optional().describe('The interval until the next review in days.'),
});
export type SmartSchedulerInput = z.infer<typeof SmartSchedulerInputSchema>;

const SmartSchedulerOutputSchema = z.object({
  nextReviewDate: z.string().describe('The recommended next review date in ISO format (YYYY-MM-DD).'),
  reasoning: z.string().describe('The AI reasoning behind the scheduled date.'),
});
export type SmartSchedulerOutput = z.infer<typeof SmartSchedulerOutputSchema>;

export async function smartScheduler(input: SmartSchedulerInput): Promise<SmartSchedulerOutput> {
  return smartSchedulerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartSchedulerPrompt',
  input: {schema: SmartSchedulerInputSchema},
  output: {schema: SmartSchedulerOutputSchema},
  prompt: `You are a smart scheduler AI that recommends review times for flashcards using the principles of spaced repetition to optimize memory retention.

  Given the flashcard content, the date it was last reviewed, the easiness factor, number of repetitions, and interval, determine the optimal date for the next review.

  Flashcard Content: {{{flashcardContent}}}
  Last Reviewed Date: {{#if lastReviewed}}{{{lastReviewed}}}{{else}}Never{{/if}}
  Easiness Factor: {{#if easinessFactor}}{{{easinessFactor}}}{{else}}2.5{{/if}}
  Repetitions: {{#if repetitions}}{{{repetitions}}}{{else}}0{{/if}}
  Interval: {{#if interval}}{{{interval}}}{{else}}1{{/if}}

  Consider these factors when determining the next review date:
  - The content of the flashcard.
  - How easily the user recalls the information.
  - The principles of spaced repetition.
  - If the lastReviewed parameter is missing, assume this flashcard has never been reviewed, and the first review should be scheduled soon.

  Return the next review date in ISO format (YYYY-MM-DD) and a brief explanation of your reasoning.

  Output the next review date and reasoning in JSON format:
  { "nextReviewDate": "YYYY-MM-DD", "reasoning": "explanation" }

  Make sure the date is valid.
`,
});

const smartSchedulerFlow = ai.defineFlow(
  {
    name: 'smartSchedulerFlow',
    inputSchema: SmartSchedulerInputSchema,
    outputSchema: SmartSchedulerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
