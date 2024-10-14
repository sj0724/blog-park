'use client';

import { UserAvatar } from '@/components/user-avatar';
import { Comment } from '@/type';
import CommentButtonContainer from './comment-button-container';
import { useState } from 'react';
import CommentEditForm from './comment-edit-form';
import MarkdownEditor from '@/components/markdown-editor';
import Link from 'next/link';

interface Props {
  comment: Comment;
  userId?: string;
  postId: string;
  deleteList: (commentId: string) => void;
}

export default function CommentCard({
  comment,
  userId,
  postId,
  deleteList,
}: Props) {
  const [isEdit, setIsEdit] = useState(false);

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <div className='px-4 py-2 min-h-20 flex flex-col justify-center gap-3'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2 py-3'>
          <UserAvatar image={comment.user.image} size='sm' />
          <Link href={`/user/${comment.user.id}`}>
            <p className='font-semibold'>{comment.user.name}</p>
          </Link>
        </div>
        {userId === comment.user_id && (
          <CommentButtonContainer
            commentId={comment.id}
            toggleEdit={toggleEdit}
            isEdit={isEdit}
            deleteList={deleteList}
          />
        )}
      </div>
      {isEdit ? (
        <CommentEditForm
          content={comment.content}
          toggleEdit={toggleEdit}
          postId={postId}
          commentId={comment.id}
        />
      ) : (
        <MarkdownEditor markdownText={comment.content} />
      )}
    </div>
  );
}
