import { getCommentTotalCount } from '@/app/data/commnet';
import DonutChart from './donut-chart';
import { getLikeTotalCount } from '@/app/data/like';
import { getPostTotalCount } from '@/app/data/post';

export default async function SummaryConatiner({ userId }: { userId: string }) {
  const postCount = await getPostTotalCount({ userId });
  const commentCount = await getCommentTotalCount({ userId });
  const likeCount = await getLikeTotalCount({ userId });
  return (
    <div className='flex items-center justify-center'>
      <DonutChart post={postCount} commnet={commentCount} like={likeCount} />
    </div>
  );
}
