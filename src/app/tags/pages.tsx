export const dynamic = 'force-dynamic';

import { getPublishedPosts } from '@/lib/notion';
import Link from 'next/link';

export default async function TagsPage() {
    // Fetch all posts
    const posts = await getPublishedPosts();

    // Get unique tags
    const tags = [
        ...new Set(posts.flatMap((post: any) => post.tags)),  // Flatten and deduplicate tags
    ];

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">All Tags</h1>
            <div className="flex flex-wrap gap-4">
                {tags.map((tag: string) => (
                    <Link
                        key={tag}
                        href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
                        className="bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full hover:bg-gray-300"
                    >
                        #{tag}
                    </Link>
                ))}
            </div>
        </div>
    );
}
