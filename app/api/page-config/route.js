import { NextResponse } from 'next/server';
import { readPageConfig, writePageConfig } from '@/lib/pageConfig';

export async function GET() {
  try {
    const config = await readPageConfig();
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Error fetching page config' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const updates = await request.json(); // Expected: { pageKey: 'videos', title: '...', description: '...' }
    const { pageKey, title, description } = updates;

    if (!pageKey) {
      return NextResponse.json({ error: 'Falta pageKey' }, { status: 400 });
    }

    const currentConfig = await readPageConfig();

    if (!currentConfig.pages) {
      currentConfig.pages = {};
    }

    currentConfig.pages[pageKey] = {
      ...(currentConfig.pages[pageKey] || {}),
      title: title ?? currentConfig.pages[pageKey]?.title,
      description: description ?? currentConfig.pages[pageKey]?.description,
    };

    const newConfig = await writePageConfig(currentConfig);
    return NextResponse.json(newConfig);
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Error updating page config' }, { status: 500 });
  }
}
