import { Skeleton } from '@/components/ui/skeleton';

export default function TagListSkeleton() {
  return (
    <div className='flex gap-4'>
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className='w-16 h-8 rounded-full' />
      ))}
    </div>
  );
}
