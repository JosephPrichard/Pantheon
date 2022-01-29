import { ForumEntity } from "./forum";
import { UserEntity } from "./user";

export interface PostEntity {
    id: number;
    poster: UserEntity | null;
    forum: ForumEntity;
    title: string;
    votes: number;
    comments: number;
    content: string | null;
    images: string[];
    link: string | null;
    createdAt: string;
    hotRank?: number;
}