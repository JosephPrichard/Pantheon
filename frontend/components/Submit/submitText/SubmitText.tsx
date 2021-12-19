import { Button, InputWrapper, Textarea } from "@mantine/core";
import React, { useCallback, useState } from "react";
import { ORANGE } from "../../colors";
import TextEditor from "../../Util/Widget/TextEditor/TextEditor";
import { submitPost } from "../Submit";
import styles from "./SubmitText.module.css";
import request from "axios";
import { ErrorRes, findValidationMessage } from "../../../api/interfaces/common";

interface Props {
    show: boolean;
}

function lines(num: number) {
    let str = "";
    for (let i = 0; i < num; i++) {
        str += "<p> \n </p>";
    }
    return str;
}

const SubmitPost = ({ show }: Props) => {

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
            setLoading(true);
            submitPost({
                title: title,
                content: content
            })
                .then((r) => {
                    setLoading(false);
                    document.location.href = "/post/" + r.data.id;
                })
                .catch((err) => {
                    if (request.isAxiosError(err) && err.response) {
                        const errData = err.response.data as ErrorRes;
                        setTitleError(findValidationMessage(errData, "title"));
                        setContentError(findValidationMessage(errData, "content"));
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
                    loading={loading}
                    onClick={submit}
                >
                    Post
                </Button>
                <Button className={styles.DraftButton}>
                    Draft
                </Button>
            </div>
        </div>
    );
}

export default SubmitPost;