import TagBadge from '@/components/tag-badge';
import { getTagList } from '../data/tag';
import { Suspense } from 'react';
import TagListSkeleton from './tag-list-skeleton';

export default async function TagContainer() {
  const list = await getTagList();
  return (
    <div className='flex flex-col gap-3'>
      <p className='text-sm pl-5'>태그</p>
      <Suspense fallback={<TagListSkeleton />}>
        <div className='flex flex-wrap gap-3'>
          {list.map((tag, index) => (
            <TagBadge key={index} tag={tag.tag} type='button' />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
