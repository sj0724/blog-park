import { supabase } from '@/utils/supabase';
import PostContents from './_components/post-contents';

export default async function Page({ params }: { params: { postId: string } }) {
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', params.postId)
    .single();

  if (!post) return <div>없는 포스트</div>;

  return (
    <div>
      <PostContents contents={post.content} />
    </div>
  );
}
