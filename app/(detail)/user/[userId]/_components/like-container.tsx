import PostCard from '@/app/_components/post-card';
import { getMyLikeList } from '@/app/data/like';
import BlogPagination from '@/components/pagination';

export default async function LikeContainer({
  currentPage,
  userId,
}: {
  currentPage: number;
  userId: string;
}) {
  const { likeList, count } = await getMyLikeList({
    page: currentPage,
    limit: 5,
  });

  return (
    <div className='w-full'>
      <div className='max-w-[800px] w-full'>
        {!likeList || likeList.length === 0 ? (
          <ul className='flex flex-col items-center'>
            <div className='bg-white flex items-center justify-center gap-5 rounded-lg shadow-lg w-full h-40 px-8 py-4 hover:-translate-y-1 transition-transform text-2xl font-semibold'>
              좋아요한 글이 없습니다!
            </div>
          </ul>
        ) : (
          <ul className='flex flex-col gap-4 items-center justify-center'>
            {likeList.map((post) => (
              <li key={post.id} className='w-full'>
                <PostCard post={post.posts!} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className='py-4 flex justify-center'>
        <BlogPagination
          total={count!}
          currentPage={currentPage}
          route={`/user/${userId}`}
          limit={5}
        />
      </div>
    </div>
  );
}
