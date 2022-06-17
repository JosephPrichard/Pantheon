/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { CreatePostEntityRes, PostEntity, PostSearchEntity } from "../client/models/post";
import { CommentEntity, CommentNotificationEntity } from "../client/models/comment";

export function urlify(text: string) {
    return text.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "").replace(/ /g, "-").toLowerCase();
}

export function postUrl(post: PostEntity | PostSearchEntity) {
    return `/forum/${post.forum.id}/post/${post.id}/${urlify(post.title)}`;
}

export function createdPostUrl(post: CreatePostEntityRes) {
    return `/forum/${post.forum}/post/${post.id}/${urlify(post.title)}`;
}

export function commentUrl(comment: CommentNotificationEntity) {
    return `/forum/${comment.post.forum}/post/${comment.post.id}/${urlify(comment.post.title)}` + "#" + comment.id;
}

export function getBaseUrl() {
    return window.location.protocol + "//" + window.location.host;
}

export function getUrlNoHash() {
    const url = window.location.href;
    const hash = window.location.hash;
    const index_of_hash = url.indexOf(hash) || url.length;
    return url.substr(0, index_of_hash);
}