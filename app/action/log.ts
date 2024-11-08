import { ActionType, GitHubLog } from '@/type';
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
      .gte('created_at', today);

    if (data && data[0]) {
      if (type === 'post') {
        await supabase
          .from('activity_logs')
          .update({
            rate: data[0].rate! + 50,
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

export const addGithubLog = async (
  log: GitHubLog[]
): Promise<ActionType<null>> => {
  const session = await getSessionUserData();
  if (!session)
    return {
      success: false,
      message: '로그인이 필요한 기능입니다.',
    };

  try {
    const transformLog = log
      .map((item) => ({
        id: '',
        user_id: session.id,
        pr_count: item.count,
        pr_url: item.url,
        created_at: item.createdAt,
      }))
      .reverse();

    const logDates = transformLog.map((log) => log.created_at); // 깃허브 로그 날짜 배열

    const start = logDates[0];
    const end = `${logDates[logDates.length - 1]}T23:59:59Z`;

    const { data: existingLogs, error } = await supabase // 기존 로그 조회
      .from('activity_logs')
      .select('created_at, id, pr_url, pr_count, id')
      .eq('user_id', session.id)
      .gte('created_at', start)
      .lte('created_at', end)
      .order('created_at', { ascending: true });

    if (error) console.error('Error:', error);

    if (existingLogs && existingLogs.length > 0) {
      // 기존 로그 url와 신규 로그 url비교
      if (
        existingLogs[existingLogs.length - 1].pr_url ===
        transformLog[transformLog.length - 1].pr_url
      ) {
        return {
          success: false,
          message: '이미 등록된 로그입니다.',
        };
      }
    }

    const existingLogMap = existingLogs!.reduce((map, log) => {
      const date = log.created_at.split('T')[0];
      map[date] = { pr_count: log.pr_count, pr_url: log.pr_url, id: log.id };
      return map;
    }, {} as Record<string, { pr_count: number | null; pr_url: string | null; id: string }>); // 존재하는 로그 객체로 변경

    const logsToUpdate = transformLog
      .filter((log) => {
        const existingLog = existingLogMap[log.created_at];
        return (
          existingLog &&
          (existingLog.pr_url !== log.pr_url ||
            existingLog.pr_count !== log.pr_count)
        );
      }) // 존재하는 로그의 pr_url이나 pr_count가 다른 로그만 필터링
      .map((log) => {
        const existingLog = existingLogMap[log.created_at];
        return { ...log, id: existingLog.id };
      }); // 업데이트할 로그에 기존 id값 부여
    const logsToInsert = transformLog.filter(
      (log) => !existingLogMap[log.created_at]
    );

    // 필요한 경우 업데이트
    if (logsToUpdate.length > 0) {
      const updatePromises = logsToUpdate.map((log) =>
        supabase
          .from('activity_logs')
          .update({
            pr_count: log.pr_count,
            pr_url: log.pr_url,
            rate: 100,
          })
          .eq('user_id', session.id)
          .eq('id', log.id)
      );
      await Promise.all(updatePromises); // 모든 업데이트 요청을 병렬로 처리
    }

    // 필요한 경우 새 데이터 추가
    if (logsToInsert.length > 0) {
      const insertData = logsToInsert.map((log) => ({
        user_id: session.id,
        pr_count: log.pr_count,
        pr_url: log.pr_url,
        created_at: log.created_at,
        rate: 100,
      }));
      await supabase.from('activity_logs').insert(insertData); // 한 번에 삽입 요청
    }
    return {
      success: true,
      message: 'commit 로그가 성공적으로 추가 또는 업데이트되었습니다.',
    };
  } catch {
    console.error('에러가 발생했습니다.');
    return { success: false, message: '에러가 발생했습니다.' };
  }
};
