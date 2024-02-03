import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings/lib';
import rehypeHighlight from 'rehype-highlight/lib';
import rehypeSlug from 'rehype-slug';
import Video from '@/app/components/Video';
import CustomImage from '@/app/components/CustomImage';

type Filetree = {
    "tree": [
        {
            "path": string
        }
    ]
}

export async function getPostByName(fileName: string): Promise<BlogPost | undefined> {
    const res = await fetch(`https://raw.githubusercontent.com/shinpaingmin/testing-blogposts/master/${fileName}`, {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });

    if(!res.ok) return undefined;

    const rawMDX = await res.text();

    if(rawMDX === '404: Not Found') return undefined;

    const { frontmatter, content } = await compileMDX<{
        title: string,
        date: string,
        tags: string[]
    }>({
        source: rawMDX,
        components: {
            Video, CustomImage 
        },
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [
                    rehypeHighlight,
                    rehypeSlug,
                    [rehypeAutolinkHeadings, {
                        behavior: 'wrap'
                    }]
                ]
            }
        }
    });

    const id = fileName.replace(/\.mdx$/, '');

    const blogPostObj: BlogPost = {
        meta: {
            id,
            title: frontmatter.title,
            date: frontmatter.date,
            tags: frontmatter.tags
        },
        content
    };

    return blogPostObj;
}

export async function getPostsMeta(): Promise<Meta[] | undefined> {
    const res = await fetch('https://api.github.com/repos/shinpaingmin/testing-blogposts/git/trees/master?recursive=1', {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });     // return string type pathname

    if(!res.ok) return undefined;

    const repoFiletree: Filetree = await res.json();

    // WE must filter pathnames
    const filesArray = repoFiletree.tree.map(obj => obj.path).filter(path=>path.endsWith('.mdx'));

    // we must create an array with posts
    const posts: Meta[] = [];

    for(const file of filesArray) {
        const post = await getPostByName(file);
        if(post) {
            const { meta } = post;
            posts.push(meta);
        }
    }

    return posts.sort((a, b) => a.date < b.date ? 1 : -1);
}