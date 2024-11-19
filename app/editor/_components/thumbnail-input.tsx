'use client';

import generateSafeFileName from '@/utils/encodingName';
import { supabase, supabaseUrl } from '@/utils/supabase';
import { Label } from '@radix-ui/react-label';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { toast } from 'sonner';

type ImageObj = {
  name: string;
  image: string;
};

const exampleImage: ImageObj[] = [
  {
    name: 'js',
    image: '/javascript-image.png',
  },
  {
    name: 'react',
    image: '/React-icon.svg',
  },
  {
    name: 'next',
    image: '/nextjs-image.jpg',
  },
  {
    name: 'blog',
    image: '/blog-square-image.png',
  },
];

export default function ThumbnailInput({
  editThumbnail,
}: {
  editThumbnail: (imaeg: string) => void;
}) {
  const [newThumbnail, setNewThumbnail] = useState('');
  const isEdit = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      if (file.type.startsWith('image/')) {
        try {
          const existingFileName = `images/${generateSafeFileName(file.name)}`;

          // 같은 이름의 파일 있을 경우 삭제
          const { error: removeError } = await supabase.storage
            .from('Blog-Park')
            .remove([existingFileName]);
          if (removeError) {
            console.warn('Failed to remove existing file:', removeError);
          }

          // 이미지 파일 업로드
          const { data, error: uploadError } = await supabase.storage
            .from('Blog-Park')
            .upload(existingFileName, file);

          if (uploadError) throw uploadError;

          const imageUrl = `${supabaseUrl}/storage/v1/object/public/${data.fullPath}`;
          setNewThumbnail(imageUrl);
          editThumbnail(imageUrl);
        } catch (error) {
          console.error('Error uploading image:', error);
          toast.error('이미지 업로드 중 오류가 발생했습니다.');
        }
      } else {
        toast.error('이미지 파일만 업로드할 수 있습니다.');
      }
    } else {
      toast.error('파일을 선택해 주세요.');
    }
  };

  const handleInputChange = (image: string) => {
    setNewThumbnail(image);
    editThumbnail(image);
  };

  return (
    <div className='flex gap-2'>
      <div className='flex items-center justify-center border w-[55px] h-[55px]  rounded-lg'>
        <Label className='cursor-pointer relative w-[55px] h-[55px]'>
          <div className='absolute inset-0 z-10 flex justify-center items-center hover:bg-gray-300/50 rounded-lg'>
            <Plus size={30} />
          </div>
          <input type='file' className='hidden' onChange={isEdit} />
          {newThumbnail && (
            <div className='w-[55px] h-[55px] relative cursor-pointer rounded-lg'>
              <Image
                src={newThumbnail}
                alt='신규 썸네일'
                fill
                className='rounded-lg'
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}
        </Label>
      </div>
      {exampleImage.map((item) => (
        <div
          key={item.name}
          onClick={() => handleInputChange(item.image)}
          className='w-[55px] h-[55px] relative cursor-pointer hover:opacity-50 rounded-lg'
        >
          <Image
            src={item.image}
            alt={`${item.name} logo`}
            fill
            className='rounded-lg'
            style={{ objectFit: 'cover' }}
          />
        </div>
      ))}
    </div>
  );
}
