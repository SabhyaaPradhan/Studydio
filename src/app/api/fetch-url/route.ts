
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'node-html-parser';
import { YoutubeTranscript } from 'youtube-transcript';


async function getTextFromUrl(url: string) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const doc = parse(html);
        // Remove script and style tags
        doc.querySelectorAll('script, style').forEach(node => node.remove());
        // Get text from body, or fallback to root
        let text = doc.querySelector('body')?.innerText;
        if (!text) {
          text = doc.innerText;
        }
        // Basic cleanup
        return text.replace(/\s\s+/g, ' ').trim();
    } catch (error) {
        console.error('Error fetching or parsing URL:', error);
        throw new Error('Failed to fetch and parse content from the URL.');
    }
}

async function getTranscriptFromYouTube(url: string) {
    try {
        const transcript = await YoutubeTranscript.fetchTranscript(url);
        return transcript.map(item => item.text).join(' ');
    } catch (error) {
        console.error('Error fetching YouTube transcript:', error);
        throw new Error('Failed to fetch transcript. The video might not have transcripts enabled.');
    }
}

function isYouTubeUrl(url: string): boolean {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return youtubeRegex.test(url);
}


export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }
    
    let content = '';
    if (isYouTubeUrl(url)) {
        console.log(`Fetching transcript from YouTube URL: ${url}`);
        content = await getTranscriptFromYouTube(url);
    } else {
        console.log(`Fetching text content from: ${url}`);
        content = await getTextFromUrl(url);
    }

    return NextResponse.json({ content });

  } catch (error: any) {
    console.error('Error handling URL:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch content from URL' }, { status: 500 });
  }
}
