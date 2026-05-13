import { NextResponse } from 'next/server';

const CDN_HOSTNAME = process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME || 'vz-a158839f-ce6.b-cdn.net';

/**
 * GET /api/thumbnail/[videoId]
 *
 * Proxies Bunny CDN thumbnails through the site's own domain.
 * This ensures Google (and other crawlers) can always access thumbnails,
 * even if the Bunny pull zone has hotlink protection or token auth enabled.
 *
 * The thumbnail URL in Schema.org VideoObject points here:
 *   https://www.leandrovenegas.cl/api/thumbnail/{videoId}
 */
export async function GET(request, { params }) {
  const { videoId } = await params;

  if (!videoId) {
    return NextResponse.json({ error: 'Missing videoId' }, { status: 400 });
  }

  // Try thumbnail.jpg first, then fall back to other common names
  const candidates = [
    `https://${CDN_HOSTNAME}/${videoId}/thumbnail.jpg`,
    `https://${CDN_HOSTNAME}/${videoId}/thumbnails/thumbnail.jpg`,
  ];

  for (const url of candidates) {
    try {
      const res = await fetch(url, {
        headers: {
          // No Referer — mimics a direct request, bypasses some hotlink checks
          'User-Agent': 'Leandro-Portfolio-Bot/1.0',
        },
        // 5 second timeout
        signal: AbortSignal.timeout(5000),
      });

      if (res.ok && res.headers.get('content-type')?.startsWith('image/')) {
        const imageBuffer = await res.arrayBuffer();
        const contentType = res.headers.get('content-type') || 'image/jpeg';

        return new NextResponse(imageBuffer, {
          status: 200,
          headers: {
            'Content-Type': contentType,
            // Cache for 7 days — thumbnails rarely change
            'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
          },
        });
      }
    } catch {
      // Try next candidate
    }
  }

  // All candidates failed — redirect to a static fallback
  return NextResponse.redirect(new URL('/images/thumb-fallback.jpg', request.url));
}
