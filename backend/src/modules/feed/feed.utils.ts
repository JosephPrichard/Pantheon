/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { PostEntity } from "../post/post.entity";
import { CommentEntity } from "../comment/comment.entity";
import { ActivityElement } from "./feed.dto";

export function mergeActivity(posts: PostEntity[], comments: CommentEntity[], size: number) {
    const activity: ActivityElement[] = [];

    let p = 0;
    let c = 0;
    // perform a mergeSortedLists algorithm on the posts and comments array
    for (let i = 0; i < size; i++) {
        const exceedsPost = p >= posts.length;
        const exceedsComment = c >= comments.length;
        // exit algorithm if we run out of posts and comments
        if (exceedsPost && exceedsComment) {
            break;
        }
        // if we run out of posts, add only comments, and vice versa
        if (exceedsComment) {
            activity.push({ isPost: true, activity: posts[p] });
            p++;
        }
        if (exceedsPost) {
            activity.push({ isPost: false, activity: comments[c] });
            c++;
        }
        // add the newer post or comment
        if (posts[p].createdAt > comments[c].createdAt) {
            activity.push({ isPost: true, activity: posts[p] });
            p++;
        } else {
            activity.push({ isPost: false, activity: comments[c] });
            c++;
        }
    }

    return activity;
}