import { getSessionUserData } from '../data/user';
import { supabase } from '@/utils/supabase';

interface Props {
  type: 'post' | 'comment' | 'like';
}

export const addLog = async ({ type }: Props) => {
  const session = await getSessionUserData();
  const currentDay = new Date();
  const today = new Date(currentDay.setHours(0, 0, 0, 0)).toISOString();
  if (!session)
    return {
      success: false,
      message: '로그인이 필요한 기능입니다.',
    };
  try {
    const { data } = await supabase
      .from('activity_logs')
      .select('*')
      .eq('user_id', session.id)
      .gte('updated_at', today);
    if (data) {
      if (type === 'post') {
        await supabase
          .from('activity_logs')
          .update({
            rate: data[0].rate! + 50,
            updated_at: String(currentDay),
            post_count: data[0].post_count! + 1,
          })
          .eq('user_id', session.id)
          .gte('updated_at', today);
      }
      if (type === 'comment') {
        await supabase
          .from('activity_logs')
          .update({
            rate: data[0].rate! + 40,
            updated_at: String(currentDay),
            comment_count: data[0].comment_count! + 1,
          })
          .eq('user_id', session.id)
          .gte('updated_at', today);
      }
      if (type === 'like') {
        await supabase
          .from('activity_logs')
          .update({
            rate: data[0].rate! + 10,
            updated_at: String(currentDay),
            like_count: data[0].like_count! + 1,
          })
          .eq('user_id', session.id)
          .gte('updated_at', today);
      }
    } else {
      if (type === 'post') {
        await supabase.from('activity_logs').insert({
          user_id: session.id,
          post_count: 1,
          rate: 50,
        });
      }
      if (type === 'comment') {
        await supabase
          .from('activity_logs')
          .insert({ user_id: session.id, comment_count: 1, rate: 40 });
      }
      if (type === 'like') {
        await supabase
          .from('activity_logs')
          .insert({ user_id: session.id, like_count: 1, rate: 10 });
      }
    }
  } catch {
    console.error('에러가 발생했습니다.');
  }
};
