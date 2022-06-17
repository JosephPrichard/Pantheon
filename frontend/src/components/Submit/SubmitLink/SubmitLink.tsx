/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Button, Space, Textarea } from "@mantine/core";
import React, { useCallback, useState } from "react";
import { ORANGE } from "../../colors";
import styles from "./SubmitLink.module.css";
import { ErrorRes } from "../../../client/types";
import { submitPost } from "../../../client/api/submit";
import { ForumEntity } from "../../../client/models/forum";
import { createdPostUrl } from "../../../utils/url";
import { isValidError } from "../../../client/util";
import ErrorMessage from "../../Util/ErrorMessage/ErrorMessage";
import { useRouter } from "next/router";

interface Props {
    forum?: ForumEntity;
    show: boolean;
}

const SubmitPost = ({ forum, show }: Props) => {

    const router = useRouter();

    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");

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
                link
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
        [title, link]
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
            <Textarea
                className={styles.Title}
                placeholder={"Link"}
                minRows={4}
                maxRows={4}
                autosize
                value={link}
                onChange={(event) => {
                    setLink(event.currentTarget.value);
                    clearError();
                }}
                error={error}
            />
            <ErrorMessage message={message} textAlign="right" sidePaddings={10}/>
            <Space h={20}/>
            <div className={styles.ButtonWrapper}>
                <Button
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