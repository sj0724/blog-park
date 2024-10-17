'use client';

import CommentForm from './comment-form';
import CommentCard from './comment-card';
import { useState } from 'react';
import { Comment } from '@/type';
import CommentPagination from './comment-pagination';
import { useQuery } from '@tanstack/react-query';
import { getCommentList } from '@/app/data/commnet';
import CommentSkeleton from './comment-skeleton';
import { useRouter } from 'next/navigation';

export default function CommentContainer({
  postId,
  createrId,
  totalCount,
  currentUser,
}: {
  postId: string;
  createrId: string;
  totalCount: number;
  currentUser?: string;
}) {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: [`${postId}:comment`, page],
    queryFn: () =>
      getCommentList({
        postId,
        page,
        limit: 5,
      }),
  });

  const handlePagination = (page: number) => {
    setPage(page);
  };

  const updateList = () => {
    setPage(1);
    router.refresh();
  };

  return (
    <div className='w-full max-w-[800px] gap-3 flex flex-col'>
      <div className='flex flex-col gap-2'>
        <p className='text-xl font-semibold'>{data?.totalCount}개의 댓글</p>
        <CommentForm
          postId={postId}
          createrId={createrId}
          updateList={updateList}
        />
      </div>
      {isLoading && <CommentSkeleton />}
      <ul className='flex flex-col gap-3'>
        {data?.comments.map((comment) => (
          <li key={comment.id}>
            <CommentCard
              comment={comment}
              userId={currentUser}
              postId={postId}
            />
          </li>
        ))}
      </ul>
      <div className='py-4 flex justify-center'>
        <CommentPagination
          total={totalCount!}
          currentPage={page}
          onClick={handlePagination}
          limit={5}
        />
      </div>
    </div>
  );
}
