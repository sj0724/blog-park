import Pagination from '@/components/pagination';
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
    <div className='flex flex-col max-w-screen items-center py-12 px-5'>
      <PostContainer list={postList} title='전체 리스트' />
      <div className='py-4 flex justify-center'>
        <Pagination
          total={count!}
          currentPage={currentPage}
          route='/'
          limit={6}
        />
      </div>
      <Footer />
    </div>
  );
}
