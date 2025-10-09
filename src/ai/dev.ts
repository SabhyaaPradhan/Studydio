import { config } from 'dotenv';
config();

import '@/ai/flows/quiz-generation.ts';
import '@/ai/flows/smart-scheduler.ts';
import '@/ai/flows/generate-study-pack-from-content.ts';
import '@/ai/flows/chat-with-content.ts';
