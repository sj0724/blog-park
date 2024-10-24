import Pagination from '@/components/pagination';
import Footer from './_components/footer';
import PostContainer from './_components/post-container';
import { getPostList } from './data/post';
import { Metadata } from 'next';
import MostFavoriteContainer from './_components/most-favorite-container';
import Image from 'next/image';
import Logo from '@/public/logo-icon-white.png';

export const metadata: Metadata = {
  title: 'Blog Park',
  description: '블로그를 자유롭게 작성해보세요!',
  openGraph: { images: '/logo-image.png' },
};

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
    <div className='flex flex-col items-center'>
      <div className='mt-10 px-4 w-full max-w-[1000px]'>
        <div className='flex justify-center bg-gray-700 shadow-lg rounded-lg py-9 w-full'>
          <Image src={Logo} alt='로고이미지' height={60} />
        </div>
      </div>
      <div className='flex justify-center max-w-screen py-12 px-5 gap-4'>
        <div className='w-full max-w-[800px]'>
          <PostContainer list={postList} title='전체 리스트' />
          <div className='py-4 flex justify-center'>
            <Pagination
              total={count!}
              currentPage={currentPage}
              route='/'
              limit={6}
            />
          </div>
        </div>
        <MostFavoriteContainer />
      </div>
      <Footer />
    </div>
  );
}
