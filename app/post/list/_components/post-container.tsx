import { getPostList } from '../../../data/post';
import PostCard from './post-card';

export default async function PostContainer({ page }: { page: number }) {
  const postList = await getPostList(page, 5);
  if (!postList) return <div>포스트 없음</div>;
  return (
    <div>
      최신순 전체 리스트
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
    </div>
  );
}
