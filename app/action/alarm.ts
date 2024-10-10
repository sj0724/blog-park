import { ActionType } from '@/type';
import { supabase } from '@/utils/supabase';

export const createAlarm = async ({
  content,
  userId,
  ownerId,
  routePath,
}: {
  content: string;
  userId: string;
  ownerId: string;
  routePath: string;
}): Promise<ActionType<null>> => {
  try {
    const result = await supabase.from('alarms').insert([
      {
        content,
        user_id: userId, // 알람을 생성할 유저 id
        owner_id: ownerId, // 알람을 생성한 유저 id
        routePath,
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

export const toggleAlarm = async (
  alarmId: string
): Promise<ActionType<null>> => {
  try {
    const status = await supabase.from('alarms').select('*').eq('id', alarmId);
    if (status.data && status.data[0].isRead) {
      await supabase.from('alarms').update({ isRead: false }).eq('id', alarmId);

      return {
        success: true,
        message: '알림을 읽지 않음처리 했습니다.',
      };
    } else {
      await supabase.from('alarms').update({ isRead: true }).eq('id', alarmId);

      return {
        success: true,
        message: '알림을 읽음 처리 했습니다.',
      };
    }
  } catch {
    return {
      success: false,
      message: '알림 읽음 처리중 오류가 발생했습니다.',
    };
  }
};

export const deleteAlarm = async (
  alarmId: string
): Promise<ActionType<null>> => {
  try {
    const { error } = await supabase.from('alarms').delete().eq('id', alarmId);

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      message: '알림을 삭제 했습니다.',
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : '알림 삭제 중 오류가 발생했습니다.',
    };
  }
};
