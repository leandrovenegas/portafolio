'use client';

export default function AvatarSection({
  avatarSrc,
  avatarAlt,
  forceBp = null,
}) {
  return (
    <section className="w-full grid grid-cols-1 gap-6 justify-items-center">
      {avatarSrc && (
        <div className="col-span-1 flex justify-center my-8">
          <div className="relative w-48 h-48 rounded-full overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(255,204,0,0.15)] transition-all duration-300 hover:scale-105">
            <img
              src={avatarSrc}
              alt={avatarAlt || 'Avatar'}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </section>
  );
}
