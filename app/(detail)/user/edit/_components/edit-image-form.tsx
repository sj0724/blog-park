'use client';

import { editImage } from '@/app/action/user';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { UserAvatar } from '@/components/user-avatar';
import { supabase, supabaseUrl } from '@/utils/supabase';
import { PlusIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { toast } from 'sonner';

export default function EditImageForm({ image }: { image: string }) {
  const { data: session, update } = useSession();
  const [userImage, setUserImage] = useState(image);
  const router = useRouter();

  const isEdit = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault(); // 기본 동작 방지
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      if (file.type.startsWith('image/')) {
        try {
          const existingFileName = `images/${file.name}`;

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
          setUserImage(imageUrl);
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
  const cancelImage = () => {
    setUserImage(image);
  };

  const onSubmit = async () => {
    const result = await editImage(userImage);
    toast.message(result.message);
    update({
      ...session,
      user: { ...session?.user, image: userImage },
    });
    router.refresh();
  };

  return (
    <div className='flex flex-col items-center gap-4'>
      <div className='relative'>
        <UserAvatar image={userImage} size='lg' />
        <Label className='absolute bottom-3 -right-2 rounded-full bg-blue-500'>
          <PlusIcon size={40} color='white' />
          <input type='file' className='hidden' onChange={isEdit} />
        </Label>
      </div>
      {image !== userImage && (
        <div className='flex gap-3'>
          <Button
            disabled={image === userImage}
            onClick={cancelImage}
            className='bg-red-500 hover:bg-red-400'
            type='button'
          >
            취소
          </Button>
          <Button type='button' onClick={onSubmit}>
            수정
          </Button>
        </div>
      )}
    </div>
  );
}
