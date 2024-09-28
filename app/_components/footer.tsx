import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='h-28 max-w-screen flex justify-center'>
      <div className='flex flex-col border-t-[1px] pt-5 gap-2 w-3/4'>
        <p className='text-2xl font-semibold'>Blog Park</p>
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