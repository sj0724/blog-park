import { supabase } from '@/utils/supabase';

export const getLogById = async ({
  userId,
  year,
}: {
  userId: string;
  year: number;
}) => {
  const { data } = await supabase
    .from('activity_logs')
    .select('*')
    .eq('user_id', userId)
    .gte('created_at', `${year}-01-01`)
    .lte('updated_at', new Date().toISOString());

  return data;
};
