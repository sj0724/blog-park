import PostContainer from '@/app/_components/post-container';
import { getPostList } from '@/app/data/post';
import Profile from './_components/profile';
import { Separator } from '@/components/ui/separator';
import Footer from '@/app/_components/footer';
import ProfileUserMenu from './_components/profile-user-menu';
import FollowContainer from './_components/follow-container';
import LikeContainer from './_components/like-container';

export default async function Page({
  searchParams: { page, menu = 'list' },
  params: { userId },
}: {
  searchParams: { page: string; menu: string };
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
      <div className='flex flex-col items-center min-w-[1100px] justify-center py-12'>
        <div className='w-full'>
          <Profile userId={userId} />
          <ProfileUserMenu menu={menu} userId={userId} />
          <Separator className='my-5' />
          {menu === 'list' && (
            <PostContainer
              list={postList}
              count={count!}
              page={currentPage}
              title='작성한 글'
            />
          )}
          {menu === 'follow' && <FollowContainer />}
          {menu === 'like' && <LikeContainer />}
        </div>
      </div>
      <Footer />
    </>
  );
}
