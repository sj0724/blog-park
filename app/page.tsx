import Footer from './_components/footer';
import PostContainer from './_components/post-container';
import { getPostList } from './data/post';
import { Metadata } from 'next';
import MostFavoriteContainer from './_components/most-favorite-container';
import Image from 'next/image';
import Logo from '@/public/logo-icon-white.png';
import TagContainer from './_components/tag-container';
import { Suspense } from 'react';
import LandingListSkeleton from './_components/landing-list-skeleton';
import BlogPagination from '@/components/pagination';

export const metadata: Metadata = {
  title: 'Blog Park',
  description: '블로그를 자유롭게 작성해보세요!',
  openGraph: { images: '/logo-image.png' },
};

export default async function Home({
  searchParams: { page, tags },
}: {
  searchParams: { page: string; tags: string[] | string };
}) {
  const tagsArray = Array.isArray(tags) ? tags : tags ? [tags] : []; // 태그 한개인 경우 문자열 리턴되서 배열로 변경
  const currentPage = page ? Number(page) : 1;
  const { data: postList, count } = await getPostList({
    page: currentPage,
    limit: 6,
    tags: tagsArray,
  });

  if (!postList) return <div>포스트 없음</div>;

  return (
    <div className='flex flex-col items-center justify-center w-full max-w-[1100px]'>
      <div className='mt-10 px-4 w-full'>
        <div className='flex justify-center items-center bg-gray-700 shadow-lg rounded-lg w-full h-32'>
          <Image src={Logo} alt='로고이미지' height={60} />
        </div>
      </div>
      <div className='flex justify-center w-full py-12 px-5 gap-8'>
        <div className='w-full max-w-[800px]'>
          <Suspense fallback={<LandingListSkeleton />}>
            <PostContainer list={postList} title='전체 리스트' />
            <div className='py-4 flex justify-center'>
              <BlogPagination
                total={count!}
                currentPage={currentPage}
                route='/'
                limit={6}
              />
            </div>
          </Suspense>
        </div>
        <div className='hidden md:flex lg:flex flex-col gap-5 h-fit'>
          <MostFavoriteContainer />
          <TagContainer />
        </div>
      </div>
      <Footer />
    </div>
  );
}
