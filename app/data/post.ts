import { supabase } from '@/utils/supabase';
import { getSessionUserData } from './user';

export const getPostList = async ({
  page = 1,
  limit = 5,
  tags,
}: {
  page: number;
  limit: number;
  tags?: string[];
}) => {
  let query = supabase
    .from('posts')
    .select(`*, posts_user_id_fkey(*)`, { count: 'exact' })
    .order('createdAt', { ascending: false })
    .eq('isPublished', true)
    .range((page - 1) * limit, page * limit - 1);

  if (tags && tags.length > 0) {
    query = query.or(tags.map((tag) => `tag.cs.{${tag}}`).join(',')); // 태그 한개라도 일치하면 데이터 불러옴, cs -> contain
  }

  const postList = await query;

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

export const getPostTotalCount = async ({ userId }: { userId: string }) => {
  const { error, count } = await supabase
    .from('posts')
    .select('*', { count: 'exact' })
    .eq('user_id', userId);

  if (error) {
    throw new Error(`Error fetching comments: ${error.message}`);
  }

  return count ? count : 0;
};

export const getMostLikePost = async () => {
  const { data, error } = await supabase
    .from('posts') // posts 테이블에서
    .select('id, title, user_id')
    .order('like_count', { ascending: true })
    .order('createdAt', { ascending: false })
    .limit(3); // 상위 3개 포스트 가져오기

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return data;
};
