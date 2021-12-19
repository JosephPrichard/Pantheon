import { Post } from "../../model/entities/post.entity";
import { PostFilter } from "../../model/interfaces/post";

export interface UpdateBody {
    update: {
        content?: string;
        images?: string[];
    };
}

export interface CreateBody {
    title: string;
    content?: string;
    images?: string[];
    link?: string;
}

export interface SearchBody {
    filters: PostFilter;
}

export type SearchRes = {
    posts: Post[];
    pageCount: number;
}