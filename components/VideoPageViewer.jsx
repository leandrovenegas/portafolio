'use client';

import React from 'react';

const VideoPageViewer = ({ video }) => {
  if (!video) {
    return <div>Video no encontrado</div>;
  }

  const embedUrl = video.embedUrl ||
    (video.bunnyLibraryId && video.bunnyVideoId
      ? `https://iframe.bunny.net/${video.bunnyLibraryId}/${video.bunnyVideoId}`
      : '');

  return (
    <div className="w-full">
      {/* Video Viewer - 16:9 aspect ratio */}
      <div className="relative w-full pb-[56.25%] bg-black rounded-lg overflow-hidden mb-8">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={embedUrl}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Video Title */}
      <h1 className="font-display text-display-sm md:text-display-md text-ink mb-4">
        {video.title}
      </h1>

      {/* Video Metadata */}
      <div className="flex flex-wrap gap-4 mb-6 text-muted text-sm">
        <span className="font-mono">
          {new Date(video.uploadDate).toLocaleDateString('es-ES')}
        </span>
        <span className="font-mono">
          {video.views?.toLocaleString('es-ES')} vistas
        </span>
        {video.organization && (
          <span className="font-mono">
            Por: <a href={`/organizaciones?org=${video.organizationSlug}`} className="text-accent hover:underline">
              {video.organization}
            </a>
          </span>
        )}
      </div>

      {/* Category Tags */}
      {video.tags && (
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="inline-block px-3 py-1 bg-s1 text-accent text-xs font-mono rounded">
            {video.category}
          </span>
          {video.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block px-3 py-1 bg-s1 text-muted text-xs font-mono rounded hover:bg-s2 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      <div className="prose prose-invert max-w-none mb-8">
        <p className="font-body text-mid text-lg leading-relaxed text-ink">
          {video.description}
        </p>
      </div>

      {/* Video Schema.org Metadata (Hidden but for indexing) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'VideoObject',
            name: video.title,
            description: video.description,
            thumbnailUrl: video.thumbnailUrl,
            uploadDate: video.uploadDate,
            duration: video.duration,
            contentUrl: video.contentUrl,
            embedUrl: video.embedUrl,
            interactionCount: `${video.views || 0}`,
            isPartOf: {
              '@type': 'WebPage',
              url: typeof window !== 'undefined' ? window.location.href : '',
              isPartOfWebSite: {
                '@type': 'WebSite',
                name: 'Leandro Venegas',
                url: 'https://leandrovenegas.cl',
              },
            },
          }),
        }}
      />
    </div>
  );
};

export default VideoPageViewer;
