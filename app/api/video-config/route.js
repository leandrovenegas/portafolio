import { NextResponse } from 'next/server';
import { readVideoConfig, writeVideoConfig } from '@/lib/videoConfig';

export async function GET() {
  const config = await readVideoConfig();
  return NextResponse.json(config);
}

export async function PATCH(request) {
  const { videoId, enabled, indexable, title, description } = await request.json();
  if (!videoId) {
    return NextResponse.json({ error: 'videoId is required' }, { status: 400 });
  }

  const config = await readVideoConfig();
  const existing = (config.videos || []).find((item) => item.videoId === videoId);

  if (existing) {
    if (typeof enabled === 'boolean') existing.enabled = enabled;
    if (typeof indexable === 'boolean') existing.indexable = indexable;
    if (typeof title === 'string') existing.title = title;
    if (typeof description === 'string') existing.description = description;
  } else {
    config.videos = config.videos || [];
    config.videos.push({
      videoId,
      enabled: typeof enabled === 'boolean' ? enabled : true,
      indexable: typeof indexable === 'boolean' ? indexable : true,
      ...(typeof title === 'string' ? { title } : {}),
      ...(typeof description === 'string' ? { description } : {}),
    });
  }

  await writeVideoConfig(config);
  return NextResponse.json(config);
}

export async function PUT(request) {
  const payload = await request.json();
  const valid = payload && Array.isArray(payload.videos);
  if (!valid) {
    return NextResponse.json({ error: 'Expected videos array' }, { status: 400 });
  }

  const config = {
    videos: payload.videos.map((item) => ({
      videoId: item.videoId,
      enabled: Boolean(item.enabled),
      indexable: Boolean(item.indexable),
      ...(typeof item.title === 'string' ? { title: item.title } : {}),
      ...(typeof item.description === 'string' ? { description: item.description } : {}),
    })),
  };

  await writeVideoConfig(config);
  return NextResponse.json(config);
}
