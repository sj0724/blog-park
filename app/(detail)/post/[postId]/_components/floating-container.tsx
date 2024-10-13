import LikeButton from './like-button';
import ShareLinkButton from './share-link-button';

export default function FloatingContainer({
  postId,
  personalStatus,
  createrId,
  totalLike,
}: {
  postId: string;
  personalStatus: boolean;
  createrId: string;
  totalLike: number;
}) {
  return (
    <div className='hidden fixed top-40 left-1/2 -translate-x-[500px] h-fit border shadow-md p-1 rounded-full lg:flex flex-col gap-3 bg-white'>
      <div className='flex flex-col items-center gap-2'>
        <div className='shadow-md border rounded-full p-2'>
          <LikeButton
            postId={postId}
            personalStatus={personalStatus}
            createrId={createrId}
            size={30}
          />
        </div>
        <p className='font-semibold'>{totalLike}</p>
      </div>
      <ShareLinkButton />
    </div>
  );
}
