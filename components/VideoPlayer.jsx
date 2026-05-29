import BunnyVideoPlayer from './BunnyVideoPlayer';

const BUNNY_VIDEO_ID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default function VideoPlayer({ 
  src, 
  poster = null, 
  ariaLabel = "", 
  className = "", 
  style = {},
  title = "", 
  description = "",
  muted = false,
  autoplay = false,
  hideLink = false,
  unstyled = false,
}) {
  let videoId = src ? src.trim() : "";
  const bunnyUrlMatch = videoId.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
  if (bunnyUrlMatch && (videoId.includes("b-cdn.net") || videoId.includes("mediadelivery.net") || BUNNY_VIDEO_ID_REGEX.test(videoId))) {
    videoId = bunnyUrlMatch[0];
  }

  if (videoId && BUNNY_VIDEO_ID_REGEX.test(videoId)) {
    return (
      <BunnyVideoPlayer
        videoId={videoId}
        title={title || ariaLabel || 'Video'}
        description={description || ''}
        thumbnail={poster}
        className={className}
        style={style}
        muted={muted}
        autoplay={autoplay}
        hideLink={hideLink}
        unstyled={unstyled}
      />
    );
  }

  if (unstyled) {
    return (
      <video
        controls
        poster={poster}
        className={className}
        style={{ width: '100%', height: '100%', objectFit: 'contain', ...style }}
        aria-label={ariaLabel}
        preload="metadata"
        muted={muted}
        autoPlay={autoplay}
      >
        <source src={src} type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>
    );
  }

  return (
    <div className={`w-full max-w-full overflow-hidden rounded-lg bg-black shadow-lg aspect-video relative ${className}`} style={style}>
      <video
        controls
        poster={poster}
        className="w-full h-full object-contain"
        aria-label={ariaLabel}
        preload="metadata"
        muted={muted}
        autoPlay={autoplay}
      >
        <source src={src} type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>
    </div>
  );
}
