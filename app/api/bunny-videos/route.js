import { NextResponse } from 'next/server';
import { fetchBunnyVideos } from '@/lib/bunny';
import { readVideoConfig } from '@/lib/videoConfig';

export async function GET() {
  try {
    const videos = await fetchBunnyVideos();
    const config = await readVideoConfig();
    const configMap = new Map((config.videos || []).map((item) => [String(item.videoId), item]));

    const mapped = videos.map((video) => ({
      ...video,
      enabled: configMap.get(String(video.id))?.enabled ?? false,
      indexable: configMap.get(String(video.id))?.indexable ?? true,
    }));

    return NextResponse.json({ videos: mapped });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Error fetching Bunny videos' }, { status: 500 });
  }
}
