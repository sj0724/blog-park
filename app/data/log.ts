import { supabase } from '@/utils/supabase';
import { getSessionUserData } from './user';

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

const headers = {
  Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN as string}`,
};

export const getAllRepo = async (page = 1) => {
  const user = await getSessionUserData();
  const repoList = [];

  const url = `https://api.github.com/users/${user?.OAuthId}/repos?page=${page}&per_page=10`;
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`Failed to fetch repos: ${response.status}`);
  }

  const data = await response.json();

  if (data.length === 0) {
    return;
  }

  for (let i = 0; i < data.length; i++) {
    repoList.push(data[i].name);
  }

  return repoList;
};

export const getCommitByRepo = async (repo: string) => {
  const user = await getSessionUserData();
  const commitList = [];
  let page = 1;

  while (true) {
    const url = `https://api.github.com/repos/${user?.OAuthId}/${repo}/commits?author=${user?.OAuthId}&page=${page}&per_page=100`; // 모든 PR 가져오기
    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`Failed to fetch pull requests: ${response.status}`);
    }

    const data = await response.json();
    if (data.length === 0) {
      break; // 데이터가 없으면 종료
    }
    commitList.push(...data);
    page++;
  }

  const commitByDate = commitList.reduce((acc, log) => {
    const date = new Date(log.commit.author.date).toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 날짜만 추출
    if (!acc[date]) {
      // 해당 날짜의 첫 번째 커밋이면 count 설정
      acc[date] = { count: 1 };
    } else {
      // 이미 날짜가 있으면 count만 증가
      acc[date].count += 1;
    }
    return acc;
  }, {});

  return commitByDate;
};
