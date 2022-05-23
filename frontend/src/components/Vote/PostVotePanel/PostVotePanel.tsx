/*
 * Copyright (c) Joseph Prichard 2022.
 */

import React from "react";
import { PostEntity, PostSearchEntity } from "../../../client/models/post";
import VotePanel from "../VotePanel/VotePanel";
import { votePost } from "../Vote.client";
import { usePostVoteContext } from "../Vote.context";

interface Props {
    post: PostEntity | PostSearchEntity;
    userVoteValue?: number;
}

const PostVotePanel = ({ post, userVoteValue }: Props) => {

    const { votes } = usePostVoteContext();

    return (
        <VotePanel
            key={post.id}
            initialVotes={post.votes}
            userVoteValue={userVoteValue ? userVoteValue : votes[post.id]}
            onVote={(value, onFailure) => {
                votePost({
                    resource: post.id,
                    value
                }).catch(onFailure);
            }}
        />
    );
}

export default PostVotePanel;