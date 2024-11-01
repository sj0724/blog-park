import { Skeleton } from '@/components/ui/skeleton';

export default function FavoriteListSkeleton() {
  return (
    <div className='flex flex-col gap-4'>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className='flex flex-col gap-2 py-2 px-1 w-[300px]'>
          <Skeleton className='w-40 h-6' />
          <Skeleton className='w-16 h-6' />
        </div>
      ))}
    </div>
  );
}
