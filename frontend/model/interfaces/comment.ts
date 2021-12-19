import { User } from "../entities/user.entity";
import { SortType } from "../global";

export interface CommentRootInput {
    post: string;
    content: string;
}

export interface CommentNodeInput {
    parentComment: string;
    content: string;
}

interface Filter {
    sort: SortType;
    limit: number;
    skip: number;
}

export type CommentTreeFilter = Filter & { post?: string };

export type CommentFilter = Filter & { commenter?: string };

export interface CommentQuery {
    id: string;
    commenter: User;
}

export interface CommentUpdate {
    content?: string;
}
