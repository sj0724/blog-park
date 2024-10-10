import { signIn } from '@/auth';
import { Button } from '@/components/ui/button';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

export default function OAuthForm() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('github');
      }}
    >
      <Button type='submit' className='w-full'>
        <GitHubLogoIcon width={30} height={30} />
      </Button>
    </form>
  );
}
