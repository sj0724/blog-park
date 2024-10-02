import PostCard from '@/app/_components/post-card';
import { getMyLikeList } from '@/app/data/like';

export default async function LikeContainer() {
  const likeList = await getMyLikeList();

  return (
    <div className='flex flex-col gap-10'>
      <h1 className='text-3xl font-bold'>좋아요 목록</h1>
      <ul className='grid grid-cols-3 flex-col items-center'>
        {!likeList || likeList.length === 0 ? (
          <div className='flex items-center justify-center gap-5 border rounded-lg shadow-lg w-[550px] h-52 px-8 py-4 hover:-translate-y-1 transition-transform text-2xl font-semibold'>
            좋아요한 글이 없습니다!
          </div>
        ) : (
          likeList.map((post) => (
            <li key={post.id}>
              <PostCard
                id={post.posts?.id}
                title={post.posts?.title}
                createdAt={post.posts?.createdAt}
                summation={post.posts?.summation}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
