import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
        img: (props) => (
          <Image
            src={props.src ? props.src : ''}
            alt='포스트 이미지'
            width={1200}
            height={200}
          />
        ),
      }}
    >
      {markdownText}
    </ReactMarkdown>
  );
}
