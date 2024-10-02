import LikeButton from './\blike-button';

export default function FloatingContainer({
  postId,
  personalStatus,
}: {
  postId: string;
  personalStatus: boolean;
}) {
  return (
    <div className='fixed top-40 left-40 h-fit'>
      <LikeButton postId={postId} personalStatus={personalStatus} />
    </div>
  );
}
