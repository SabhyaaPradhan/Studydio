
'use server';
import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatWithContentInputSchema = z.object({
  content: z.string().describe('The source content the user is asking about.'),
  question: z.string().describe("The user's question about the content."),
  history: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      content: z.string(),
    })
  ).optional().describe('The previous chat history.'),
});

export type ChatWithContentInput = z.infer<typeof ChatWithContentInputSchema>;

const ChatWithContentOutputSchema = z.object({
  answer: z.string().describe("The AI-generated answer to the user's question."),
});

export type ChatWithContentOutput = z.infer<typeof ChatWithContentOutputSchema>;

// Define the flow FIRST
const chatWithContentFlow = ai.defineFlow(
  {
    name: 'chatWithContentFlow',
    inputSchema: ChatWithContentInputSchema,
    outputSchema: ChatWithContentOutputSchema,
  },
  async (input: ChatWithContentInput): Promise<ChatWithContentOutput> => {
    const systemPrompt = `
You are an expert AI tutor. Answer the user's question using ONLY the provided content below.
Be concise, factual, and context-aware.

Content:
---
${input.content}
---
`;

    const userMessage = { role: 'user' as const, content: input.question };

    try {
      const response = await ai.generate({
        system: systemPrompt,
        prompt: [...(input.history || []), userMessage],
        model: 'googleai/gemini-1.5-flash',
      });

      // Genkit v1.x returns response.text for the generated string.
      return { answer: response.text };

    } catch (error: any) {
      console.error('AI generation failed:', error);
      return { answer: "Sorry, I couldn’t process your question right now." };
    }
  }
);

// Export the callable function
export async function chatWithContent(
  input: ChatWithContentInput
): Promise<ChatWithContentOutput> {
  return await chatWithContentFlow(input);
}
