import localVideos from '@/data/videos';

const BUNNY_LIBRARY_ID   = process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID;
const BUNNY_API_KEY      = process.env.BUNNY_API_KEY;
const BUNNY_CDN_HOSTNAME = process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME || 'vz-a158839f-ce6.b-cdn.net';
const BASE_URL           = 'https://video.bunnycdn.com';
// Used to build absolute thumbnail proxy URLs for Schema.org
const SITE_URL           = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.leandrovenegas.cl';

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

/**
 * Normalize any date string to a full ISO-8601 datetime with UTC timezone.
 * Google requires: YYYY-MM-DDTHH:mm:ssZ  (or +HH:MM offset)
 * It rejects bare dates like "2024-01-15" or dates without timezone.
 */
function toISOWithTimezone(dateValue) {
  if (!dateValue) return new Date().toISOString(); // e.g. "2026-04-27T12:00:00.000Z"
  const d = new Date(dateValue);
  if (Number.isNaN(d.getTime())) return new Date().toISOString();
  return d.toISOString(); // always "YYYY-MM-DDTHH:mm:ss.sssZ"
}

function mapVideo(video) {
  const videoId = getVideoId(video);
  const title = video.title || video.name || `Video ${videoId}`;

  // CDN URL: used for <img> tags inside the app (fast, direct)
  const thumbnailCdnUrl = video.thumbnailFileName
    ? `https://${BUNNY_CDN_HOSTNAME}/${videoId}/${video.thumbnailFileName}`
    : `https://${BUNNY_CDN_HOSTNAME}/${videoId}/thumbnail.jpg`;

  // Proxy URL: used in Schema.org (Google can always access it, no CDN hotlink blocking)
  const thumbnailUrl = `${SITE_URL}/api/thumbnail/${videoId}`;

  // Use CDN URL for display if explicit override exists, else proxy for schema
  const displayThumbnail =
    video.thumbnailUrl || video.thumbnail || video.videoThumbnailUrl || thumbnailCdnUrl;

  // description must never be empty (Google flags it as a non-critical error)
  const description =
    video.description ||
    video.summary ||
    `${title} — video producido por Leandro Venegas, director creativo audiovisual en Chile.`;

  // uploadDate must be a full ISO-8601 datetime string with UTC timezone
  const rawDate = video.dateUploaded || video.uploadedAt || video.createdAt || video.uploadDate;
  const uploadDate = toISOWithTimezone(rawDate);

  return {
    id: videoId,
    title,
    description,
    duration: formatDuration(video.duration || video.lengthInSeconds || video.length || 0),
    uploadDate,
    thumbnailUrl,        // proxy URL → safe for Schema.org / Google
    thumbnailCdnUrl: displayThumbnail, // direct CDN → fast for <img> in the app
    thumbnailAlt: video.thumbnailAlt || title,
    bunnyLibraryId: BUNNY_LIBRARY_ID,
    bunnyVideoId: videoId,
    embedUrl: `https://iframe.mediadelivery.net/embed/${BUNNY_LIBRARY_ID}/${videoId}`,
    contentUrl: `https://${BUNNY_CDN_HOSTNAME}/${videoId}/playlist.m3u8`,
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
