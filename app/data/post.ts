import { supabase } from '@/utils/supabase';
import { getSessionUserData } from './user';

export const getPostList = async ({
  page = 1,
  limit = 5,
}: {
  page: number;
  limit: number;
}) => {
  const postList = await supabase
    .from('posts')
    .select(`*, posts_user_id_fkey(*)`, { count: 'exact' })
    .order('createdAt', { ascending: false })
    .eq('isPublished', true)
    .range((page - 1) * limit, page * limit - 1);

  return postList;
};

export const getPostListByUserId = async ({
  userId,
  page = 1,
  limit = 5,
}: {
  userId: string;
  page: number;
  limit: number;
}) => {
  const session = await getSessionUserData();
  let query;
  if (session && session.id === userId) {
    query = supabase
      .from('posts')
      .select(`*, posts_user_id_fkey(*)`, { count: 'exact' })
      .order('createdAt', { ascending: false })
      .eq('user_id', userId)
      .range((page - 1) * limit, page * limit - 1);
  } else {
    query = supabase
      .from('posts')
      .select(`*, posts_user_id_fkey(*)`, { count: 'exact' })
      .order('createdAt', { ascending: false })
      .range((page - 1) * limit, page * limit - 1)
      .eq('user_id', userId)
      .eq('isPublished', true);
  }

  const postList = await query;

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
