import Script from 'next/script';

export const metadata = {
  title: 'Portal Administrativo',
  description: 'Portal de roteirização inteligente para geração assistida de roteiros de fabricação',
  openGraph: {
    title: 'Portal Administrativo',
    description: 'Portal de roteirização inteligente para geração assistida de roteiros de fabricação',
    url: 'https://portalde-roteirizacao-inteligente.vercel.app',
    siteName: 'Portal de Roteirização Inteligente',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Portal de Roteirização Inteligente',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  }
}
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Bootstrap e LineIcons */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.lineicons.com/4.0/lineicons.css"
        />
      </head>
      <body>
        {children}

        {/* Bootstrap Bundle */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
