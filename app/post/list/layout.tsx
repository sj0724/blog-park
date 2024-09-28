import Footer from '@/app/_components/footer';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col'>
      {children}
      <Footer />
    </div>
  );
}
