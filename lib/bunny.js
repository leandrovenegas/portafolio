import localVideos from '@/data/videos';

const BUNNY_LIBRARY_ID = process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID;
const BUNNY_API_KEY = process.env.BUNNY_API_KEY;
const BUNNY_CDN_HOSTNAME = process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME || 'vz-a158839f-ce6.b-cdn.net';
const BASE_URL = 'https://video.bunnycdn.com';

function slugify(value) {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\.[a-z0-9]{2,4}$/i, '') // strip file extension (e.g. .mp4)
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function makeUniqueSlugs(videos) {
  const used = new Map();
  return videos.map((video) => {
    const base = slugify(video.title || video.bunnyVideoId || video.id || 'video');
    let slug = base;
    let count = 1;

    while (used.has(slug)) {
      count += 1;
      slug = `${base}-${count}`;
    }

    used.set(slug, true);
    return { ...video, slug };
  });
}

function formatDuration(seconds) {
  if (!seconds || Number.isNaN(Number(seconds))) {
    return 'PT0S';
  }

  const total = Number(seconds);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  const parts = [];

  if (hours > 0) parts.push(`${hours}H`);
  if (minutes > 0) parts.push(`${minutes}M`);
  if (secs > 0 || (!hours && !minutes)) parts.push(`${secs}S`);

  return `PT${parts.join('')}`;
}

function getVideoId(video) {
  return video.videoId || video.id || video.guid || video._id || video.identifier;
}

function mapVideo(video) {
  const videoId = getVideoId(video);
  const title = video.title || video.name || `Video ${videoId}`;
  const bunnyThumbnail = video.thumbnailFileName 
    ? `https://${BUNNY_CDN_HOSTNAME}/${videoId}/${video.thumbnailFileName}` 
    : `https://${BUNNY_CDN_HOSTNAME}/${videoId}/thumbnail.jpg`;

  const thumbnailUrl =
    video.thumbnailUrl || video.thumbnail || video.videoThumbnailUrl || bunnyThumbnail || '/images/thumb-session04.jpg';

  return {
    id: videoId,
    title,
    description: video.description || video.summary || '',
    duration: formatDuration(video.duration || video.lengthInSeconds || video.length || 0),
    uploadDate:
      video.uploadDate || video.uploadedAt || video.createdAt || new Date().toISOString().split('T')[0],
    thumbnailUrl,
    thumbnailAlt: video.thumbnailAlt || title,
    bunnyLibraryId: BUNNY_LIBRARY_ID,
    bunnyVideoId: videoId,
    embedUrl: `https://iframe.mediadelivery.net/embed/${BUNNY_LIBRARY_ID}/${videoId}`,
    contentUrl: `https://${BUNNY_CDN_HOSTNAME}/${BUNNY_LIBRARY_ID}/${videoId}/playlist.m3u8`,
    organization: video.organization || video.channel || '',
    organizationSlug: slugify(video.organization || video.channel || ''),
    category: video.category || video.genre || 'Video',
    tags: Array.isArray(video.tags) ? video.tags : [],
    views: Math.floor(Math.random() * (7000 - 500 + 1)) + 500,
    isViewingPage: true,
  };
}

export async function fetchBunnyVideos() {
  if (!BUNNY_LIBRARY_ID || !BUNNY_API_KEY) {
    console.warn('Bunny API not configured: using local video fallback');
    return localVideos;
  }

  try {
    const response = await fetch(`${BASE_URL}/library/${BUNNY_LIBRARY_ID}/videos?page=1&perPage=100`, {
      headers: {
        Accept: 'application/json',
        AccessKey: BUNNY_API_KEY,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Bunny API error: ${response.status} ${response.statusText} ${text}`);
    }

    const json = await response.json();
    const items = Array.isArray(json) ? json : json.items || json.data || json.videos || [];
    const normalized = items.map(mapVideo);
    return makeUniqueSlugs(normalized);
  } catch (error) {
    console.warn('Bunny API fetch failed, using local fallback:', error.message);
    return localVideos;
  }
}
