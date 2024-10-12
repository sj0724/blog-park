import { supabase } from '@/utils/supabase';
import PostEditor from '@/components/post-editor';

export default async function Page({ params }: { params: { postId: string } }) {
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', params.postId)
    .single();

  if (!post) return <div>없는 포스트</div>;

  return (
    <div className='flex max-w-screen justify-center max-h-[calc(100vh-80px-80px)] h-screen'>
      <PostEditor
        title={post.title}
        content={post.content}
        summation={post.summation}
        postId={params.postId}
        isPublished={post.isPublished}
      />
    </div>
  );
}
