import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function CommentSkeleton() {
  const arr = new Array(5).fill(0);
  return (
    <>
      {arr.map((_, index) => (
        <div key={index}>
          <div className='flex flex-col gap-3 px-4 py-2'>
            <div className='flex items-center gap-2 py-3'>
              <Skeleton className='w-14 h-14 rounded-full' />
              <Skeleton className='w-20 h-4' />
            </div>
            <Skeleton className='w-80 h-4' />
            <Skeleton className='w-64 h-4' />
          </div>
          <Separator className='mt-3' />
        </div>
      ))}
    </>
  );
}
