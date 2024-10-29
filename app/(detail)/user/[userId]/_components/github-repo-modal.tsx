'use client';

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
import { useEffect, useState, useTransition } from 'react';
import { getAllRepo } from '@/app/data/log';

export default function GithubRepoModal() {
  const [page, setPage] = useState(1);
  const [isNext, setIsNext] = useState(true);
  const [list, setList] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handlePage = (page: number) => {
    if (page === 1) {
      setIsNext(true);
    }
    setPage(page);
  };

  useEffect(() => {
    const fetchRepoList = () =>
      startTransition(async () => {
        const data = await getAllRepo(page);
        if (data && data.length > 0) {
          setList([...data]);
          if (data.length < 10) {
            setIsNext(false);
          }
        } else {
          setIsNext(false);
        }
      });
    fetchRepoList();
  }, [page]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type='button' className='gap-2'>
          <GitHubLogoIcon width={30} height={30} />
          연동하기
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>레포지토리 목록</DialogTitle>
        <DialogDescription aria-describedby='undefined' />
        <RepoList
          list={list}
          toggleModal={toggleModal}
          handlePage={handlePage}
          page={page}
          isNext={isNext}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
