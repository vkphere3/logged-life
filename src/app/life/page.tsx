export const dynamic = 'force-dynamic';

import { getPublishedPosts } from '@/lib/notion';
import PostCard from '@/components/PostCard';

export default async function Life() {
  const posts = await getPublishedPosts('life');

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Life Blogs</h1>
      <div className="grid gap-4">
        {posts.map((post: any) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}