import { ReactNode } from 'react';
import Footer from '../_components/footer';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col items-center h-full w-full max-w-[800px]'>
      {children} <Footer />
    </div>
  );
}
