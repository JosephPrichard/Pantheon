/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { CommentVoteEntity, PostVoteEntity } from "./vote.entity";

export interface PostVotesRo {
    postVote: PostVoteEntity | null;
    commentVotes: CommentVoteEntity[]
}

export interface PostVoteRo {
    vote: PostVoteEntity;
}

export interface CommentVoteRo {
    vote: CommentVoteEntity;
}