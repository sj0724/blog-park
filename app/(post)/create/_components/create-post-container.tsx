'use client';

import { Textarea } from '@/components/ui/textarea';
import { ChangeEvent, FormEvent, useState } from 'react';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import { unified } from 'unified';
import { Button } from '@/components/ui/button';
import { creatPost } from '@/app/action/post';

export default function CreatePostContainer() {
  const [markdown, setMarkdown] = useState<string>('');
  const [htmlContent, setHtmlContent] = useState<string>('');

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

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await creatPost({
      title: 'test',
      content: htmlContent,
      summation: 'test입니다.',
      isPublished: true,
    });
    if (result) console.log(result.message);
  };

  return (
    <div className='flex'>
      <form className='flex flex-col relative' onSubmit={handleSave}>
        <div className='flex w-screen h-[calc(100vh-52px-68px)]'>
          <div className='flex flex-col w-1/2 gap-2 px-5'>
            <p className='text-2xl font-bold'>Markdown 문법으로 작성</p>
            <Textarea
              className='w-full h-full text-lg'
              value={markdown}
              onChange={handleMarkdownChange}
              placeholder='작성할 내용을 입력해주세요.'
            />
          </div>
          <div className='flex flex-col w-1/2 gap-2 px-5'>
            <p className='text-2xl font-bold'>미리보기</p>
            <div
              className='prose flex flex-col w-full h-full overflow-y-scroll border rounded-md px-3 py-2'
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            ></div>
          </div>
        </div>
        <div className='fixed bottom-0 right-0 px-4 h-fit flex justify-end items-center w-screen bg-white'>
          <div className='py-4'>
            <Button type='submit'>저장</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
