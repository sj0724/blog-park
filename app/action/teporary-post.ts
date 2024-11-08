'use server';

import { ActionType, TemporaryPost } from '@/type';
import { getSessionUserData } from '../data/user';
import { supabase } from '@/utils/supabase';
import { revalidatePath } from 'next/cache';

export const createTemporary = async ({
  title,
  content,
}: {
  title: string;
  content: string;
}): Promise<ActionType<TemporaryPost>> => {
  const session = await getSessionUserData();
  if (!session) throw new Error('인증이 필요합니다.');
  try {
    const { data, error } = await supabase
      .from('temporary_posts')
      .insert([
        {
          title,
          content,
          user_id: session.id,
        },
      ])
      .select('*');

    if (error) {
      return {
        success: false,
        message: '임시 저장에 실패했습니다.',
      };
    }

    return {
      success: true,
      message: '임시 저장에 성공했습니다.',
      data: data[0],
    };
  } catch {
    return {
      success: true,
      message: '저장 중 에러가 발생했습니다.',
    };
  }
};

export const updateTemporary = async ({
  title,
  content,
  id,
}: {
  id: string;
  title: string;
  content: string;
}): Promise<ActionType<null>> => {
  try {
    const result = await supabase
      .from('temporary_posts')
      .update({
        title,
        content,
      })
      .eq('id', id);

    if (result.error) {
      return {
        success: false,
        message: '임시 저장에 실패했습니다.',
      };
    }

    return {
      success: true,
      message: '임시 저장에 성공했습니다.',
    };
  } catch {
    return {
      success: true,
      message: '저장 중 에러가 발생했습니다.',
    };
  }
};

export const deleteTemporaryPost = async (
  postId: string
): Promise<ActionType<null>> => {
  try {
    const { data, error } = await supabase
      .from('temporary_posts')
      .delete()
      .eq('id', postId); // postId에 해당하는 포스트 삭제

    if (error) {
      throw new Error(`Error deleting post: ${error.message}`);
    }

    revalidatePath('/post/temporary');

    return {
      success: true,
      message: '임시 저장 포스트를 삭제했습니다.',
      data,
    };
  } catch {
    return {
      success: false,
      message: '삭제중 에러가 발생했습니다.',
    };
  }
};
