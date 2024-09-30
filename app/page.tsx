import Footer from './_components/footer';
import PostContainer from './_components/post-container';
import { getPostList } from './data/post';

export default async function Home({
  searchParams: { page },
}: {
  searchParams: { page: string };
}) {
  const currentPage = page ? Number(page) : 1;
  const { data: postList, count } = await getPostList({
    page: currentPage,
    limit: 6,
  });
  if (!postList) return <div>포스트 없음</div>;

  return (
    <div className='flex flex-col max-w-screen items-center py-12'>
      <PostContainer
        count={count!}
        list={postList}
        page={currentPage}
        title='전체 리스트'
      />
      <Footer />
    </div>
  );
}
