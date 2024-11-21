'use client';

import CommentForm from './comment-form';
import CommentCard from './comment-card';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getCommentList } from '@/app/data/commnet';
import CommentSkeleton from './comment-skeleton';
import useInfiniteScroll from '@/app/hooks/useInfiniteScroll';
import { Fragment } from 'react';

interface Props {
  postId: string;
  createrId: string;
  currentUser?: string;
  limit: number;
}

export default function CommentContainer({
  postId,
  createrId,
  currentUser,
  limit,
}: Props) {
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['commnet', postId],
    queryFn: async ({ pageParam = 0 }) => {
      const result = await getCommentList({
        postId,
        page: pageParam + 1,
        limit,
      });
      return result;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loadedComment = allPages.flatMap((page) => page.comments);
      console.log(loadedComment);
      return lastPage.totalCount! !== loadedComment.length
        ? allPages.length
        : undefined;
    },
  });

  const obsRef = useInfiniteScroll({
    callback: () => fetchNextPage(),
    isLoading: isLoading,
    isNext: hasNextPage,
  });

  return (
    <div className='w-full max-w-[800px] gap-3 flex flex-col'>
      <div className='flex flex-col gap-2'>
        <p className='text-xl font-semibold'>
          {data?.pages[0].totalCount}개의 댓글
        </p>
        <CommentForm postId={postId} createrId={createrId} />
      </div>
      {isLoading && <CommentSkeleton />}
      <ul className='flex flex-col gap-3'>
        {data?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.comments.map((comment) => (
              <li key={comment.id}>
                <CommentCard
                  comment={comment}
                  userId={currentUser}
                  postId={postId}
                />
              </li>
            ))}
          </Fragment>
        ))}
        <div ref={obsRef} />
      </ul>
    </div>
  );
}
