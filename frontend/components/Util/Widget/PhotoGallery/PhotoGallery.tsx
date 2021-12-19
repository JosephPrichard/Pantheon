import React, { useState } from "react";
import styles from "./PhotoGallery.module.css";
import { ChevronLeft, ChevronRight } from "react-feather";
import LoadableImage from "../LoadableImage/LoadableImage";

interface Props {
    imgIds: string[];
    baseUrl: string;
    width: string | number;
    height: string | number;
}

const PhotoGallery = ({ imgIds, baseUrl, width, height }: Props) => {

    const [img, setImg] = useState(0);

    function canShowLabel() {
        return imgIds.length > 1;
    }

    return(
        <div
            className={styles.PhotoGallery}
            style={{
                width,
                height
            }}
        >
            <div 
                className={styles.ArrowLeft}
                style={{
                    display: canShowLabel() ? "block" : "none"
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
                <ChevronLeft className={styles.Arrow} color={"rgb(129,131,132)"} size={25}/>
            </div>
            <div 
                className={styles.ArrowRight}
                style={{
                    display: canShowLabel() ? "block" : "none"
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
                <ChevronRight className={styles.Arrow} color={"rgb(129,131,132)"} size={25}/>
            </div>
            {imgIds.map((id, i) => {
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