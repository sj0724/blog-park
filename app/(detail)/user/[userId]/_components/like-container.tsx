import PostCard from '@/app/_components/post-card';
import { getMyLikeList } from '@/app/data/like';

export default async function LikeContainer() {
  const likeList = await getMyLikeList();

  return (
    <div className='flex flex-col gap-10'>
      <h1 className='text-2xl font-bold'>좋아요 목록</h1>
      {!likeList || likeList.length === 0 ? (
        <ul className='flex flex-col items-center'>
          <div className='bg-white flex items-center justify-center gap-5 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/2 h-52 px-8 py-4 hover:-translate-y-1 transition-transform text-2xl font-semibold'>
            좋아요한 글이 없습니다!
          </div>
        </ul>
      ) : (
        <ul className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 items-center justify-center'>
          {likeList.map((post) => (
            <li key={post.id}>
              <PostCard
                id={post.posts?.id}
                title={post.posts?.title}
                createdAt={post.posts?.createdAt}
                summation={post.posts?.summation}
                tags={post.posts?.tag}
                isPublished={post.posts?.isPublished}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
