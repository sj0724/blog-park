import LikeButton from './\blike-button';
import ShareLinkButton from './share-link-button';

export default function FloatingContainer({
  postId,
  personalStatus,
  createrId,
}: {
  postId: string;
  personalStatus: boolean;
  createrId: string;
}) {
  return (
    <div className='fixed top-40 left-1/2 -translate-x-[500px] h-fit border shadow-md p-1 rounded-full flex flex-col gap-4 bg-white'>
      <LikeButton
        postId={postId}
        personalStatus={personalStatus}
        createrId={createrId}
      />
      <ShareLinkButton />
    </div>
  );
}
