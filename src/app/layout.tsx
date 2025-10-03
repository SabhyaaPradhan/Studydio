import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import "@/components/Shuffle.css";
import "@/components/FaultyTerminal.css";
import "@/components/PixelTrail.css";
import '@/components/ScrollFloat.css';
import "@/components/ScrollReveal.css";
import "@/components/CardSwap.css";


export const metadata: Metadata = {
  title: 'Studydio - Learn anything, 10x faster',
  description: 'Paste any content (YouTube link, PDF, article, text) and automatically generate study materials like flashcards, quizzes, and summaries.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased pb-24">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
