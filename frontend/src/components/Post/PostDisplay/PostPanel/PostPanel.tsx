/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Card, Space } from "@mantine/core";
import React from "react";
import { PostEntity } from "../../../../client/models/post";
import VotePanel from "../PostComponents/VotePanel/VotePanel";
import styles from "./PostPanel.module.css";
import CommentRootPanel from "../../../Comment/CommentRootPanel/CommentRootPanel";
import { CommentTreeEntity } from "../../../../client/models/comment";
import PostTitle from "../PostComponents/PostTitle/PostTitle";
import PostHeader from "../PostComponents/PostHeader/PostHeader";
import PostLinks from "../PostComponents/PostLinks/PostLinks";
import ImageContent from "../../../Util/Layout/Content/ImageContent/ImageContent";
import TextContent from "../../../Util/Layout/Content/TextContent/TextContent";
import LinkContent from "../../../Util/Layout/Content/LinkContent/LinkContent";

interface Props {
    post: PostEntity;
    roots: CommentTreeEntity[];
}
    
const PostPanel = ({ post, roots }: Props) => {

    let content: JSX.Element = <></>;
    if(post.images.length > 0) {
        content = <ImageContent images={post.images}/>
    } else if(post.content) {
        content = (
            <div className={styles.TextWrapper}>
                <TextContent text={post.content}/>
            </div>
        );
    } else if(post.link) {
        content = <LinkContent url={post.link} font={15} clip={false} space={20}/>
    }

    return (
        <Card className={styles.PostPanel}>
            <div className={styles.PostContentContainer}>
                <VotePanel post={post}/>
                <div className={styles.Content}>
                    <PostTitle post={post}/>
                    <PostHeader post={post}/>
                    { content }
                    <PostLinks post={post} fade/>
                </div>
            </div>
            <Space h="xl"/>
            <CommentRootPanel post={post} roots={roots}/>
        </Card>
    );
}

export default PostPanel;