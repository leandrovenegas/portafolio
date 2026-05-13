/**
 * MediaPreconnect — renders <link rel="preconnect"> hints for external media origins.
 * Include only on pages that actually load content from these domains.
 * Using preconnect on pages that DON'T use the resource wastes TCP connections (Lighthouse warning).
 */
export default function MediaPreconnect({ cloudinary = false, bunny = false }) {
  return (
    <>
      {cloudinary && (
        <link rel="preconnect" href="https://res.cloudinary.com" />
      )}
      {bunny && (
        <>
          <link rel="preconnect" href="https://vz-a158839f-ce6.b-cdn.net" />
          <link rel="preconnect" href="https://iframe.mediadelivery.net" />
        </>
      )}
    </>
  );
}
