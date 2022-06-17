/*
 * Copyright (c) Joseph Prichard 2022.
 */

import React, { useCallback, useState } from "react";
import { submitCommentNode } from "../../../client/api/comment";
import { isValidError } from "../../../client/util";
import { ErrorRes } from "../../../client/types";
import styles from "./CreateCommentNode.module.css";
import TextEditor from "../../Util/Widget/TextEditor/TextEditor";
import { Button, Space } from "@mantine/core";
import ErrorMessage from "../../Util/ErrorMessage/ErrorMessage";
import { CommentEntity } from "../../../client/models/comment";
import { WHITE } from "../../colors";
import WhiteButton from "../../Util/Widget/Button/WhiteButton";

interface Props {
    parentComment: CommentEntity;
    onCreate: (nodeComment: CommentEntity) => void;
    onCancel: () => void;
}

const CreateCommentNode = ({ parentComment, onCreate, onCancel }: Props) => {

    const [content, setContent] = useState("");

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const clearError = useCallback(
        () => {
            setMessage("");
        },
        []
    );

    const onSubmit = useCallback(
        () => {
            setLoading(true);

            submitCommentNode({
                parentComment: parentComment.id,
                content
            })
                .then(r => {
                    setLoading(false);
                    onCreate(r.data.comment);
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
        <div className={styles.CreateCommentNode}>
            <div>
                <TextEditor
                    value={content}
                    onChange={(value) => {
                        setContent(value);
                        clearError();
                    }}
                />
                <Space h={5}/>
                <ErrorMessage message={message}/>
                <div className={styles.ButtonWrapper}>
                    <WhiteButton
                        text="Comment"
                        loading={loading}
                        onClick={onSubmit}
                    />
                    <WhiteButton
                        text="Cancel"
                        loading={loading}
                        onClick={onCancel}
                    />
                </div>
            </div>
        </div>
    );
}

export default CreateCommentNode;