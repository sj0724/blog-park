'use client';

import { Button } from '@/components/ui/button';
import { EditPostDialog } from '../edit/[postId]/_components/edit-post-dialog';
import { CreatPostDialog } from '../create/_components/creat-post-dialog';
import { useRouter } from 'next/navigation';
import { Post } from '@/type';
import { ReactNode } from 'react';

interface Props {
  postId?: string;
  post?: Post;
  content: string;
  title: string;
  children?: ReactNode;
}

export default function EditorButtonContainer({
  postId,
  post,
  content,
  title,
  children,
}: Props) {
  const router = useRouter();

  return (
    <div className='fixed bottom-0 right-0 px-4 py-4 h-fit flex justify-between items-center w-screen bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.1)]'>
      <div>{children}</div>
      <div className='flex gap-2'>
        <Button
          type='button'
          className='w-20 h-12 font-semibold text-lg bg-white text-black hover:bg-gray-200'
          onClick={() => router.replace('/')}
        >
          취소
        </Button>
        {postId ? (
          <EditPostDialog
            postContent={content}
            title={title}
            postId={postId}
            postTagList={post ? post.tag! : []}
            summation={post ? post.summation : ''}
            isPublished={post ? post.isPublished : true}
            thumbnail={post ? post.thumbnail : ''}
          />
        ) : (
          <CreatPostDialog postContent={content} title={title} />
        )}
      </div>
    </div>
  );
}
