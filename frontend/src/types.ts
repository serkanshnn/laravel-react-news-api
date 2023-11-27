export interface IArticle {
    id: number,
    title: string,
    description: string,
    content: string,
    url: string,
    image_url: string,
    published_at: string,
    author: { name: string },
    category: { name: string },
    source: { name: string },
}
