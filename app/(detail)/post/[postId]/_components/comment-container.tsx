'use client';

import CommentForm from './comment-form';
import CommentCard from './comment-card';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { Comment } from '@/type';
import CommentPagination from './comment-pagination';
import { useQuery } from '@tanstack/react-query';
import { getCommentList } from '@/app/data/commnet';

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
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const { data } = useQuery({
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
  };

  const deleteList = (commentId: string) => {
    const filterList = commentList.filter((item) => item.id !== commentId);
    setCommentList(filterList);
  };

  return (
    <div className='w-full max-w-[800px] gap-2 flex flex-col'>
      <p className='text-xl font-semibold'>{data?.totalCount}개의 댓글</p>
      <CommentForm
        postId={postId}
        createrId={createrId}
        updateList={updateList}
      />
      <ul className='flex flex-col gap-3'>
        {data?.comments.map((comment) => (
          <li key={comment.id}>
            <CommentCard
              comment={comment}
              userId={currentUser}
              postId={postId}
              deleteList={deleteList}
            />
            <Separator className='mt-3' />
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
