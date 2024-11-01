import PostSkeleton from '@/components/post-skeketon';

export default function LandingListSkeleton() {
  return (
    <div className='flex flex-col gap-4'>
      {Array.from({ length: 6 }).map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    </div>
  );
}
