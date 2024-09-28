import PostContainer from './_components/post-container';

export default async function Page({
  searchParams: { page },
}: {
  searchParams: { page: string };
}) {
  return (
    <div className='flex max-w-screen justify-center py-12'>
      <PostContainer page={page ? Number(page) : 1} />
    </div>
  );
}
