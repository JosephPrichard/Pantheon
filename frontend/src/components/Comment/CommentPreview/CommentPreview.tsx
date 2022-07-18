/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Card } from "@mantine/core";
import React from "react";
import styles from "./CommentPreview.module.css";
import { CommentEntity } from "../../../client/models/comment";
import TextContent from "../../Util/Layout/Content/TextContent/TextContent";
import CommentVotePanel from "../../Vote/CommentVotePanel/CommentVotePanel";
import Link from "next/link";
import { commentUrl } from "../../../utils/url";
import { getDateDisplay } from "../../../utils/date";

interface Props {
    comment: CommentEntity;
    lighter: boolean;
}
    
const CommentPreview = ({ comment, lighter }: Props) => {
    return (
        <Card
            className={styles.CommentPreview}
            style={{
                backgroundColor: lighter ? undefined : "rgb(24, 25, 28)"
            }}
        >
            <div className={styles.VoteWrapper}>
                <CommentVotePanel comment={comment}/>
            </div>
            <div className={styles.Content}>
                <Link href={commentUrl(comment)}>
                    <div className={styles.PostHeader}>
                        <span className={styles.HeaderText}> Comment on </span>
                        <span className={styles.HeaderTitle}> {comment.post.title} </span>
                        <span className={styles.HeaderText}> in </span>
                        <span className={styles.HeaderTitle}> {comment.post.forum.id} </span>
                        <span className={styles.HeaderText}> { getDateDisplay(new Date(comment.createdAt)) } </span>
                    </div>
                </Link>
                <TextContent text={comment.content}/>
            </div>
        </Card>
    );
}

export default CommentPreview;
