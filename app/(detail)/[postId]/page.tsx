import { supabase } from '@/utils/supabase';
import PostContents from './_components/post-contents';

export default async function Page({ params }: { params: { postId: string } }) {
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', params.postId)
    .single();

  return (
    <div>
      <PostContents contents={post.content} />
    </div>
  );
}
