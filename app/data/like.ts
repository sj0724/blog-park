import { supabase } from '@/utils/supabase';
import { getSessionUserData } from './user';

export const getMyLikeByPostId = async ({ postId }: { postId: string }) => {
  const session = await getSessionUserData();
  if (!session) return false;
  const result = await supabase
    .from('likes')
    .select('*')
    .eq('post_id', postId)
    .eq('user_id', session.id);

  if (result.data && !result.data[0]) return false;
  return true;
};

export const getMyLikeList = async () => {
  const session = await getSessionUserData();
  if (!session) throw new Error('인증이 필요한 기능입니다.');

  const { data: likeList } = await supabase
    .from('likes')
    .select('*, posts!likes_post_id_fkey(*)')
    .eq('user_id', session.id);

  return likeList;
};

export const getLikeTotalCount = async ({ userId }: { userId: string }) => {
  const { error, count } = await supabase
    .from('likes')
    .select('*', { count: 'exact' })
    .eq('user_id', userId);

  if (error) {
    throw new Error(`Error fetching comments: ${error.message}`);
  }

  return count ? count : 0;
};
