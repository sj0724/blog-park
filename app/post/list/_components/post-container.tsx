import Pagination from '@/components/pagination';
import { getPostList } from '../../../data/post';
import PostCard from './post-card';

export default async function PostContainer({ page }: { page: number }) {
  const { data: postList, count } = await getPostList(page, 5);
  if (!postList) return <div>포스트 없음</div>;
  return (
    <div className='flex flex-col gap-5'>
      <h1 className='text-3xl font-bold'>전체 포스팅</h1>
      <ul className='flex flex-col w-full gap-4'>
        {postList.map((post) => (
          <li key={post.id}>
            <PostCard
              id={post.id}
              title={post.title}
              summation={post.summation}
              createdAt={post.createdAt}
              owner={post.fk_user}
            />
          </li>
        ))}
      </ul>
      <div className='py-4 flex justify-center'>
        <Pagination total={count!} currentPage={page} route='/post/list' />
      </div>
    </div>
  );
}
