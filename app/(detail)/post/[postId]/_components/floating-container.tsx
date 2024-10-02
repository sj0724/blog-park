import LikeButton from './\blike-button';
import ShareLinkButton from './share-link-button';

export default function FloatingContainer({
  postId,
  personalStatus,
}: {
  postId: string;
  personalStatus: boolean;
}) {
  return (
    <div className='fixed top-40 left-40 h-fit border shadow-md p-1 rounded-full flex flex-col gap-4'>
      <LikeButton postId={postId} personalStatus={personalStatus} />
      <ShareLinkButton />
    </div>
  );
}
