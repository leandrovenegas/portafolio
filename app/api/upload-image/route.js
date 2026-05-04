import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Build a unique filename
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
    const filename = `${timestamp}_${safeName}`;
    
    // Set up the local directory
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'posters');
    
    // Ensure the directory exists
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    // Write the file locally
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);

    // Return the public URL path
    const publicUrl = `/images/posters/${filename}`;

    return NextResponse.json({ url: publicUrl });
  } catch (err) {
    console.error('Upload route error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
