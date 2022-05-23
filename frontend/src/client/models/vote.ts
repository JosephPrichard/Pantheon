/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Id } from "../types";

export interface CommentVoteEntity {
    comment: Id;
    post: Id;
    voter: Id;
    value: number; // -1, 0, or 1
}

export interface PostVoteEntity {
    post: Id;
    voter: Id;
    value: number; // -1, 0, or 1
}