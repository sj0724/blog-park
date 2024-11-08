'use server';

import { TemporaryPost } from '@/type';
import { supabase } from '@/utils/supabase';

export const getTemporaryList = async (userId: string) => {
  const { data, error } = await supabase
    .from('temporary_posts')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.log(error);
    throw new Error(`Error fetching comments: ${error.message}`);
  }

  return data;
};

export const getTemporaryPostById = async (
  id: string
): Promise<TemporaryPost | null> => {
  const { data: post, error } = await supabase
    .from('temporary_posts')
    .select(`*`)
    .eq('id', id)
    .single();

  if (error) {
    console.log(error);
    throw new Error(`Error fetching comments: ${error.message}`);
  }

  return post;
};
