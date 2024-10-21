'use server';

import { ActionType } from '@/type';
import { getSessionUserData } from '../data/user';
import { revalidatePath } from 'next/cache';
import { supabase } from '@/utils/supabase';
import { createAlarm } from './alarm';
import { addLog } from './log';

export const createLike = async ({
  postId,
  createrId,
}: {
  postId: string;
  createrId: string;
}): Promise<ActionType<null>> => {
  const session = await getSessionUserData();
  if (!session)
    return {
      success: false,
      message: '로그인이 필요한 기능합니다.',
    };

  try {
    const { data: checkLikeList } = await supabase
      .from('likes')
      .select('*')
      .eq('post_id', postId)
      .eq('user_id', session.id);
    if (checkLikeList && checkLikeList[0]) {
      await supabase.from('likes').delete().eq('id', checkLikeList[0].id);

      revalidatePath(`/post/${postId}`);
      revalidatePath(`/user/${session.id}?menu=like`);
      return {
        success: true,
        message: '게시물에 좋아요를 취소했습니다.',
      };
    }
    const result = await supabase
      .from('likes') // 'likes' 테이블에 좋아요 추가
      .insert([
        {
          user_id: session.id, // 현재 사용자 ID
          post_id: postId, // 좋아요를 달릴 포스트 ID
        },
      ]);

    if (result.error) {
      return {
        success: false,
        message: '게시물에 좋아요를 남기는데 실패했습니다.',
      };
    }

    await createAlarm({
      userId: createrId,
      ownerId: session.id,
      content: '포스트를 좋아합니다.',
      routePath: `/post/${postId}`,
    });

    await addLog({ type: 'like' });

    revalidatePath(`/post/${postId}`);

    return {
      success: true,
      message: '게시물에 좋아요를 남겼습니다.',
    };
  } catch {
    return {
      success: false,
      message: '게시물에 좋아요를 남기던 중 에러가 발생했습니다.',
    };
  }
};
