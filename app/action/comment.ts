'use server';

import { ActionType } from '@/type';
import { getSessionUserData } from '../data/user';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

interface CommentProps {
  content: string;
  postId: string;
}

export const createComment = async ({
  content,
  postId,
}: CommentProps): Promise<ActionType<null>> => {
  const session = await getSessionUserData();
  if (!session) throw new Error('인증이 필요합니다.');

  try {
    // 댓글 생성
    const comment = await db.comment.create({
      data: {
        content,
        userId: session.id, // 현재 사용자 ID
        postId, // 댓글이 달릴 포스트 ID
      },
    });

    // 댓글 생성 실패 시
    if (!comment) {
      return {
        success: false,
        message: '댓글 생성 실패',
      };
    }
    revalidatePath(`/post/${postId}`);
    // 댓글 생성 성공 시
    return {
      success: true,
      message: '댓글이 성공적으로 생성되었습니다.',
    };
  } catch (error) {
    console.error('댓글 생성 중 에러:', error);
    return {
      success: false,
      message: '댓글 생성 중 에러가 발생했습니다.',
    };
  }
};
