'use client';

import { loginByOAuth } from '@/app/action/user';
import { Button } from '@/components/ui/button';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import GoogleIcon from '@/public/google-icon.svg';
import Image from 'next/image';

export default function OAuthForm() {
  return (
    <div className='flex flex-col gap-3'>
      <Button
        type='button'
        className='w-full'
        onClick={() => loginByOAuth('github')}
      >
        <GitHubLogoIcon width={30} height={30} />
      </Button>
      <Button
        type='button'
        className='w-full'
        onClick={() => loginByOAuth('google')}
      >
        <Image src={GoogleIcon} alt='구글 아이콘' width={25} height={25} />
      </Button>
    </div>
  );
}
