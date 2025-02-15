'use client';

import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const path = usePathname();
  if (path.split('/')[1] === 'editor') return;
  return (
    <footer className='h-28 max-w-[1300px] flex justify-center w-full'>
      <div className='flex flex-col border-t-[1px] pt-5 gap-2 w-full mx-5'>
        <p className='text-2xl font-semibold font-sans'>Blog Park</p>
        <div className='flex gap-2'>
          <GitHubLogoIcon width={20} height={20} />
          <Link href='https://github.com/sj0724/blog-park'>
            <p>Github</p>
          </Link>
        </div>
      </div>
    </footer>
  );
}
