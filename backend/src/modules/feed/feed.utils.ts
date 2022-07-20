/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { PostEntity } from "../post/post.entity";
import { CommentEntity } from "../comment/comment.entity";
import { ActivityRo } from "./feed.interface";

export function mergeActivity(posts: PostEntity[], comments: CommentEntity[], size: number): ActivityRo[] {
    const activities: ActivityRo[] = [];
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
            activities.push({ isPost: true, activity: posts[p] });
            p++;
            continue;
        } else if (exceedsPost) {
            activities.push({ isPost: false, activity: comments[c] });
            c++;
            continue;
        }
        // add the newer post or comment
        if (posts[p].createdAt > comments[c].createdAt) {
            activities.push({ isPost: true, activity: posts[p] });
            p++;
        } else {
            activities.push({ isPost: false, activity: comments[c] });
            c++;
        }
    }

    return activities;
}

export function countActivities(activities: ActivityRo[], isPost: boolean): number {
    let i = 0;
    for (const activity of activities) {
        if (activity.isPost === isPost) {
            i++;
        }
    }
    return i;
}