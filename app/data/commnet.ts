import { supabase } from '@/utils/supabase';

export const getCommentList = async ({
  postId,
  page = 1,
  limit = 5,
}: {
  postId: string;
  page?: number;
  limit?: number;
}) => {
  const { data, error, count } = await supabase
    .from('comments')
    .select('*, user:fk_comment_user(*)', { count: 'exact' }) // 사용자 정보를 포함
    .eq('post_id', postId) // 특정 postId에 해당하는 댓글 필터링
    .order('createdat', { ascending: false }) // 생성일 기준 정렬
    .range((page - 1) * limit, page * limit - 1); // 페이지네이션

  if (error) {
    throw new Error(`Error fetching comments: ${error.message}`);
  }

  return {
    comments: data,
    totalCount: count,
  };
};