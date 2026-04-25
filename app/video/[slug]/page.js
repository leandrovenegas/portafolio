import Nav from '@/components/Nav';
import Link from 'next/link';
import VideoPageViewer from '@/components/VideoPageViewer';
import videos from '@/data/videos';

// Generate static paths para todos los videos
export async function generateStaticParams() {
  return videos.map((video) => ({
    slug: video.slug,
  }));
}

// Generar metadata dinámica para cada video
export async function generateMetadata({ params }) {
  const video = videos.find((v) => v.slug === params.slug);

  if (!video) {
    return {
      title: 'Video no encontrado',
    };
  }

  return {
    title: `${video.title} | Leandro Venegas`,
    description: video.description,
    alternates: {
      canonical: `https://www.leandrovenegas.cl/video/${video.slug}`,
    },
    openGraph: {
      title: video.title,
      description: video.description,
      type: 'video.other',
      url: `https://www.leandrovenegas.cl/video/${video.slug}`,
      images: [
        {
          url: video.thumbnailUrl,
          width: 1280,
          height: 720,
          alt: video.thumbnailAlt,
        },
      ],
      video: {
        url: video.contentUrl,
        type: 'application/x-sharedhtml',
      },
    },
    twitter: {
      card: 'player',
      title: video.title,
      description: video.description,
      image: video.thumbnailUrl,
      player: {
        playerUrl: video.embedUrl,
        streamUrl: video.contentUrl,
        width: 1280,
        height: 720,
      },
    },
  };
}

export default function VideoPage({ params }) {
  const video = videos.find((v) => v.slug === params.slug);

  if (!video) {
    return (
      <>
        <Nav />
        <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
          <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-5xl">
            <div className="py-24 text-center">
              <h1 className="font-display text-display-sm text-ink mb-4">
                Video no encontrado
              </h1>
              <Link href="/video" className="text-accent hover:underline">
                Volver a videos
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  // Encontrar videos relacionados (misma organización)
  const relatedVideos = videos
    .filter(
      (v) =>
        v.organizationSlug === video.organizationSlug && v.slug !== video.slug
    )
    .slice(0, 3);

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-5xl flex flex-col gap-16 md:gap-24">
          {/* Back Button */}
          <div className="pt-12">
            <Link
              href="/video"
              className="inline-flex items-center gap-2 text-accent hover:text-ink transition-colors text-sm font-mono"
            >
              <span>←</span> Volver a videos
            </Link>
          </div>

          {/* Video Viewer */}
          <section className="w-full">
            <VideoPageViewer video={video} />
          </section>

          {/* Related Videos */}
          {relatedVideos.length > 0 && (
            <section className="w-full border-t border-border pt-16">
              <h2 className="font-display text-2xl md:text-3xl text-ink mb-8">
                Más videos de {video.organization}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedVideos.map((relatedVideo) => (
                  <Link
                    key={relatedVideo.id}
                    href={`/video/${relatedVideo.slug}`}
                    className="group flex flex-col gap-4 hover:opacity-80 transition-opacity"
                  >
                    <div className="relative w-full pb-[56.25%] bg-s1 rounded-lg overflow-hidden border border-border group-hover:border-accent transition-colors">
                      <img
                        src={relatedVideo.thumbnailUrl}
                        alt={relatedVideo.thumbnailAlt}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-display text-sm md:text-base text-ink group-hover:text-accent transition-colors">
                      {relatedVideo.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Rich Video Schema.org Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'VideoObject',
            name: video.title,
            description: video.description,
            thumbnailUrl: [video.thumbnailUrl],
            uploadDate: video.uploadDate,
            duration: video.duration,
            contentUrl: video.contentUrl,
            embedUrl: video.embedUrl,
            interactionStatistic: {
              '@type': 'InteractionCounter',
              interactionType: 'https://schema.org/WatchAction',
              userInteractionCount: video.views || 0,
            },
            author: {
              '@type': 'Person',
              name: 'Leandro Venegas',
              url: 'https://leandrovenegas.cl',
            },
            creator: {
              '@type': 'Organization',
              name: video.organization,
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5',
              ratingCount: Math.floor(video.views / 10) || 1,
            },
          }),
        }}
      />
    </>
  );
}
