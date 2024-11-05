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
import { Suspense } from 'react';
import LandingListSkeleton from '@/app/_components/landing-list-skeleton';

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
    limit: 5,
  });
  if (!postList) return <div>포스트 없음</div>;

  return (
    <>
      <div className='flex flex-col items-center max-w-[800px] w-full justify-center py-12 px-5'>
        <div className='w-full flex flex-col gap-5 items-center'>
          <div className='flex flex-col gap-2 w-full max-w-[800px] bg-white shadow-md rounded-lg px-5 py-5'>
            <Profile userId={userId} />
            <Separator />
            <ActivityCalendar userId={userId} />
          </div>
          <div className='flex flex-col w-full'>
            {session?.id === userId && (
              <ProfileUserMenu menu={menu} userId={userId} />
            )}
            <div className='flex flex-col items-center'>
              {menu === 'list' && (
                <>
                  <Suspense fallback={<LandingListSkeleton />}>
                    <PostContainer list={postList} />
                  </Suspense>
                  <div className='py-4 flex justify-center'>
                    <Pagination
                      total={count!}
                      currentPage={currentPage}
                      route={`/user/${userId}`}
                      limit={5}
                    />
                  </div>
                </>
              )}
              {menu === 'follow' && <FollowContainer />}
              {menu === 'like' && (
                <LikeContainer currentPage={currentPage} userId={userId} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
