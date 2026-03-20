export default function VideoPlayer({ src, poster, ariaLabel, className = "" }) {
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
