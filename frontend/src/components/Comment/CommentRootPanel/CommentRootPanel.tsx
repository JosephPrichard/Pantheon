/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { CommentTreeEntity } from "../../../client/models/comment";
import styles from "./CommentRootPanel.module.css"
import React, { useCallback, useState } from "react";
import { calcCommentHotRank } from "../../../utils/hotrank";
import CreateCommentRoot from "../CreateCommentRoot/CreateCommentRoot";
import { PostEntity } from "../../../client/models/post";
import { Space, Tabs, Tab } from "@mantine/core";
import { MessageSquare } from "react-feather";
import CommentTreePanel from "../CommentTreePanel/CommentTreePanel";
import { useUserName } from "../../../hooks/useUserCreds";
import { CommentVoteEntity, PostVoteEntity } from "../../../client/models/vote";
import { Id } from "../../../client/types";
import { CommentVoteContext, createCommentVoteMap } from "../../Vote/Vote.context";

interface Props {
    post: PostEntity;
    roots: CommentTreeEntity[];
    commentVotes?: CommentVoteEntity[];
}

const sortTypes = ["hot", "new", "top"];

const CommentRootPanel = ({ post, roots, commentVotes }: Props) => {

    const name = useUserName(true);

    const [createdRoots, setCreatedRoots] = useState<CommentTreeEntity[]>([]);

    const [sortActive, setSortActive] = useState(0);

    const map = createCommentVoteMap(commentVotes);

    const sortRoots = useCallback(
        () => {
            const sort = sortTypes[sortActive];
            if (sort === "hot") {
                return roots.sort( (a: CommentTreeEntity, b: CommentTreeEntity) => {
                    return calcCommentHotRank(b.node.votes, new Date(b.node.createdAt))
                        - calcCommentHotRank(a.node.votes, new Date(a.node.createdAt));
                });
            } else if (sort === "new") {
                return roots.sort((a, b) => {
                    return new Date(b.node.createdAt).getTime() - new Date(a.node.createdAt).getTime();
                });
            } else { // top
                return roots.sort((a, b) => {
                    return b.node.votes - a.node.votes;
                });
            }
        },
        [sortActive, roots]
    );

    const renderRoots = createdRoots.concat(sortRoots());

    return (
        <CommentVoteContext.Provider value={{ votes: map }}>
            <div className={styles.CommentRootPanel}>
                {!name ||
                    <CreateCommentRoot
                        post={post}
                        onCreate={(comment) => {
                            const newCreatedRoots = createdRoots.map(root => root);
                            newCreatedRoots.push({
                                node: comment,
                                children: [],
                                id: comment.id
                            });
                            setCreatedRoots(newCreatedRoots);
                        }}
                    />
                }
                { renderRoots.length === 0 ?
                    <div className={styles.NoRoots}>
                        <MessageSquare />
                        <div>
                            No Comments Yet
                        </div>
                    </div>
                    :
                    <>
                        {!name ||
                            <>
                                <Space h="xl"/>
                                <Space h="xl"/>
                            </>
                        }
                        <Tabs
                            color="gray"
                            className={styles.Tabs}
                            onTabChange={setSortActive}
                        >
                            <Tab label="Hot"/>
                            <Tab label="New"/>
                            <Tab label="Top"/>
                        </Tabs>
                        <Space h="sm"/>
                        {renderRoots.map((tree, i) => {
                            return (
                                <CommentTreePanel key={i} tree={tree}/>
                            );
                        })}
                        <Space h="xl"/>
                    </>
                }
            </div>
        </CommentVoteContext.Provider>
    );
}

export default CommentRootPanel;