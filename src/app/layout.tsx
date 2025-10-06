import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import "@/components/Shuffle.css";
import "@/components/FaultyTerminal.css";
import '@/components/ScrollFloat.css';
import "@/components/ScrollReveal.css";
import "@/components/CardSwap.css";
import GlobalPixelTrail from '@/components/GlobalPixelTrail';

const title = "Studydio - Learn anything, 10x faster";
const description = "Paste any content (YouTube link, PDF, article, text) and automatically generate study materials like flashcards, quizzes, and summaries.";
const url = "https://studydio.app";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(url),
  openGraph: {
    title,
    description,
    url,
    siteName: "Studydio",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: description,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
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
        <GlobalPixelTrail />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
