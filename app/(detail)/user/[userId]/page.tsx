import PostContainer from '@/app/_components/post-container';
import { getPostList } from '@/app/data/post';
import Profile from './_components/profile';
import { Separator } from '@/components/ui/separator';
import ProfileUserMenu from './_components/profile-user-menu';
import FollowContainer from './_components/follow-container';
import LikeContainer from './_components/like-container';
import { getSessionUserData } from '@/app/data/user';
import Pagination from '@/components/pagination';

export default async function Page({
  searchParams: { page, menu = 'list' },
  params: { userId },
}: {
  searchParams: { page: string; menu: string };
  params: { userId: string };
}) {
  const session = await getSessionUserData();
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
          {session?.id === userId && (
            <ProfileUserMenu menu={menu} userId={userId} />
          )}
          <Separator className={session?.id === userId ? 'my-5' : 'my-20'} />
          {menu === 'list' && (
            <div className='flex flex-col'>
              <PostContainer list={postList} title='작성한 글' />
              <div className='py-4 flex justify-center'>
                <Pagination
                  total={count!}
                  currentPage={currentPage}
                  route={`/user/${userId}`}
                  limit={6}
                />
              </div>
            </div>
          )}
          {menu === 'follow' && <FollowContainer />}
          {menu === 'like' && <LikeContainer />}
        </div>
      </div>
    </>
  );
}
