/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { CommentEntity, CommentTreeEntity } from "../../../client/models/comment";
import styles from "./CommentTreePanel.module.css";
import { getDateDisplay } from "../../../utils/date";
import React, { useCallback, useEffect, useState } from "react";
import CreateCommentNode from "../CreateCommentNode/CreateCommentNode";
import CommentVotePanel from "../../Vote/CommentVotePanel/CommentVotePanel";
import { Space } from "@mantine/core";
import EditableTextContent from "../../Util/Layout/Content/EditableTextContent/EditableTextContent";
import { usePermissions } from "../../../hooks/usePermissions";
import { deleteComment, editComment } from "../../../client/api/comment";
import CommentLinks from "../CommentLinks/CommentLinks";
import { useHash } from "@mantine/hooks";
import ConfirmModal from "../../Util/Layout/ConfirmModal/ConfirmModal";

interface Props {
    tree: CommentTreeEntity;
}

const CommentTreePanel = ({ tree }: Props) => {

    const comment = tree.node;
    const linkId = String(comment.id);

    const hasPerms = usePermissions(comment.commenter?.id);
    const [hash] = useHash();

    const [highlight, setHighlight] = useState<string>();
    const [canEdit, setCanEdit] = useState(false);
    const [content, setContent] = useState(comment.content ? comment.content : "<p>[deleted]</p>");

    const [createdNodes, setCreatedNodes] = useState<CommentTreeEntity[]>([]);

    const [showReply, setShowReply] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    useEffect(
        () => {
            if (hash == ("#" + String(comment.id))) {
                setHighlight("rgb(30, 31, 34)");
            } else {
                setHighlight(undefined);
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
                });
        },
        [comment.id]
    );

    const onDeleteComment = useCallback(
        () => {
            deleteComment({
                comment: comment.id
            })
                .then(() => {
                    setShowDelete(false);
                });
        },
        [comment.id]
    );

    const onCreateReply = useCallback(
        (nodeComment: CommentEntity) => {
            const newCreatedNodes = createdNodes.map(node => node);
            newCreatedNodes.push({
                node: nodeComment,
                children: [],
                id: comment.id
            });
            console.log(newCreatedNodes);
            setCreatedNodes(newCreatedNodes);
            setShowReply(false);
        },
        []
    );

    if (!comment.commenter) {
        return (<></>);
    }

    return (
        <div key={tree.id}>
            <div
                className={styles.CommentDisplay}
                id={linkId}
                style={{
                    backgroundColor: highlight
                }}
            >
                <ConfirmModal
                    opened={showDelete}
                    title="Confirm Deletion"
                    message="Are you sure you want to delete your comment? You can't undo this."
                    onClose={() => setShowDelete(false)}
                    onConfirmed={onDeleteComment}
                />
                <CommentVotePanel comment={comment}/>
                <div className={styles.CommentContent}>
                    { comment.commenter ? comment.commenter.name : "[deleted]" }
                    <span className={styles.Date}>
                        { " • " + getDateDisplay(new Date(comment.createdAt)) }
                    </span>
                    <div className={styles.TextWrapper}>
                        <EditableTextContent
                            isEditing={canEdit && hasPerms}
                            text={content}
                            onCancel={() => setCanEdit(false)}
                            onSave={onEditComment}
                        />
                    </div>
                    <CommentLinks
                        linkId={linkId}
                        toggleReply={showReply}
                        setShowReply={setShowReply}
                        onClickEdit={hasPerms ? () => setCanEdit(!canEdit) : undefined}
                        onClickDelete={hasPerms ? () => setShowDelete(!showDelete) : undefined}
                    />
                </div>
            </div>
            <Space h={5}/>
            <div>
                {!showReply ||
                    <div className={styles.CommentTreeChild}>
                        <CreateCommentNode
                            parentComment={tree.node}
                            onCreate={onCreateReply}
                            onCancel={() => setShowReply(false)}
                        />
                        <Space h={25}/>
                    </div>
                }
                {createdNodes.map((tree, i) => {
                        return (
                            <div key={i} className={styles.CommentTreeChild}>
                                <CommentTreePanel tree={tree}/>
                            </div>
                        );
                    })
                }
                {tree.children.sort((a, b) => b.node.votes - a.node.votes)
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