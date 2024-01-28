import fs from 'fs'; // file system module
import path from 'path'; // provides utilities for working with file and directory paths
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'blogposts');

export function getSortedPostsData() {
    // Get file names under /posts
    const fileNames: string[] = fs.readdirSync(postsDirectory);
    const allPostsData: BlogPost[] = fileNames.map((fileName) => {
        // Remove ".md" from filename to get id
        const id = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf-8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Create object
        const blogPost: BlogPost = {
            id,
            title: matterResult.data.title,
            date: matterResult.data.date
        }

        return blogPost;
    });

    // Sort posts by date
    return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1);
}