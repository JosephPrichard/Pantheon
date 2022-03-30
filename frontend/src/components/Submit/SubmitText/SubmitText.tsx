/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Button, InputWrapper, Space, Textarea } from "@mantine/core";
import React, { useCallback, useState } from "react";
import { ORANGE } from "../../colors";
import TextEditor from "../../Util/Widget/TextEditor/TextEditor";
import styles from "./SubmitText.module.css";
import { ErrorRes } from "../../../client/response";
import { submitPost } from "../Submit.client";
import { isValidError } from "../../../client/util";
import { ForumEntity } from "../../../client/models/forum";
import { createdPostUrl } from "../../../utils/url";
import ErrorMessage from "../../Util/ErrorMessage/ErrorMessage";
import { useRouter } from "next/router";

interface Props {
    forum?: ForumEntity;
    show: boolean;
}

const SubmitPost = ({ forum, show }: Props) => {

    const router = useRouter();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const clearError = useCallback(
        () => {
            setError(false);
            setMessage("");
        },
        []
    );

    const submit = useCallback(
        () => {
            if (!forum) {
                return;
            }

            setLoading(true);
            submitPost({
                title,
                forum: forum.id,
                content
            })
                .then((r) => {
                    setLoading(false);
                    router.push(createdPostUrl(r.data.post));
                })
                .catch((err) => {
                    if (isValidError(err)) {
                        const errData = err.response.data as ErrorRes;
                        setError(true);
                        setMessage(errData.message);
                    }
                    setLoading(false);
                });
        },
        [title, content]
    );

    return (
        <div 
            style={{
                display: show ? "block" : "none"
            }}
        >
            <Textarea
                className={styles.Title}
                placeholder={"Title"}
                minRows={1}
                maxRows={4}
                autosize
                value={title}
                onChange={(event) => {
                    setTitle(event.currentTarget.value);
                    clearError();
                }}
                error={error}
            />
            <div className={styles.Editor}>
                <TextEditor
                    value={content}
                    onChange={(value) => {
                        setContent(value);
                        clearError();
                    }}
                    error={error}
                />
            </div>
            <ErrorMessage message={message} textAlign="right" sidePaddings={10}/>
            <Space h={20}/>
            <div className={styles.ButtonWrapper}>
                <Button
                    className={styles.SubmitButton}
                    style={{
                        backgroundColor: ORANGE
                    }}
                    disabled={forum === undefined}
                    loading={loading}
                    onClick={submit}
                >
                    Post
                </Button>
            </div>
        </div>
    );
}

export default SubmitPost;