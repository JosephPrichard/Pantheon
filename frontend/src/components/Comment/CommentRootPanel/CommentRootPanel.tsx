/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { CommentTreeEntity } from "../../../client/models/comment";
import styles from "./CommentRootPanel.module.css"
import React, { useCallback, useState } from "react";
import CreateCommentRoot from "../CreateCommentRoot/CreateCommentRoot";
import { PostEntity } from "../../../client/models/post";
import { Space, Tabs, Tab, Divider } from "@mantine/core";
import { MessageSquare } from "react-feather";
import CommentTreePanel from "../CommentTreePanel/CommentTreePanel";
import { useUserName } from "../../../hooks/useUserCreds";
import { CommentVoteEntity } from "../../../client/models/vote";
import { CommentVoteContext, createCommentVoteMap } from "../../Vote/Vote.context";

interface Props {
    post: PostEntity;
    roots: CommentTreeEntity[];
    commentVotes?: CommentVoteEntity[];
}

const CommentRootPanel = ({ post, roots, commentVotes }: Props) => {

    const name = useUserName(true);
    const [createdRoots, setCreatedRoots] = useState<CommentTreeEntity[]>([]);

    const map = createCommentVoteMap(commentVotes);

    return (
        <CommentVoteContext.Provider value={{ votes: map }}>
            <div className={styles.CommentRootPanel}>
                {!name ||
                    <CreateCommentRoot
                        post={post}
                        onCreate={(comment) => {
                            const newCreatedRoots = createdRoots.map(root => root);
                            newCreatedRoots.push({ comment: comment, children: [] });
                            setCreatedRoots(newCreatedRoots);
                        }}
                    />
                }
                { roots.length + createdRoots.length === 0 ?
                    <div className={styles.NoRoots}>
                        <MessageSquare />
                        <div>
                            No Comments Yet
                        </div>
                    </div>
                    :
                    <>
                        {createdRoots.map((tree, i) => {
                            return (
                                <CommentTreePanel key={i} tree={tree}/>
                            );
                        })}
                        {roots.map((tree, i) => {
                            return (
                                <CommentTreePanel key={i} tree={tree}/>
                            );
                        })}
                        <Space h={50}/>
                    </>
                }
            </div>
        </CommentVoteContext.Provider>
    );
}

export default CommentRootPanel;