import { supabase } from '@/utils/supabase';
import { getSessionUserData } from './user';

export const getLikeById = async (postId: string) => {
  const result = await supabase
    .from('likes')
    .select(
      `*,users: fk_like_user (
        id,
        name,
        email
      )`,
      { count: 'exact' }
    )
    .eq('post_id', postId);

  return result;
};

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
