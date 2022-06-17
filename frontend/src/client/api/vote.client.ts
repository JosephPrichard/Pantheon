/*
 * Copyright (c) Joseph Prichard 2022.
 */

import axios from "axios";
import { config } from "../config";
import { CommentVoteEntity, PostVoteEntity } from "../models/vote";

export interface Vote {
    resource: number;
    value: number;
}

export interface CommentVoteRes {
    vote: CommentVoteEntity;
}

export interface PostVoteRes {
    vote: PostVoteEntity;
}

export function voteComment(body: Vote) {
    return axios.post<CommentVoteRes>("/api/votes/comment", body, config);
}

export function votePost(body: Vote) {
    return axios.post<PostVoteRes>("/api/votes/post", body, config);
}