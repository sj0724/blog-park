import { supabase } from '@/utils/supabase';
import { getSessionUserData } from './user';

interface Props {
  userId: string;
  page?: number;
  limit?: number;
}

export const getMyAlarmList = async ({
  userId,
  page = 1,
  limit = 7,
}: Props) => {
  const start = (page - 1) * limit;
  const end = page * limit - 1;

  const { data, count, error } = await supabase
    .from('alarms')
    .select('*, user:alarms_owner_id_fkey(*)', { count: 'exact' })
    .eq('user_id', userId)
    .order('createdAt', { ascending: false })
    .range(start, end);

  if (error) {
    console.log(error);
    throw new Error(`Error fetching comments: ${error.message}`);
  }

  return {
    alarms: data,
    total: count,
    page,
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

  return count;
};
