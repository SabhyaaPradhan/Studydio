
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'node-html-parser';


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


export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }
    
    // In a real application, you'd use a library like Cheerio or node-html-parser to scrape the content
    console.log(`Fetching content from ${url}`);
    
    const content = await getTextFromUrl(url);

    return NextResponse.json({ content });

  } catch (error: any) {
    console.error('Error fetching URL:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch content from URL' }, { status: 500 });
  }
}
