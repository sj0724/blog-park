'use server';

import db from '@/lib/db';
import { ActionType } from '@/type';
import { getSessionUserData } from '../data/user';
import { supabase } from '@/utils/supabase';

interface ContentProps {
  content: string;
  title: string;
  summation: string;
  isPublished: boolean;
}

export const creatPost = async ({
  content,
  title,
  summation,
  isPublished = false,
}: ContentProps): Promise<ActionType<null>> => {
  const session = await getSessionUserData();
  if (!session) throw new Error('인증이 필요합니다.');
  try {
    const post = await db.post.create({
      data: {
        title,
        content,
        userId: session.id,
        summation,
        isPublished,
      },
    });
    if (!post)
      return {
        success: true,
        message: '포스팅 실패',
      };

    return {
      success: true,
      message: '포스팅에 성공',
    };
  } catch {
    return {
      success: true,
      message: '포스팅중 에러',
    };
  }
};

export const deletePost = async (postId: string): Promise<ActionType<null>> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId); // postId에 해당하는 포스트 삭제

    if (error) {
      throw new Error(`Error deleting post: ${error.message}`);
    }

    return {
      success: true,
      message: '포스트를 삭제했습니다.',
      data,
    };
  } catch (err) {
    return {
      success: false,
      message: '포스트 삭제중 에러가 발생했습니다.',
    };
  }
};
