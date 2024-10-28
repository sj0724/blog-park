import { getAllRepo } from '@/app/data/log';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

export default async function GithubRepoModal() {
  const list = await getAllRepo();
  console.log(list);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type='button' className='gap-2'>
          <GitHubLogoIcon width={30} height={30} />
          연동하기
        </Button>
      </DialogTrigger>
      <DialogContent></DialogContent>
    </Dialog>
  );
}
