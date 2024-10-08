import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Nav from './_components/nav';
import Toaster from '@/components/ui/sonner';
import AuthWrapper from './_components/auth-wrapper';

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <Nav />
        <AuthWrapper>
          <main className='mt-[80px] min-h-[calc(100vh-80px)]'>{children}</main>
        </AuthWrapper>
      </body>
    </html>
  );
}
