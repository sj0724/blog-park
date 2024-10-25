'use server';

import { ActionType } from '@/type';
import { getSessionUserData } from '../data/user';
import { supabase } from '@/utils/supabase';
import { revalidatePath } from 'next/cache';
import { addLog } from './log';

interface ContentProps {
  content: string;
  title: string;
  summation: string;
  isPublished: boolean;
  tagList: string[];
}

export const creatPost = async ({
  content,
  title,
  summation,
  isPublished = false,
  tagList,
}: ContentProps): Promise<ActionType<null>> => {
  const session = await getSessionUserData();
  if (!session) throw new Error('인증이 필요합니다.');
  try {
    const result = await supabase.from('posts').insert([
      {
        title,
        content,
        user_id: session.id,
        summation,
        isPublished,
        tag: tagList,
      },
    ]);

    if (result.error) {
      return {
        success: false,
        message: '포스팅에 실패했습니다.',
      };
    }

    await addLog({ type: 'post' });

    revalidatePath(`/user/${session?.id}`);
    revalidatePath('/post/list');
    revalidatePath('/', 'page');

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
  isPublished = true,
  tagList,
}: {
  postId: string;
  content: string;
  title: string;
  summation: string;
  isPublished?: boolean;
  tagList: string[];
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
        tag: tagList,
      })
      .eq('id', postId); // postId에 해당하는 포스트 수정

    if (error) {
      throw new Error(`Error updating post: ${error.message}`);
    }
    revalidatePath(`/user/${session?.id}`);
    revalidatePath(`/post/${postId}`);
    revalidatePath(`/editor/edit/${postId}`);
    revalidatePath('/', 'page');

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
