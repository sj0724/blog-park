import { supabase } from '@/utils/supabase';
import { getSessionUserData } from './user';

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

export const getMyalarmCount = async () => {
  const session = await getSessionUserData();
  if (!session) throw new Error('인증되지 않은 사용자입니다.');

  const { count, error } = await supabase
    .from('alarms')
    .select('*', { count: 'exact' })
    .eq('user_id', session.id)
    .eq('isRead', false);

  if (error) {
    throw new Error(`Error fetching comments: ${error.message}`);
  }

  return {
    count: count,
  };
};
