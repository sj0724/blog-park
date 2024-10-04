import { supabase } from '@/utils/supabase';
import { getSessionUserData } from './user';

export const getPostList = async ({
  userId,
  page = 1,
  limit = 5,
}: {
  userId?: string;
  page: number;
  limit: number;
}) => {
  const query = supabase
    .from('posts')
    .select(`*, posts_user_id_fkey(*)`, { count: 'exact' })
    .order('createdAt', { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (userId) {
    query.eq('user_id', userId);
  }

  const postList = await query;

  return postList;
};

export const getMyPost = async (page = 1, limit = 5) => {
  const currentUser = await getSessionUserData();
  if (!currentUser) throw Error('인증이 필요합니다.');
  const postList = await supabase
    .from('posts')
    .select(`*, posts_user_id_fkey(*)`, { count: 'exact' })
    .eq('user_id', currentUser.id)
    .order('createdAt', { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  return postList;
};

export const getPostById = async (postId: string) => {
  const { data: post } = await supabase
    .from('posts')
    .select(`*, posts_user_id_fkey(*)`)
    .eq('id', postId)
    .single();
  return post;
};
