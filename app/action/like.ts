'use server';

import db from '@/lib/db';
import { ActionType } from '@/type';
import { getSessionUserData } from '../data/user';
import { revalidatePath } from 'next/cache';
import { supabase } from '@/utils/supabase';

export const createLike = async ({
  postId,
}: {
  postId: string;
}): Promise<ActionType<null>> => {
  const session = await getSessionUserData();
  if (!session) throw new Error('인증이 필요합니다.');

  try {
    const { data: checkLikeList } = await supabase
      .from('likes')
      .select('*')
      .eq('post_id', postId)
      .eq('user_id', session.id);
    console.log(checkLikeList);
    if (checkLikeList && checkLikeList[0]) {
      await supabase.from('likes').delete().eq('id', checkLikeList[0].id);

      revalidatePath(`/post/${postId}`);
      return {
        success: true,
        message: '게시물에 좋아요를 취소했습니다.',
      };
    }
    const like = await db.like.create({
      data: {
        userId: session.id,
        postId,
      },
    });

    if (!like) {
      return {
        success: false,
        message: '게시물에 좋아요를 남기는데 실패했습니다..',
      };
    }

    revalidatePath(`/post/${postId}`);

    return {
      success: true,
      message: '게시물에 좋아요를 남겼습니다.',
    };
  } catch (error) {
    console.error('댓글 생성 중 에러:', error);
    return {
      success: false,
      message: '게시물에 좋아요를 남기던 중 에러가 발생했습니다.',
    };
  }
};
