/*
 * Copyright (c) Joseph Prichard 2022.
 */

import useSWR from "swr";
import { Card, Modal, Space, Title } from "@mantine/core";
import React, { useCallback, useState } from "react";
import { PostEntity } from "../../../client/models/post";
import PostVotePanel from "../../Vote/PostVotePanel/PostVotePanel";
import styles from "./PostPanel.module.css";
import CommentRootPanel from "../../Comment/CommentRootPanel/CommentRootPanel";
import { CommentTreeEntity } from "../../../client/models/comment";
import PostTitle from "../PostComponents/PostTitle/PostTitle";
import PostHeader from "../PostComponents/PostHeader/PostHeader";
import PostLinks from "../PostComponents/PostLinks/PostLinks";
import ImageContent from "../../Util/Layout/Content/ImageContent/ImageContent";
import LinkContent from "../../Util/Layout/Content/LinkContent/LinkContent";
import { fetcher } from "../../../utils/fetcher";
import { buildFetchPostVotesUrl, deletePost, editPost, PostAllVotesRes } from "../../../client/api/post";
import EditableTextContent from "../../Util/Layout/Content/EditableTextContent/EditableTextContent";
import { usePermissions } from "../../../hooks/usePermissions";
import ConfirmModal from "../../Util/Layout/ConfirmModal/ConfirmModal";

interface Props {
    post: PostEntity;
    roots: CommentTreeEntity[];
}

const PostPanel = ({ post, roots }: Props) => {

    const { data } = useSWR<PostAllVotesRes>(buildFetchPostVotesUrl(post.id), fetcher);
    const hasPerms = usePermissions(post.poster?.id);

    const [canEdit, setCanEdit] = useState(false);
    const [content, setContent] = useState(post.content);
    const [showDelete, setShowDelete] = useState(false);

    const onEditPost = useCallback(
        (text) => {
            editPost({
                post: post.id,
                content: text
            })
                .then(() => {
                    setContent(text);
                    setCanEdit(false);
                });
        },
        [post.id]
    );

    const onDeletePost = useCallback(
        () => {
            deletePost({
                post: post.id
            })
                .then(() => {
                    setShowDelete(false);
                });
        },
        [post.id]
    );

    let contentElement: JSX.Element = <></>;
    if(post.images.length > 0) {
        contentElement = <ImageContent images={post.images}/>
    } else if(content != null) {
        if (content != "") {
            contentElement = (
                <div className={styles.TextWrapper}>
                    <EditableTextContent
                        isEditing={canEdit && hasPerms}
                        text={content}
                        onCancel={() => setCanEdit(false)}
                        onSave={onEditPost}
                    />
                </div>
            );
        } else {
            contentElement = (
                <div className={styles.TextWrapper}>
                    [deleted]
                </div>
            );
        }
    } else if(post.link) {
        contentElement = <LinkContent url={post.link} font={15} clip={false} space={20}/>
    }

    return (
        <Card className={styles.PostPanel}>
            <ConfirmModal
                opened={showDelete}
                title="Confirm Deletion"
                message="Are you sure you want to delete your comment? You can't undo this."
                onClose={() => setShowDelete(false)}
                onConfirmed={onDeletePost}
            />
            <div className={styles.PostContentContainer}>
                <PostVotePanel
                    post={post}
                    userVoteValue={data?.postVote?.value}
                />
                <div className={styles.Content}>
                    <PostTitle post={post}/>
                    <PostHeader post={post}/>
                    { contentElement }
                    <PostLinks
                        post={post}
                        onClickEdit={hasPerms ? () => setCanEdit(!canEdit) : undefined}
                        onClickDelete={hasPerms ? () => setShowDelete(!showDelete) : undefined}
                        fade
                    />
                </div>
            </div>
            <Space h="xl"/>
            <CommentRootPanel
                post={post}
                roots={roots}
                commentVotes={data?.commentVotes}
            />
        </Card>
    );
}

export default PostPanel;