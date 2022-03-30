/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Image, X } from "react-feather";
import Dropzone from "react-dropzone";
import React from "react";
import styles from "./FileDropzone.module.css";

interface Props {
    files: File[];
    onDrop: (acceptedFiles: File[]) => void;
    onRemove: (removeIndex: number) => void;
    error: boolean;
}

const FileDropzone = ({ files, onDrop, onRemove, error }: Props) => {

    return (
        <Dropzone
            accept={["image/png", "image/jpeg"]}
            multiple={true}
            onDrop={onDrop}
        >
            {({ getRootProps, getInputProps }) => (
                <div
                    className={styles.Dropzone}
                    style={{
                        borderColor: !error ? "rgb(64,66,71)" : "#FA5252"
                    }}
                    {...files.length == 0 ? {...getRootProps()} : {}}
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
                                        onClick={() => onRemove(i)}
                                    />
                                </div>
                            );
                        })}
                        <div
                            className={styles.PlusWrapper}
                            style={{
                                    display: files.length == 0 ? "none" : undefined
                            }}
                            {...getRootProps()}
                        >
                            <div className={styles.Plus}>
                                +
                            </div>
                        </div>
                    </div>
                    <input {...getInputProps()} />
                    <p
                        className={styles.DropzoneText}
                        style={{
                            color: !error ? "rgb(93,95,102)" : "#FA5252",
                            display: files.length !== 0 ? "none" : "inline-flex"
                        }}
                    >
                        <Image size={28}/>
                        <div className={styles.InnerText}>
                            Drag and Drop images or click to upload
                        </div>
                    </p>
                </div>
            )}
        </Dropzone>
    );
}

export default FileDropzone;