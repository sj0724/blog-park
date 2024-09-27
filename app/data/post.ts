import { supabase } from '@/utils/supabase';

export const getPostList = async (page = 1, limit = 6) => {
  const { data: postList } = await supabase
    .from('posts')
    .select('*', { count: 'exact' })
    .order('createdAt', { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  return postList;
};
