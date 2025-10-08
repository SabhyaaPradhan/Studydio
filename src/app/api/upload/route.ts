
import { NextRequest, NextResponse } from 'next/server';
import pdf from 'pdf-parse';


export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (file.type !== 'application/pdf') {
        return NextResponse.json({ error: 'Only PDF files are supported' }, { status: 400 });
    }
    
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    
    const data = await pdf(fileBuffer);
    
    return NextResponse.json({ content: data.text });

  } catch (error) {
    console.error('Error processing upload:', error);
    return NextResponse.json({ error: 'Failed to process uploaded PDF file' }, { status: 500 });
  }
}
