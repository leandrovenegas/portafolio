import Nav from '@/components/Nav';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import VideoPageViewer from '@/components/VideoPageViewer';
import { fetchBunnyVideos } from '@/lib/bunny';
import { readVideoConfig } from '@/lib/videoConfig';
import MediaPreconnect from '@/components/MediaPreconnect';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const videos = await fetchBunnyVideos();
  const config = await readVideoConfig();
  const configMap = new Map((config.videos || []).map((item) => [item.videoId, item]));
  const enabledVideos = videos.filter((video) => configMap.get(video.id)?.enabled);
  const video = enabledVideos.find((v) => v.slug === slug);

  if (!video) {
    return { title: 'Video no encontrado' };
  }

  return {
    title: `${video.title} | Leandro Venegas`,
    description: video.description,
    alternates: {
      canonical: `https://www.leandrovenegas.cl/videos/${video.slug}`,
    },
    openGraph: {
      title: video.title,
      description: video.description,
      type: 'video.other',
      url: `https://www.leandrovenegas.cl/videos/${video.slug}`,
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

export default async function VideoPage({ params }) {
  const { slug } = await params;
  const videos = await fetchBunnyVideos();
  const config = await readVideoConfig();
  const configMap = new Map((config.videos || []).map((item) => [item.videoId, item]));
  const enabledVideos = videos.filter((video) => configMap.get(video.id)?.enabled);
  const video = enabledVideos.find((v) => v.slug === slug);

  if (!video) {
    notFound();
  }

  const relatedVideos = enabledVideos
    .filter((v) => v.organizationSlug === video.organizationSlug && v.slug !== video.slug)
    .slice(0, 3);

  const pageUrl = `https://www.leandrovenegas.cl/videos/${slug}`;
  const videoSchema = {
    '@context': 'https://schema.org/',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    duration: video.duration,
    contentUrl: video.contentUrl,
    embedUrl: video.embedUrl,
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/WatchAction',
      userInteractionCount: video.views,
    },
    isPartOf: {
      '@type': 'WebPage',
      url: pageUrl,
      isPartOfWebSite: {
        '@type': 'WebSite',
        name: 'Leandro Venegas',
        url: 'https://www.leandrovenegas.cl',
      },
    },
  };

  return (
    <>
      <MediaPreconnect bunny />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      <Nav />
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-5xl flex flex-col gap-16 md:gap-24">
          <div className="pt-12">
            <Link
              href="/videos"
              className="inline-flex items-center gap-2 text-accent hover:text-ink transition-colors text-sm font-mono"
            >
              <span>←</span> Volver a videos
            </Link>
          </div>

          <section className="w-full">
            <VideoPageViewer video={video} />
          </section>

          {relatedVideos.length > 0 && (
            <section className="w-full border-t border-border pt-16">
              <h2 className="font-display text-2xl md:text-3xl text-ink mb-8">
                Más videos de {video.organization}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedVideos.map((relatedVideo) => (
                  <Link
                    key={relatedVideo.id}
                    href={`/videos/${relatedVideo.slug}`}
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
    </>
  );
}
