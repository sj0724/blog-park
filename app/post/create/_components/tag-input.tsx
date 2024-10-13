'use client';

import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { ChangeEvent, useState } from 'react';

interface Props {
  tags: string[];
  editTag: (tag: string) => void;
  deleteTag: (tag: string) => void;
}

export default function TagInput({ tags, editTag, deleteTag }: Props) {
  const [newTag, setNewTag] = useState('');

  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      editTag(newTag);
      setNewTag('');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const handleInputBlur = () => {
    editTag(newTag);
    setNewTag('');
  };

  return (
    <div className='flex flex-col gap-2'>
      <ul className='flex gap-1 items-center'>
        {tags.map((tag) => (
          <li key={tag}>
            <div className='flex items-center gap-1 px-2 py-1 bg-blue-400/70 text-white rounded-lg'>
              {tag}
              <div onClick={() => deleteTag(tag)} className='cursor-pointer'>
                <X size={15} />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Input
        maxLength={10}
        value={newTag}
        placeholder='태그를 입력후 enter를 눌러주세요'
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleInputEnter}
      />
    </div>
  );
}
