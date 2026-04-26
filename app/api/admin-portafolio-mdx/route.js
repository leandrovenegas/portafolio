import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'app', 'content');

// GET /api/admin-portafolio-mdx?slug=incoludido
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 });

  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return NextResponse.json({ content });
  } catch {
    return NextResponse.json({ content: '' });
  }
}

// PUT /api/admin-portafolio-mdx
export async function PUT(request) {
  try {
    const { slug, content } = await request.json();
    if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 });

    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
    await fs.writeFile(filePath, content, 'utf-8');
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
