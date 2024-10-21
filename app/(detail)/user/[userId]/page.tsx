import PostContainer from '@/app/_components/post-container';
import { getPostListByUserId } from '@/app/data/post';
import Profile from './_components/profile';
import { Separator } from '@/components/ui/separator';
import ProfileUserMenu from './_components/profile-user-menu';
import FollowContainer from './_components/follow-container';
import LikeContainer from './_components/like-container';
import { getSessionUserData, getUserById } from '@/app/data/user';
import Pagination from '@/components/pagination';
import { Metadata } from 'next';
import ActivityCalendar from './_components/activity-calendar';

interface Props {
  searchParams: { page: string; menu: string };
  params: { userId: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const userData = await getUserById(params.userId);

  return {
    title: `${userData.name}의 프로필`,
    description: `${userData.introduction}`,
    openGraph: { images: userData.image || '/logo-image.png' },
  };
}

export default async function Page({
  searchParams: { page, menu = 'list' },
  params: { userId },
}: Props) {
  const session = await getSessionUserData();
  const currentPage = page ? Number(page) : 1;
  const { data: postList, count } = await getPostListByUserId({
    userId,
    page: currentPage,
    limit: 6,
  });
  if (!postList) return <div>포스트 없음</div>;

  return (
    <>
      <div className='flex flex-col items-center max-w-[1100px] w-full justify-center py-12 px-5'>
        <div className='w-full flex flex-col'>
          <Profile userId={userId} />
          <ActivityCalendar userId={userId} />
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
