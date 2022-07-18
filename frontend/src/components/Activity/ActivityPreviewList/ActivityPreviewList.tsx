/*
 * Copyright (c) Joseph Prichard 2022.
 */

import React from "react";
import styles from "./ActivityPreviewList.module.css";
import PostPreview from "../../Post/PostPreview/PostPreview";
import AppSkeleton from "../../Util/Loading/AppSkeleton/AppSkeleton";
import { ActivityEntity } from "../../../client/models/activity";
import { PostEntity } from "../../../client/models/post";
import CommentPreview from "../../Comment/CommentPreview/CommentPreview";
import { CommentEntity } from "../../../client/models/comment";

interface Props {
    activities?: ActivityEntity[];
}

const ActivityPreviewList = ({ activities }: Props) => (
    <div className={styles.Activity}>
        { activities ?
            (activities.length !== 0) ?
                <div className={styles.Posts}>
                    {activities.map((a, i) => {
                        const lighter = i % 2 == 0;
                        if (a.isPost) {
                            return (
                                <PostPreview
                                    key={i}
                                    lighter={lighter}
                                    post={a.activity as PostEntity}
                                />
                            );
                        } else {
                            return (
                                <CommentPreview
                                    key={i}
                                    lighter={lighter}
                                    comment={a.activity as CommentEntity}
                                />
                            );
                        }
                    })}
                </div>
                :
                <div className={styles.BigText}>
                    This user hasn't made any posts or comments yet.
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

export default ActivityPreviewList;