import Nav from '@/components/Nav';
import Link from 'next/link';
import { fetchBunnyVideos } from '@/lib/bunny';
import { readVideoConfig } from '@/lib/videoConfig';
import { readPageConfig } from '@/lib/pageConfig';
import MediaPreconnect from '@/components/MediaPreconnect';
import HeroVideo from '@/components/HeroVideo';

export const metadata = {
  title: 'Videos | Leandro Venegas',
  description:
    'Galería de videos seleccionados para mostrar en la página de video de Leandro Venegas.',
  alternates: {
    canonical: 'https://www.leandrovenegas.cl/videos',
  },
  other: {
    // Preconnect hints only where Bunny CDN thumbnails are actually loaded
    'link:preconnect-bunny-cdn': 'https://vz-a158839f-ce6.b-cdn.net',
    'link:preconnect-bunny-iframe': 'https://iframe.mediadelivery.net',
  },
};

export const dynamic = 'force-dynamic';

export default async function VideosPage() {
  const [videos, config, pageConfig] = await Promise.all([fetchBunnyVideos(), readVideoConfig(), readPageConfig()]);
  const pageText = pageConfig?.pages?.videos || {
    title: 'Videos',
    description: 'Colección de videos seleccionados para tu página. Solo se muestran los videos activados en el panel de configuración.'
  };
  const configMap = new Map((config.videos || []).map((item) => [String(item.videoId), item]));
  const visibleVideos = videos
    .filter((video) => configMap.get(String(video.id))?.enabled)
    .map((video) => {
      const videoConfig = configMap.get(String(video.id));
      return {
        ...video,
        position: videoConfig?.position ?? 999,
      };
    })
    .sort((a, b) => a.position - b.position);

  return (
    <>
      <MediaPreconnect bunny />
      <Nav />
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        {/* HERO DINÁMICO DE VIDEOS */}
        <HeroVideo
          mobileAV1={`https://${process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME || 'vz-a158839f-ce6.b-cdn.net'}/a6075da8-cbd7-4220-b2f9-e3aa3ebc6997/original`}
          mobileVP9={`https://${process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME || 'vz-a158839f-ce6.b-cdn.net'}/96e06cc2-82ec-431f-8898-eeb0f8a47f9d/original`}
          mobileH264={`https://${process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME || 'vz-a158839f-ce6.b-cdn.net'}/0445fa0f-4e22-4cae-b55c-add19fdcb85b/play_720p.mp4`}
          desktopAV1=""
          desktopVP9=""
          desktopH264=""
          posterSrc="/images/og-portafolio.jpg"
        >
          <p className="font-mono text-accent text-sm md:text-base tracking-wide mb-4">
            Visualizador de Contenido
          </p>
          <h1 className="font-display text-display-md md:text-display-lg text-ink leading-[0.9] max-w-5xl mb-8">
            {pageText.title}
          </h1>
          <p className="font-body text-mid text-xl md:text-2xl max-w-2xl leading-relaxed">
            {pageText.description}
          </p>
        </HeroVideo>

        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-5xl flex flex-col gap-16 md:gap-24">

          <section className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleVideos.map((video) => (
                  <Link
                    key={video.id}
                    href={`/videos/${video.slug}`}
                    className="group flex flex-col gap-4 hover:opacity-80 transition-opacity duration-200"
                  >
                    <div className="relative w-full pb-[56.25%] bg-s1 rounded-lg overflow-hidden border border-border group-hover:border-accent transition-colors">
                      <img
                        src={video.thumbnailCdnUrl || video.thumbnailUrl}
                        alt={video.thumbnailAlt}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors">
                        <div className="w-16 h-16 rounded-full bg-white/80 group-hover:bg-white transition-colors flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-black ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-display text-lg text-ink group-hover:text-accent transition-colors">
                        {video.title}
                      </h3>
                      <p className="font-body text-sm text-muted line-clamp-2">
                        {video.description}
                      </p>
                      <div className="flex items-center justify-between text-xs font-mono text-muted">
                        <span>{video.category}</span>
                        <span>{video.views?.toLocaleString('es-ES')} vistas</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
          </section>
        </div>
      </main>
    </>
  );
}
