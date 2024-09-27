import PostContainer from './_components/post-container';

export default async function Page({
  searchParams: { page },
}: {
  searchParams: { page: string };
}) {
  return (
    <div className='flex max-w-screen'>
      <PostContainer page={Number(page)} />
    </div>
  );
}
