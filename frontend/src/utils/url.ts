import { CreatePostEntityRes, PostEntity } from "../client/models/post";

export function urlify(text: string) {
    return text.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "").replace(/ /g, "-").toLowerCase();
}

export function postUrl(post: PostEntity) {
    return `/forum/${post.forum.id}/post/${post.id}/${urlify(post.title)}`;
}

export function createdPostUrl(post: CreatePostEntityRes) {
    return `/forum/${post.forum}/post/${post.id}/${urlify(post.title)}`;
}