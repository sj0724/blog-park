import { supabaseUrl } from './supabase';

interface Props {
  table: string;
  select: string;
  postId: string;
  orderBy: 'createdAt' | '';
  orderDirection: 'desc' | '';
  offset: number;
  limit: number;
}

export const supabaseUrlBuilder = ({
  table,
  select = '*',
  postId,
  orderBy = 'createdAt',
  orderDirection = 'desc',
  offset = 0,
  limit = 5,
}: Props) => {
  const url = new URL(`${supabaseUrl}/rest/v1/${table}`);

  // 쿼리 파라미터 추가
  url.searchParams.append('select', select);

  if (postId) {
    url.searchParams.append('post_id', `eq.${postId}`);
  }

  url.searchParams.append('order', `${orderBy}.${orderDirection}`);
  url.searchParams.append('offset', String(offset));
  url.searchParams.append('limit', String(limit));

  return url.toString();
};
