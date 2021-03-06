/*
 * Copyright (c) Joseph Prichard 2022.
 */

import React, { FunctionComponent } from "react";
import styles from "./PostPreviewList.module.css";
import { PostEntity, PostSearchEntity } from "../../../client/models/post";
import PostPreview from "../PostPreview/PostPreview";
import AppSkeleton from "../../Util/Loading/AppSkeleton/AppSkeleton";

interface Props {
    posts?: (PostEntity | PostSearchEntity)[];
}

const PostPreviewList = ({ posts }: Props) => (
    <div className={styles.Posts}>
        { posts ?
            (posts.length !== 0) ?
                <div className={styles.Posts}>
                    {posts.map((post, i) => (
                        <PostPreview key={i} lighter={i % 2 == 0} post={post} />
                    ))}
                </div>
                :
                <div className={styles.BigText}>
                    Sorry, we couldn't find any posts.
                </div>
            :
            <>
                {Array(15).fill(0).map((n, i) => (
                    <AppSkeleton key={i} lighter={i % 2 == 0} />
                ))}
            </>
        }
    </div>
);

export default PostPreviewList;