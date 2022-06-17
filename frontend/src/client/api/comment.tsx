/*
 * Copyright (c) Joseph Prichard 2022.
 */

import axios from "axios";
import { config } from "../config";
import { CommentEntity } from "../models/comment";
import { Id } from "../types";

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

export interface CommentDelete {
    comment: Id;
}

export function submitCommentNode(body: CommentNode) {
    return axios.post<CommentRes>("/api/comments/nodes", body, config);
}

export function submitCommentRoot(body: CommentRoot) {
    return axios.post<CommentRes>("/api/comments/roots", body, config);
}

export function editComment(edit: CommentEdit) {
    return axios.put<CommentRes>(`/api/comments/${edit.comment}`, { content: edit.content }, config);
}

export function deleteComment(del: CommentDelete) {
    return axios.delete<CommentRes>(`/api/comments/${del.comment}`, config);
}