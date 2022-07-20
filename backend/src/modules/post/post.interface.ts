/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { PostEntity } from "./post.entity";

export interface PostFilter {
    poster?: string;
    forums?: string[];
    afterCursor?: number;
    beforeCursor?: number;
    perPage: number;
}

export interface PostFilterRo {
    posts: PostEntity[];
    nextPage: boolean;
}

export interface PostRo {
    post: PostEntity;
}