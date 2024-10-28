import { auth } from '@/auth';
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

const headers = {
  Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN as string}`,
};

export const getAllRepo = async () => {
  const user = await auth();
  const repoList = [];
  let page = 1;

  while (true) {
    const url = `https://api.github.com/users/${user?.user?.name}/repos?page=${page}&per_page=100`;
    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`Failed to fetch repos: ${response.status}`);
    }

    const data = await response.json();

    if (data.length === 0) {
      break; // 데이터가 없으면 종료
    }

    for (let i = 0; i < data.length; i++) {
      repoList.push(data[i].name);
    }
    page++;
  }

  return repoList;
};
