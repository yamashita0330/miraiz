import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_JP } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MIRAIZ｜徳島発の婚活マッチングアプリ',
  description: 'MIRAIZ（ミライズ）— 未来 (mirai) と 磨く (izu) を込めた、徳島発のリアルイベント連動型マッチングアプリ。恋フェスジャパン公式。',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MIRAIZ',
  },
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-192.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0F172A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable}`}>
      <body>{children}</body>
    </html>
  );
}
