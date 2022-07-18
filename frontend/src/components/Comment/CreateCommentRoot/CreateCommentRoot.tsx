/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { PostEntity } from "../../../client/models/post";
import React, { useCallback, useState } from "react";
import { Button, Space } from "@mantine/core";
import styles from "./CreateCommentRoot.module.css";
import TextEditor from "../../Util/Widget/TextEditor/TextEditor";
import { useUserName } from "../../../client/hooks/creds";
import { WHITE } from "../../colors";
import { submitCommentRoot } from "../../../client/api/comment";
import { CommentEntity } from "../../../client/models/comment";
import { isValidError } from "../../../client/util";
import { ErrorRes } from "../../../client/types";
import Message from "../../Util/Widget/Message/Message/Message";
import WhiteButton from "../../Util/Widget/WhiteButton/WhiteButton";

interface Props {
    post: PostEntity;
    onCreate: (rootComment: CommentEntity) => void;
}

const CreateCommentRoot = ({ post, onCreate }: Props) => {

    const name = useUserName(true);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const submit = useCallback(
        () => {
            setLoading(true);

            submitCommentRoot({ post: post.id, content })
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
        <div className={styles.CreateCommentRoot}>
            Comment as { name }
            <TextEditor
                value={content}
                onChange={(value) => {
                    setContent(value);
                    setMessage("");
                }}
            />
            <Space h={5}/>
            <Message message={message}/>
            <div className={styles.Button}>
                <WhiteButton text="Comment" loading={loading} onClick={submit}/>
            </div>
            <Space h={50}/>
        </div>
    );
}

export default CreateCommentRoot;