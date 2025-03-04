import { supabase } from '@/utils/supabase';
import PostEditor from '@/app/editor/_components/post-editor';

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
        post={post}
        postId={params.postId}
        title={post.title}
        content={post.content}
      />
    </div>
  );
}
