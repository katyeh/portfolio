import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kathleen Yeh - Software Engineer',
  description:
    'Full-stack software engineer at DroneDeploy, specializing in growth features and user engagement. Passionate about building high-impact web products.',
  keywords: [
    'software engineer',
    'full-stack developer',
    'React',
    'JavaScript',
    'TypeScript',
    'Node.js',
  ],
  authors: [{ name: 'Kathleen Yeh' }],
  creator: 'Kathleen Yeh',
  publisher: 'Kathleen Yeh',
  metadataBase: new URL('https://kathleenyeh.com'),
  openGraph: {
    title: 'Kathleen Yeh - Software Engineer',
    description:
      'Full-stack software engineer at DroneDeploy, specializing in growth features and user engagement.',
    url: 'https://kathleenyeh.com',
    siteName: 'Kathleen Yeh Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kathleen Yeh - Software Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kathleen Yeh - Software Engineer',
    description:
      'Full-stack software engineer at DroneDeploy, specializing in growth features and user engagement.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
