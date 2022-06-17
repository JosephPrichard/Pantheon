/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { PostEntity, PostEntityNoForum } from "./post";
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

export interface CommentNotificationEntity {
    id: Id;
    commenter: UserEntity | null;
    post: PostEntityNoForum;
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