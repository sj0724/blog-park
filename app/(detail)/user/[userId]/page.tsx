import { getPostList } from '@/app/data/post';
import PostContainer from '@/app/post/list/_components/post-container';

export default async function Page({
  searchParams: { page },
  params: { userId },
}: {
  searchParams: { page: string };
  params: { userId: string };
}) {
  const currentPage = page ? Number(page) : 1;
  const { data: postList, count } = await getPostList({
    userId,
    page: currentPage,
    limit: 6,
  });
  if (!postList) return <div>포스트 없음</div>;

  return (
    <div className='flex max-w-screen justify-center py-12'>
      <PostContainer list={postList} count={count!} page={currentPage} />
    </div>
  );
}
