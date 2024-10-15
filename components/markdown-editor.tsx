/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './codeBlock';

export default function MarkdownEditor({
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
          <span className={`block`}>
            <Image
              src={props.src ? props.src : ''}
              alt={props.alt ? props.alt : '포스트 이미지'}
              width={200}
              height={500}
              sizes='100vw'
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </span>
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
