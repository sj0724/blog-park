import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Nav from './_components/nav';
import Toaster from '@/components/ui/sonner';
import KakaoScript from '@/KakaoScript';
import QeuryProviders from '@/components/query-provider';
import { GoogleAnalytics } from '@next/third-parties/google';
import Footer from './_components/footer';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Blog Park',
  description: '박상준의 블로그입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 flex flex-col items-center justify-center`}
      >
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
        <QeuryProviders>
          <Toaster />
          <Nav />
          <main className='flex justify-center mt-[80px] min-h-[calc(100vh-80px)] w-full max-w-screen'>
            {children}
          </main>
          <Footer />
          <KakaoScript />
        </QeuryProviders>
      </body>
    </html>
  );
}
