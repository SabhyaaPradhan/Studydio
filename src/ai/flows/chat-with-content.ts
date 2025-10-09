'use server';
/**
 * @fileOverview An AI tutor that can answer questions about provided content.
 *
 * - chatWithContent - A function that handles the chat interaction.
 * - ChatWithContentInput - The input type for the chatWithContent function.
 * - ChatWithContentOutput - The return type for the chatWithContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatWithContentInputSchema = z.object({
  content: z.string().describe('The source content the user is asking about.'),
  question: z.string().describe("The user's question about the content."),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional().describe('The previous chat history.')
});
export type ChatWithContentInput = z.infer<typeof ChatWithContentInputSchema>;


const ChatWithContentOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the user\'s question.'),
});
export type ChatWithContentOutput = z.infer<typeof ChatWithContentOutputSchema>;


export async function chatWithContent(input: ChatWithContentInput): Promise<ChatWithContentOutput> {
  return chatWithContentFlow(input);
}


const chatWithContentFlow = ai.defineFlow(
  {
    name: 'chatWithContentFlow',
    inputSchema: ChatWithContentInputSchema,
    outputSchema: ChatWithContentOutputSchema,
  },
  async (input) => {

    const systemPrompt = `You are an expert AI tutor. Your goal is to help the user understand the following content. Answer the user's questions based ONLY on the provided text. Do not use any outside knowledge. Keep your answers concise and directly related to the user's question.

Content:
---
${input.content}
---

`;

    const { output } = await ai.generate({
      prompt: [
        ...(input.history || []),
        { role: 'user', content: `${input.history?.length === 0 ? systemPrompt : ''}${input.question}` },
      ],
      model: 'googleai/gemini-2.5-flash',
    });
    
    return {
      answer: output.text,
    };
  }
);
