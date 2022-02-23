import { PostEntity } from "../../client/models/post";
import { SortType, TimeType } from "../../global";

export interface PostsRes {
    posts: PostEntity[];
    pageCount: number;
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

export function buildFetchUserFeedUrl(user: string, sort: SortType, time: TimeType | undefined, page: number) {
    return buildFetchFeedUrl(`/api/feed/users/${user}/posts?`, sort, time, page);
}