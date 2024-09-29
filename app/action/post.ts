'use server';

import db from '@/lib/db';
import { ActionType } from '@/type';
import { getSessionUserData } from '../data/user';
import { supabase } from '@/utils/supabase';
import { revalidatePath } from 'next/cache';

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
        message: '포스팅에 실패했습니다.',
      };
    revalidatePath(`/user/${session?.id}`);
    revalidatePath('/post/list');
    return {
      success: true,
      message: '포스팅에 성공했습니다.',
    };
  } catch {
    return {
      success: true,
      message: '포스팅중 에러가 발생했습니다.',
    };
  }
};

export const deletePost = async (postId: string): Promise<ActionType<null>> => {
  const session = await getSessionUserData();
  try {
    const { data, error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId); // postId에 해당하는 포스트 삭제

    if (error) {
      throw new Error(`Error deleting post: ${error.message}`);
    }
    revalidatePath(`/user/${session?.id}`);
    revalidatePath('/post/list');
    return {
      success: true,
      message: '포스트를 삭제했습니다.',
      data,
    };
  } catch {
    return {
      success: false,
      message: '포스트 삭제중 에러가 발생했습니다.',
    };
  }
};

export const editPost = async ({
  postId,
  content,
  title,
  summation,
  isPublished = false,
}: {
  postId: string;
  content: string;
  title: string;
  summation: string;
  isPublished?: boolean;
}): Promise<ActionType<null>> => {
  const session = await getSessionUserData();
  try {
    const { data, error } = await supabase
      .from('posts')
      .update({
        content,
        title,
        summation,
        isPublished,
      })
      .eq('id', postId); // postId에 해당하는 포스트 수정

    if (error) {
      throw new Error(`Error updating post: ${error.message}`);
    }
    revalidatePath(`/user/${session?.id}`);
    revalidatePath(`/post/${postId}`);
    revalidatePath(`/post/edit/${postId}`);
    return {
      success: true,
      message: '포스트를 수정했습니다.',
      data,
    };
  } catch {
    return {
      success: false,
      message: '포스트 수정 중 에러가 발생했습니다.',
    };
  }
};
