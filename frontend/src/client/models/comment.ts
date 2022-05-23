/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { PostEntity } from "./post";
import { UserEntity } from "./user";
import { Id } from "../types";

export interface CommentEntity {
    id: Id;
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