/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './codeBlock';

export default function MarkdownComponent({
  markdownText,
}: {
  markdownText: string;
}) {
  return (
    <ReactMarkdown
      className='prose'
      remarkPlugins={[remarkGfm]}
      components={{
        code({ inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <CodeBlock
              value={String(children).replace(/\n$/, '')}
              language={match[1]}
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        img: (props) => (
          <Image
            src={props.src ? props.src : ''}
            alt={props.alt ? props.alt : '포스트 이미지'}
            height={500}
            width={200}
            layout='responsive'
          />
        ),
        a: (props) => (
          <Link href={props.href ? props.href : ''} target='_blank'>
            {props.children}
          </Link>
        ),
      }}
    >
      {markdownText}
    </ReactMarkdown>
  );
}
