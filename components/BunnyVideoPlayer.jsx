'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const CDN_HOSTNAME = process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME || 'vz-a158839f-ce6.b-cdn.net';
const EMBED_BASE = 'https://iframe.mediadelivery.net/embed';

/** Fallback slugify — used only when API resolution fails */
function slugify(value) {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\.[a-z0-9]{2,4}$/i, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function BunnyVideoPlayer({
  videoId,
  title,
  description = '',
  thumbnail,
  className = '',
  style = {},
  uploadDate,
  duration,
  /** Optional: pre-computed slug to skip API lookup */
  slug,
  muted = false,
  autoplay = false,
  hideLink = false,
  unstyled = false,
}) {
  const libraryId = process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID;
  const validLibraryId = Boolean(libraryId && libraryId !== 'your-bunny-library-id');

  // Resolve the real slug from Bunny API (videoId is the source of truth)
  const [resolvedSlug, setResolvedSlug] = useState(slug || null);

  useEffect(() => {
    // If slug was passed explicitly, no need to fetch
    if (slug) return;

    let cancelled = false;
    fetch(`/api/bunny-video-slug?id=${videoId}`)
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (!cancelled && data?.slug) {
          setResolvedSlug(data.slug);
        }
      })
      .catch(() => {
        // Silently fall back to title-derived slug
      });

    return () => { cancelled = true; };
  }, [videoId, slug]);

  // Fallback slug from title until API resolves
  const effectiveSlug = resolvedSlug || slugify(title || videoId);
  const viewingPageHref = `/videos/${effectiveSlug}`;

  const thumbnailUrl = thumbnail || `https://${CDN_HOSTNAME}/${videoId}/thumbnail.jpg`;
  const contentUrl   = `https://${CDN_HOSTNAME}/${videoId}/playlist.m3u8`;
  const embedUrl = validLibraryId ? `${EMBED_BASE}/${libraryId}/${videoId}` : '';
  const iframeSrc = validLibraryId
    ? `${embedUrl}?autoplay=${autoplay}&muted=${muted}&preload=false&title=false&logo=false&color=3B82F6`
    : '';
    

  // uploadDate: must be full ISO-8601 with timezone (Google requirement)
  const safeUploadDate = uploadDate
    ? new Date(uploadDate).toISOString()
    : new Date('2024-01-01T00:00:00Z').toISOString();

  // description: must not be empty (Google flags it as a non-critical error)
  const safeDescription = description ||
    `${title} — video producido por Leandro Venegas, director creativo audiovisual en Chile.`;

  const videoObject = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title,
    description: safeDescription,
    thumbnailUrl,
    uploadDate: safeUploadDate,
    duration: duration || 'PT0S',
    contentUrl,
    embedUrl,
  };

  if (unstyled) {
    return (
      <>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoObject) }}
        />
        {validLibraryId && (
          <iframe
            src={iframeSrc}
            title={title}
            loading="lazy"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className={className}
            style={style}
          />
        )}
      </>
    );
  }

  return (
    <div className={`w-full max-w-full overflow-hidden my-6 ${className}`} style={style}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoObject) }}
      />

      {/* Video player */}
      <div className="relative w-full bg-black rounded-lg shadow-lg aspect-video overflow-hidden">
        {validLibraryId && (
          <iframe
            src={iframeSrc}
            title={title}
            loading="lazy"
            allow="autoplay; fullscreen"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        )}
      </div>

      {/* Link to the dedicated viewing page — required for Google Video Indexing */}
      {!hideLink && (
        <div className="mt-2 flex items-center justify-between gap-4 px-1">
          {title && (
            <span className="font-body text-sm text-muted line-clamp-1">{title}</span>
          )}
          <Link
            href={viewingPageHref}
            className="shrink-0 inline-flex items-center gap-1 font-mono text-xs text-accent hover:text-ink transition-colors"
            title={`Ver "${title}" en página completa`}
          >
            Ver página del video →
          </Link>
        </div>
      )}
    </div>
  );
}