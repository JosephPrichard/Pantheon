/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { PostEntity, PostSearchEntity } from "../client/models/post";

export function getAfterCursor(posts?: PostEntity[]) {
    if (posts && posts.length > 0) {
        return posts[posts.length - 1].id;
    }
}

export function getBeforeCursor(posts?: PostEntity[]) {
    if (posts && posts.length > 0) {
        return posts[0].id;
    }
}

export function getSearchAfterCursor(posts?: PostSearchEntity[]) {
    if (posts && posts.length > 0) {
        return posts[posts.length - 1].searchRank;
    }
}