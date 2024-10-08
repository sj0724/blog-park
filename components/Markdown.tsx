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
            alt={props.alt ? props.alt : ''}
            width={1200}
            height={200}
          />
        ),
      }}
    >
      {markdownText.replace(/\n/g, '\n\n')}
    </ReactMarkdown>
  );
}
