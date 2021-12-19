import { Button, Space, Textarea } from "@mantine/core";
import axios from "axios";
import React, { useCallback, useState } from "react";
import Dropzone from "react-dropzone";
import { Image, X } from "react-feather";
import { config } from "../../../api/config";
import { UploadRes } from "../../../api/interfaces/image";
import { ORANGE } from "../../colors";
import { submitPost } from "../Submit";
import request from "axios";
import styles from "./SubmitImage.module.css";
import { ErrorRes, findValidationMessage } from "../../../api/interfaces/common";

function submitImages(files: File[]) {
    const formData = new FormData();
    for(const file of files) {
        formData.append(file.name, file, file.name);
    }
    return axios.post<UploadRes>("/api/images/assets", formData, config);
}

interface Props {
    show: boolean;
}

const SubmitImage = ({ show }: Props) => {
    const [title, setTitle] = useState("");
    const [files, setFiles] = useState<File[]>([]);

    const [titleError, setTitleError] = useState("");
    const [fileError, setFileError] = useState("");

    const [loading, setLoading] = useState(false);

    const submit = useCallback(
        () => {
            setLoading(true);

            //do a pre check for title size so we don't need to rely on server
            if (title.length >= 5 && title.length <= 50) {
                if(files.length <= 10) {
                    submitImages(files)
                        .then((r) => {
                            submitPost({
                                title: title,
                                images: r.data.ids
                            })
                                .then((r1) => {
                                    setLoading(false);
                                    document.location.href = `/post/${r1.data.id}`;
                                })
                                .catch((err) => {
                                    if (request.isAxiosError(err) && err.response) {
                                        const errData = err.response.data as ErrorRes;
                                        setTitleError(findValidationMessage(errData, "title"));
                                    }
                                    setLoading(false);
                                });
                        })
                        .catch((err) => {
                            if (request.isAxiosError(err) && err.response) {
                                const errData = err.response.data as ErrorRes;
                                if (errData.msg) {
                                    setFileError(errData.msg);
                                }
                            }
                            setLoading(false);
                        }); 
                } else {
                    setFileError("Cannot submit more than 10 files");
                    setLoading(false);
                }
            } else {
                setTitleError("Title should be between 5 and 50 characters");
                setLoading(false);
            }
        },
        [files, title]
    );

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
            <div className={styles.FileError}>
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
                                color: fileError === "" ? "rgb(93,95,102)" : "#FA5252"
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