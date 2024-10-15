'use client';

import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { ChangeEvent, useState } from 'react';

interface Props {
  tags: string[];
  editTagList: (tagList: string[]) => void;
}

export default function TagInput({ tags, editTagList }: Props) {
  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    if (tags.length === 3) {
      return;
    }
    editTagList([...tags, newTag]);
  };

  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (tags.length === 3) {
        return;
      }
      addTag();
      setNewTag('');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const handleInputBlur = () => {
    if (newTag.length > 0) {
      addTag();
      setNewTag('');
    }
  };

  const deleteTag = (tag: string) => {
    const deleteList = tags.filter((item) => item !== tag);
    editTagList(deleteList);
  };

  return (
    <div className='flex flex-col gap-2'>
      <Input
        maxLength={10}
        value={newTag}
        placeholder='태그를 입력후 enter를 눌러주세요'
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleInputEnter}
      />
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
    </div>
  );
}
