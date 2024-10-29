import { Skeleton } from '@/components/ui/skeleton';

export default function RepoSkeleton() {
  return (
    <div className='flex flex-col gap-3 h-80'>
      {Array.from({ length: 10 }).map((_, index) => (
        <div className='flex gap-2' key={index}>
          <Skeleton className='w-4 h-4' />
          <Skeleton className='w-32 h-4' />
        </div>
      ))}
    </div>
  );
}
