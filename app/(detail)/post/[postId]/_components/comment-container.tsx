'use client';

import { getCommentList } from '@/app/data/commnet';
import CommentForm from './comment-form';
import CommentCard from './comment-card';
import { Separator } from '@/components/ui/separator';
import { getSessionUserData } from '@/app/data/user';
import { useEffect, useState } from 'react';
import { Comment } from '@/type';
import CommentPagination from './comment-pagination';

export default function CommentContainer({ postId }: { postId: string }) {
  const [page, setPage] = useState(1);
  const [userId, setUserId] = useState('');
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [totalCount, setTotalCount] = useState<number | null>(0);

  const handlePagination = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    const loadUser = async () => {
      const result = await getSessionUserData();
      if (result) setUserId(result.id);
    };
    const loadList = async () => {
      const result = await getCommentList({ page, limit: 5, postId });
      if (result) {
        setCommentList(result.comments);
        setTotalCount(result.totalCount);
      }
    };
    loadUser();
    loadList();
  }, [page, postId]);

  return (
    <div className='w-full max-w-[800px] gap-2 flex flex-col'>
      <p className='text-xl'>{totalCount}개의 댓글</p>
      <CommentForm postId={postId} />
      <ul className='flex flex-col gap-3'>
        {commentList.map((comment) => (
          <li key={comment.id}>
            <CommentCard comment={comment} userId={userId} postId={postId} />
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
