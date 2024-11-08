'use client';

import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import generateSafeFileName from '@/utils/encodingName';
import { supabase, supabaseUrl } from '@/utils/supabase';
import {
  Bold,
  ChevronRight,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  ImageIcon,
  Italic,
  Link,
  Minus,
} from 'lucide-react';
import { ChangeEvent } from 'react';
import { toast } from 'sonner';

export default function ToolBar({
  onClick,
}: {
  onClick: (newMarkDown: string) => void;
}) {
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
          onClick(`![이미지설명](${imageUrl})`);
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

  return (
    <div className='flex w-full px-4 gap-4 items-center'>
      <div className='flex gap-4 h-fit'>
        <div onClick={() => onClick('# ')} className='cursor-pointer'>
          <Heading1 size={25} color='gray' />
        </div>
        <div onClick={() => onClick('## ')} className='cursor-pointer'>
          <Heading2 size={25} color='gray' />
        </div>
        <div onClick={() => onClick('### ')} className='cursor-pointer'>
          <Heading3 size={25} color='gray' />
        </div>
        <div onClick={() => onClick('#### ')} className='cursor-pointer'>
          <Heading4 size={25} color='gray' />
        </div>
      </div>
      <Separator orientation='vertical' className='max-h-full' />
      <div className='flex gap-4 h-fit'>
        <div onClick={() => onClick('**텍스트**')} className='cursor-pointer'>
          <Bold size={25} color='gray' />
        </div>
        <div onClick={() => onClick('*텍스트*')} className='cursor-pointer'>
          <Italic size={25} color='gray' />
        </div>
        <div onClick={() => onClick('~~텍스트~~')} className='cursor-pointer'>
          <Minus size={25} color='gray' />
        </div>
      </div>
      <Separator orientation='vertical' className='max-h-full' />
      <div className='flex gap-4 h-fit'>
        <div onClick={() => onClick('> 텍스트')} className='cursor-pointer'>
          <ChevronRight size={25} color='gray' />
        </div>
        <div
          onClick={() => onClick('[링크텍스트](url)')}
          className='cursor-pointer'
        >
          <Link size={25} color='gray' />
        </div>
        <div>
          <Label className='cursor-pointer'>
            <ImageIcon size={25} color='gray' />
            <input type='file' className='hidden' onChange={isEdit} />
          </Label>
        </div>
        <div
          onClick={() => onClick('```\n텍스트\n```')}
          className='cursor-pointer'
        >
          <Code size={25} color='gray' />
        </div>
      </div>
    </div>
  );
}
