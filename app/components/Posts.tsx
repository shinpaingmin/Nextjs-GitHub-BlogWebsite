import { getSortedPostsData } from "@/lib/posts"
import ListItem from "./ListItem";

const Posts = () => {
    const posts: BlogPost[] = getSortedPostsData();

    return (
        <section className="mt-6 mx-auto max-w-2xl">
            <h2 className="text-4xl font-bold dark:text-white/90">Blog</h2>
            <ul className="w-full">
                {
                    posts.map((post) => (
                        <ListItem key={post.id} post={post} />
                    ))
                }
            </ul>
        </section>
    )
}

export default Posts