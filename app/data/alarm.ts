import { supabase } from '@/utils/supabase';

export const getMyAlarmList = async (userId: string) => {
  const { data, error } = await supabase
    .from('alarms')
    .select('*, user:alarms_owner_id_fkey(*)')
    .eq('user_id', userId)
    .order('createdAt', { ascending: false });

  if (error) {
    throw new Error(`Error fetching comments: ${error.message}`);
  }

  return {
    alarms: data,
  };
};
