/*
 * Copyright (c) Joseph Prichard 2022.
 */

import React, { useMemo } from "react";
import { Card, Space } from "@mantine/core";
import { PostEntity, PostSearchEntity } from "../../../../client/models/post";
import PostPreviewList from "../../../Post/PostPreviewList/PostPreviewList";
import DoubleColumn from "../../../Util/Layout/DoubleColumn/DoubleColumn";
import { PostVoteEntity } from "../../../../client/models/vote";
import { createPostVoteMap, PostVoteContext } from "../../../Vote/Vote.context";
import styles from "./PostFeed.module.css";

interface Props {
    posts?: PostEntity[] | PostSearchEntity[];
    postVotes?: PostVoteEntity[];
    pagination?: React.ReactNode;
    children: React.ReactNode;
}

const PostFeed = ({ posts, postVotes, children, pagination }: Props) => {

    const map = useMemo(() => createPostVoteMap(postVotes), [postVotes]);

    return (
        <PostVoteContext.Provider value={{ votes: map }}>
            <DoubleColumn
                column1={
                    <Card className={styles.PostFeed}>
                        <Space h={10}/>
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