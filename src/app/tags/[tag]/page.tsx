import Head from 'next/head';
import { getPublishedPosts } from '@/lib/notion';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

const POSTS_PER_PAGE = 5; // Number of posts per page

export default async function TagPage({ params, searchParams }: { params: { tag: string }; searchParams: { page: string } }) {
    const tag = decodeURIComponent(params.tag);
    const page = parseInt(searchParams.page || '1', 10); // Default to page 1 if no page param is passed

    // Fetch posts for this tag and page
    const posts = await getPublishedPosts(tag);
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    const paginatedPosts = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

    return (
        <>
            {/* Dynamic Meta Tags */}
            <Head>
                <title>Posts tagged with “{tag}”</title>
                <meta name="description" content={`Explore blog posts tagged with ${tag}.`} />
            </Head>

            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6 capitalize">
                    Posts tagged with “{tag}”
                </h1>
                {paginatedPosts.length === 0 ? (
                    <p>No posts found with this tag.</p>
                ) : (
                    <div className="grid gap-4">
                        {paginatedPosts.map((post: any) => (
                            <PostCard key={post.slug} post={post} />
                        ))}
                    </div>
                )}

                {/* Pagination Links */}
                {totalPages > 1 && (
                    <div className="mt-6 flex justify-center gap-4">
                        {page > 1 && (
                            <Link href={`/tags/${tag}?page=${page - 1}`} className="text-blue-500 hover:underline">
                                Previous
                            </Link>
                        )}
                        <span className="text-sm">
                            Page {page} of {totalPages}
                        </span>
                        {page < totalPages && (
                            <Link href={`/tags/${tag}?page=${page + 1}`} className="text-blue-500 hover:underline">
                                Next
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
