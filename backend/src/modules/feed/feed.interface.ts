/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { PostEntity } from "../post/post.entity";
import { CommentEntity } from "../comment/comment.entity";
import { CommentVoteEntity, PostVoteEntity } from "../vote/vote.entity";
import { CommentTree } from "../comment/comment.interface";

export interface ActivityRo {
    isPost: boolean;
    activity: PostEntity | CommentEntity;
}

export interface FeedRo {
    postVotes: PostVoteEntity[];
    posts: PostEntity[];
    nextPage: boolean;
}

export interface CommentFeedRo {
    commentTree: CommentTree[]
}

export interface ActivityFeedRo {
    activities: ActivityRo[];
    nextPage: boolean;
    postVotes: PostVoteEntity[];
    commentVotes: CommentVoteEntity[]
}