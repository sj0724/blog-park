import { getMyPost } from '@/app/data/post';
import PostContainer from '@/app/post/list/_components/post-container';

export default async function Page({
  searchParams: { page },
}: {
  searchParams: { page: string };
}) {
  const currentPage = page ? Number(page) : 1;
  const { data: postList, count } = await getMyPost(currentPage, 5);
  if (!postList) return <div>포스트 없음</div>;

  return (
    <div className='flex max-w-screen justify-center py-12'>
      <PostContainer list={postList} count={count!} page={currentPage} />
    </div>
  );
}
