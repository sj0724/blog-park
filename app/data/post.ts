import { supabase } from '@/utils/supabase';

export const getPostList = async (cursorId?: string, limit = 5) => {
  const { data: postList } = await supabase
    .from('posts')
    .select('*')
    .order('createdAt', { ascending: false })
    .limit(limit);

  return postList;
};
