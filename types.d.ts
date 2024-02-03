// array of blogposts
type Meta = {
    id: string,
    title: string,
    date: string,
    tags: string[]
};

// for each blog post
type BlogPost = {
    meta: Meta,
    content: ReactElement<any, string | JSXElementConstructor<any>>
}