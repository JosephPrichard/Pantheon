import { Card } from "@mantine/core";
import React from "react";
import { PostEntity } from "../../../../client/models/post";
import VotePanel from "../VotePanel/VotePanel";
import PostContent from "./PostContent/PostContent";
import styles from "./PostPreview.module.css";

interface Props {
    post: PostEntity;
    lighter: boolean;
}
    
const PostPanel = ({ post, lighter }: Props) => (
    <Card 
        className={styles.PostPanel}
        style={{
            backgroundColor: lighter ? undefined : "rgb(24, 25, 28)"
        }}
    >
        <PostContent post={post}/>
        <VotePanel post={post}/>
    </Card>
);

export default PostPanel;
