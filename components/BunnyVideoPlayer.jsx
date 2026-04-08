'use client';

import Script from 'next/script';

const BUNNY_CDN = 'https://cdn.bunny.net';

export default function BunnyVideoPlayer({
  videoId,
  title,
  description = '',
  thumbnail,
  className = '',
  uploadDate,
  duration
}) {
  const libraryId = process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID;

  if (!libraryId || libraryId === 'your-bunny-library-id') {
    console.warn('BunnyVideoPlayer: NEXT_PUBLIC_BUNNY_LIBRARY_ID not configured');
    return null;
  }

  const videoObject = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title,
    description: description,
    thumbnailUrl: thumbnail,
    uploadDate: uploadDate || new Date().toISOString().split('T')[0],
    duration: duration || 'PT0M0S',
    contentUrl: `https://cdn.bunny.net/video/${videoId}`,
    embedUrl: `https://player.bunny.net/${videoId}?libraryId=${libraryId}`
  };

  const iframeSrc = `${BUNNY_CDN}/embed/${videoId}?libraryId=${libraryId}&autoplay=false&mute=false&title=false&logo=false&skippable=false`;

  return (
    <div className={`w-full max-w-full overflow-hidden rounded-lg bg-black shadow-lg aspect-video relative ${className}`}>
      <Script
        id={`video-schema-${videoId}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoObject) }}
      />
      <iframe
        src={iframeSrc}
        title={title}
        loading="lazy"
        allow="autoplay; fullscreen"
        allowFullScreen
        className="absolute inset-0 w-full h-full border-0"
      />
    </div>
  );
}
