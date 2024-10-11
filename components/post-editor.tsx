'use client';

import { Textarea } from '@/components/ui/textarea';
import { DragEvent, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { supabase, supabaseUrl } from '@/utils/supabase';
import { toast } from 'sonner';
import MarkdownComponent from '@/components/Markdown';
import generateSafeFileName from '@/utils/encodingName';
import ToolBar from '@/app/post/create/_components/toolbar';
import { CreatPostDialog } from '@/app/post/create/_components/creat-post-dialog';
import { EditPostDialog } from '@/app/post/edit/[postId]/_components/edit-post-dialog';

interface Props {
  content?: string;
  title?: string;
  postId?: string;
  summation?: string;
}

export default function PostEditor({
  content,
  title,
  postId,
  summation,
}: Props) {
  const [markdown, setMarkdown] = useState(content ? content : '');
  const [postTitle, setPostTitle] = useState(title ? title : '');
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const dropImage = async (e: DragEvent) => {
    e.preventDefault(); // textarea 기본 동작 방지
    const file = e.dataTransfer.files;

    if (file[0].type.startsWith('image/')) {
      //이미지 파일 형식 1개만 받음
      try {
        const existingFileName = `images/${generateSafeFileName(file[0].name)}`;
        await supabase.storage.from('Blog-Park').remove([existingFileName]); //같은 이름의 파일 있을 경우 삭제

        const { data, error } = await supabase.storage
          .from('Blog-Park')
          .upload(existingFileName, file[0]);

        if (error) throw error;

        const imageUrl = `${supabaseUrl}/storage/v1/object/public/${data.fullPath}`;
        setMarkdown(markdown + `![Image](${imageUrl})\n`); //이미지 url 현재 textarea 후방에 설정
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      toast.error('이미지만 드래그 앤 드롭할 수 있습니다.');
    }
  };

  const addMarkDown = (newMarkdown: string) => {
    const textarea = textareaRef.current;
    if (textarea !== null) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // 기존 텍스트 가져오기
      const currentValue = textarea.value;

      // 새로운 텍스트 설정
      textarea.value = `${currentValue.slice(
        0,
        start
      )}${newMarkdown}${currentValue.slice(end)}`;

      // 커서를 새로운 위치로 이동
      textarea.selectionStart = textarea.selectionEnd =
        start + newMarkdown.length;

      // 텍스트 영역 포커스 유지
      textarea.focus();
    }
  };

  return (
    <div className='flex px-4 py-7 w-screen'>
      <form className='relative w-full'>
        <div className='flex w-full gap-4 h-full'>
          <div className='flex flex-col w-full sm:w-1/2 gap-2 h-full'>
            <div className='min-h-20'>
              <Input
                value={postTitle}
                className='text-3xl lg:text-5xl font-semibold h-full'
                placeholder='제목을 입력하세요.'
                onChange={(e) => setPostTitle(e.target.value)}
              />
            </div>
            <ToolBar onClick={addMarkDown} />
            <Textarea
              className='w-full h-full text-lg'
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder='작성할 내용을 입력해주세요. 우측에서 미리보기로 확인할 수 있습니다.'
              onDrop={dropImage}
              onDragOver={(e) => e.preventDefault()}
              ref={textareaRef}
            />
          </div>
          <div className='sm:flex hidden flex-col w-1/2 gap-1'>
            <div className='flex flex-col px-3 py-8'>
              <p className='text-5xl font-semibold break-words'>{postTitle}</p>
            </div>
            <Separator />
            <div className='prose flex flex-col w-full h-full overflow-y-scroll px-3 py-2'>
              <MarkdownComponent markdownText={markdown} />
            </div>
          </div>
        </div>
        <div className='fixed bottom-0 right-0 px-4 h-fit flex justify-end items-center w-screen bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.1)]'>
          <div className='py-4 flex gap-2'>
            <Button
              type='button'
              className='w-20 h-12 font-semibold text-lg bg-white text-black hover:bg-gray-200'
              onClick={() => router.back()}
            >
              취소
            </Button>
            {postId ? (
              <EditPostDialog
                postContent={markdown}
                title={postTitle}
                postId={postId}
                summation={summation ? summation : ''}
              />
            ) : (
              <CreatPostDialog postContent={markdown} title={postTitle} />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
