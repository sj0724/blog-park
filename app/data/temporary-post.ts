'use server';

import { TemporaryPost } from '@/type';
import { supabase } from '@/utils/supabase';

export const getTemporaryPostById = async (
  id: string
): Promise<TemporaryPost | null> => {
  const { data: post, error } = await supabase
    .from('temporary_posts')
    .select(`*`)
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
  }
  return post;
};
