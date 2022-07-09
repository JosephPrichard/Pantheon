/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Button, Space, Textarea } from "@mantine/core";
import React, { useCallback, useState } from "react";
import Dropzone from "react-dropzone";
import { Image, X } from "react-feather";
import { ORANGE } from "../../colors";
import styles from "./SubmitImage.module.css";
import { ErrorRes } from "../../../client/types";
import { submitImages, submitPost } from "../../../client/api/submit";
import { ForumEntity } from "../../../client/models/forum";
import { createdPostUrl } from "../../../utils/url";
import { isValidError } from "../../../client/util";
import Message from "../../Util/Message/Message/Message";
import FileDropzone from "../../Util/Widget/FileDropzone/FileDropzone";
import { useRouter } from "next/router";

interface Props {
    forum: ForumEntity;
    show: boolean;
}

const SubmitImage = ({ forum, show }: Props) => {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [files, setFiles] = useState<File[]>([]);

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
            setLoading(true);
            // do a pre-check for title size, so we don't need to rely on server
            if (title.length >= 5 && title.length <= 50) {
                submitImages(files)
                    .then((r) => {
                        submitPost({ title: title, images: r.data.ids, forum: forum.id })
                            .then((r1) => {
                                setLoading(false);
                                router.push(createdPostUrl(r1.data.post));
                            })
                            .catch((err) => {
                                if (isValidError(err)) {
                                    const errData = err.response.data as ErrorRes;
                                    setError(true);
                                    setMessage(errData.message);
                                }
                                setLoading(false);
                            });
                    })
                    .catch((err) => {
                        if (isValidError(err)) {
                            const errData = err.response.data as ErrorRes;
                            setError(true);
                            setMessage(errData.message);
                        }
                        setLoading(false);
                    }); 
            } else {
                setError(true);
                setMessage("Title should be between 5 and 50 characters");
                setLoading(false);
            }
        }
    , [title, files]);

    return(
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
            <FileDropzone
                files={files}
                onDrop={(acceptedFiles) => {
                    setFiles(files.concat(acceptedFiles));
                    clearError();
                }}
                onRemove={(removeIndex) => {
                    const newFiles = files.map(file => file);
                    newFiles.splice(removeIndex, 1);
                    setFiles(newFiles);
                    clearError();
                }}
                error={error}
            />
            <Message message={message} textAlign="right" sidePaddings={10}/>
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

export default SubmitImage;