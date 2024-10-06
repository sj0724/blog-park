import { ActionType } from '@/type';
import { supabase } from '@/utils/supabase';

export const createAlarm = async ({
  content,
  userId,
  ownerId,
}: {
  content: string;
  userId: string;
  ownerId: string;
}): Promise<ActionType<null>> => {
  try {
    const result = await supabase.from('alarms').insert([
      {
        content,
        user_id: userId, // 알람을 생성할 유저 id
        owner_id: ownerId, // 알람을 생성한 유저 id
      },
    ]);

    if (result.error) {
      return {
        success: false,
        message: '알람 생성 실패',
      };
    }
    return {
      success: true,
      message: '알람이 성공적으로 생성되었습니다.',
    };
  } catch {
    return {
      success: false,
      message: '알람 생성 중 에러가 발생했습니다.',
    };
  }
};
