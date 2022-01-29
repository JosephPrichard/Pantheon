import { Card } from "@mantine/core";
import React from "react";
import { PostEntity } from "../../../../client/models/post";
import VotePanel from "../VotePanel/VotePanel";
import PostContent from "./PostContent/PostContent";
import styles from "./PostPanel.module.css";

interface Props {
    post: PostEntity;
}
    
const PostPanel = ({ post }: Props) => (
    <Card className={styles.FullPostPanel}>
        <PostContent post={post}/>
        <VotePanel post={post}/>
    </Card>
);

export default PostPanel;