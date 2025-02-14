import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col items-center h-full w-full max-w-[800px]'>
      {children}
    </div>
  );
}
