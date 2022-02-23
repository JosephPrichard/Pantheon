import React, { useCallback, useState } from "react";
import { submitCommentNode } from "../Comment.client";
import { isValidError } from "../../../client/util";
import { ErrorRes } from "../../../client/response";
import styles from "./CreateCommentNode.module.css";
import TextEditor from "../../Util/Widget/TextEditor/TextEditor";
import { Button, Space } from "@mantine/core";
import ErrorMessage from "../../Util/ErrorMessage/ErrorMessage";
import { CommentEntity } from "../../../client/models/comment";
import { WHITE } from "../../colors";

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

    const submit = useCallback(
        () => {
            setLoading(true);

            submitCommentNode({
                parentComment: parentComment.id,
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
        <div className={styles.CreateCommentNode}>
            <div>
                <TextEditor
                    value={content}
                    onChange={(value) => {
                        setContent(value);
                        clearError();
                    }}
                />
                <Space h={15}/>
                <ErrorMessage message={message}/>
                <div className={styles.ButtonWrapper}>
                    <Button
                        className={styles.Button}
                        style={{
                            backgroundColor: WHITE
                        }}
                        loading={loading}
                        onClick={submit}
                    >
                        Comment
                    </Button>
                    <Button
                        className={styles.Button}
                        style={{
                            backgroundColor: WHITE
                        }}
                        loading={loading}
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CreateCommentNode;