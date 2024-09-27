import { supabase } from '@/utils/supabase';
import PostContents from './_components/post-contents';

export default async function Page({ params }: { params: { postId: string } }) {
  const { data: post } = await supabase
    .from('posts')
    .select(`*, fk_user(*)`)
    .eq('id', params.postId)
    .single();

  if (!post) return <div>없는 포스트</div>;

  return (
    <div className='flex justify-center px-4 py-20'>
      <PostContents
        contents={post.content}
        createdAt={post.createdAt}
        title={post.title}
        user={post.fk_user}
      />
    </div>
  );
}
