/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { PostEntity, PostSearchEntity } from "../models/post";
import { CommentVoteEntity, PostVoteEntity } from "../models/vote";
import { Id } from "../types";
import { ActivityEntity } from "../models/activity";
import axios from "axios";
import { config } from "../config";

export interface PostsRes {
    posts: PostEntity[];
    postVotes: PostVoteEntity[];
    nextPage: boolean;
}

export interface ActivityRes {
    activities: ActivityEntity[];
    postVotes: PostVoteEntity[];
    commentVotes: CommentVoteEntity[];
    nextPage: boolean;
}

export interface PostsSearchRes {
    posts: PostSearchEntity[];
    postVotes: PostVoteEntity[];
}

function addCursors(url: string, beforeCursor?: number, afterCursor?: number) {
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
    let url = "/api/feed/home?";
    url = addCursors(url, beforeCursor, afterCursor);
    return url;
}

export function buildFetchGlobalFeedUrl(beforeCursor?: number, afterCursor?: number) {
    let url = "/api/feed/global?";
    url = addCursors(url, beforeCursor, afterCursor);
    return url;
}

export function buildFetchForumFeedUrl(forum: string, beforeCursor?: number, afterCursor?: number) {
    let url = `/api/feed/global?forum=${forum}`;
    url = addCursors(url, beforeCursor, afterCursor);
    return url;
}

export function buildFetchUserFeedUrl(user: Id, beforeCursor?: number, afterCursor?: number) {
    let url = `/api/feed/global?user=${user}`;
    url = addCursors(url, beforeCursor, afterCursor);
    return url;
}

export function buildFetchActivityFeedUrl(user: Id, afterPostCursor?: number, afterCommentCursor?: number) {
    let url = `/api/feed/users/${user}/activities?`;
    if (afterPostCursor && afterCommentCursor) {
        url += `postsAfterCursor=${afterPostCursor}&commentsAfterCursor=${afterCommentCursor}`;
    } else if (afterCommentCursor) {
        url += `commentsAfterCursor=${afterCommentCursor}`;
    } else if (afterPostCursor) {
        url += `postsAfterCursor="${afterPostCursor}`;
    }
    return url;
}

export function buildFetchSearchFeedUrl(text: string, user?: Id, forum?: string) {
    let url = `/api/search/posts?text=${text}`;
    if (user) {
        url += "&user=" + user;
    }
    if (forum) {
        url += "&forum=" + forum;
    }
    return url;
}

export function fetchActivities(user: Id, afterPostCursor?: number, afterCommentCursor?: number) {
    const url = buildFetchActivityFeedUrl(user, afterPostCursor, afterCommentCursor);
    return axios.get<ActivityRes>(url, config);
}