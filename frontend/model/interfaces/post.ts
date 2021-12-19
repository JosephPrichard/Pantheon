import { User } from "../entities/user.entity";

export interface PostInput {
    title: string;
    content?: string;
    images?: string[];
    link?: string;
}

export interface PostFilter {
    poster?: string;
    date?: Date;
    sort: "new" | "top";
    page: number;
}

export interface PostQuery {
    id: string;
    poster: User;
}

export interface PostUpdate {
    content?: string;
    images?: string[];
    link?: string;
}
