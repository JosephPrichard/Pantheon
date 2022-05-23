/*
 * Copyright (c) Joseph Prichard 2022.
 */

import axios from "axios";
import { config } from "../../client/config";
import { CommentEntity } from "../../client/models/comment";
import { FileRes } from "../Submit/Submit.client";
import { PostEdit } from "../Post/Post.client";
import { Id } from "../../client/types";

interface CommentNode {
    parentComment: number;
    content: string;
}

interface CommentRoot {
    post: number;
    content: string;
}

interface CommentRes {
    comment: CommentEntity;
}

export interface CommentEdit {
    comment: Id;
    content: string;
}


export function submitCommentNode(body: CommentNode) {
    return axios.post<CommentRes>("/api/comments/nodes", body, config);
}

export function submitCommentRoot(body: CommentRoot) {
    return axios.post<CommentRes>("/api/comments/roots", body, config);
}

export function editComment(edit: CommentEdit) {
    return axios.put<FileRes>(`/api/comments/${edit.comment}`, { content: edit.content }, config);
}