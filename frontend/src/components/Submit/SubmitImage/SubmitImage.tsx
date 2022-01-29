import { Button, Space, Textarea } from "@mantine/core";
import React, { useCallback, useState } from "react";
import Dropzone from "react-dropzone";
import { Image, X } from "react-feather";
import { ORANGE } from "../../colors";
import styles from "./SubmitImage.module.css";
import { findError, ErrorRes } from "../../../client/response";
import { submitImages, submitPost } from "../Submit.client";
import { ForumEntity } from "../../../client/models/forum";
import { postUrl } from "../../../utils/url";
import { isValidError } from "../../../client/util";

interface Props {
    forum?: ForumEntity;
    show: boolean;
}

const SubmitImage = ({ forum, show }: Props) => {
    const [title, setTitle] = useState("");
    const [files, setFiles] = useState<File[]>([]);

    const [titleError, setTitleError] = useState("");
    const [fileError, setFileError] = useState("");

    const [loading, setLoading] = useState(false);

    const submit = useCallback(
        () => {
            if (!forum) {
                return;
            }

            setLoading(true);
            // do a pre-check for title size, so we don't need to rely on server
            if (title.length >= 5 && title.length <= 50) {
                submitImages(files)
                    .then((r) => {
                        submitPost({
                            title: title,
                            images: r.data.ids,
                            forum: forum.id
                        })
                            .then((r1) => {
                                setLoading(false);
                                document.location.href = postUrl(r1.data.post);
                            })
                            .catch((err) => {
                                if (isValidError(err)) {
                                    const errData = err.response.data as ErrorRes;
                                    setTitleError(findError(errData, "title"));
                                }
                                setLoading(false);
                            });
                    })
                    .catch((err) => {
                        if (isValidError(err)) {
                            const errData = err.response.data as ErrorRes;
                            if (errData.message) {
                                setFileError(errData.message);
                            }
                        }
                        setLoading(false);
                    }); 
            } else {
                setTitleError("Title should be between 5 and 50 characters");
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
                    setTitleError("");
                }}
                error={titleError}
            />
            <div
                className={styles.FileError}
                style={{
                    display: fileError !== "" ? "block" : "none"
                }}
            >
                { fileError }
            </div>
            <Dropzone 
                accept={["image/png", "image/jpeg"]} 
                multiple={true} 
                onDrop={(acceptedFiles: File[]) => {
                    setFiles(files.concat(acceptedFiles));
                    setFileError("");
                }}
            >
                {({ getRootProps, getInputProps }) => (
                    <div 
                        className={styles.Dropzone} 
                        style={{
                            borderColor: fileError === "" ? "rgb(64,66,71)" : "#FA5252"
                        }}
                        {...getRootProps()}
                    >
                        <div className={styles.FileContainer}>
                            {files.map((file, i) => {
                                return (
                                    <div 
                                        className={styles.File} 
                                        onClick={e =>  e.stopPropagation()}
                                        onDrop={e => e.stopPropagation()}
                                        key={i}
                                    >
                                        <img className={styles.Img} src={URL.createObjectURL(file)}/>
                                        <X
                                            className={styles.Button}
                                            onClick={() => {
                                                const newFiles = files.map(file => file);
                                                newFiles.splice(i, 1);
                                                setFiles(newFiles);
                                                setTitleError("");
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <input {...getInputProps()} />
                        <p 
                            className={styles.DropzoneText}
                            style={{
                                color: fileError === "" ? "rgb(93,95,102)" : "#FA5252",
                                display: files.length !== 0 ? "none" : "inline-flex"
                            }}
                        >
                            <Image className={styles.Icon} size={28}/>
                            <div className={styles.InnerText}>
                                Drag and Drop images or click to upload
                            </div>
                        </p>
                    </div>
                )}
            </Dropzone>
            <Space h="md"/>
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