import { supabase } from '@/utils/supabase';

export const getPostList = async (page = 1, limit = 5) => {
  const postList = await supabase
    .from('posts')
    .select(`*, fk_user(*)`, { count: 'exact' })
    .order('createdAt', { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  return postList;
};
