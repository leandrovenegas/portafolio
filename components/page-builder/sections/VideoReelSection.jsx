'use client';

import VideoPlayer from '@/components/VideoPlayer';

export default function VideoReelSection({
  title = "Mira mi estilo de creación de videos",
  videoGuid = "f8a865ba-05c8-4a1d-8ebc-958f0c944f58",
  forceBp = null
}) {
  return (
    <section className="w-full py-16 md:py-24 flex flex-col items-center gap-10">
      {title && (
        <h2 
          data-field="title"
          className="font-display text-4xl md:text-5xl text-ink text-center max-w-3xl tracking-tight uppercase"
        >
          {title}
        </h2>
      )}
      <div className="w-full max-w-[340px] px-4 md:px-0 mx-auto">
        <div className="relative rounded-2xl overflow-hidden border border-border/40 shadow-[0_0_50px_rgba(255,204,0,0.08)] bg-black/60 aspect-[9/16] transition-all duration-500 hover:border-accent/30 hover:shadow-[0_0_60px_rgba(255,204,0,0.12)]">
          <VideoPlayer
            src={videoGuid}
            title={title}
            hideLink={true}
            autoplay={false}
            muted={false}
            unstyled={true}
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
      </div>
    </section>
  );
}
