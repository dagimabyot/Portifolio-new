import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dagim Abyot | Full Stack Developer',
  description: 'Professional portfolio of Dagim Abyot, a full stack developer specializing in web development, mobile apps, and AI solutions.',
  keywords: ['Developer', 'Full Stack', 'Web Development', 'Portfolio', 'React', 'Next.js'],
  authors: [{ name: 'Dagim Abyot' }],
  openGraph: {
    title: 'Dagim Abyot | Full Stack Developer',
    description: 'Professional portfolio of Dagim Abyot, a full stack developer.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#020617" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-foreground">
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
