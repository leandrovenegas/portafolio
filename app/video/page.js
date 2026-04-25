import Nav from '@/components/Nav';
import Link from 'next/link';
import videos from '@/data/videos';

export const metadata = {
  title: 'Videos | Leandro Venegas',
  description:
    'Galería de videos: Sesiones en vivo, tutoriales, spots audiovisuales y producciones de Leandro Venegas.',
  alternates: {
    canonical: 'https://www.leandrovenegas.cl/video',
  },
};

export default function VideosPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-5xl flex flex-col gap-16 md:gap-24">
          {/* Header */}
          <header className="pt-12 md:pt-24 flex flex-col items-start gap-4 border-b border-border pb-16">
            <p className="font-mono text-accent text-sm md:text-base tracking-wide">
              Visualizador de Contenido
            </p>
            <h1 className="font-display text-display-md md:text-display-lg text-ink leading-[0.9] max-w-4xl">
              Videos
            </h1>
            <p className="font-body text-mid text-xl md:text-2xl max-w-2xl leading-relaxed">
              Colección de producciones audiovisuales, sesiones en vivo y tutoriales.
            </p>
          </header>

          {/* Videos Grid */}
          <section className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <Link
                  key={video.id}
                  href={`/video/${video.slug}`}
                  className="group flex flex-col gap-4 hover:opacity-80 transition-opacity duration-200"
                >
                  {/* Thumbnail */}
                  <div className="relative w-full pb-[56.25%] bg-s1 rounded-lg overflow-hidden border border-border group-hover:border-accent transition-colors">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.thumbnailAlt}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Play Button Overlay */}
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

                  {/* Content */}
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

      {/* Schema.org Collection Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Videos - Leandro Venegas',
            url: 'https://leandrovenegas.cl/video',
            description: metadata.description,
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: videos.map((video, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `https://leandrovenegas.cl/video/${video.slug}`,
              })),
            },
          }),
        }}
      />
    </>
  );
}
