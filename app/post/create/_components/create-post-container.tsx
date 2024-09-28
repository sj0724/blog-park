'use client';

import { Textarea } from '@/components/ui/textarea';
import { ChangeEvent, useState } from 'react';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import { unified } from 'unified';
import { CreatPostDialog } from './creat-post-dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function CreatePostContainer() {
  const [markdown, setMarkdown] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [title, setTitle] = useState('');
  const router = useRouter();

  const handleMarkdownChange = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newMarkdown = e.target.value;
    setMarkdown(newMarkdown);

    const processedHtml = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(newMarkdown);

    setHtmlContent(String(processedHtml));
  };

  return (
    <div className='flex px-4 py-7 w-screen'>
      <form className='relative w-full'>
        <div className='flex w-full gap-4 h-full'>
          <div className='flex flex-col w-1/2 gap-2 h-full'>
            <div className='min-h-20'>
              <Input
                className='text-5xl font-semibold h-full'
                placeholder='제목을 입력하세요.'
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <Textarea
              className='w-full h-full text-lg'
              value={markdown}
              onChange={handleMarkdownChange}
              placeholder='작성할 내용을 입력해주세요. 우측에서 미리보기로 확인할 수 있습니다.'
            />
          </div>
          <div className='flex flex-col w-1/2 gap-1'>
            <div className='flex flex-col min-h-20 justify-center px-3 py-1'>
              <p className='text-5xl font-semibold'>{title}</p>
            </div>
            <Separator />
            <div
              className='prose flex flex-col w-full h-full overflow-y-scroll px-3 py-2'
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            ></div>
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
            <CreatPostDialog postContent={htmlContent} title={title} />
          </div>
        </div>
      </form>
    </div>
  );
}
