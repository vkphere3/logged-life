export const dynamic = 'force-dynamic';

import { getPostBySlug } from '@/lib/notion';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{formatDate(post.date)}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} className="prose max-w-none" />
    </div>
  );
}