import PostCard from '@/app/_components/post-card';
import { getMyLikeList } from '@/app/data/like';

export default async function LikeContainer() {
  const likeList = await getMyLikeList();

  return (
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
  );
}
