'use client';

import { Textarea } from '@/components/ui/textarea';
import { ChangeEvent, useEffect, useState } from 'react';
import remarkParse from 'remark-parse';
import rehypeParse from 'rehype-parse';
import remarkRehype from 'remark-rehype';
import rehypeRemark from 'rehype-remark';
import rehypeStringify from 'rehype-stringify';
import remarkStringify from 'remark-stringify';
import remarkGfm from 'remark-gfm';
import { unified } from 'unified';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { EditPostDialog } from './edit-post-dialog';

interface Props {
  content: string;
  title: string;
  postId: string;
  summation: string;
}

export default function EditPostContainer({
  content,
  title,
  postId,
  summation,
}: Props) {
  const [markdown, setMarkdown] = useState('');
  const [htmlContent, setHtmlContent] = useState(content);
  const [newTitle, setNewTitle] = useState(title);
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

  useEffect(() => {
    const parsingHtml = async () => {
      const processedMarkdown = await unified()
        .use(rehypeParse, { fragment: true }) // HTML 파싱
        .use(rehypeRemark) // HTML을 마크다운으로 변환
        .use(remarkGfm) // GitHub Flavored Markdown 지원
        .use(remarkStringify) // 마크다운 문자열로 변환
        .process(content);

      setMarkdown(processedMarkdown.value.toString());
    };
    parsingHtml();
  }, [content]);

  return (
    <div className='flex px-4 py-7 w-screen'>
      <form className='relative w-full'>
        <div className='flex w-full gap-4 h-full'>
          <div className='flex flex-col w-1/2 gap-2 h-full'>
            <div className='min-h-20'>
              <Input
                value={newTitle}
                className='text-5xl font-semibold h-full'
                placeholder='제목을 입력하세요.'
                onChange={(e) => setNewTitle(e.target.value)}
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
              <p className='text-5xl font-semibold'>{newTitle}</p>
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
            <EditPostDialog
              postContent={htmlContent}
              title={newTitle}
              postId={postId}
              summation={summation}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
