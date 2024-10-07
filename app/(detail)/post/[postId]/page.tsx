import PostContents from './_components/post-contents';
import CommentContainer from './_components/comment-container';
import FloatingContainer from './_components/floating-container';
import { getLikeById, getMyLikeByPostId } from '@/app/data/like';
import { getPostById } from '@/app/data/post';

export default async function Page({ params }: { params: { postId: string } }) {
  const post = await getPostById(params.postId);

  if (!post) return <div>없는 포스트</div>;
  const { count } = await getLikeById(params.postId);
  const personalStatus = await getMyLikeByPostId({ postId: params.postId });

  return (
    <div className='flex flex-col items-center justify-center px-4 py-20 gap-10 relative'>
      <PostContents
        postId={params.postId}
        contents={post.content}
        createdAt={post.createdAt}
        title={post.title}
        user={post.posts_user_id_fkey}
        totalLike={count ? count : 0}
      />
      <CommentContainer postId={params.postId} />
      <FloatingContainer
        createrId={post.user_id}
        postId={params.postId}
        personalStatus={personalStatus}
      />
    </div>
  );
}
