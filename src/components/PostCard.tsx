import Link from 'next/link';

export default function PostCard({ post }: { post: any }) {
    return (
        <div className="border p-4 rounded shadow-sm hover:shadow-md transition">
            <Link href={`/posts/${post.slug}`}>
                <h2 className="text-xl font-semibold hover:underline">{post.title}</h2>
            </Link>
            <p className="text-sm text-gray-500 mb-2">{new Date(post.date).toLocaleDateString()}</p>

            {/* ✅ Render Tags */}
            {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {post.tags.map((tag: string) => (
                        <Link
                            key={tag}
                            href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
                            className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full hover:bg-gray-300"
                        >
                            #{tag}
                        </Link>
                    ))}
                </div>
            )}

        </div>
    );
}