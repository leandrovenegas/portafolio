import { NextResponse } from 'next/server';
import { fetchBunnyVideos } from '@/lib/bunny';

// Cache the full video list in memory to avoid repeated Bunny API calls
let cachedVideos = null;
let cacheTime = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing id param' }, { status: 400 });
    }

    // Serve from memory cache when possible
    const now = Date.now();
    if (!cachedVideos || now - cacheTime > CACHE_TTL_MS) {
      cachedVideos = await fetchBunnyVideos();
      cacheTime = now;
    }

    const video = cachedVideos.find((v) => v.id === id);

    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    return NextResponse.json({ slug: video.slug, title: video.title }, {
      headers: {
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
