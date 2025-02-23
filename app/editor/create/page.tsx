import PostEditor from '@/app/editor/_components/post-editor';

export default async function Page() {
  return (
    <div className='flex max-w-screen max-w-[1100px] justify-center max-h-[calc(100vh-80px-80px)] h-screen'>
      <PostEditor />
    </div>
  );
}
