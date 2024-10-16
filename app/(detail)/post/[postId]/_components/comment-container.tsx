'use client';

import CommentForm from './comment-form';
import CommentCard from './comment-card';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { Comment } from '@/type';
import CommentPagination from './comment-pagination';
import { supabaseUrlBuilder } from '@/utils/supabase-url-builder';
import { supabaseAnonKey } from '@/utils/supabase';

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
  const [commentCount, setCommentCount] = useState(totalCount);

  const url = supabaseUrlBuilder({
    table: 'comments',
    select: '*,user:comments_user_id_fkey(*)',
    postId,
    orderBy: 'createdAt',
    limit: 5,
    offset: (page - 1) * 5,
    orderDirection: 'desc',
  });

  const handlePagination = (page: number) => {
    setPage(page);
  };

  const updateList = (comment: Comment) => {
    if (page === 1) {
      if (commentList.length === 5) {
        const popList = commentList.slice(0, -1);
        setCommentList([comment, ...popList]);
      } else {
        setCommentList([comment, ...commentList]);
      }
      setCommentCount((prev) => prev + 1);
    } else {
      setPage(1);
    }
  };

  const deleteList = (commentId: string) => {
    const filterList = commentList.filter((item) => item.id !== commentId);
    setCommentList(filterList);
    setCommentCount((prev) => prev - 1);
  };

  useEffect(() => {
    const loadList = async () => {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${supabaseAnonKey}`,
          Apikey: supabaseAnonKey,
        },
        cache: 'force-cache',
        next: { tags: [postId, String(page)] },
      });
      const data = await res.json();
      if (data) {
        setCommentList([...data]);
      }
    };
    loadList();
  }, [page, postId, url]);

  return (
    <div className='w-full max-w-[800px] gap-2 flex flex-col'>
      <p className='text-xl font-semibold'>{commentCount}개의 댓글</p>
      <CommentForm
        postId={postId}
        createrId={createrId}
        updateList={updateList}
      />
      <ul className='flex flex-col gap-3'>
        {commentList.map((comment) => (
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
