/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Id } from "../types";
import { CommentVoteEntity, PostVoteEntity } from "../models/vote";
import axios from "axios";
import { config, configNoCreds } from "../config";
import { PostEntity } from "../models/post";

export interface PostAllVotesRes {
    postVote: PostVoteEntity;
    commentVotes: CommentVoteEntity[];
}

export interface PostEdit {
    post: Id;
    content: string;
}

export interface PostDelete {
    post: Id;
}


export interface PostRes {
    post: PostEntity;
}

export async function fetchPostById(id: string) {
    return await axios.get<PostRes>(`/api/posts/${id}`, configNoCreds);
}

export function buildFetchPostVotesUrl(post: Id) {
    return `/api/votes/post/${post}`;
}

export function editPost(edit: PostEdit) {
    return axios.put<PostRes>(`/api/posts/${edit.post}`, { content: edit.content }, config);
}

export function deletePost(del: PostDelete) {
    return axios.delete<PostRes>(`/api/posts/${del.post}`, config);
}

