import { Button, Textarea } from "@mantine/core";
import React, { useCallback, useState } from "react";
import { ORANGE } from "../../colors";
import styles from "./SubmitLink.module.css";
import { PropertyErrorRes, findError } from "../../../client/response";
import { submitPost } from "../Submit.client";
import { ForumEntity } from "../../../client/models/forum";
import { postUrl } from "../../../utils/url";
import { isValidError } from "../../../client/util";

interface Props {
    forum?: ForumEntity;
    show: boolean;
}

const SubmitPost = ({ forum, show }: Props) => {

    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");

    const [titleError, setTitleError] = useState("");
    const [linkError, setLinkError] = useState("");

    const [loading, setLoading] = useState(false);

    const clearErrors = useCallback(
        () => {
            setTitleError("");
            setLinkError("");
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
                    document.location.href = postUrl(r.data.post);
                })
                .catch((err) => {
                    if (isValidError(err)) {
                        const errData = err.response.data as PropertyErrorRes;
                        setTitleError(findError(errData, "title"));
                        setLinkError(findError(errData, "link"));
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
                    clearErrors();
                }}
                error={titleError}
            />
            <Textarea
                className={styles.Title}
                placeholder={"Link"}
                minRows={6}
                maxRows={6}
                autosize
                value={link}
                onChange={(event) => {
                    setLink(event.currentTarget.value);
                    clearErrors();
                }}
                error={linkError}
            />
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