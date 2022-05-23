/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { createContext, useContext } from "react";
import { Id } from "../../client/types";
import { CommentVoteEntity, PostVoteEntity } from "../../client/models/vote";

interface UserVotes {
    votes: {
        [id: Id]: number
    }
}

export const PostVoteContext = createContext<UserVotes>({ votes: [] });
export const usePostVoteContext = () => useContext(PostVoteContext);

export const CommentVoteContext = createContext<UserVotes>({ votes: [] });
export const useCommentVoteContext = () => useContext(CommentVoteContext);

export function createCommentVoteMap(commentVotes?: CommentVoteEntity[]) {
    if (!commentVotes) {
        return {};
    }
    const map: { [id: Id]: number } = {};
    for (const commentVote of commentVotes) {
        map[commentVote.comment] = commentVote.value;
    }
    return map;
}

export function createPostVoteMap(postVotes?: PostVoteEntity[]) {
    if (!postVotes) {
        return {};
    }
    const map: { [id: Id]: number } = {};
    for (const postVote of postVotes) {
        map[postVote.post] = postVote.value;
    }
    return map;
}

