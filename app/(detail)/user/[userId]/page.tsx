import PostContainer from '@/app/_components/post-container';
import { getPostList } from '@/app/data/post';
import Profile from './_components/profile';
import { Separator } from '@/components/ui/separator';
import Footer from '@/app/_components/footer';

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
    <>
      <div className='flex flex-col items-center max-w-screen justify-center py-12'>
        <div>
          <Profile userId={userId} />
          <Separator className='my-20' />
          <PostContainer
            list={postList}
            count={count!}
            page={currentPage}
            title='작성한 글'
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
