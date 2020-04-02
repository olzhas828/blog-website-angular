import { Comment } from "./Comment";
export class BlogPost{
    _id: string
    title: string;
    postDate: Date;
    featuredImage: string;
    post: string;
    postedBy: string;
    comments: Array<Comment>;
    category: string;
    tags: Array<string>;
    isPrivate: Boolean;
    views: number;
}