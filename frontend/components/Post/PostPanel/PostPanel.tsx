import { Card } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { Post } from "../../../model/entities/post.entity";
import PostContent from "./PostContent/PostContent";
import VotePanel from "./VotePanel/VotePanel";
import styles from "./PostPanel.module.css";

interface Props {
    post: Post;
}
    
const PostPanel = ({ post }: Props) => (
    <Link href={`/post/${post.id}`}>
        <Card className={styles.PostPanel}>
            <VotePanel postId={post.id}/>
            <PostContent post={post} textClassName={styles.TextNoOverflow}/>
        </Card>
    </Link>
);

export default PostPanel;
