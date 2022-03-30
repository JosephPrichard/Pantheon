/*
 * Copyright (c) Joseph Prichard 2022.
 */

import React, { useState } from "react";
import styles from "./PhotoGallery.module.css";
import { ChevronLeft, ChevronRight } from "react-feather";
import LoadableImage from "../../Loading/LoadableImage/LoadableImage";

interface Props {
    imgIds: string[];
    baseUrl: string;
    width: string | number;
    height: string | number;
}

const PhotoGallery = ({ imgIds, baseUrl, width, height }: Props) => {

    const [hovering, setHovering] = useState(false);
    const [img, setImg] = useState(0);

    function showLabel() {
        return imgIds.length > 1;
    }

    return(
        <div
            className={styles.PhotoGallery}
            style={{
                width,
                height
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <div
                className={styles.Number}
                style={{
                    display: showLabel() ? "block" : "none"
                }}
            >
                { img + 1 } / { imgIds.length }
            </div>
            <div 
                className={`${styles.ArrowLeft} ${styles.ArrowContainer} ${hovering ? styles.FadeIn : styles.FadeOut}`}
                style={{
                    display: showLabel() ? "block" : "none"
                }}
                onClick={e => {
                    e.stopPropagation();
                    if (img - 1 < 0) {
                        setImg(imgIds.length - 1);
                    } else {
                        setImg(img - 1);
                    }
                }}
            >
                <ChevronLeft className={styles.Arrow} color={"rgb(129,131,132)"} size={45}/>
            </div>
            <div 
                className={`${styles.ArrowRight} ${styles.ArrowContainer} ${hovering ? styles.FadeIn : styles.FadeOut}`}
                style={{
                    display: showLabel() ? "block" : "none"
                }}
                onClick={e => {
                    e.stopPropagation();
                    if (img + 1 >= imgIds.length) {
                        setImg(0);
                    } else {
                        setImg(img + 1);
                    }
                }}
            >
                <ChevronRight className={styles.Arrow} color={"rgb(129,131,132)"} size={45}/>
            </div>
            { imgIds.map((id, i) => {
                return (
                    <div
                        key={i}
                        style={{
                            display: i === img ? "block" : "none"
                        }}
                    >
                        <LoadableImage
                            src={`${baseUrl}/${id}`} 
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default PhotoGallery;