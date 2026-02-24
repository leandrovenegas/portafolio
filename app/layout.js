import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Leandro Venegas",
  description: "Portafolio",
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