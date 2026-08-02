'use client';

import VideoPlayer from '@/components/VideoPlayer';

export default function VideoReelSection({
  title = "Pon tu texto aquí",
  subtitle = "Dirección/Edición/IA/Motion graphics  ",
  videoGuid = "f8a865ba-05c8-4a1d-8ebc-958f0c944f58",
  forceBp = null
}) {
  return (
    <section className="w-full py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-items-center">
      {title && (
        <div className="col-span-1 text-center md:text-left w-full">
          <h2 
            data-field="title"
            className="font-display text-4xl md:text-5xl text-ink tracking-tight leading-tight"
          >
            {title}
          </h2>
          {subtitle && (
            <p 
              data-field="subtitle"
              className="mt-4 text-lg md:text-xl text-ink/70 max-w-2xl"
            >
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      <div className="col-span-1 w-full max-w-[340px] px-4 md:px-0 mx-auto">
        <div className="relative rounded-2xl overflow-hidden border border-border/40 shadow-[0_0_50px_rgba(255,204,0,0.08)] bg-black/60 aspect-[9/16] transition-all duration-500 hover:border-accent/30 hover:shadow-[0_0_60px_rgba(255,204,0,0.12)]">
          <VideoPlayer
            src={videoGuid}
            title={title}
            subtitle={subtitle}
            hideLink={true}
            autoplay={false}
            muted={false}
            unstyled={true}
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
