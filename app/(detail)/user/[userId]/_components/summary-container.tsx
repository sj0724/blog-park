import { getCommentTotalCount } from '@/app/data/commnet';
import DonutChart from './donut-chart';
import { getLikeTotalCount } from '@/app/data/like';
import { getPostTotalCount } from '@/app/data/post';

export default async function SummaryConatiner({ userId }: { userId: string }) {
  const postCount = await getPostTotalCount({ userId });
  const commentCount = await getCommentTotalCount({ userId });
  const likeCount = await getLikeTotalCount({ userId });
  return (
    <div>
      <p className='text-2xl font-semibold block w-full'>활동 요약</p>
      <div className='flex items-center justify-center'>
        <DonutChart post={postCount} commnet={commentCount} like={likeCount} />
        <div className='flex flex-col'>
          <div>
            <p className='flex items-center gap-2 text-lg text-gray-600 font-semibold'>
              <span className='block w-4 h-4 rounded-full bg-blue-500' />
              {`전체 포스트
            : ${postCount}`}
            </p>
            <p className='flex items-center gap-2 text-lg text-gray-600 font-semibold'>
              <span className='block w-4 h-4 rounded-full bg-red-500' />
              {`전체 댓글 :
            ${commentCount}`}
            </p>
            <p className='flex items-center gap-2 text-lg text-gray-600 font-semibold'>
              <span className='block w-4 h-4 rounded-full bg-emerald-500' />
              {`전체 좋아요
            : ${likeCount}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
