import { getPostList } from '../data/post';
import PostCard from './post-card';

export default async function PostContainer() {
  const postList = await getPostList();
  if (!postList) return <div>포스트 없음</div>;
  return (
    <div>
      메인 전체 리스트입니다.
      <ul className='flex flex-col w-full gap-4'>
        {postList.map((post) => (
          <li key={post.id}>
            <PostCard
              id={post.id}
              title={post.title}
              summation={post.summation}
              createdAt={post.createdAt}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
