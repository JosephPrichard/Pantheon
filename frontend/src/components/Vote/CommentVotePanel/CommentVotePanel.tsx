/*
 * Copyright (c) Joseph Prichard 2022.
 */

import React from "react";
import { CommentEntity } from "../../../client/models/comment";
import VotePanel from "../VotePanel/VotePanel";
import { voteComment } from "../../../client/api/vote.client";
import { useCommentVoteContext } from "../Vote.context";

interface Props {
    comment: CommentEntity;
}

const CommentVotePanel = ({ comment }: Props) => {

    const { votes } = useCommentVoteContext();

    return (
        <VotePanel
            initialVotes={comment.votes}
            userVoteValue={votes[comment.id]}
            onVote={(value, onFailure) => {
                voteComment({
                    resource: comment.id,
                    value
                }).catch(onFailure);
            }}
        />
    );
}

export default CommentVotePanel;