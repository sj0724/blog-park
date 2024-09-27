export default function PostContents({ contents }: { contents: string }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: contents }} className='prose' />
  );
}
