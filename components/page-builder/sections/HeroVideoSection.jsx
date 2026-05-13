import HeroVideo from "@/components/HeroVideo";

export default function HeroVideoSection({ 
  title, 
  description1, 
  description2, 
  mobileVideoGuid, 
  tabletVideoGuid,
  desktopVideoGuid,
  posterSrc,
  posterAlt
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
    >
      <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] mb-8 max-w-5xl font-bold">
        {title}
      </h1>
      {description1 && (
        <p className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed mb-12 drop-shadow-md text-ink/90">
          {description1}
        </p>
      )}
      {description2 && (
        <p className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed drop-shadow-md text-ink/90">
          {description2}
        </p>
      )}
    </HeroVideo>
  );
}
