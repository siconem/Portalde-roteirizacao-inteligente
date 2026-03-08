import Script from 'next/script';

export const metadata = {
  title: 'Portal Administrativo',
  description: 'Sistema Administrativo - Minha Fábrica',
};

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
