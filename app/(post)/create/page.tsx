'use client';

import { Textarea } from '@/components/ui/textarea';
import { FormEvent, useState } from 'react';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import { unified } from 'unified';
import { Button } from '@/components/ui/button';
import { creatPost } from '@/app/action/post';

export default function Page() {
  const [markdown, setMarkdown] = useState<string>('');
  const [htmlContent, setHtmlContent] = useState<string>('');

  const handleMarkdownChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newMarkdown = e.target.value;
    setMarkdown(newMarkdown);

    // Markdown을 HTML로 변환
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
      <form className='flex flex-col w-1/2' onSubmit={handleSave}>
        <Textarea
          className='h-40'
          value={markdown}
          onChange={handleMarkdownChange}
          placeholder='Markdown 입력...'
        />
        <Button type='submit'>저장</Button>
      </form>
      <div
        className='prose h-fit flex flex-col'
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      ></div>
    </div>
  );
}
