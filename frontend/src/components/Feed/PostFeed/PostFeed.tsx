/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Card } from "@mantine/core";
import React from "react";
import { PostEntity } from "../../../client/models/post";
import PostPreviewList from "../../Post/PostPreviewList/PostPreviewList";
import DoubleColumn from "../../Util/Layout/DoubleColumn/DoubleColumn";
import styles from "./PostFeed.module.css";
import { PostVoteEntity } from "../../../client/models/vote";
import { createPostVoteMap, PostVoteContext } from "../../Vote/Vote.context";

interface Props {
    posts?: PostEntity[];
    postVotes?: PostVoteEntity[];
    topBar: React.ReactNode;
    pagination: React.ReactNode;
    children: React.ReactNode;
}

const PostFeed = ({ posts, postVotes, children, topBar, pagination }: Props) => {

    const map = createPostVoteMap(postVotes);

    return (
        <PostVoteContext.Provider value={{ votes: map }}>
            <DoubleColumn
                column1={
                    <Card className={styles.PostFeed}>
                        { topBar }
                        <PostPreviewList posts={posts}/>
                    </Card>
                }
                column2={
                    <>
                        { children }
                    </>
                }
            />
            { pagination }
        </PostVoteContext.Provider>
    );
}

export default PostFeed;