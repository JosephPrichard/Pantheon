/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Id } from "../../client/types";
import { CommentVoteEntity, PostVoteEntity } from "../../client/models/vote";
import axios from "axios";
import { config } from "../../client/config";
import { FileRes } from "../Submit/Submit.client";

export interface PostAllVotesRes {
    postVote: PostVoteEntity;
    commentVotes: CommentVoteEntity[];
}

export interface PostEdit {
    post: Id;
    content: string;
}

export function buildFetchPostVotesUrl(post: Id) {
    return `/api/votes/post/${post}`;
}

export function editPost(edit: PostEdit) {
    return axios.put<FileRes>(`/api/posts/${edit.post}`, { content: edit.content }, config);
}
