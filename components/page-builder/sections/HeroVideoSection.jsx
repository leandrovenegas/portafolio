import HeroVideo from "@/components/HeroVideo";

export default function HeroVideoSection({ 
  title, 
  description1, 
  description2, 
  mobileVideoGuid, 
  tabletVideoGuid,
  desktopVideoGuid,
  posterSrc,
  posterAlt,
  forceBp = null,
  backgroundType = 'video',
  backgroundColor = '#121212',
  backgroundGradient = 'linear-gradient(135deg, #1e1b4b 0%, #311042 100%)'
}) {
  return (
    <HeroVideo
      mobileVideoGuid={mobileVideoGuid || ""}
      tabletVideoGuid={tabletVideoGuid || ""}
      desktopVideoGuid={desktopVideoGuid || ""}
      posterSrc={posterSrc || ""}
      alt={posterAlt || title || "Reel Audiovisual"}
      title={title}
      description={description1}
      forceBp={forceBp}
      backgroundType={backgroundType}
      backgroundColor={backgroundColor}
      backgroundGradient={backgroundGradient}
    >
      <h1 data-field="title" className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] mb-8 max-w-5xl font-bold">
        {title}
      </h1>
      {description1 && (
        <p data-field="description1" className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed mb-12 drop-shadow-md text-ink/90">
          {description1}
        </p>
      )}
      {description2 && (
        <p data-field="description2" className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed drop-shadow-md text-ink/90">
          {description2}
        </p>
      )}
    </HeroVideo>
  );
}
