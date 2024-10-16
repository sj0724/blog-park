import PostContents from './_components/post-contents';
import CommentContainer from './_components/comment-container';
import FloatingContainer from './_components/floating-container';
import { getLikeById, getMyLikeByPostId } from '@/app/data/like';
import { getPostById } from '@/app/data/post';
import { Metadata } from 'next';
import { getCommentList } from '@/app/data/commnet';
import { getSessionUserData } from '@/app/data/user';

interface Props {
  params: { postId: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostById(params.postId);

  return {
    title: post?.title,
    description: post?.summation,
    openGraph: { images: '/logo-image.png' },
  };
}

export default async function Page({ params }: Props) {
  const session = await getSessionUserData();
  const post = await getPostById(params.postId);
  const { count } = await getLikeById(params.postId);
  const personalStatus = await getMyLikeByPostId({ postId: params.postId });
  const { totalCount } = await getCommentList({
    postId: params.postId,
    page: 1,
    limit: 5,
  });

  if (!post) return <div>없는 포스트</div>;

  return (
    <div className='flex flex-col items-center justify-center px-5 py-20 gap-10 relative w-full'>
      <PostContents
        post={post!}
        totalLike={count ? count : 0}
        personalStatus={personalStatus}
      />
      <CommentContainer
        postId={params.postId}
        createrId={post.user_id}
        totalCount={totalCount!}
        currentUser={session?.id}
      />
      <FloatingContainer
        totalLike={count ? count : 0}
        createrId={post.user_id}
        personalStatus={personalStatus}
        post={post}
      />
    </div>
  );
}
