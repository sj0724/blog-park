'use client';

import { Textarea } from '@/components/ui/textarea';
import { DragEvent, useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { supabase, supabaseUrl } from '@/utils/supabase';
import { toast } from 'sonner';
import generateSafeFileName from '@/utils/encodingName';
import MarkdownEditor from '../../../components/markdown-editor';
import { Post } from '@/type';
import ToolBar from '@/app/editor/_components/toolbar';
import EditorButtonContainer from './\beditor-button-container';
import { useSearchParams } from 'next/navigation';
import { getTemporaryPostById } from '@/app/data/temporary-post';
import SaveButton from './save-button';

interface Props {
  postId?: string;
  title?: string;
  content?: string;
  post?: Post;
}

export default function PostEditor({ postId, post, content, title }: Props) {
  const [markdown, setMarkdown] = useState(content ? content : '');
  const [postTitle, setPostTitle] = useState(title ? title : '');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const searchParams = useSearchParams();
  const temporaryId = searchParams.get('id');

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

  useEffect(() => {
    const getTemporaryData = async (temporaryId: string) => {
      const data = await getTemporaryPostById(temporaryId);
      setMarkdown(data ? data.content : '');
      setPostTitle(data ? data.title : '');
    };
    if (temporaryId) {
      getTemporaryData(temporaryId);
    }
  }, [temporaryId]);

  return (
    <div className='flex px-4 py-7 w-screen'>
      <form className='relative w-full'>
        <div className='flex w-full gap-4 h-full'>
          <div className='flex flex-col w-full lg:w-1/2 gap-2 h-full'>
            <div className='min-h-20'>
              <Input
                value={postTitle}
                className='text-3xl lg:text-3xl font-semibold h-full border-none placeholder:text-gray-300 bg-slate-50 shadow-none focus:outline-none focus:ring-0'
                placeholder='제목을 입력하세요.'
                onChange={(e) => setPostTitle(e.target.value)}
              />
            </div>
            <ToolBar onClick={addMarkDown} />
            <Textarea
              className='w-full h-full text-lg border-none bg-slate-50 shadow-none focus:outline-none focus:ring-0 placeholder:text-gray-300'
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder='작성할 내용을 입력해주세요.'
              onDrop={dropImage}
              onDragOver={(e) => e.preventDefault()}
              ref={textareaRef}
            />
          </div>
          <Separator orientation='vertical' className='hidden lg:block' />
          <div className='lg:flex hidden flex-col w-1/2 gap-1'>
            <div className='flex flex-col px-3 py-8'>
              <p className='text-3xl font-semibold break-words'>{postTitle}</p>
            </div>
            <div className='prose flex flex-col w-full h-full overflow-y-scroll px-3 py-2'>
              <MarkdownEditor markdownText={markdown} />
            </div>
          </div>
        </div>
        <EditorButtonContainer
          postId={postId}
          post={post}
          title={postTitle}
          content={markdown}
        >
          {!postId && (
            <SaveButton id={temporaryId} title={postTitle} content={markdown} />
          )}
        </EditorButtonContainer>
      </form>
    </div>
  );
}
