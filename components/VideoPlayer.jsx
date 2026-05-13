import BunnyVideoPlayer from './BunnyVideoPlayer';

const BUNNY_VIDEO_ID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default function VideoPlayer({ src, poster, ariaLabel, className = "", title, description }) {
  if (src && BUNNY_VIDEO_ID_REGEX.test(src.trim())) {
    return (
      <BunnyVideoPlayer
        videoId={src.trim()}
        title={title || ariaLabel || 'Video'}
        description={description || ''}
        thumbnail={poster}
        className={className}
      />
    );
  }

  return (
    <div className={`w-full max-w-full overflow-hidden rounded-lg bg-black shadow-lg aspect-video relative ${className}`}>
      <video
        controls
        poster={poster}
        className="w-full h-full object-contain"
        aria-label={ariaLabel}
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>
    </div>
  );
}
