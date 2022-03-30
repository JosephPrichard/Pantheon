/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { CommentTreeEntity } from "../../../client/models/comment";
import styles from "./CommentTreePanel.module.css";
import TextContent from "../../Util/Layout/Content/TextContent/TextContent";
import { getDateDisplay } from "../../../utils/date";
import React, { useState } from "react";
import AppLink from "../../Util/Widget/AppLink/AppLink";
import { Link2, MessageSquare } from "react-feather";
import CreateCommentNode from "../CreateCommentNode/CreateCommentNode";
import VotePanel from "../VotePanel/VotePanel";
import { Space } from "@mantine/core";

interface Props {
    tree: CommentTreeEntity;
}

const CommentTreePanel = ({ tree }: Props) => {

    const [createdNodes, setCreatedNodes] = useState<CommentTreeEntity[]>([]);

    const [show, setShow] = useState(true);
    const [showReply, setShowReply] = useState(false);

    const comment = tree.node;

    return (
        <>
            <Space h={20}/>
            <div className={styles.CommentDisplay}>
                {show ?
                    <VotePanel comment={comment}/>
                    :
                    <div className={styles.VotePanelFiller}/>
                }
                <div className={styles.CommentContent}>
                    { comment.commenter ? comment.commenter.name : "[deleted]" }
                    <span className={styles.Date}>
                        {" • "}
                        { getDateDisplay(new Date(comment.createdAt)) }
                    </span>
                    <div
                        style={{
                            display: show ? "block" : "none"
                        }}
                    >
                        <TextContent text={comment.content} />
                        <div className={styles.CommentTreeLinks}>
                            <AppLink
                                icon={<MessageSquare size={14}/>}
                                text={showReply ? "Cancel" : "Reply"}
                                onClick={() => setShowReply(!showReply)}
                            />
                            <AppLink
                                icon={<Link2 size={14}/>}
                                text="Share"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: show ? "block" : "none"
                }}
            >
                {!showReply ||
                    <div className={styles.CommentTreeChild}>
                        <CreateCommentNode
                            parentComment={tree.node}
                            onCreate={(nodeComment) => {
                                const newCreatedNodes = createdNodes.map(node => node);
                                newCreatedNodes.push({
                                    node: nodeComment,
                                    children: [],
                                    id: comment.id
                                });
                                setCreatedNodes(newCreatedNodes);
                                setShowReply(false);
                            }}
                            onCancel={() => setShowReply(false)}
                        />
                    </div>
                }
                {createdNodes.concat(tree.children.sort(
                    (a, b) => b.node.votes - a.node.votes)
                )
                    .map((tree, i) => {
                        return (
                            <div className={styles.CommentTreeChild}>
                                <CommentTreePanel key={i} tree={tree}/>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
}

export default CommentTreePanel;