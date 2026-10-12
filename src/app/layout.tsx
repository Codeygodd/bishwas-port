import type { Metadata, Viewport } from 'next';
import { profile as P } from '@/data/profile';
import './globals.css';

const title = `${P.name} — ${P.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(P.siteUrl),
  title: { default: title, template: `%s · ${P.name}` },
  description: P.tagline,
  keywords: ['Bishwas Pandey', 'Full-Stack Developer', 'Software Engineer', 'React', 'Node.js', 'Python', 'SQL', 'Next.js', 'TypeScript', 'Nepal', 'Kathmandu'],
  authors: [{ name: P.name, url: P.siteUrl }],
  creator: P.name,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', url: '/', siteName: `${P.name} · The AI Lab`, title, description: P.tagline, locale: 'en_US' },
  twitter: { card: 'summary_large_image', title, description: P.tagline },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#060d14',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
