/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Card } from "@mantine/core";
import React from "react";
import { PostEntity } from "../../../client/models/post";
import PostPreviewList from "../../Post/PostPreviewList/PostPreviewList";
import DoubleColumn from "../../Util/Layout/DoubleColumn/DoubleColumn";
import styles from "./PostFeed.module.css";

interface Props {
    posts?: PostEntity[];
    topBar: React.ReactNode;
    pagination: React.ReactNode;
    children: React.ReactNode;
}

const PostFeed = ({ posts, children, topBar, pagination }: Props) => {
    return (
        <>
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
        </>
    );
}

export default PostFeed;