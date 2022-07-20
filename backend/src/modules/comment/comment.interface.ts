/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { CommentEntity } from "./comment.entity";

export interface CommentFilter {
    commenter: string;
    afterCursor?: number;
    perPage: number;
}

export interface CommentFilterRo {
    comments: CommentEntity[];
    nextPage: boolean;
}

export interface CommentTree {
    comment?: CommentEntity;
    children: CommentTree[];
}

export interface CommentRo {
    comment: CommentEntity;
}