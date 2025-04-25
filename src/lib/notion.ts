import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getPublishedPosts(tag?: string) {
    const response = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID!,
        filter: tag ? {
            property: 'Tags',
            multi_select: {
                contains: tag,
            },
        } : {
            property: 'Published',
            checkbox: { equals: true },
        },
        sorts: [
            {
                property: 'Date',
                direction: 'descending',
            },
        ],
    });

    const posts = response.results.map((page: any) => {
        const properties = page.properties;
        return {
            id: page.id,
            title: properties.Name.title[0]?.plain_text || 'Untitled',
            slug: properties.Slug.rich_text[0]?.plain_text || '',
            date: properties.Date.date.start,
            tags: properties.Tags.multi_select.map((tag: any) => tag.name),
        };
    });

    // Filter by tag if tag is passed
    return tag
        ? posts.filter((post) => post.tags.includes(tag))
        : posts;
}

// export async function getPublishedPosts(tag?: string) {
//   const databaseId = process.env.NOTION_DATABASE_ID!;
//   const response = await notion.databases.query({
//     database_id: databaseId,
//     filter: {
//       property: 'Published',
//       checkbox: { equals: true },
//     },
//     sorts: [{ property: 'Date', direction: 'descending' }],
//   });

//   const posts = response.results.filter((page: any) => {
//     const tags = page.properties.Tags.multi_select.map((t: any) => t.name);
//     return !tag || tags.includes(tag);
//   }).map((page: any) => ({
//     slug: page.properties.Slug.rich_text[0]?.plain_text,
//     title: page.properties.Name.title[0]?.plain_text,
//     date: page.properties.Date.date.start,
//     tags: page.properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
//     id: page.id,
//   }));

//   return posts;
// }

export async function getPostBySlug(slug: string) {
    const databaseId = process.env.NOTION_DATABASE_ID!;
    const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
            property: 'Slug',
            rich_text: { equals: slug },
        },
    });

    const page = response.results[0];
    if (!page) return null;

    const mdBlocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdBlocks);

    return {
        title: page.properties.Name.title[0].plain_text,
        date: page.properties.Date.date.start,
        content: mdString.parent,
    };
}
