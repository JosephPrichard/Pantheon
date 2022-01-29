import { Button, InputWrapper, Textarea } from "@mantine/core";
import React, { useCallback, useState } from "react";
import { ORANGE } from "../../colors";
import TextEditor from "../../Util/Widget/TextEditor/TextEditor";
import styles from "./SubmitText.module.css";
import { PropertyErrorRes, findError } from "../../../client/response";
import { submitPost } from "../Submit.client";
import { isValidError } from "../../../client/util";
import { ForumEntity } from "../../../client/models/forum";
import { postUrl } from "../../../utils/url";

interface Props {
    forum?: ForumEntity;
    show: boolean;
}

const SubmitPost = ({ forum, show }: Props) => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [titleError, setTitleError] = useState("");
    const [contentError, setContentError] = useState("");

    const [loading, setLoading] = useState(false);

    const clearErrors = useCallback(
        () => {
            setTitleError("");
            setContentError("");
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
                    document.location.href = postUrl(r.data.post);
                })
                .catch((err) => {
                    if (isValidError(err)) {
                        const errData = err.response.data as PropertyErrorRes;
                        setTitleError(findError(errData, "title"));
                        setContentError(findError(errData, "content"));
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
                    clearErrors();
                }}
                error={titleError}
            />
            <InputWrapper
                className={styles.Editor}
                error={contentError}
            >
                <TextEditor
                    value={content} 
                    onChange={(value) => {
                        setContent(value);
                        clearErrors();
                    }}
                />
            </InputWrapper>
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