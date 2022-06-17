/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { PostEntity, PostSearchEntity } from "../models/post";
import { PostVoteEntity } from "../models/vote";
import { Id } from "../types";

export interface PostsRes {
    posts: PostEntity[];
    postVotes: PostVoteEntity[];
    nextPage: boolean;
}

export interface PostsSearchRes {
    posts: PostSearchEntity[];
    postVotes: PostVoteEntity[];
}

export function buildFetchFeedUrl(url: string, beforeCursor?: number, afterCursor?: number) {
    if (afterCursor) {
        url += "afterCursor=" + afterCursor;
        return url;
    }
    if (beforeCursor) {
        url += "beforeCursor=" + beforeCursor;
        return url;
    }
    return url;
}

export function buildFetchHomeFeedUrl(beforeCursor?: number, afterCursor?: number) {
    return buildFetchFeedUrl("/api/feed/home?", beforeCursor, afterCursor);
}

export function buildFetchGlobalFeedUrl(beforeCursor?: number, afterCursor?: number) {
    return buildFetchFeedUrl("/api/feed/global?", beforeCursor, afterCursor);
}

export function buildFetchForumFeedUrl(forum: string, beforeCursor?: number, afterCursor?: number) {
    return buildFetchFeedUrl(`/api/feed/forums/${forum}/posts?`, beforeCursor, afterCursor);
}

export function buildFetchUserFeedUrl(user: Id, beforeCursor?: number, afterCursor?: number) {
    return buildFetchFeedUrl(`/api/feed/users/${user}/posts?`, beforeCursor, afterCursor);
}

export function buildFetchSearchFeedUrl(text: string, user?: Id, forum?: string) {
    let url = `/api/search/posts?text=${text}`;
    if (user) {
        url += "&user=" + user;
    }
    if (forum) {
        url += "&forum=" + user;
    }
    return url;
}