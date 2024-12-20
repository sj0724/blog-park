'use server';

import { ActionType } from '@/type';
import { getSessionUserData } from '../data/user';
import { supabase } from '@/utils/supabase';
import { revalidatePath } from 'next/cache';
import { createAlarm } from './alarm';

export const toggleFollow = async (
  followingId: string
): Promise<ActionType<null>> => {
  const session = await getSessionUserData();
  if (!session)
    return {
      success: false,
      message: '로그인한 유저만 가능한 기능입니다.',
    };

  try {
    const checkFollow = await supabase
      .from('follows')
      .select('*')
      .eq('followerId', session.id)
      .eq('followingId', followingId);

    if (checkFollow.data && checkFollow.data[0]) {
      await supabase
        .from('follows')
        .delete()
        .eq('followerId', session.id)
        .eq('followingId', followingId);
      revalidatePath(`/user/${session.id}?menu=follow`);
      return {
        success: true,
        message: '팔로우를 취소했습니다.',
      };
    }
    const result = await supabase
      .from('follows')
      .insert([{ followerId: session.id, followingId }]);

    if (result.error)
      return {
        success: false,
        message: '팔로우에 실패했습니다.',
      };

    await createAlarm({
      userId: followingId,
      ownerId: session.id,
      content: '팔로우합니다.',
      routePath: `/user/${session.id}`,
    });

    return {
      success: true,
      message: '해당 유저를 팔로우 합니다.',
    };
  } catch {
    return {
      success: false,
      message: '팔로우하는데 오류가 발생했습니다.',
    };
  }
};
