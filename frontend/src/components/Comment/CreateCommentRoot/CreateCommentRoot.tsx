/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { PostEntity } from "../../../client/models/post";
import React, { useCallback, useState } from "react";
import { Button, Space } from "@mantine/core";
import styles from "./CreateCommentRoot.module.css";
import TextEditor from "../../Util/Widget/TextEditor/TextEditor";
import { useUserName } from "../../../hooks/useUserCreds";
import { WHITE } from "../../colors";
import { submitCommentRoot } from "../Comment.client";
import { CommentEntity } from "../../../client/models/comment";
import { isValidError } from "../../../client/util";
import { ErrorRes } from "../../../client/response";
import ErrorMessage from "../../Util/ErrorMessage/ErrorMessage";

interface Props {
    post: PostEntity;
    onCreate: (rootComment: CommentEntity) => void;
}

const CreateCommentRoot = ({ post, onCreate }: Props) => {

    const name = useUserName(false);

    const [content, setContent] = useState("");

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const clearError = useCallback(
        () => {
            setMessage("");
        },
        []
    );

    const submit = useCallback(
        () => {
            setLoading(true);

            submitCommentRoot({
                post: post.id,
                content
            })
                .then(r => {
                    onCreate(r.data.comment);
                    setLoading(false);
                })
                .catch(err => {
                    if (isValidError(err)) {
                        const errData = err.response.data as ErrorRes;
                        setMessage(errData.message);
                    }
                    setLoading(false);
                })
        },
        [content]
    );

    return (
        <div className={styles.CreateCommentRoot}>
            <Space h="xl"/>
            Comment as { name }
            <TextEditor
                value={content}
                onChange={(value) => {
                    setContent(value);
                    clearError();
                }}
            />
            <Space h="md"/>
            <ErrorMessage message={message}/>
            <div className={styles.ButtonWrapper}>
                <Button
                    className={styles.SubmitButton}
                    style={{
                        backgroundColor: WHITE
                    }}
                    loading={loading}
                    onClick={submit}
                >
                    Comment
                </Button>
            </div>
        </div>
    );
}

export default CreateCommentRoot;