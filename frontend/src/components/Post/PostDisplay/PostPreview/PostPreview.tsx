/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Card } from "@mantine/core";
import React, { useState } from "react";
import { PostEntity, PostSearchEntity } from "../../../../client/models/post";
import VotePanel from "../PostComponents/VotePanel/VotePanel";
import styles from "./PostPreview.module.css";
import { PUBLIC_CLOUD_URL } from "../../../../global";
import PostTitle from "../PostComponents/PostTitle/PostTitle";
import PostHeader from "../PostComponents/PostHeader/PostHeader";
import PostLinks from "../PostComponents/PostLinks/PostLinks";
import { removeAllHTMLFromString } from "../../../../utils/sanitize";
import TextContent from "../../../Util/Layout/Content/TextContent/TextContent";
import LinkContent from "../../../Util/Layout/Content/LinkContent/LinkContent";

interface Props {
    post: PostEntity | PostSearchEntity;
    lighter: boolean;
}
    
const PostPanel = ({ post, lighter }: Props) => {

    const [collapsed, setCollapsed] = useState(true);

    let content: JSX.Element = <></>;
    if(post.content) {
        content = (
            <>
                <div
                    className={styles.CollapseText}
                    onClick={() => setCollapsed(!collapsed)}
                >
                    { removeAllHTMLFromString(post.content) }
                </div>
                {collapsed ||
                    <div className={styles.TextWrapper}>
                        <TextContent text={post.content}/>
                    </div>
                }
            </>
        );
    } else if(post.link) {
        content = (
            <LinkContent url={post.link}/>
        );
    }

    let icon: JSX.Element = <></>;
    if (post.images.length > 0) {
        icon = (
            <div className={styles.ImageContainer}>
                <img
                    className={styles.Image}
                    src={`${PUBLIC_CLOUD_URL}/assets/${post.images[1]}`}
                    alt="Image"
                />
            </div>
        );
    }

    return (
        <Card
            className={styles.PostPreview}
            style={{
                backgroundColor: lighter ? undefined : "rgb(24, 25, 28)"
            }}
        >
            <div className={styles.VoteWrapper}>
                <VotePanel post={post}/>
            </div>
            { icon }
            <div className={styles.Content}>
                <PostTitle post={post}/>
                <PostHeader post={post}/>
                { content }
                <PostLinks post={post}/>
            </div>
        </Card>
    );
}

export default PostPanel;
