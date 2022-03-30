/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { PostEntity } from "./post";
import { UserEntity } from "./user";

export interface CommentEntity {
    id: number;
    commenter: UserEntity | null;
    post: PostEntity;
    path: string;
    votes: number;
    content: string;
    createdAt: string;
}

export interface CommentTreeEntity {
    node: CommentEntity;
    children: CommentTreeEntity[];
    id: number;
}