import { supabase } from '@/utils/supabase';
import { getSessionUserData } from './user';

export const getPostList = async (page = 1, limit = 5) => {
  const postList = await supabase
    .from('posts')
    .select(`*, fk_user(*)`, { count: 'exact' })
    .order('createdAt', { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  return postList;
};

export const getMyPost = async (page = 1, limit = 5) => {
  const currentUser = await getSessionUserData();
  if (!currentUser) throw Error('인증이 필요합니다.');
  const postList = await supabase
    .from('posts')
    .select(`*, fk_user(*)`, { count: 'exact' })
    .eq('user_id', currentUser.id)
    .order('createdAt', { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  return postList;
};
