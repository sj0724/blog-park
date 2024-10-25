import TagBadge from '@/components/tag-badge';
import { getTagList } from '../data/tag';

export default async function TagContainer() {
  const list = await getTagList();
  return (
    <div className='flex flex-col gap-3'>
      <p className='text-sm pl-5'>태그</p>
      <div className='flex flex-wrap gap-3'>
        {list.map((tag, index) => (
          <TagBadge key={index} tag={tag.tag} type='button' />
        ))}
      </div>
    </div>
  );
}
