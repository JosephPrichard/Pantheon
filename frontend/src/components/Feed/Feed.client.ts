/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { PostEntity } from "../../client/models/post";
import { SortType, TimeType } from "../../global";
import { PostVoteEntity } from "../../client/models/vote";
import { Id } from "../../client/types";

export interface PostsRes {
    posts: PostEntity[];
    pageCount: number;
    postVotes: PostVoteEntity[];
}

export function buildFetchFeedUrl(url: string, sort: SortType, time: TimeType | undefined, page: number) {
    url += "sort=" + sort;
    if (time) {
        url += "&time=" + time;
    }
    url += "&page=" + page;
    return url;
}

export function buildFetchHomeFeedUrl(sort: SortType, time: TimeType | undefined, page: number) {
    return buildFetchFeedUrl("/api/feed/home?", sort, time, page);
}

export function buildFetchPopularFeedUrl(sort: SortType, time: TimeType | undefined, page: number) {
    return buildFetchFeedUrl("/api/feed/popular?", sort, time, page);
}

export function buildFetchForumFeedUrl(forum: string, sort: SortType, time: TimeType | undefined, page: number) {
    return buildFetchFeedUrl(`/api/feed/forums/${forum}/posts?`, sort, time, page);
}

export function buildFetchUserFeedUrl(user: Id, sort: SortType, time: TimeType | undefined, page: number) {
    return buildFetchFeedUrl(`/api/feed/users/${user}/posts?`, sort, time, page);
}

export function buildFetchSearchFeedUrl(text: string, time: TimeType | undefined, page: number, user?: string, forum?: string) {
    let url = `/api/search/posts?text=${text}`;
    if (time) {
        url += "&time=" + time;
    }
    if (user) {
        url += "&user=" + user;
    }
    if (forum) {
        url += "&forum=" + user;
    }
    url += "&page=" + page;
    return url;
}