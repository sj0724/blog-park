'use client';

import { loginByOAuth } from '@/app/action/user';
import { Button } from '@/components/ui/button';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

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
        google
      </Button>
    </div>
  );
}
