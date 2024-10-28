import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import RepoList from './repo-list';
import { getAllRepo } from '@/app/data/log';

export default async function GithubRepoModal() {
  const list = await getAllRepo();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type='button' className='gap-2'>
          <GitHubLogoIcon width={30} height={30} />
          연동하기
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>레포지토리 목록</DialogTitle>
        <DialogDescription aria-hidden />
        <RepoList list={list} />
      </DialogContent>
    </Dialog>
  );
}
