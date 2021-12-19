import { Button, Textarea } from "@mantine/core";
import React, { useCallback, useState } from "react";
import { ORANGE } from "../../colors";
import { submitPost } from "../Submit";
import styles from "./SubmitLink.module.css";
import request from "axios";
import { ErrorRes, findValidationMessage } from "../../../api/interfaces/common";

interface Props {
    show: boolean;
}

const SubmitPost = ({ show }: Props) => {

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
            setLoading(true);
            submitPost({
                title: title,
                link: link
            })
                .then((r) => {
                    setLoading(false);
                    document.location.href = "/post/" + r.data.id;
                })
                .catch((err) => {
                    if (request.isAxiosError(err) && err.response) {
                        const errData = err.response.data as ErrorRes;
                        setTitleError(findValidationMessage(errData, "title"));
                        setLinkError(findValidationMessage(errData, "link"));
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
                minRows={1}
                maxRows={4}
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