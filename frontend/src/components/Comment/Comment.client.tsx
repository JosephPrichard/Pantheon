/*
 * Copyright (c) Joseph Prichard 2022.
 */

import axios from "axios";
import { config } from "../../client/config";
import { CommentEntity } from "../../client/models/comment";

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

export function submitCommentNode(body: CommentNode) {
    return axios.post<CommentRes>("/api/comments/nodes", body, config);
}

export function submitCommentRoot(body: CommentRoot) {
    return axios.post<CommentRes>("/api/comments/roots", body, config);
}