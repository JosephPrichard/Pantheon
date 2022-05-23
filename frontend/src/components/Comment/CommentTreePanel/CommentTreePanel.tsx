/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { CommentTreeEntity } from "../../../client/models/comment";
import styles from "./CommentTreePanel.module.css";
import TextContent from "../../Util/Layout/Content/TextContent/TextContent";
import { getDateDisplay } from "../../../utils/date";
import React, { useCallback, useEffect, useState } from "react";
import AppLink from "../../Util/Widget/AppLink/AppLink";
import { Link2, MessageSquare } from "react-feather";
import CreateCommentNode from "../CreateCommentNode/CreateCommentNode";
import CommentVotePanel from "../../Vote/CommentVotePanel/CommentVotePanel";
import { Space } from "@mantine/core";
import { CommentVoteEntity, PostVoteEntity } from "../../../client/models/vote";
import { Id } from "../../../client/types";
import EditableTextContent from "../../Util/Layout/Content/EditableTextContent/EditableTextContent";
import { useUserPermissions } from "../../../hooks/useUserPermissions";
import { editPost } from "../../Post/Post.client";
import { editComment } from "../Comment.client";
import CommentLinks from "../CommentDisplay/CommentLinks/CommentLinks";
import { useUserId } from "../../../hooks/useUserCreds";
import { useHash } from "@mantine/hooks";

interface Props {
    tree: CommentTreeEntity;
}

const CommentTreePanel = ({ tree }: Props) => {

    const comment = tree.node;
    const linkId = String(comment.id);

    const perms = useUserPermissions(comment.commenter?.id);
    const [hash] = useHash();

    const [highlight, setHighlight] = useState<string>();
    const [canEdit, setCanEdit] = useState(false);
    const [content, setContent] = useState(comment.content);

    const [createdNodes, setCreatedNodes] = useState<CommentTreeEntity[]>([]);

    const [showReply, setShowReply] = useState(false);

    useEffect(
        () => {
            if (hash == ("#" + String(comment.id))) {
                setHighlight("rgb(30, 31, 34)");
            }
        },
        [hash]
    );

    const onEditComment = useCallback(
        (text) => {
            editComment({
                comment: comment.id,
                content: text
            })
                .then(() => {
                    setContent(text);
                    setCanEdit(false);
                })
                .catch(() => console.log("Fail"));
        },
        [comment.id]
    );

    return (
        <div key={tree.id}>
            <Space h={20}/>
            <div
                className={styles.CommentDisplay}
                id={linkId}
                style={{
                    backgroundColor: highlight
                }}
            >
                <CommentVotePanel comment={comment}/>
                <div className={styles.CommentContent}>
                    { comment.commenter ? comment.commenter.name : "[deleted]" }
                    <span className={styles.Date}>
                        { " • " + getDateDisplay(new Date(comment.createdAt)) }
                    </span>
                    <div className={styles.TextWrapper}>
                        <EditableTextContent
                            isEditing={canEdit && perms >= 2}
                            text={content}
                            onCancel={() => setCanEdit(false)}
                            onSave={(text) => onEditComment(text)}
                        />
                    </div>
                    <CommentLinks
                        linkId={linkId}
                        toggleReply={showReply}
                        setShowReply={setShowReply}
                        onClickEdit={perms >= 2 ? () => setCanEdit(!canEdit) : undefined}
                    />
                </div>
            </div>
            <div>
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
                            <div key={i} className={styles.CommentTreeChild}>
                                <CommentTreePanel tree={tree}/>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default CommentTreePanel;