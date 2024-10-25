import { supabase } from '@/utils/supabase';

export const getTagList = async () => {
  const { data, error } = await supabase.rpc('get_unique_tags');

  if (error) {
    console.error('Error fetching unique tags:', error);
    return [];
  }

  return data || [];
};
