import "./globals.css";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://www.leandrovenegas.cl"),
  title: {
    default: "Leandro Venegas",
    template: "%s | Leandro Venegas",
  },
  description: "Creador de productos. Portafolio de proyectos audiovisuales y productos creativos desde Chile.",
  keywords: ["portafolio", "diseño", "audiovisual", "productos creativos", "Chile", "Leandro Venegas"],
  authors: [{ name: "Leandro Venegas" }],
  creator: "Leandro Venegas",
  openGraph: {
    title: "Leandro Venegas",
    description: "Creador de productos. Portafolio de proyectos audiovisuales y productos creativos desde Chile.",
    url: "https://www.leandrovenegas.cl",
    siteName: "Leandro Venegas",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leandro Venegas",
    description: "Creador de productos. Portafolio de proyectos audiovisuales y productos creativos desde Chile.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-black">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-W51B8J0QD2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W51B8J0QD2');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}