'use server';

import { ActionType, Comment } from '@/type';
import { getSessionUserData } from '../data/user';
import { revalidatePath } from 'next/cache';
import { supabase } from '@/utils/supabase';
import { createAlarm } from './alarm';

interface CommentProps {
  content: string;
  postId: string;
  createrId: string;
}

export const createComment = async ({
  content,
  postId,
  createrId,
}: CommentProps): Promise<ActionType<Comment | null>> => {
  const session = await getSessionUserData();
  if (!session)
    return {
      success: false,
      message: '로그인이 필요한 기능입니다.',
    };

  try {
    const result = await supabase
      .from('comments')
      .insert([
        {
          content,
          user_id: session.id,
          post_id: postId,
        },
      ])
      .select('*, user:comments_user_id_fkey(*)')
      .single();

    if (result.error) {
      return {
        success: false,
        message: '댓글 생성 실패',
      };
    }

    await createAlarm({
      userId: createrId,
      ownerId: session.id,
      content: '게시물에 댓글을 남겼습니다.',
      routePath: `/post/${postId}`,
    });

    return {
      success: true,
      message: '댓글이 성공적으로 생성되었습니다.',
      data: result.data,
    };
  } catch (error) {
    console.error('댓글 생성 중 에러:', error);
    return {
      success: false,
      message: '댓글 생성 중 에러가 발생했습니다.',
    };
  }
};

export const deleteComment = async (
  commnetId: string
): Promise<ActionType<null>> => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commnetId);

    if (error) {
      throw new Error(`Error deleting post: ${error.message}`);
    }
    return {
      success: true,
      message: '댓글을 삭제했습니다.',
      data,
    };
  } catch {
    return {
      success: false,
      message: '댓글 삭제중 에러가 발생했습니다.',
    };
  }
};

export const editComment = async ({
  commentId,
  content,
  postId,
}: {
  commentId: string;
  content: string;
  postId: string;
}): Promise<ActionType<null>> => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .update({
        content,
      })
      .eq('id', commentId);

    if (error) {
      throw new Error(`Error updating post: ${error.message}`);
    }
    revalidatePath(`/post/${postId}`);
    return {
      success: true,
      message: '댓글을 수정했습니다.',
      data,
    };
  } catch {
    return {
      success: false,
      message: '댓글 수정 중 에러가 발생했습니다.',
    };
  }
};
