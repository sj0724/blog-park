import { supabase } from '@/utils/supabase';
import { getSessionUserData } from './user';

export const getFollowStatus = async (userId: string) => {
  const session = await getSessionUserData();
  if (!session) return false;
  const result = await supabase
    .from('follows')
    .select('*')
    .eq('followingId', userId)
    .eq('followerId', session.id);

  if (result.data && result.data[0]) {
    return true;
  } else {
    return false;
  }
};

export const getMyFollow = async () => {
  const session = await getSessionUserData();
  if (!session) throw new Error('인증한 유저만 가능합니다.');
  const { data: followList } = await supabase
    .from('follows')
    .select('*')
    .eq('followerId', session.id);
  return followList;
};
